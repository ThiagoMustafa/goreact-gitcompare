import React, { Component } from 'react';
import moment from 'moment';
import { Container, Form } from './style';
import CompareList from '../../components/CompareList';

import logo from '../../assets/gitcompare-logo.png';

import api from '../../services/api';

class Main extends Component {
  state = {
    loading: false,
    repositoryError: false,
    repositoryInput: '',
    repositories: [],
  };

  componentWillMount() {
    const savedRepositories = JSON.parse(localStorage.repositories);
    if (savedRepositories) this.setState({ repositories: savedRepositories });
  }

  handleAddRepository = async (e) => {
    e.preventDefault();
    this.setState({ loading: true });

    try {
      const { data: repository } = await api.get(`/repos/${this.state.repositoryInput}`);
      repository.lastCommit = moment(repository.pushed_at).fromNow();

      this.setState(
        {
          repositoryInput: '',
          repositories: [...this.state.repositories, repository],
          repositoryError: false,
        },
        () => {
          localStorage.repositories = JSON.stringify(this.state.repositories);
        },
      );
    } catch (err) {
      this.setState({ repositoryError: true });
    } finally {
      this.setState({ loading: false });
    }
  };

  handleRemoveRepository = (id) => {
    const { repositories } = this.state;

    const updateRepositories = repositories.filter(repository => repository.id !== id);

    this.setState({ repositories: updateRepositories });

    localStorage.repositories = JSON.stringify(updateRepositories);
  };

  handleUpdateRepository = async (id) => {
    const { repositories } = this.state;

    const repository = repositories.find(repository => repository.id === id);

    try {
      const { data } = await api.get(`/repos/${repository.full_name}`);

      data.lastCommit = moment(data.pushed_at).fromNow();

      this.setState({
        repositoryError: false,
        repositoryInput: '',
        repositories: repositories.map(repo => (repo.id === data.id ? data : repo)),
      });

      localStorage.repositories = JSON.stringify(repositories);
    } catch (err) {
      this.setState({ repositoryError: true });
    }
  };

  render() {
    return (
      <Container>
        <img src={logo} alt="Github compare" />
        <Form withError={this.state.repositoryError} onSubmit={this.handleAddRepository}>
          <input
            type="text"
            placeholder="usuário/repositório"
            value={this.state.repositoryInput}
            onChange={e => this.setState({ repositoryInput: e.target.value })}
          />
          <button type="submit">
            {this.state.loading ? <i className="fa fa-spinner fa-pulse" /> : 'OK'}
          </button>
        </Form>

        <CompareList
          repositories={this.state.repositories}
          removeRepository={this.handleRemoveRepository}
          updateRepository={this.handleUpdateRepository}
        />
      </Container>
    );
  }
}

export default Main;

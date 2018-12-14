import React from 'react';
import PropTypes from 'prop-types';
import { Container, Repository, Button } from './style';

const CompareList = ({ repositories, deleteRepository }) => (
  <Container>
    {repositories.map(repository => (
      <Repository key={repository.id}>
        <header>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <strong>{repository.name}</strong>
          <small>{repository.owner.login}</small>
        </header>
        <ul>
          <li>
            <i className="fa fa-star" />
            {repository.stargazers_count}
            <small> stars </small>
          </li>
          <li>
            <i className="fa fa-code-fork" />
            {repository.forks_count}
            <small> forks </small>
          </li>
          <li>
            <i className="fa fa-group" />
            {repository.open_issues_count}
            <small> issues </small>
          </li>
          <li>
            <i className="fa fa-clock-o" />
            {repository.lastCommit}
            <small> last commit </small>
          </li>
        </ul>
        <div className="buttons">
          <Button type="button" buttonType="update">
            Update
          </Button>
          <Button type="button" buttonType="delete" onClick={deleteRepository}>
            Delete
          </Button>
        </div>
      </Repository>
    ))}
  </Container>
);

CompareList.protoType = {
  repositories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      owner: PropTypes.shape({
        login: PropTypes.string,
        avatar_url: PropTypes.string,
      }),
      stargazers_count: PropTypes.number,
      forks_count: PropTypes.number,
      open_issues_count: PropTypes.number,
      pushed_at: PropTypes.number,
    }),
  ).isRequired,
};

export default CompareList;

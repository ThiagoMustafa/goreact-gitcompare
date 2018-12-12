import React from 'react';
import { Container, Form } from './style';
import CompareList from '../../components/CompareList';

import logo from '../../assets/gitcompare-logo.png';

const Main = () => (
  <Container>
    <img src={logo} alt="Github compare" />
    <Form>
      <input type="text" placeholder="usuário/repositório" />
      <button type="submit">OK</button>
    </Form>

    <CompareList />
  </Container>
);

export default Main;

import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { redirect } from '../common/common.tsx';
import './Login.css';

export default class Login extends Component {
  state = {
    login: '',
    password: '',
  };

  url = '/sc/api/login/';

  validateForm = () => {
    return this.state.login.length > 0 && this.state.password.length > 0;
  };

  onChange = e => {
    this.setState({ [e.target.name]: [e.target.value] });
  };

  login = () => {
    axios
      .post(this.url, {
        login: this.state.login,
        password: this.state.password,
      })
      .then(res => {
        redirect(res.data);
      })
      .catch(err => console.log('login', err));
  };

  render() {
    return (
      <div className="Login">
        <Form>
          <Form.Group size="lg" controlId="login">
            <Form.Label>Имя</Form.Label>
            <Form.Control
              type="text"
              name="login"
              value={this.state.login}
              onChange={this.onChange}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="password">
            <Form.Label>Пароль</Form.Label>
            <Form.Control
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.onChange}
            />
          </Form.Group>
          <Button block size="lg" disabled={!this.validateForm()} onClick={this.login}>
            Log in
          </Button>
        </Form>
      </div>
    );
  }
}

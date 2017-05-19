import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './Login.actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      password: ''
    };
  }
  change(prop, value) {
    this.setState({
      [prop]: value
    });
  }
  login(event) {
    event.preventDefault();
    let name = this.state.name;
    let password = this.state.password;
    
    this.props.login(name, password)
  }
  render() {
    let name = this.state.name;
    let password = this.state.password;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={event => this.login(event)}>
          <input type="text" value={name}
            placeholder="Name"
            onChange={event => this.change('name', event.target.value)}/><br/>
          <input type="password" value={password}
            placeholder="Password"
            onChange={event => this.change('password', event.target.value)}/><br/>
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

const LoginContainer = ReactRedux.connect(
  null,
  actions
)(Login);

export default LoginContainer;

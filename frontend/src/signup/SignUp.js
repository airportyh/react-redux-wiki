import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './SignUp.actions';

class SignUp extends React.Component {
  constructor(){
    super();
    this.state = {
      name: '',
      password: ''
    }
  }
  change(prop, value) {
    this.setState({
      [prop]: value
    });
  }
  render() {
    let name = this.state.name;
    let password = this.state.password;
    return (
      <div>
        <h1>Sign Up</h1>
        <form onSubmit={() => this.props.signUp(name, password)}>
          <input type="text"
            value={name}
            placeholder="Name"
            onChange={event => this.change('name', event.target.value)}/><br/>
          <input type="password"
            value={password}
            placeholder="Password"
            onChange={event => this.change('password', event.target.value)}/><br/>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    );
  }
}

const SignUpContainer = ReactRedux.connect(
  null,
  actions
)(SignUp);

export default SignUpContainer;

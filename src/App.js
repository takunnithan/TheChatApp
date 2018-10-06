import React, { Component } from 'react';
import classes from './App.css';
import axios from 'axios';

import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import AppContainer from './components/app_container/AppContainer';

// http://localhost:3000/chat/DHDKDKDKKS   -----> Always redirect to users own space (Just like slack (--))

// http://localhost:3000/chat/LJDKJDJKFJ    ----->  URL for Group/Direct Chat

// http://localhost:3000/signup            ------>  Sign up URL

class App extends Component {

  state = {
    username : null,
    password : null,
    login_error_message: null,
    signup_error_message: null,
    signup_username: null,
    signup_password: null,
    signup_re_password: null,
    signup_fullname: null
  }

  handleResponse = (response) => {
    var res_data = response.data;
      if (res_data.login_success === true) {
        localStorage.setItem('is_logged_in', true);
        localStorage.setItem('auth_token', res_data.token);
        localStorage.setItem('user_id', res_data.user_id);
        this.setState({login_error_message:null, username: null, password: null});
      } else {
        this.setState({login_error_message: res_data.reason, password: null});
      }
  }

  loginHandler = () =>{
    var login_url = 'http://localhost:8000/login/';
    var payload = {
        username: this.state.username,
        password: this.state.password,
    }
    axios({
      method: 'post',
      url:login_url,
      data:payload
    }).then(response => {
      this.handleResponse(response);
  });
  }

  inputHandler = (e) => {
    e.target.id === 'username' ? (this.setState({username:e.target.value})) : (this.setState({password:e.target.value}));
  }

  signupHandler = (e) => {
    var signup_url = 'http://localhost:8000/signup/';

    if (!this.state.signup_username || !this.state.signup_password || !this.state.signup_fullname){
      this.setState({signup_error_message: "Please fill all the fields!"});
      return;
    }

    if (this.state.signup_password !== this.state.signup_re_password){
        this.setState({signup_error_message: "Passwords doesn't match"});
        return;
    }

    var payload = {
        username: this.state.signup_username,
        password: this.state.signup_password,
        fullname: this.state.signup_fullname
    }
    axios({
      method: 'post',
      url:signup_url,
      data:payload
    }).then(response => {
      this.handleResponse(response);
  });
  }

  signupInputHandler = (e) => {
    switch (e.target.id) {
      case 'username':
        this.setState({signup_username: e.target.value});
        break;
      case 'password':
       this.setState({signup_password: e.target.value});
        break;
      case 're-password':
       this.setState({signup_re_password: e.target.value});
        break;
      case 'fullname':
       this.setState({signup_fullname: e.target.value});
        break;
    }
  }

  render() {
    return (
      localStorage.getItem('is_logged_in')
      ? (       
        <AppContainer />
        )
      :(<Login loginHandler={this.loginHandler} inputHandler={this.inputHandler} message={this.state.login_error_message} />)
      
      // TODO: Move signup to a Link ( react router ) and redirect
      // http://localhost:3000/signup 
      // Use router props and push a the app home page on successful signup and redirect
      // <Signup inputHandler={this.signupInputHandler} signupHandler={this.signupHandler} error_message={this.state.signup_error_message} />
    );  
  }
}

export default App;

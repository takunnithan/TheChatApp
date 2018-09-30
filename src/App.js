import React, { Component } from 'react';
import classes from './App.css';
import axios from 'axios';

import Sidebar from './components/sidebar/Sidebar';
import Main from './components/main/Main';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';


class App extends Component {

  state = {
    username : null,
    password : null,
    login_error_message: null
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
      var res_data = response.data;
      if (res_data.login_success === true) {
        localStorage.setItem('is_logged_in', true);
        localStorage.setItem('auth_token', res_data.token);
        localStorage.setItem('user_id', res_data.user_id);
        this.setState({login_error_message:null, username: null, password: null});
      } else {
        this.setState({login_error_message: res_data.reason, password: null});
      }
  });
  }

  inputHandler = (e) => {
    e.target.id === 'username' ? (this.setState({username:e.target.value})) : (this.setState({password:e.target.value}));
  }

  render() {
    return (
      localStorage.getItem('is_logged_in')
      ? (       
          <div className={classes.app} >
              <div className={classes.sidebar} ><Sidebar/></div>
              <div className={classes.main} ><Main /></div>
          </div>
        )
      :(<Login loginHandler={this.loginHandler} inputHandler={this.inputHandler} message={this.state.login_error_message} />)

      // <Signup />
    );  
  }
}

export default App;

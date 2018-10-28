import React, { Component } from 'react';
import classes from './Login.css';
import axios from 'axios';
import {Link} from 'react-router-dom';

class Login extends Component {

  state = {
    username : null,
    password : null,
    error_message: null,
  }

  
  componentWillMount() {
    if (localStorage.getItem('is_logged_in')){
        this.props.history.push({pathname: '/chat'});
    }
  }
  

  handleResponse = (response) => {
    var res_data = response.data;
      if (res_data.login_success === true) {
        localStorage.setItem('is_logged_in', true);
        localStorage.setItem('auth_token', res_data.token);
        localStorage.setItem('user_id', res_data.user_id);
        this.setState({error_message:null, username: null, password: null});

        // Redirect to chat
        // Add the personal space UUID in the API response and redirect to that here!!!
        this.props.history.push({pathname: '/chat'});
      } else {
        this.setState({error_message: res_data.reason, password: null});
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

  render() {
    return (
      <div className={classes.login_main} >
      <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet"></link>
        <div className={classes.login_box}>
        <div className={classes.thechatapp_logo}>TheChatApp</div>
        <div className={classes.inputs}>
          <input className={classes.input} id= 'username' placeholder='username' onChange={this.inputHandler} />
          <input className={classes.input} id= 'password' type="password" placeholder='password' onChange={this.inputHandler} />
          </div>
        <div className={classes.login_button_container}>
          <button className={classes.login_button} onClick={this.props.loginHandler}>Login</button>
        </div>
        <div className={classes.remember_me}>
          <input type="checkbox" name="remember"/> Remember me
        </div>
        <div className={classes.error}>
          {this.state.error_message}
        </div>
        <div className={classes.error}>
          <Link to='/signup'>SignUp</Link>
        </div>
      </div>
      </div>
    );  
  }
}

const mapDispatchToProps = dispatch => {
  return {
      loginHandler: (username, password) => {
          axios(
              {
                  method: 'get',
                  url: 'http://localhost:8000/chat/' + unique_hash + '/?format=json',
                  headers: {
                      'auth-token':localStorage.getItem('auth_token'),
                      'user-id': localStorage.getItem('user_id')
                  }
              }).then(response => {
          dispatch({type: 'NEW_MESSAGE', payload: response.data, unique_hash: unique_hash})
          });
      }
  }
}

export default connect(null, mapDispatchToProps)(Login);

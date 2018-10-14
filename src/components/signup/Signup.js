import React, { Component } from 'react';
import classes from './Signup.css';
import axios from 'axios';

class Signup extends Component {

  state = {
  error_message: null,
  username: null,
  password: null,
  re_password: null,
  fullname: null
  }

  inputHandler = (e) => {
    switch (e.target.id) {
      case 'username':
        this.setState({username: e.target.value});
        break;
      case 'password':
       this.setState({password: e.target.value});
        break;
      case 're-password':
       this.setState({re_password: e.target.value});
        break;
      case 'fullname':
       this.setState({fullname: e.target.value});
        break;
    }
  }


  signupHandler = (e) => {
    var signup_url = 'http://localhost:8000/signup/';

    if (!this.state.username || !this.state.password || !this.state.fullname){
      this.setState({error_message: "Please fill all the fields!"});
      return;
    }

    if (this.state.password !== this.state.re_password){
        this.setState({error_message: "Passwords doesn't match"});
        return;
    }

    var payload = {
        username: this.state.username,
        password: this.state.password,
        fullname: this.state.fullname
    }
    axios({
      method: 'post',
      url:signup_url,
      data:payload
    }).then(response => {
      this.handleResponse(response);
  });
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

  render() {
    return (
      <div className={classes.login_main} >
      <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet"></link>
      <div className={classes.thechatapp_logo}>TheChatApp</div>
      <div className={classes.login_box}>
         <div className={classes.box_title}>Sign Up</div> 
          <div className={classes.inputs}>
              <div className={classes.labels}>username</div>
              <input className={classes.input} id= 'username' placeholder='username' onChange={this.inputHandler} />
      
              <div className={classes.labels}>full name</div>
              <input className={classes.input} id= 'fullname' placeholder='fullname' onChange={this.inputHandler} />
      
      
              <div className={classes.labels}>password</div>
              <input className={classes.input} id= 'password' type="password" placeholder='password' onChange={this.inputHandler} />
      
      
              <div className={classes.labels}>re-password</div>
              <input className={classes.input} id= 're-password' type="password" placeholder='re-password' onChange={this.inputHandler} />
         </div>

          <div className={classes.signup_button_container}>
            <button className={classes.signup_button} onClick={this.signupHandler}>Sign up</button>
        </div>
        <div className={classes.signup_error}>
          {this.state.error_message}
      </div>
      </div>
      </div>
    );  
  }
}

export default Signup;

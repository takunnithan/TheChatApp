import React, { Component } from 'react';
import classes from './Login.css';

class Login extends Component {

  render() {
    return (
      <div className={classes.login_main} >
      <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet"></link>
        <div className={classes.login_box}>
        <div className={classes.thechatapp_logo}>TheChatApp</div>
        <div className={classes.inputs}>
          <input className={classes.input} name= 'username' defaultValue='username' onChange={this.props.inputHandler} />
          <input className={classes.input} name= 'password' type="password" defaultValue='password' onChange={this.props.inputHandler} />
          </div>
        <div className={classes.login_button_container}>
          <button className={classes.login_button} onClick={this.props.loginHandler}>Login</button>
        </div>
        <div className={classes.remember_me}>
          <input type="checkbox" name="remember"/> Remember me
        </div>
        <div className={classes.error}>
          {this.props.message}
        </div>
      </div>
      </div>
    );  
  }
}

export default Login;

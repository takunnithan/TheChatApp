import React, { Component } from 'react';
import classes from './Signup.css';

class Signup extends Component {

  render() {
    return (
      <div className={classes.login_main} >
      <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet"></link>
      <div className={classes.thechatapp_logo}>TheChatApp</div>
      <div className={classes.login_box}>
         <div className={classes.box_title}>Sign Up</div> 
          <div className={classes.inputs}>
              <div className={classes.labels}>username</div>
              <input className={classes.input} id= 'username' placeholder='username' onChange={this.props.inputHandler} />
      
              <div className={classes.labels}>full name</div>
              <input className={classes.input} id= 'fullname ' placeholder='fullname' onChange={this.props.inputHandler} />
      
      
              <div className={classes.labels}>password</div>
              <input className={classes.input} id= 'password' type="password" placeholder='password' onChange={this.props.inputHandler} />
      
      
              <div className={classes.labels}>re-password</div>
              <input className={classes.input} id= 'confirm' type="password" placeholder='re-password' onChange={this.props.inputHandler} />
         </div>

          <div className={classes.signup_button_container}>
            <button className={classes.signup_button} onClick={this.props.loginHandler}>Sign up</button>
        </div>
      </div>
      </div>
    );  
  }
}

export default Signup;

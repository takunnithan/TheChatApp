import React, { Component } from 'react';
import classes from './Login.css';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import {loginAction} from '../../store/action/action';

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
          <button className={classes.login_button} onClick={() => this.props.loginHandler(this)}>Login</button>
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
      loginHandler: (self) => {
          dispatch(loginAction(self));
          }
      }
  }
  // self.state.username, self.state.password, self.props.history

export default connect(null, mapDispatchToProps)(Login);

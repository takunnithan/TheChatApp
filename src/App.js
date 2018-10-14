import React, { Component } from 'react';
import classes from './App.css';

import {Route} from 'react-router-dom';

import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import AppContainer from './components/app_container/AppContainer';

class App extends Component {

  render() {
    return (
      <div className={classes.main_div}>
        <Route path='/signup' exact component={Signup} />        
        <Route path='/chat' exact component={AppContainer} />        
        <Route path='/' exact component={Login} />        
      </div>
    );  
  }
}

export default App;

// localStorage.getItem('is_logged_in')
// ? (
//       <AppContainer />
//   )
// :(<Login loginHandler={this.loginHandler} inputHandler={this.inputHandler} message={this.state.login_error_message} />)

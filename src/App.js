import React, { Component } from 'react';
import classes from './App.css';

import Sidebar from './components/sidebar/Sidebar';
import Main from './components/main/Main';
import Login from './components/login/Login';


class App extends Component {
  render() {
    return (
      // <div className={classes.app} >
      //   <div className={classes.sidebar} ><Sidebar/></div>
      //   <div className={classes.main} ><Main /></div>
      // </div>
      <Login />
    );  
  }
}

export default App;

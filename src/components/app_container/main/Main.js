import React, { Component } from 'react';
import classes from './Main.css';
import Top from './top/Top';
import ChatBox from './chatbox/ChatBox';
import ChatArea from './chatarea/ChatArea';

class Main extends Component {
  render() {
    return (
      <div className={classes.main} >
        <Top />
        <ChatArea />
        <div className={classes.chatbox} ><ChatBox /></div>
      </div>
    );
  }
}

export default Main;
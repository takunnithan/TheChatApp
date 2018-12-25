import React, { Component } from 'react';
import classes from './Main.css';
import Top from './top/Top';
import ChatBox from './chatbox/ChatBox';
import ChatArea from './chatarea/ChatArea';
import SocketInstance from '../socket/Socket';

class Main extends Component {

  componentDidMount(){
    SocketInstance.connect();
  }

  render() {
    return (
      <div className={classes.main} >
        <Top />
        <ChatArea sock={this.sock}/>
        <div className={classes.chatbox} ><ChatBox /></div>
      </div>
    );
  }
}

export default Main;
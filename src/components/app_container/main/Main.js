import React, { Component } from 'react';
import classes from './Main.css';
import Top from './top/Top';
import ChatBox from './chatbox/ChatBox';
import ChatArea from './chatarea/ChatArea';
import SockJS from 'sockjs-client';

class Main extends Component {

  constructor() {
    super();
    var sock = new SockJS('ws://localhost:8000/ws/chat/HGJ87L');
    sock.onopen = function() {
        console.log('open-------------------');
        sock.send();
    };

    sock.onmessage = function(e) {
        console.log('message', e.data);
        sock.close();
    };

    sock.onclose = function() {
        console.log('close----------------');
    };
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
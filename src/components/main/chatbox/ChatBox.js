import React, { Component } from 'react';
import classes from './ChatBox.css';

class ChatBox extends Component {
  render() {
    return (
      <div className={classes.chatbox} >
      <input className={classes.text_area}/>
      </div>
    );
  }
}

export default ChatBox;
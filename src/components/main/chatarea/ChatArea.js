import React, { Component } from 'react';
import classes from './ChatArea.css';
import Message from './message/Message';

class ChatArea extends Component {

  state = {
    messages: []
  }

  render() {

    const messages = this.state.messages.map(message => {
      return <Message 
                id={message.uuid}
                sender={message.sender} 
                time={message.created_at} 
                message={message.message} 
                avatar={message.avatar} />
  })
    return (
      <div className={classes.chat_area} >
        <div className={classes.messages} >
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
        </div>
      </div>
    );
  }
}

export default ChatArea;
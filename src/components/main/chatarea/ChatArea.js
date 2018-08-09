import React, { Component } from 'react';
import classes from './ChatArea.css';
import Message from './message/Message';
import { connect } from 'react-redux';

class ChatArea extends Component {

  render() {
    const messages = this.props.messages.map(message => {
      console.log(message);
      return <Message 
                key={message.uuid}
                id={message.id}
                sender={message.sender} 
                time={message.created_at} 
                message={message.message} 
                avatar={message.avatar} />
  })
    return (
      <div className={classes.chat_area} >
        <div className={classes.messages} >
            {messages}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    messages: state.messages
  }
}

export default connect(mapStateToProps)(ChatArea);
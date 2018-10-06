import React, { Component } from 'react';
import classes from './ChatArea.css';
import Message from './message/Message';
import { connect } from 'react-redux';
import * as ReactDOM from 'react-dom';

class ChatArea extends Component {

  scrollToBottom = () => {
    const { messageList } = this.refs;
    const scrollHeight = messageList.scrollHeight;
    const height = messageList.clientHeight;
    const maxScrollTop = scrollHeight - height;
    ReactDOM.findDOMNode(messageList).scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }

  componentDidUpdate() {
      this.scrollToBottom();
  }

  render() {
    const messages = this.props.messages.map(message => {
      return <Message 
                key={message.id}
                id={message.id}
                sender={message.sender} 
                time={message.created_at} 
                message={message.message} 
                avatar={message.avatar} />
  })
    return (
      <div className={classes.chat_area} ref="messageList" >
        <div className={classes.messages}>
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
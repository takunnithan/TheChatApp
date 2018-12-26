import React, { Component } from 'react';
import classes from './ChatArea.css';
import Message from './message/Message';
import { connect } from 'react-redux';
import * as ReactDOM from 'react-dom';
import SocketInstance from '../../socket/Socket';


class ChatArea extends Component {

  constructor(props) {
    super(props);
  }


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
    var messages = null;
    if (this.props.messages){
      messages = Object.values(this.props.messages).map(message => {
        return <Message 
                  key={message.id}
                  id={message.id}
                  sender={message.sender} 
                  time={message.created_at} 
                  message={message.message} 
                  avatar={message.avatar}
                  unique_hash={this.props.unique_hash} />
    })
    }
    return (
      <div className={classes.chat_area} ref="messageList" >
        <div className={classes.messages}>
            {messages}
        </div>
      </div>
    );
  }
}

// TODO:
 
// There is something wrong with state to props mapping
// Component doesn't re render after message edit

const mapStateToProps = state => {
  var unique_hash =  state.selected_unique_hash;
  return {
    messages: state.messages[unique_hash],
    unique_hash:  unique_hash
  }
}

export default connect(mapStateToProps, null)(ChatArea);
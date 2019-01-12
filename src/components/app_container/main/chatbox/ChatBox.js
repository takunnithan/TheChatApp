import React, { Component } from 'react';
import classes from './ChatBox.css';
import { connect } from 'react-redux';
import SocketInstance from '../../socket/Socket';

class ChatBox extends Component {

  constructor(props) {
    super(props);
    // this.WaitForSocketConnection();
  }

  WaitForSocketConnection() {
    const component = this;
    setTimeout(
      function() {
        if (SocketInstance.getState() == 1) {
          console.log('Connection successful');
          return;
        }
        else {
          console.log('waiting for connection');
          component.WaitForSocketConnection();
        }
      },100);
  }

  SendMessages = (event) => {
    if (event.key === 'Enter') {
      console.log('Enter  key!!!');
      var message = event.target.value;
      event.target.value = '';
      if (message){
        var data = {
          'message': message,
          'command': 'create_message',
          'sender': localStorage.getItem('user_id'),
          'unique_hash': this.props.unique_hash
        };
        SocketInstance.sendMessage(data);
      }
    }
    else {
      console.log('Other keys!!!');
      data = {
        'command': 'typing_status',
        'user': localStorage.getItem('user_id'),
        'unique_hash': this.props.unique_hash
      }
      SocketInstance.sendMessage(data);
    }
  }

  render() {
    return (
      <div className={classes.chatbox} >
      <input className={classes.text_area} onKeyDown={this.SendMessages}/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  var unique_hash =  state.selected_unique_hash;
  return {
    unique_hash:  unique_hash
  }
}

export default connect(mapStateToProps, null)(ChatBox);
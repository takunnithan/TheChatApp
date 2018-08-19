import React, { Component } from 'react';
import classes from './ChatBox.css';
import { connect } from 'react-redux';

class ChatBox extends Component {

  render() {
    return (
      <div className={classes.chatbox} >
      <input className={classes.text_area} onKeyDown={this.props.getGroupMessages}/>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
      getGroupMessages: (event) => {
        if (event.key === 'Enter') {
          var message = event.target.value;
          event.target.value = '';
          if (message){
          dispatch({type: 'SEND_MESSAGE', message: message});
          }
        }
      }
  }
}

export default connect(null, mapDispatchToProps)(ChatBox);
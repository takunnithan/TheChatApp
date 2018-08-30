import React, { Component } from 'react';
import classes from './Message.css';

class Message extends Component {
  render() {
    return (
      <div className={classes.message_container} >
        <div className={classes.edit_container} ></div>
        <div className={classes.profile_pic_container}>
        <div className={classes.profile_pic} ><img src={this.props.avatar} alt=''/></div>
        </div>
        <div className={classes.message} >
          <div>
            <div className={classes.message_details}>{this.props.sender}</div>
            <div className={classes.message_time}>{this.props.time}</div>
          </div>
          <div className={classes.message_body}>
            {this.props.message}
          </div>
        </div>
      </div>
    );
  }
}

export default Message;
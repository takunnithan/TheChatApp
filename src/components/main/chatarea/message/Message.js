import React, { Component } from 'react';
import classes from './Message.css';
import Edit from './edit_component/Edit';

class Message extends Component {

  editClickHandler() {
    console.log('Edit Clicked!!!');
  }
  render() {
    return (
      <div className={classes.message_container} >
      <Edit />
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
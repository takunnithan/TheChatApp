import React, { Component } from 'react';
import classes from './Message.css';

class Message extends Component {
  render() {
    return (
      <div className={classes.message_container} >
        <div className={classes.profile_pic_container}>
        <div className={classes.profile_pic} ><img src='https://png.icons8.com/dusk/64/000000/user.png' /></div>
        </div>
        <div className={classes.message} >
          <div>
            <div className={classes.message_details}>john</div>
            <div className={classes.message_time}>10:38 PM</div>
          </div>
          <div className={classes.message_body}>
            Hello there how are you ?
          </div>
        </div>
      </div>
    );
  }
}

export default Message;
import React, { Component } from 'react';
import classes from './Message.css';
import Edit from './edit_component/Edit';

class Message extends Component {

  constructor() {
    super();
    
    this.state = {
      showEdit: false,
      showDelete: false
    };
    
    this.editClickHandler = this.editClickHandler.bind(this);
    this.cancelHandler = this.cancelHandler.bind(this);
    // this.closeMenu = this.closeMenu.bind(this);
  }

  editClickHandler() {
    this.setState({ showEdit: true });
  }

  cancelHandler() {
    this.setState({ showEdit: false });
  }


  render() {
    return (
      <div>
      {
        this.state.showEdit
        ? (
          <EditDialogBox 
            avatar={this.props.avatar} 
            message={this.props.message}
            cancelHandler={this.cancelHandler} />
        )
        :(
          <div className={classes.message_container} >
          <Edit editClickHandler={this.editClickHandler}/>
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
        )
      }
      </div>
    );
  }
}

export default Message;


class EditDialogBox extends Component {


  render() {
    return (
    <div className={classes.message_container}>
    <div>
      <div className={classes.profile_pic_container}>
        <div className={classes.profile_pic} ><img src={this.props.avatar} alt=''/></div>
      </div>
      <div className={classes.chatbox} >
        <input className={classes.text_area}
               defaultValue={this.props.message} 
               type="text"
               />
      </div>
    </div>
      <div className={classes.edit_button_container}>
        <button className={classes.cancel_button} onClick={this.props.cancelHandler}>Cancel</button>
        <button className={classes.save_button} >Save</button>
      </div>

    </div>
    );
  }
}
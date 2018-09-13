import React, { Component } from 'react';
import classes from './Message.css';
import Edit from './edit_component/Edit';
import axios from 'axios';
import Modal from '../../modal/Modal';
import DeleteDialog from './edit_component/delete_dialog/DeleteDialog';
import Backdrop from '../../backdrop/Backdrop';

class Message extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      deleted: false,
      showEdit: false,
      showDelete: false,
      message: props.message,
      message_id: props.id,
      update_message: props.message
    };
    
    this.editClickHandler = this.editClickHandler.bind(this);
    this.cancelHandler = this.cancelHandler.bind(this);
    this.saveHandler = this.saveHandler.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.closeDeleteDialog = this.closeDeleteDialog.bind(this);
    this.onDeleteButtonHandler = this.onDeleteButtonHandler.bind(this);
    this.onCancelButtonHandler = this.onCancelButtonHandler.bind(this);
  }


  onDeleteHandler(event) {
    event.preventDefault();
    this.setState({ showDelete: true }, () => {
      document.addEventListener('click', this.closeDeleteDialog);
    });
  }

  onDeleteButtonHandler() {
    var delete_url = 'http://localhost:8000/messages/' + this.state.message_id +'/';
    axios.delete(delete_url);
    this.setState({ deleted: true });
  }

  onCancelButtonHandler() {
    this.setState({ showDelete: false });
  }
  
  closeDeleteDialog(event) {
    if (this.delete_dialog != null) {
      if (!this.delete_dialog.contains(event.target)){
        this.setState({ showDelete: false }, () => {
          document.removeEventListener('click', this.closeDeleteDialog);
        });  
      }      
    }
  }

  editClickHandler() {
    this.setState({ showEdit: true });
  }

  cancelHandler() {
    this.setState({ showEdit: false });
  }

  saveHandler() {
    var payload =     {
        "created_at": "2018-09-08T20:10:12Z",
        "message": this.state.update_message
    }
    var patch_url = 'http://localhost:8000/messages/' + this.state.message_id +'/';

    // TODO: Get the response and if status is not 200 then - Failure message / Retry option
    axios.patch(patch_url, payload);
    this.setState({ message : this.state.update_message });
    this.setState({ showEdit: false });
  }

  onChangeHandler(e) {
    this.setState({ update_message : e.target.value });
  }


  render() {
    return (
      this.state.deleted
      ? (null)
      :(
      <div className={classes.container}>
        <Backdrop show={this.state.showDelete} click={this.closeDeleteDialog}/>
        {
          this.state.showDelete
          ? ( <div ref={(element) => {
                  this.delete_dialog = element;
                  }}>
                  <Modal>
                    <DeleteDialog 
                          onDeleteHandler={this.onDeleteButtonHandler}
                          onCancelHandler={this.onCancelButtonHandler}
                          message={ 
                                    <div className={classes.message_container} >  
                                      <div className={classes.profile_pic_container}>
                                        <div className={classes.profile_pic} ><img src={this.props.avatar} alt=''/></div>
                                      </div>
                                      <div className={classes.message} >
                                        <div>
                                          <div className={classes.message_details}>{this.props.sender}</div>
                                          <div className={classes.message_time}>{this.props.time}</div>
                                        </div>
                                        <div className={classes.message_body}>
                                            {this.state.message}
                                        </div>
                                      </div>
                                    </div> 
                          } />
                  </Modal>
              </div>
              )
          :(null)
        }
      {
        this.state.showEdit
        ? (
          <EditDialogBox 
            avatar={this.props.avatar} 
            message={this.state.message}
            cancelHandler={this.cancelHandler}
            saveHandler={this.saveHandler}
            onChangeHandler={this.onChangeHandler} />
        )
        :(
          <div className={classes.message_container} >
          <Edit 
              editClickHandler={this.editClickHandler}
              onDeleteHandler={this.onDeleteHandler} />
            <div className={classes.profile_pic_container}>
            <div className={classes.profile_pic} ><img src={this.props.avatar} alt=''/></div>
            </div>
            <div className={classes.message} >
              <div>
                <div className={classes.message_details}>{this.props.sender}</div>
                <div className={classes.message_time}>{this.props.time}</div>
              </div>
              <div className={classes.message_body}>
                {this.state.message}
              </div>
            </div>
          </div>
        )
      }
      </div>
      )
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
               onChange={this.props.onChangeHandler}
               />
      </div>
    </div>
      <div className={classes.edit_button_container}>
        <button className={classes.cancel_button} onClick={this.props.cancelHandler}>Cancel</button>
        <button className={classes.save_button} onClick={this.props.saveHandler}>Save</button>
      </div>

    </div>
    );
  }
}
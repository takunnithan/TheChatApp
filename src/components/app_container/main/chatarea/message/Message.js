import React, { Component } from 'react';
import classes from './Message.css';
import Edit from './edit_component/Edit';
import Modal from '../../modal/Modal';
import DeleteDialog from './edit_component/delete_dialog/DeleteDialog';
import Backdrop from '../../backdrop/Backdrop';
import { connect } from 'react-redux';
import {editMessage, deleteMessage} from '../../../../../store/action/action';


/*

NEED REFACTORING

1. move components to new file

2. Use ES6 and remove the `this` binding

4. Use simpler ways to replace if else , ternary ops

*/

class Message extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      showEdit: false,
      showDelete: false,
      message: props.message,
      message_id: props.id,
      update_message: props.message,
      unique_hash: props.unique_hash
    };
    
    this.editClickHandler = this.editClickHandler.bind(this);
    this.cancelHandler = this.cancelHandler.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.closeDeleteDialog = this.closeDeleteDialog.bind(this);
    this.onCancelButtonHandler = this.onCancelButtonHandler.bind(this);
  }


  onDeleteHandler(event) {
    event.preventDefault();
    this.setState({ showDelete: true }, () => {
      document.addEventListener('click', this.closeDeleteDialog);
    });
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

  onChangeHandler(e) {
    this.setState({ update_message : e.target.children[0].innerText });
  }


  render() {
    return (
      <div className={classes.container}>
        <Backdrop show={this.state.showDelete} click={this.closeDeleteDialog}/>
        {
          this.state.showDelete
          ? ( <div ref={(element) => {
                  this.delete_dialog = element;
                  }}>
                  <Modal>
                    <DeleteDialog 
                          onDeleteHandler={this.props.deleteMessage}
                          onCancelHandler={this.onCancelButtonHandler}
                          self={this}
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
            saveHandler={this.props.saveHandler}
            onChangeHandler={this.onChangeHandler}
            self={this} />
        )
        :(
          <div className={classes.message_container} >
          {
            this.props.sender === localStorage.getItem('username')
            ? ( 
            <Edit 
              editClickHandler={this.editClickHandler}
              onDeleteHandler={this.onDeleteHandler} />
            ): (null)

          }
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
  }
}

const mapDispatchToProps = dispatch => {
  return {
      saveHandler: (self) => {
          dispatch(editMessage(self));
          },
      deleteMessage: (self) => {
        dispatch(deleteMessage(self));
      }
  }
}

export default connect(null, mapDispatchToProps)(Message);


class EditDialogBox extends Component {

  render() {
    const css_classes = classes.chatbox + ' ' + classes.text_area
    return (
    <div className={classes.message_container}>
    <div className={classes.not_proud_of_it}>
      <div className={classes.this_is_bad}>
      <div className={classes.profile_pic_container}>
        <div className={classes.profile_pic} ><img src={this.props.avatar} alt=''/></div>
      </div>
      <div 
          className={ css_classes } 
          contentEditable="true" 
          onInput={this.props.onChangeHandler} 
          suppressContentEditableWarning="true">
        <p>
          {this.props.message}
        </p>
      </div>
    </div>
    <div className={classes.edit_button_container}>
        <button className={classes.cancel_button} onClick={this.props.cancelHandler}>Cancel</button>
        <button className={classes.save_button} onClick={()=>this.props.saveHandler(this.props.self)}>Save</button>
      </div>
    </div>
    </div>
    );
  }
}

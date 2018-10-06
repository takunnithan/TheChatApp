import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import classes from '../Message.css';
import css_classes from './Edit.css';

class Edit extends Component {
  constructor() {
    super();
    
    this.state = {
      showMenu: false,
    };
    
    this.showMenuHander = this.showMenuHander.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.onDeleteClickHandler = this.onDeleteClickHandler.bind(this);
  }
  
  showMenuHander(event) {
    event.preventDefault();
    
    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  }
  
  closeMenu(event) {
    
    if (this.dropdownMenu != null) {
      if (!this.dropdownMenu.contains(event.target)){
        this.setState({ showMenu: false }, () => {
          document.removeEventListener('click', this.closeMenu);
        });  
      }      
    }
  }

  onDeleteClickHandler(event){
    this.setState({ showMenu: false });
    this.props.onDeleteHandler(event);
  }

  render() {
    return (
      <div>
        <div className={classes.edit_container} onClick={this.showMenuHander} >
            <div>
                <FontAwesomeIcon icon={faEllipsisH} color='#989898' />
            </div>
        </div>
        {
          this.state.showMenu
            ? (
              <div
                className={css_classes.menu}
                ref={(element) => {
                  this.dropdownMenu = element;
                }}
              >
                <div className={css_classes.options_edit} onClick={this.props.editClickHandler}><span> Edit </span></div>
                <div className={css_classes.options_delete} onClick={this.onDeleteClickHandler}><span> Delete </span></div>
              </div>
            )
            : (
              null
            )
        }
      </div>
    );
  }
}

export default Edit;
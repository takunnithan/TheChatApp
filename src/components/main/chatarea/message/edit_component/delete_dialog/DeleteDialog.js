import React from 'react';

import classes from './DeleteDialog.css';


const deletediaglog = (props) => (
    <div className={classes.dialog_container}>
        <h1>Delete Message</h1>
        Are you sure you want to delete this message?
        <div className={classes.message}>{props.message}</div>
        <div className={classes.button_container}>
        <button className={classes.cancel_button} onClick={props.onCancelHandler}>Cancel</button>
        <button className={classes.delete_button} onClick={props.onDeleteHandler}>Delete</button>
      </div>
    </div>

);

export default deletediaglog;
import React, { Component } from 'react';
import classes from './Top.css';

class Top extends Component {
  render() {
    return (
      <div className={classes.top} >
        <div className={classes.channel_details}>
          <div className={classes.channel_title}>#general</div>
          <div className={classes.channel_description}>********</div>
        </div>
        <div className={classes.settings} >
          <div className={classes.settings_list}>***</div>
        </div>
      </div>
    );
  }
}

export default Top;
import React, { Component } from 'react';
import classes from './Top.css';
import { connect } from 'react-redux';

class Top extends Component {
  render() {
    return (
      <div className={classes.top} >
        <div className={classes.channel_details}>
          <div className={classes.channel_title}>{this.props.chatName}</div>
          <div className={classes.channel_description}>********</div>
        </div>
        <div className={classes.settings} >
          <div className={classes.settings_list}>***</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    chatName: state.selected_chat_name ? state.selected_chat_name : null
  }
}

export default connect(mapStateToProps, null)(Top);

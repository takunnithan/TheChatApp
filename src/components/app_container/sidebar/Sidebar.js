import React, { Component } from 'react';
import classes from './Sidebar.css';
import Channels from './channels/Channels';
import DirectChat from './direct_chat/DirectChat';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import {showChatSearch} from '../../../store/action/action';

class Sidebar extends Component {

  render() {
    return (
      <div className={classes.sidebar}>
        <div className={classes.app_title} >
          TheChatApp
        </div>
        <div className={classes.user}>
          john
        </div>
        <div className={classes.channel}>
          Channels
        </div> 
        <Channels />
        <div className={classes.direct_container} onClick={this.props.showDirectChatSearch}>
          <div className={classes.direct}>Direct</div>
          <div className={classes.plus_icon}>
              <FontAwesomeIcon icon={faPlus} color='white' />
          </div>
        </div>
        <DirectChat />
        </div>
    );
  }
}


const mapDispatchToProps = dispatch => {
  return {
      showDirectChatSearch: (self) => {
          dispatch(showChatSearch('direct'));
          }
  }
}

export default connect(null, mapDispatchToProps)(Sidebar);
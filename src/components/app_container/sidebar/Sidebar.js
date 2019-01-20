import React, { Component } from 'react';
import classes from './Sidebar.css';
import Channels from './channels/Channels';
import DirectChat from './direct_chat/DirectChat';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import {showChatSearch} from '../../../store/action/action';
import { withRouter } from 'react-router-dom'


class Sidebar extends Component {

  render() {
    const Logout = withRouter(({ history }) => (
      <div
        className={classes.logout}
        onClick={() => { 
          localStorage.clear();
          history.push('/'); 
        }}
      >logout</div>
    ))

    return (
      <div className={classes.sidebar}>
        <div className={classes.app_title} >TheChatApp</div>
        <div>
          <div className={classes.user}>{localStorage.getItem('username')}</div>
          <Logout />
        </div>

        <div className={classes.list_container} onClick={this.props.showGroupSearch}>
        <div className={classes.channel}>Channels</div> 
          <div className={classes.plus_icon}>
              <FontAwesomeIcon icon={faPlus} color='white' />
          </div>
          </div>
        <Channels />

        <div className={classes.list_container} onClick={this.props.showDirectChatSearch}>
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
          },
          showGroupSearch: (self) => {
        dispatch(showChatSearch('group'));
        }
  }
}

export default connect(null, mapDispatchToProps)(Sidebar);
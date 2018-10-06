import React, { Component } from 'react';
import classes from './Sidebar.css';
import Channels from './channels/Channels';
import DirectChat from './direct_chat/DirectChat';

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
        <div className={classes.direct}>
          Direct
        </div>
        <DirectChat />
      </div>
    );
  }
}

export default Sidebar;
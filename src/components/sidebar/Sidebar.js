import React, { Component } from 'react';
import classes from './Sidebar.css';
import Channels from './channels/Channels';

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
        <div className={classes.direct_list}>
          <ul>
              <li>person-1</li>
              <li>person-2</li>
            </ul>
        </div>
      </div>
    );
  }
}

export default Sidebar;
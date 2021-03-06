import React, { Component } from 'react';
import classes from './Channels.css';
import Channel from './channel/Channel';
import { connect } from 'react-redux';
import {getMessages, getChatList} from '../../../../store/action/action';

/*

CODE DUPLICATION : Channels -- Direct 

    - Use common components / methods . separate them out

- move APIs to redux


*/

class Channels extends Component {

    state = {
        li_css_class: 'channel_list_li'
    }

    componentWillMount(){
        this.props.getChannels();
    }


  render() {

    const channels = []
    for (const key of Object.keys(this.props.channels)) {
        const channel = this.props.channels[key];
        channels.push(<li className={this.state.li_css_class} key={channel.id} onClick={()=>this.props.getGroupMessages(channel.unique_hash)}>
                        <Channel 
                            name={channel.group_name} 
                            unique_hash={channel.unique_hash}
                            avatar={channel.avatar}
                            settings={channel.settings}
                            created_at={channel.created_at}/>
                    </li>);
    }
    return (
        <div className={classes.channel_list}>
          <ul>
            {channels}
          </ul>
        </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
    return {
        getGroupMessages: (unique_hash) => {
            dispatch(getMessages(unique_hash));
        },
        getChannels: () => {
            dispatch(getChatList('channels'));
        }
    }
}

const mapStateToProps = state => {
    return {
      channels: state.channels ? state.channels : []
    }
  }


export default connect(mapStateToProps, mapDispatchToProps)(Channels);
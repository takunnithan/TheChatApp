import React, { Component } from 'react';
import classes from './Channels.css';
import axios from 'axios';
import Channel from './channel/Channel';
import { connect } from 'react-redux';

class Channels extends Component {

    state = {
        channels: []
    }

  componentDidMount(){
        axios.get('http://localhost:8000/group/?user_id=111&format=json').then(response => {
            this.setState({channels: response.data})
        });
    }

  render() {
      const channels = this.state.channels.map(channel => {
          return <li key={channel.id} onClick={()=>this.props.getGroupMessages(channel.unique_hash)}>
                    <Channel 
                        name={channel.group_name} 
                        unique_hash={channel.unique_hash}
                        avatar={channel.avatar}
                        settings={channel.settings}
                        created_at={channel.created_at}/>
                </li>
      })
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
            const chat_url = 'http://localhost:8000/chat/' + unique_hash + '/?format=json'
            axios.get(chat_url).then(response => {
            dispatch({type: 'NEW_MESSAGE', payload: response.data, unique_hash: unique_hash})
            });
        }
    }
}

export default connect(null, mapDispatchToProps)(Channels);
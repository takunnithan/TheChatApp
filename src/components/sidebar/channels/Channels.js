import React, { Component } from 'react';
import classes from './Channels.css';
import axios from 'axios';
import Channel from './channel/Channel';

class Channels extends Component {

    state = {
        channels: []
    }

  componentDidMount(){
        axios.get('http://localhost:8000/group/?user_id=111&format=json').then(response => {
            this.setState({channels: response.data})
        });
    }

    channelClickHandler(unique_hash){
        const chat_url = 'http://localhost:8000/chat/' + unique_hash + '/?format=json'
        axios.get(chat_url).then(response => {
            console.log(response);
        });
    }
  render() {
      const channels = this.state.channels.map(channel => {
          return <li key={channel.id} onClick={()=>this.channelClickHandler(channel.unique_hash)}>
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

export default Channels;
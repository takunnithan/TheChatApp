import React, { Component } from 'react';
import classes from './Channel.css';
import axios from 'axios';

class Channel extends Component {

    state = {
        channels: []
    }

  componentDidMount(){
        axios.get('http://localhost:8000/group/?user_id=111&format=json').
        then(response => {
            this.setState({channels: response.data})
            console.log(response);
        });
    }
  render() {
      const channels = this.state.channels.map(channel => {
          return <li key={channel.id}># {channel.group_name}</li>
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

export default Channel;
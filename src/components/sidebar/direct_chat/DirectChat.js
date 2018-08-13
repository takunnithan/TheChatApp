import React, { Component } from 'react';
import classes from './DirectChat.css';
import axios from 'axios';
import Chat from './chat/Chat';
import { connect } from 'react-redux';

class DirectChat extends Component {

    state = {
        channels: []
    }

  componentDidMount(){
        axios.get('http://localhost:8000/group/?user_id=111&format=json').then(response => {
            this.setState({channels: response.data})
        });
    }

  render() {
      const direct_chats = this.state.channels.map(channel => {
          return <li key={channel.id} onClick={()=>this.props.getGroupMessages(channel.unique_hash)}>
                    <Chat 
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
            {direct_chats}
          </ul>
        </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
    return {
        getGroupMessages: (message) => {
            const chat_url = 'http://localhost:8000/chat/' + message + '/?format=json'
            axios.get(chat_url).then(response => {
            dispatch({type: 'GROUP_MESSAGE', payload: response.data})
            });
        }
    }
}

export default connect(null, mapDispatchToProps)(DirectChat);
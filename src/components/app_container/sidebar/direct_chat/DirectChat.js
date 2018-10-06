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
    axios(
        {
            method: 'get',
            url: 'http://localhost:8000/direct/?user_id='+localStorage.getItem('user_id')+'&format=json',
            headers: {
                'auth-token':localStorage.getItem('auth_token'),
                'user-id': localStorage.getItem('user_id')
            }
        }
    ).then(response => {
        this.setState({channels: response.data})
    });
    }

  render() {
      const direct_chats = this.state.channels.map(channel => {
          return <li key={channel.unique_hash} onClick={()=>this.props.getGroupMessages(channel.unique_hash)}>
                    <Chat 
                        key={channel.unique_hash}
                        name={channel.username} 
                        unique_hash={channel.unique_hash}
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
        getGroupMessages: (unique_hash) => {
            axios(
                {
                    method: 'get',
                    url: 'http://localhost:8000/chat/' + unique_hash + '/?format=json',
                    headers: {
                        'auth-token':localStorage.getItem('auth_token'),
                        'user-id': localStorage.getItem('user_id')
                    }
                }).then(response => {
            dispatch({type: 'NEW_MESSAGE', payload: response.data, unique_hash: unique_hash})
            });
        }
    }
}

export default connect(null, mapDispatchToProps)(DirectChat);
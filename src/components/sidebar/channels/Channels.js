import React, { Component } from 'react';
import classes from './Channels.css';
import axios from 'axios';
import Channel from './channel/Channel';
import { connect } from 'react-redux';

class Channels extends Component {

    state = {
        channels: [],
        li_css_class: 'channel_list_li'
    }

  componentDidMount(){
        axios(
            {
                method: 'get',
                url: 'http://localhost:8000/group/?user_id='+localStorage.getItem('user_id')+'&format=json',
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
      const channels = this.state.channels.map(channel => {
          return <li className={this.state.li_css_class} key={channel.id} onClick={()=>this.props.getGroupMessages(channel.unique_hash)}>
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

export default connect(null, mapDispatchToProps)(Channels);
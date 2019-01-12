import React, { Component } from 'react';
import classes from './DirectChat.css';
import Chat from './chat/Chat';
import { connect } from 'react-redux';
import {getMessages, getChatList} from '../../../../store/action/action';
   
class DirectChat extends Component {

    componentWillMount(){
        this.props.getDirectChatList();
    }

  render() {
      const direct_chats = this.props.direct_chats.map(direct => {
          return <li key={direct.unique_hash} onClick={()=>this.props.getGroupMessages(direct.unique_hash)}>
                    <Chat 
                        key={direct.unique_hash}
                        name={direct.username} 
                        unique_hash={direct.unique_hash}
                        created_at={direct.created_at}/>
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
            dispatch(getMessages(unique_hash));
        },
        getDirectChatList: () => {
            dispatch(getChatList('direct'));
        }
    }
}

const mapStateToProps = state => {
    return {
      direct_chats: state.direct_chats ? state.direct_chats : []
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(DirectChat);
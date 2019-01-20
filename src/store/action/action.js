import axios from 'axios';


/*

Helper method for axios -> remove duplicates

Use Constants for URLs, Action Types

Not sure if passing `this` around is a good idea

this = self here.

*/

export const return_message = (newMessages) => {
    return {
        type: 'SEND_MESSAGE',
        data: {messages:newMessages}
    };
}

export const send_message = (message) => {
    return (dispatch, getState) => {
        var user_id = localStorage.getItem('user_id')
        var state = getState();
        var payload = {
            sender: user_id,
            message: message,
            unique_hash: state.selected_unique_hash
        }
        axios(
            {
                method: 'post',
                url: 'http://localhost:8000/messages/',
                headers: {
                    'auth-token':localStorage.getItem('auth_token'),
                    'user-id': user_id
                },
                data: payload
            }).then(response => {
                var data = response.data
                console.log(data);
                var messageId = data.id
                var newMessages = JSON.parse(JSON.stringify(getState().messages));
                newMessages[payload.unique_hash][messageId] = data
                dispatch(return_message(newMessages));
        });
    }
}

export const handleResponse = (response, self) => {
    var res_data = response.data;
    if (res_data.login_success === true) {
    localStorage.setItem('is_logged_in', true);
    localStorage.setItem('auth_token', res_data.token);
    localStorage.setItem('user_id', res_data.user_id);
    self.setState({error_message:null, username: null, password: null});
    self.props.history.push({pathname: '/chat'});

    return {
        type: 'LOGIN',
        data: {
            logged_in_user: res_data.username,
            avatar: res_data.avatar,
            user_unique_hash: res_data.unique_hash
        }
    };
    } else {
    self.setState({error_message: res_data.reason, password: null});
    return {type: null}
    }
  }


export const loginAction = (self) => {
    return (dispatch) => {
        var login_url = 'http://localhost:8000/login/';
        var payload = {
            username: self.state.username,
            password: self.state.password
        }
        axios({
          method: 'post',
          url:login_url,
          data:payload
        }).then(response => {
            dispatch(handleResponse(response, self));
      });
    }
}



export const getMessages = (unique_hash) => {
    return (dispatch, getState) => {
        var data = {}
        var res_obj = JSON.parse(JSON.stringify(getState().messages));
        if (res_obj[unique_hash]){  // Check if messages exist for the hash
            data = {
                selected_unique_hash: unique_hash
            }
            return dispatch({type: 'SWITCH_CHANNEL', data});
        }
        data['selected_unique_hash'] = unique_hash;
        axios(
            {
                method: 'get',
                url: 'http://localhost:8000/chat/' + unique_hash + '/?format=json',
                headers: {
                    'auth-token':localStorage.getItem('auth_token'),
                    'user-id': localStorage.getItem('user_id')
                }
            }).then(response => {
                var messages = {}
                response.data.map(message => {
                    messages[message.id] = message
                })
                res_obj[unique_hash] = messages;
                data['messages'] = res_obj;
                dispatch({type: 'GET_MESSAGES', data:data});
        });
    }
}

/*

TODOs:
------
Move the dispatch part to the response of API call.

Helps to handle error during API call.

Use axios promises

*/

export const editMessage = (self)=> {
    return (dispatch, getState) => {
    var payload =     {
        "created_at": "2018-09-08T20:10:12Z",
        "message": self.state.update_message
    }
    var patch_url = 'http://localhost:8000/messages/' + self.state.message_id +'/';

    axios({
      method: 'patch',
      url: patch_url,
      headers: {
        'auth-token':localStorage.getItem('auth_token'),
        'user-id': localStorage.getItem('user_id')
    },
    data: payload
    });
    self.setState({ showEdit: false });

    // TODO: Its a temporary fix & component should ideally render
    // after redux store update . 
    // May be its not rendering for nested value changes
    //--------------------------------------------------------
    self.setState({message: self.state.update_message});
    // ------------------------------------------------------

    var newMessages = JSON.parse(JSON.stringify(getState().messages));
    var messageToEdit = newMessages[self.state.unique_hash][self.state.message_id]
    messageToEdit['message'] = self.state.update_message
    newMessages[self.state.unique_hash][self.state.message_id] = messageToEdit
    var data = {messages: newMessages}
    dispatch({type:'EDIT_MESSAGE', data:data});
  }
}

export const deleteMessage = (self)=> {
    return (dispatch, getState) => {
        var delete_url = 'http://localhost:8000/messages/' + self.state.message_id +'/';
        axios({
          method: 'delete',
          url: delete_url,
          headers: {
            'auth-token':localStorage.getItem('auth_token'),
            'user-id': localStorage.getItem('user_id')
        },
        }
        );
        var newMessages = JSON.parse(JSON.stringify(getState().messages));
        delete newMessages[self.state.unique_hash][self.state.message_id]
        dispatch({type:'DELETE_MESSAGE', data:{messages:newMessages}});
      }
    }


export const newMessageFromSocket = (response) => {
    return (dispatch, getState) => {
        delete response.command;
        var unique_hash = response.unique_hash
        var messageId = response.id
        var newMessages = JSON.parse(JSON.stringify(getState().messages));
        if (newMessages[unique_hash] == null){
            console.log('AGAIN');
            console.log(newMessages[unique_hash]);
            newMessages[unique_hash] = {}
        }
        newMessages[unique_hash][messageId] = response
        dispatch(return_message(newMessages));
    }
}

export const getChatList = (type) => {
    return (dispatch, getState) => {
        var url_type = type === 'direct' ? 'direct' : 'group'
        axios(
            {
                method: 'get',
                url: 'http://localhost:8000/' + url_type + '/?user_id='+localStorage.getItem('user_id')+'&format=json',
                headers: {
                    'auth-token':localStorage.getItem('auth_token'),
                    'user-id': localStorage.getItem('user_id')
                }
            }
        ).then(response => {
            var channels = {}
            var data = {}
            var list_type = type === 'direct' ? 'direct_chats' : 'channels'
            var channel_list = response.data;
            channel_list.map(channel => {
                channels[channel.unique_hash] = channel;
            })
            data[list_type] = channels;
            console.log(channels);
            dispatch({type: 'ADD_CHANNELS', data:data});
        });

    }
}


export const showChatSearch = (type) => {
    return (dispatch) =>{
        var data = {}
        var list_type = type === 'direct' ? 'show_direct_chat_search' : 'show_channels_search'
        data[list_type] = true
        dispatch({type: 'SHOW_CHAT_SEARCH', data:data});
    }
}

export const disableChatSearch = (type) => {
    return (dispatch) => {
        var data = {}
        var data_type = type === 'direct' ? 'show_direct_chat_search' : 'show_channels_search'
        data[data_type] = false
        dispatch({type: 'DISABLE_CHAT_SEARCH', data:data});
    }
}


export const createDirectChat = (recipient_id) => {
    return (dispatch, getState) => {
        var payload = {
            user_id : localStorage.getItem('user_id'),
            recipient : recipient_id
          }
        axios(
            {
                method: 'post',
                url: 'http://localhost:8000/direct/',
                headers: {
                    'auth-token':localStorage.getItem('auth_token'),
                    'user-id': localStorage.getItem('user_id')
                },
                data: payload
            }
        ).then(response => {
            var data = {}
            var direct_chats = JSON.parse(JSON.stringify(getState().direct_chats));
            var unique_hash = response.data.unique_hash;
            var channel = {
                selected_unique_hash: unique_hash
            }
            if (direct_chats[unique_hash]){
                dispatch({type: 'SWITCH_CHANNEL', data:channel});
            }
            direct_chats[unique_hash] = response.data;
            data['direct_chats'] = direct_chats
            dispatch(disableChatSearch('direct'));
            dispatch({type: 'ADD_CHANNELS', data:data});
            dispatch(getMessages(unique_hash));
            dispatch({type: 'SWITCH_CHANNEL', data:channel});
        });
    }
}
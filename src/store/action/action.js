import axios from 'axios';

export const return_message = (response) => {
    return {
        type: 'SEND_MESSAGE',
        response: response
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
            dispatch(return_message(response.data));
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
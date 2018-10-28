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

export const handleResponse = (response, history) => {
    var res_data = response.data;
    if (res_data.login_success === true) {
    localStorage.setItem('is_logged_in', true);
    localStorage.setItem('auth_token', res_data.token);
    localStorage.setItem('user_id', res_data.user_id);
    this.setState({error_message:null, username: null, password: null});
    history.push({pathname: '/chat'});
    } else {
    this.setState({error_message: res_data.reason, password: null});
    }

    return {
        type: 'LOGIN',
        response: response
    };
  }


export const loginAction = (username, password, history) => {
    return (dispatch, getState) => {
        var login_url = 'http://localhost:8000/login/';
        var payload = {
            username: this.state.username,
            password: this.state.password,
        }
        axios({
          method: 'post',
          url:login_url,
          data:payload
        }).then(response => {
            dispatch(handleResponse(response, history));
      });
    }
}
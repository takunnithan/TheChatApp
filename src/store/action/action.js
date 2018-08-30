import axios from 'axios';

export const return_message = (response) => {
    return {
        type: 'SEND_MESSAGE',
        response: response
    };
}

export const send_message = (message) => {
    return (dispatch, getState) => {
        var state = getState();
        var payload = {
            sender: 111,
            message: message,
            unique_hash: state.selected_unique_hash
        }
        axios.post('http://localhost:8000/messages/', payload).then(response => {
            dispatch(return_message(response.data));
        });
    }
}
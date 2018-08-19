import axios from 'axios';
const intialState = {
    logged_in_user: 'john',
    avatar: 'https://png.icons8.com/dusk/64/000000/user.png',
    messages : [
        {
            uuid: '1',
            sender: 'john',
            created_at: '10.30 AM',
            message: 'This is a message from the REDUCER',
            avatar: 'https://png.icons8.com/dusk/64/000000/user.png',
            id:0
        }
],
selected_unique_hash: 'JKJLJJKL'
}

const reducer = (state=intialState, action) => {
    if (action.type === 'NEW_MESSAGE') {
        return {
            ...state,
            messages: action.payload,
            selected_unique_hash: action.unique_hash
        }
    }
    else if (action.type === 'SEND_MESSAGE') {
        var payload = {
            sender: 111,
            message: action.message,
            unique_hash: state.selected_unique_hash
        }
        console.log(state);
        console.log('before API call');
        axios.post('http://localhost:8000/messages/', payload).then(response => {
            console.log('after API call !!!');
            console.log(state);
            return {
                ...state,
                messages: state.messages.push(
                    {
                        ...response.data,
                        sender: state.logged_in_user,
                        avatar: state.avatar
                    })
            }
        });

    }
    return state;
};
export default reducer;

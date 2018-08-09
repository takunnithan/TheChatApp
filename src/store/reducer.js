import axios from 'axios';

const intialState = {
    messages : [
        {
            uuid: '1',
            sender: 'john',
            created_at: '10.30 AM',
            message: 'This is a message from the REDUCER',
            avatar: 'https://png.icons8.com/dusk/64/000000/user.png'
        }
]
}

const reducer = (state=intialState, action) => {
    if (action.type === 'GROUP_MESSAGE') {
        const chat_url = 'http://localhost:8000/chat/' + 'NT4F59' + '/?format=json'
        var messages = []
        axios.get(chat_url).then(response => {
        messages = response.data
        console.log(messages[0])
        });
        return {
            messages: messages
        }
    }
    return state;
};
export default reducer;

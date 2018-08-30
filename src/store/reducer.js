
const intialState = {
    logged_in_user: 'john',
    avatar: 'http://www.gstatic.com/webp/gallery/1.webp',
    messages : [
        {
            uuid: '1',
            sender: 'john',
            created_at: '10.30 AM',
            message: 'This is a message from the REDUCER',
            avatar: 'http://www.gstatic.com/webp/gallery/1.webp',
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
        var newMessages = state.messages.concat(
            {
                ...action.response,
                sender: state.logged_in_user,
                avatar: state.avatar
            });
        return {
            ...state,
            messages: newMessages
        };
    }
    return state;
};
export default reducer;

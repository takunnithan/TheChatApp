
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
    else if (action.type === 'LOGIN') {
        
        return {
            ...state,
            logged_in_user: action.res_data.username,
            avatar: action.res_data.avatar,
            user_unique_hash: action.res_data.unique_hash,
        };
    }
    return state;
};
export default reducer;


// Use a switch here instead of if - else

// Create a helper function for redux store update


// Need the following helper function
//  1. Deep copying redux store
//  2. Updating messages for individual channel
//  3. Updating/Adding whole message for a channel
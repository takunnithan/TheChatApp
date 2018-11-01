
const initialState = {}

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case 'NEW_MESSAGE':
            createState(state, action.data);
            return {
                ...state,
                messages: action.payload,
                selected_unique_hash: action.unique_hash
                }
        case 'SEND_MESSAGE':
            createState(state, action.data);
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
        case 'LOGIN':
            createState(state, action.data);
            if (action.response.login_success === true) {
                return {
                    ...state,
                    logged_in_user: action.response.username,
                    avatar: action.response.avatar,
                    user_unique_hash: action.response.unique_hash,
                };
            }
        default:
            return state;
    }
    
};
export default reducer;


const createState = (state, actionData) => {
    const newState = cloneState(state);
    return {
        ...newState,
        ...actionData
        }
}

const cloneState = (state) =>{
    var copy = null;
    return copy;
}


// Create a helper function for redux store update


// Need the following helper function
//  1. Deep copying redux store
//  2. Updating messages for individual channel
//  3. Updating/Adding whole message for a channel



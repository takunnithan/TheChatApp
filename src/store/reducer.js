// IMP : Always deep clone the state 
// Reducer need to update the state immutably

// TODO: Constants for Action Type 
// Create a separate file
// ===================================================================


// TODOs:

// Message Edit doesn't show up right away 
//     - Because store doesn't get updated.

// Fix - make the messages a list of dicts

// Checkout Redux-store-structure file
// This will work for `delete` too
// Eventually `edit`, `delete` will be moved from REST to WS.



const initialState = {messages:{}}

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case 'GET_MESSAGES':
            return createState(state, action.data);

        // case 'SEND_MESSAGE':
        //     var oldMessages = state.messages[state.selected_unique_hash]
        //     if(!oldMessages){
        //         oldMessages = []
        //     }
        //     var newMessages = oldMessages.concat(
        //         {
        //             ...action.response,
        //             sender: state.logged_in_user,
        //             avatar: state.avatar
        //         });
        //         var newState = createState(state, {});
        //         newState['messages'][state.selected_unique_hash] = newMessages
        //         return newState;
        case 'LOGIN':
            return createState(state, action.data);
        
        case 'SWITCH_CHANNEL':
            return createState(state, action.data);

        case 'EDIT_MESSAGE':
            return createState(state, action.data);
            
        default:
            return state;
    }
    
};
export default reducer;


const createState = (state, actionData) => {
    const newState = JSON.parse(JSON.stringify(state));
    return {
        ...newState,
        ...actionData
        }
}

//  2. Updating messages for individual channel -- Websocket


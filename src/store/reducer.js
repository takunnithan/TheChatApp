// IMP : Always deep clone the state 
// Reducer need to update the state immutably

// TODO: Constants for Action Type 
// Create a separate file
// ===================================================================


// TODOs:

// Message Edit doesn't show up right away 
//     - Because store doesn't get updated.


/*

Now this looks oversimplified .

Reducer should do something 

    or -- Remove all the action types and keep only ONE.
        eg: UPDATE_STATE

*/

const initialState = {messages:{}}

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case 'GET_MESSAGES':
            return createState(state, action.data);

        case 'SEND_MESSAGE':
            return createState(state, action.data);

        case 'LOGIN':
            return createState(state, action.data);

        case 'SWITCH_CHANNEL':
            return createState(state, action.data);

        case 'EDIT_MESSAGE':
            return createState(state, action.data);

        case 'DELETE_MESSAGE':
            return createState(state, action.data);

        case 'ADD_CHANNELS':
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


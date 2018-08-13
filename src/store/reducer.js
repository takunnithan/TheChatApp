
const intialState = {
    messages : [
        {
            uuid: '1',
            sender: 'john',
            created_at: '10.30 AM',
            message: 'This is a message from the REDUCER',
            avatar: 'https://png.icons8.com/dusk/64/000000/user.png',
            id:0
        }
]
}

const reducer = (state=intialState, action) => {
    if (action.type === 'GROUP_MESSAGE') {
        return {
            ...state,
            messages: action.payload
        }
    }
    return state;
};
export default reducer;

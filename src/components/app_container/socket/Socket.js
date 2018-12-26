import {newMessageFromSocket} from '../../../store/action/action';
class SocketCon {
    static instance = null;

    static getInstance() {
        if (!SocketCon.instance) {
            SocketCon.instance = new SocketCon();
        }
        return SocketCon.instance;
    }

    callbacks = {}

    constructor() {
        this.socketRef = null;
    }



    connect(unique_hash) {
        var user_id = localStorage.getItem('user_id');
        const url = 'ws://127.0.0.1:8000/ws/chat/' + user_id +  '/' + unique_hash + '/';
        this.socketRef = new WebSocket(url);
        this.socketRef.onopen = () => {
            console.log('Socket connection successful!');
        }
        this.socketRef.onerror = e => {
            console.log('Error during socket connection', e);
        }
        this.socketRef.onclose = () => {
            console.log('Socket connection closed');
        }
        this.socketRef.onmessage = this.onNewMessage.bind(this);
    }

    onNewMessage(event) {
        const parsedData = JSON.parse(event.data);
        const command = parsedData.message.command;
        if (command === 'new_message') {
            this.callbacks[command](parsedData.message);
        }
        else if (command === 'typing') {
            console.log(parsedData.message.user + ' is typing');
        }
    }

    addCallbacks(new_message){
        this.callbacks['new_message'] = new_message
    }

    sendMessage(data) {
        try {
            this.socketRef.send(JSON.stringify(data));
        }
        catch (e) {
            console.log(e.message);
        }
    }

    getState() {
        return this.socketRef.readyState;
    }


}

const SocketInstance = SocketCon.getInstance();

export default SocketInstance;
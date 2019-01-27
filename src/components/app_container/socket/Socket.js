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
        // const url = 'ws://127.0.0.1:8000/ws/chat/' + user_id +  '/' + unique_hash + '/';
        const url = 'wss://takunnithan.com/ws/chat/' + user_id +  '/';
        this.socketRef = new WebSocket(url);
        this.socketRef.onopen = () => {
        }
        this.socketRef.onerror = e => {
        }
        this.socketRef.onclose = () => {
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
            // TODO: Typing status
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
        }
    }

    getState() {
        return this.socketRef.readyState;
    }


}

const SocketInstance = SocketCon.getInstance();

export default SocketInstance;
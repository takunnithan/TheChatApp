import React, { Component } from 'react';

class Chat extends Component {
  render() {
    return (
        <div>
            # {this.props.name}
        </div>
    );
}
}

export default Chat;
import React, { Component } from 'react';

class Channel extends Component {
  render() {
    return (
        <div>
            # {this.props.name}
        </div>
    );
}
}

export default Channel;
import React, { Component } from 'react';
import classes from './Main.css';
import Top from './top/Top';
import ChatBox from './chatbox/ChatBox';
import ChatArea from './chatarea/ChatArea';
import SocketInstance from '../socket/Socket';
import { connect } from 'react-redux';
import {newMessageFromSocket} from '../../../store/action/action';

class Main extends Component {

  componentDidMount(){
    SocketInstance.connect('config');
    SocketInstance.addCallbacks(this.props.onNewMessage);
  }

  render() {
    return (
      <div className={classes.main} >
        <Top />
        <ChatArea sock={this.sock}/>
        <div className={classes.chatbox} ><ChatBox /></div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
      onNewMessage: (response) => {
          dispatch(newMessageFromSocket(response));
          }
  }
}

export default connect(null, mapDispatchToProps)(Main);
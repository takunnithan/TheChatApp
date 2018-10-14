import React, { Component } from 'react';
import Sidebar from './sidebar/Sidebar';
import Main from './main/Main';

import classes from './AppContainer.css';

class AppContainer extends Component {

    componentWillMount() {
        if (!localStorage.getItem('is_logged_in')){
            this.props.history.push({pathname: '/'});
        }
      }
    render() {
        return (
            <div className={classes.app} >
                <div className={classes.sidebar} ><Sidebar/></div>
                <div className={classes.main} ><Main /></div>
            </div>
        );
    }
}

export default AppContainer;
import React, { Component } from 'react';
import Sidebar from './sidebar/Sidebar';
import Main from './main/Main';

import classes from './AppContainer.css';

class AppContainer extends Component {
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
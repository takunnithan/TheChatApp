import React, { Component }  from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import classes from './SearchResult.css'


class SearchResult extends Component{
    render() {
        var tick = null;
        if (this.props.selected_user === this.props.user_id){
            tick = <FontAwesomeIcon icon={faCheck} color='#00823F' />
        }
        return (
            <div 
                className={classes.search_result}
                onClick={this.props.selectHandler}
                user_id={this.props.user_id}>
                <div className={classes.user_name}>{this.props.user_name}</div>
                <div className={classes.check}>{tick}</div>
            </div>
        )
    }
}

export default SearchResult;
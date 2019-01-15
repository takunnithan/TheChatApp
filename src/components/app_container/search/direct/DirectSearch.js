import React, { Component } from 'react'
import SearchTemplate from '../search_template/SearchTemplate';
import SearchResult from '../search_template/search_result/SearchResult';
import classes from './DirectSearch.css';
import { connect } from 'react-redux';
import axios from 'axios';


class DirectSearch extends Component{

    state = {
        results: []
    }

    userSearch = (event) => {
        var message = event.target.value;
        if (message){
            axios(
                {
                    method: 'get',
                    url: 'http://localhost:8000/search/user',
                    headers: {
                        'auth-token':localStorage.getItem('auth_token'),
                        'user-id': localStorage.getItem('user_id')
                    },
                    params: {
                        'q': message
                    }
                }).then(response => {
                    var data = response.data;
                    this.setState({results: data});
            });
        }
    }

    render() {
        var users = null;
        if (this.state.results){
          users = Object.values(this.state.results).map(user => {
            return <a key={user.user_id}><SearchResult><h3>{user.user_name}</h3></SearchResult></a>
        })
        }
        return (
            <SearchTemplate show={this.props.showDirectChatSearch} type='direct' >
                <h1>Direct Chat</h1>
                <div className={classes.search_box_container}>
                    <div className={classes.search_box_div}>
                        <input className={classes.search_box} placeholder='Search for users' onKeyUp={this.userSearch} />
                    </div>
                    <div className={classes.search_button_div}><button className={classes.search_button}>Go</button></div>
                </div>
                <div className={classes.search_result_container}>
                    <div className={classes.contact_list_title}>Contact List</div>
                    <div className={classes.search_result}>
                        {users}
                    </div>
                </div>
            </SearchTemplate>

        )
    }
}

const mapStateToProps = state => {
    var showDirectSearch =  state.show_direct_chat_search;
    return {
        showDirectChatSearch: showDirectSearch
    }
  }

export default connect(mapStateToProps, null)(DirectSearch);
import React, { Component } from 'react'
import SearchTemplate from '../search_template/SearchTemplate';
import SearchResult from '../search_template/search_result/SearchResult';
import classes from './GroupSearch.css';
import { connect } from 'react-redux';
import axios from 'axios';
import {joinChannel} from '../../../../store/action/action';


class GroupSearch extends Component{

    state = {
        results: [],
        selected: null
    }

    groupSearch = (event) => {
        var message = event.target.value;
        if (message){
            axios(
                {
                    method: 'get',
                    url: 'http://localhost:8000/search/channel',
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

    selectHandler = (event) => {
        this.setState({selected: event.target.getAttribute('id')});
    }

    render() {
        var users = null;
        if (this.state.results){
          users = Object.values(this.state.results).map(channel => {
            return <SearchResult 
                        key={channel.unique_hash} 
                        id={channel.unique_hash}
                        selected={this.state.selected}
                        selectHandler={this.selectHandler}
                        name={channel.channel_name}>
                   </SearchResult>
        })
        }
        return (
            <SearchTemplate show={this.props.showGroupChatSearch} type='channel' >
                <h1>Channels</h1>
                <div className={classes.search_box_container}>
                    <div className={classes.search_box_div}>
                        <input className={classes.search_box} placeholder='Search for channels' onKeyUp={this.groupSearch} />
                    </div>
                    <div className={classes.search_button_div}>
                        <button className={classes.search_button} onClick={()=>this.props.joinChannels(this.state.selected)}>Go</button>
                    </div>
                </div>
                <div className={classes.search_result_container}>
                    <div className={classes.contact_list_title}>Channel List</div>
                    <div className={classes.search_result}>
                        {users}
                    </div>
                </div>
            </SearchTemplate>
        )
    }
}

const mapStateToProps = state => {
    var showGroupSearch =  state.show_channels_search;
    return {
        showGroupChatSearch: showGroupSearch
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
        joinChannels: (unique_hash) => {
            dispatch(joinChannel(unique_hash));
            }
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(GroupSearch);
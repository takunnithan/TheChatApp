import React, { Component } from 'react'
import SearchTemplate from '../search_template/SearchTemplate';
import SearchResult from '../search_template/search_result/SearchResult';
import classes from './Direct.css';


class DirectSearch extends Component{
    render() {
        return (
            <SearchTemplate>
                <h1>Direct Chat</h1>
                <div className={classes.search_box_container}>
                    <div className={classes.search_box_div}><input className={classes.search_box} placeholder='Search for users' /></div>
                    <div className={classes.search_button_div}><button className={classes.search_button}>Go</button></div>
                </div>
                <div className={classes.search_result_container}>
                    <div className={classes.contact_list_title}>Contact List</div>
                    <div className={classes.search_result}>
                        <a><SearchResult><h3>Result</h3></SearchResult></a>
                        <a><SearchResult><h3>Result</h3></SearchResult></a>
                        <a><SearchResult><h3>Result</h3></SearchResult></a>
                        <a><SearchResult><h3>Result</h3></SearchResult></a>
                        <a><SearchResult><h3>Result</h3></SearchResult></a>
                        <a><SearchResult><h3>Result</h3></SearchResult></a>
                        <a><SearchResult><h3>Result</h3></SearchResult></a>
                        <a><SearchResult><h3>Result</h3></SearchResult></a>
                        <a><SearchResult><h3>Result</h3></SearchResult></a>
                        <a><SearchResult><h3>Result</h3></SearchResult></a>
                        <a><SearchResult><h3>Result</h3></SearchResult></a>
                        <a><SearchResult><h3>Result</h3></SearchResult></a>
                        <a><SearchResult><h3>Result</h3></SearchResult></a>
                        <a><SearchResult><h3>Result</h3></SearchResult></a>
                    </div>
                </div>
            </SearchTemplate>

        )
    }
}

export default DirectSearch;
import React from 'react';

import classes from './SearchResult.css'


const SearchResult = (props) => (
    <div className={classes.search_result}>
        {props.children}
    </div>

);

export default SearchResult;
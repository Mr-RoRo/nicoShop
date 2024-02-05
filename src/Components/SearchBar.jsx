import React, { useState, useEffect } from 'react';
import './SearchBar.css';

function SearchBar (props) {

    const handleSearch = (query) => {
        props.onQuery(query.target.value);
    };

    return (
        <div className="searchBar">
            <input
                className='searchBar--input'
                alt="Search Bar"
                type="text"
                placeholder="Rechercher un produit"
                value={props.parentState}
                onChange={handleSearch}
            />
            <div className="searchBar--icon"></div>
        </div>
    );
};

export default SearchBar;
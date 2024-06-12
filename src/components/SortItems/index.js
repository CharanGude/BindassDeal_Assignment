import React from 'react';

import './index.css'

const Sorting = ({ onSort, onOrderChange }) => {
    return (
        <div className="sorting-container">
            <h3>Sort By:</h3>
            <select id="sort" onChange={(e) => onSort(e.target.value)}>
                <option value="date">Date</option>
                <option value="name">Name</option>
                <option value="category">Category</option>
            </select>
            <select id="order" onChange={(e) => onOrderChange(e.target.value)}>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
            </select>
        </div>
    );
};

export default Sorting;

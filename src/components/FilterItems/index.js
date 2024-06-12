import React from 'react'

import './index.css'

const FilterItems = props => {

const itemList = JSON.parse(localStorage.getItem('itemsList'))

const {onCategoryChange} = props
let categoriesList = [
    ...new Set(itemList.map((item) => item.category)),
];

return (
    <div className='filter-container'>
        <h3>Filter Using Category:</h3>
        <select onChange={onCategoryChange} className='filter-select'>
            <option value='All'>All</option>
            {categoriesList.map(item => <option key={item} value={item}>{item}</option>)}
        </select>
    </div>
)
}


export default FilterItems
import React, { Component } from 'react';
import Navbar from '../Navbar';
import Greeting from '../Greeting';
import FilterItems from '../FilterItems';
import Item from '../Item';
import SortItems from '../SortItems';

import './index.css';

class Home extends Component {
    state = {
        itemList: [],
        sortBy: 'date',
        sortOrder: 'asc',
    };

    componentDidMount() {
        const items = JSON.parse(localStorage.getItem('itemsList'));
        this.setState({ itemList: items });
    }

    onDeleteItem = (id) => {
        const items = JSON.parse(localStorage.getItem('itemsList'));
        const updatedList = items.filter((item) => item.id !== id);
        localStorage.setItem('itemsList', JSON.stringify(updatedList));
        this.setState({ itemList: updatedList });
    };

    onCategoryChange = (event) => {
        const category = event.target.value;
        if (category === 'All') {
            const itemsList = JSON.parse(localStorage.getItem('itemsList'));
            this.setState({ itemList: itemsList });
        } else {
            const itemsList = JSON.parse(localStorage.getItem('itemsList'));
            const filterList = itemsList.filter((item) => item.category === category);
            this.setState({ itemList: filterList });
        }
    };

    onSort = (sortBy) => {
        this.setState({ sortBy });
    };

    onOrderChange = (sortOrder) => {
        this.setState({ sortOrder });
    };

    render() {
        const { itemList, sortBy, sortOrder } = this.state;

        let sortedItems = [...itemList];
        if (sortBy === 'date') {
            sortedItems.sort((a, b) => {
                if (sortOrder === 'asc') {
                    return new Date(a.date) - new Date(b.date);
                } else {
                    return new Date(b.date) - new Date(a.date);
                }
            });
        } else if (sortBy === 'name') {
            sortedItems.sort((a, b) => {
                if (sortOrder === 'asc') {
                    return a.name.localeCompare(b.name);
                } else {
                    return b.name.localeCompare(a.name);
                }
            });
        } else if (sortBy === 'category') {
            sortedItems.sort((a, b) => {
                if (sortOrder === 'asc') {
                    return a.category.localeCompare(b.category);
                } else {
                    return b.category.localeCompare(a.category);
                }
            });
        }

        return (
            <div>
                <Navbar />
                <div className="main-container">
                    <div className="sidebar">
                        <Greeting />
                        <FilterItems onCategoryChange={this.onCategoryChange} />
                        <SortItems onSort={this.onSort} onOrderChange={this.onOrderChange} />
                    </div>
                    <div className="main-body">
                        <div>
                            <ul className="item-list-container">
                                {sortedItems.map((item) => (
                                    <Item key={item.id} details={item} onDeleteItem={this.onDeleteItem} />
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;

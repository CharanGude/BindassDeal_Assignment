import React, { useState } from 'react';
import { FaEdit, FaTimes } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import './index.css'

const Item = props => {
    const {details, onDeleteItem} = props;
    const {id, name: initialName, category: initialCategory, date: initialDate, description: initialDescription} = details;

    const [name, setName] = useState(initialName);
    const [category, setCategory] = useState(initialCategory);
    const [date, setDate] = useState(initialDate);
    const [description, setDescription] = useState(initialDescription);
    const [isDirty, setIsDirty] = useState(false);

    const onDelete = () => {
        onDeleteItem(id);
    };

    const onSaveChanges = () => {
        const updatedItem = { id, name, category, date, description };
        const items = JSON.parse(localStorage.getItem('itemsList')) || [];
        const index = items.findIndex(item => item.id === id);
        items[index] = updatedItem;
        localStorage.setItem('itemsList', JSON.stringify(items));
        setIsDirty(false);
    };

    const discardChanges = () => {
        setName(initialName);
        setCategory(initialCategory);
        setDate(initialDate);
        setDescription(initialDescription);
        setIsDirty(false);
    };

    return (
        <li className='list-item'>
            <div>
                <h3>{name}</h3>
                <p>Category: {category}</p>
                <p>Posted On: {date}</p>
                {description && <p>Description: <br/><br/>{description}</p>}
            </div>
            <div className='icons-container'>
                <Popup
                    trigger={
                        <div className='edit-container'>
                            <FaEdit className='icon' /> Edit
                        </div>
                    }
                    modal
                    nested
                    closeOnDocumentClick={false}
                    className="fullscreen-popup"
                >
                    {(close) => (
                        <div className="popup-content">
                            <div className="close-icon" onClick={() => { discardChanges(); close(); }}>
                                <FaTimes />
                            </div>
                            <h2>Edit Item</h2>
                            <label htmlFor="editName">Name:</label>
                            <input
                                className='input-label'
                                type="text"
                                id="editName"
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                    setIsDirty(true);
                                }}
                            />

                            <label htmlFor="editCategory">Category:</label>
                            <input
                                className='input-label'
                                type="text"
                                id="editCategory"
                                value={category}
                                onChange={(e) => {
                                    setCategory(e.target.value);
                                    setIsDirty(true);
                                }}
                            />

                            <label htmlFor="editDate">Date:</label>
                            <input
                                className='input-label'
                                type="text"
                                id="editDate"
                                value={date}
                                onChange={(e) => {
                                    setDate(e.target.value);
                                    setIsDirty(true);
                                }}
                            />

                            <label className="input-label" htmlFor="itemName">
                                Description (if any):
                            </label>
                            <textarea
                                rows={10}
                                className="description-input-field"
                                value={description}
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                    setIsDirty(true);
                                }}
                            ></textarea>

                            <div className="button-container">
                                <button type='submit' className='popup-btn' onClick={() => { onSaveChanges(); close(); }}>Save Changes</button>
                                {isDirty && <button type='submit' className='popup-btn' onClick={discardChanges}>Discard Changes</button>}
                            </div>
                        </div>
                    )}
                </Popup>

                <div className='delete-container' onClick={onDelete}>
                    <MdDelete className='icon' />Delete
                </div>
            </div>
        </li>
    );
}

export default Item;

import React, {Component} from 'react'
import Navbar from '../Navbar'
import { v4 as uuidv4 } from 'uuid'

import './index.css'

class AddItem extends Component {
  state = {name:'', category:'', description: '', date: '' }

  onChangeItemName = event => {
    this.setState({name: event.target.value})
  }

  onChangeCategory = event => {
    this.setState({category: event.target.value})
  }

  onChangeDescription = event => {
    this.setState({description: event.target.value})
  }

  onChangeDate = event => {
    this.setState({date: event.target.value})
  }

  onSubmit = event => {
    event.preventDefault()
    const {name, category, description, date} = this.state
    const items = JSON.parse(localStorage.getItem('itemsList'))
    items.push({id: uuidv4(), name, category, description, date})
    localStorage.setItem('itemsList',JSON.stringify(items))
    window.location.replace('/')
  }

  render() {
    const {name, category, description, date} = this.state

    return (
      <>
        <Navbar />
        <div className='addItem-container'>
          <h1>Add New Item</h1>
          <form onSubmit={this.onSubmit} className='addItem-form'>
            <label className="input-label" htmlFor="itemName">
              Item Name: 
              <br />
              <input
                type="text"
                className="itemName-input-field"
                value={name}
                onChange={this.onChangeItemName}
                required
              />
            </label> 
            <label className="input-label" htmlFor="itemName">
              Category: 
              <br />
              <input
                type="text"
                className="category-input-field"
                value={category}
                onChange={this.onChangeCategory}
                required
              />
            </label>
            <label className="input-label" htmlFor="itemName">
              Date: 
              <br />
              <input
                type="date"
                className="category-input-field"
                value={date}
                onChange={this.onChangeDate}
                required
              />
            </label>
            <label className="input-label" htmlFor="itemName">
              Description (if any): 
              <br />
              <textarea
                rows={10}
                className="description-input-field"
                value={description}
                onChange={this.onChangeDescription}
              ></textarea>
            </label>
            <button type='submit'>Submit</button>
          </form>
        </div>
      </>
    )
  }
}

export default AddItem
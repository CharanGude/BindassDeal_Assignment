import React from 'react'
import { Link } from 'react-router-dom'
import { IoMenu } from "react-icons/io5";

import './index.css'

const Navbar = () => {

    const onLogout = () => {
        localStorage.removeItem('token');
    } 

  return (
    <nav className="navbar">
        <div id='navbar-cont' className="navbar-container">
        <button className='menu-btn'><IoMenu /></button>   
        <ul className="nav-list">
            <li>
                <Link className='nav-link' to="/">Home</Link>
            </li>
            <li>
                <Link className='nav-link' to="/add-item">Add New Item</Link>
            </li>
            <li>
                <Link className='nav-link' to="/login" onClick={onLogout}>
                    Logout
                </Link>
            </li>
        </ul>
        </div>
    </nav>
  )
}

export default Navbar
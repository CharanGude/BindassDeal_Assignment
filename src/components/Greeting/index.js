import React from 'react';
import './index.css';
import man from '../../assets/man.jpg';

const Greeting = () => {
   const user = JSON.parse(localStorage.getItem('token'))
    return (
        <div className="greeting">
            <img className="user-image" src={man} alt="user-image" />
            <div>
              <span>Hello,</span>
              <h1 className="username">{user.username}</h1>
            </div>
        </div>
    );
}

export default Greeting;
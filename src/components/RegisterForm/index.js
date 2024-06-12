import React from 'react'
import { Component } from 'react'
import { Navigate } from 'react-router-dom'
import { isAuthenticated, registerUser } from '../Auth'

import './index.css'

class Register extends Component{
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    registerSuccess: false,
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  submitForm = event => {
    event.preventDefault()
    const {username, password} = this.state
    if(registerUser(username,password)) {
      this.setState({showSubmitError: false, registerSuccess: true, username:'', password:''})
    }
    else{
      this.setState({showSubmitError: true, registerSuccess: false})
      alert('User Already Exists')
    }
  }

  renderPasswordField = () => {
    const {password} = this.state
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD:
          <br />
          <input
            type="password"
            id="password"
            className="password-input-field"
            value={password}
            onChange={this.onChangePassword}
            required
          />
        </label>
      </>
    )
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME: 
          <br />
          <input
            type="text"
            id="username"
            className="username-input-field"
            value={username}
            onChange={this.onChangeUsername}
            required
          />
        </label>
      </>
    )
  }

  render() {
    const {showSubmitError, registerSuccess} = this.state
    if (isAuthenticated()) {
      return <Navigate to="/" />
    }
    return (
      <div className="register-form-container">
          <h1>Please Register Here</h1>
          <form className="form-container" onSubmit={this.submitForm}>
            <div className="input-container">{this.renderUsernameField()}</div> 
            <div className="input-container">{this.renderPasswordField()}</div>
            <button type="submit" className="register-button">
              Sign Up
            </button>
            {registerSuccess && <p className="success-message">*Registration Successful</p>}
            {showSubmitError && <p className="error-message">*User Already Exists</p>}
          </form>
          <p>Already have an account: </p>
          <a href='/login'>
            <button type='button' className='login-button'>
              Login Here
            </button>
          </a>
          
        </div>
    )
  }
}

export default Register
import {Component} from 'react'
import {Navigate} from 'react-router-dom'
import {authenticateUser, isAuthenticated} from '../Auth'

import './index.css'

const items = [
  { id: 1, name: 'Item 1', category: 'Category A', date:
  '2024-06-01' },
  { id: 2, name: 'Item 2', category: 'Category B', date:
  '2024-06-02' },
  { id: 3, name: 'Item 3', category: 'Category A', date:
  '2024-06-03' },
];

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
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
    if (authenticateUser(username, password)) {
      localStorage.setItem('itemsList', JSON.stringify(items));
      window.location.replace('/'); 
    } else {
      this.setState({showSubmitError: true})
      alert('Invalid Credentials')
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
    const {showSubmitError} = this.state

    if (isAuthenticated()) {
      console.log('exists')
      return <Navigate to="/" />
    }
    return (
      <div className="login-form-container">
        <h1>Please Login To Continue</h1>
        <form className="form-container" onSubmit={this.submitForm}>
          <div className="input-container">{this.renderUsernameField()}</div> 
          <div className="input-container">{this.renderPasswordField()}</div>
          <button type="submit" className="login-button">
            Login
          </button>
          {showSubmitError && <p className="error-message">*Invalid Credentials</p>}
        </form>
        <p>Don't have an account: </p>
        <a href='/register'>
          <button type='button' className='register-button'>
            Sign Up
          </button>
        </a>
      </div>
    )
  }
}

export default LoginForm
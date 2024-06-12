import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import Home from './components/Home'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import AddItem from './components/AddItem'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route exact path="/login" element={<LoginForm />} />
      <Route exact path="/register" element={<RegisterForm />} />
      <Route exact path="/" element={<ProtectedRoute  element={<Home />} />}/>
      <Route exact path="/add-item" element={<ProtectedRoute  element={<AddItem />} />}/>
      <Route path="/not-found" element={<NotFound />} />
      <Route path='*' element={<Navigate to="not-found" />}/>
    </Routes>
  </BrowserRouter>
)

export default App
import {Navigate} from 'react-router-dom'
import {isAuthenticated} from '../Auth'

const ProtectedRoute = ({ element: Component }) => {
  return isAuthenticated() ? Component : <Navigate to="/login" />;
};

export default ProtectedRoute
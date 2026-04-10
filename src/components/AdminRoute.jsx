import { Navigate } from 'react-router-dom';

function AdminRoute({ children }) {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  const parsedUser = JSON.parse(user);

  if (parsedUser.role !== 'admin') {
    return <Navigate to="/profile" replace />;
  }

  return children;
}

export default AdminRoute;
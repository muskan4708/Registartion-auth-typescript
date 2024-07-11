// ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
 //import { useAuth } from './AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {

 // const { isAuthenticated } = useAuth();
 const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
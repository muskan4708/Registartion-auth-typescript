// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Registration from './components/Register';
import Login from './components/Login';
import Navbar from './components/Nav';
 import UserList from './components/userList';
import ProtectedRoute from './components/ProtectedRoute';

// import { AuthProvider } from './components/AuthContext';

const App: React.FC = () => {
  return (
    <Router>
 

     <Navbar />
        <div className="App">
          <Routes>
            <Route path="/register" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/users" element={<ProtectedRoute><UserList /></ProtectedRoute>} />
          </Routes>
        </div>
    
   
    </Router>
  );
};

export default App;

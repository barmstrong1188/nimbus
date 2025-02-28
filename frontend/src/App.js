import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProductList from './pages/ProductList';
import ProductForm from './pages/ProductForm';
import ProtectedRoute from './components/ProtectedRoute';
import LogoutButton from './components/LogoutButton';
import React, { useState, useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Notification from './components/Notification';

function App() {
  // Check if the user is logged in by looking for the token
  const { token } = useContext(AuthContext);
  // useState for successful login/logout noticiation
  const [notification, setNotification] = useState('');

  return (
    <Router>
      <div>
        <Notification message={notification} clearMessage={() => setNotification('')} />
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/add-product">Add Product</Link></li>
            {token && <li><LogoutButton setNotification={setNotification}/></li>}
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/login" element={<Login setNotification={setNotification}/>}></Route>
          <Route path="/signup" element={<Signup setNotification={setNotification}/>}></Route>
          <Route path="/products" element={
            <ProtectedRoute>
              <ProductList />
            </ProtectedRoute>
            } />
          <Route path="/add-product" element={
            <ProtectedRoute>
              <ProductForm/>
            </ProtectedRoute> 
            } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

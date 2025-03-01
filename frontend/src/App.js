import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProductList from './pages/ProductList';
import ProductForm from './pages/ProductForm';
import ProtectedRoute from './components/ProtectedRoute';
import React, { useState } from 'react';
import Notification from './components/Notification';
import logo from './images/nimbus-logo.png';
import MiniDrawer from './components/MiniDrawer';

function App() {
  // useState for successful login/logout notification
  const [notification, setNotification] = useState('');

  return (
    <Router>
      <div>
        <Notification message={notification} clearMessage={() => setNotification('')} />
        {/* Brand Logo/Header */}
        <div className="logo-container">
            <img alt="Nimbus Logo" src={logo} className="logo"></img>
            <h1 className="fredoka-heavy logo-header">NIMBUS</h1>
            <h3 className="montserrat-medium logo-text">CLOUD INVENTORY</h3>
          </div>
        <Routes >
          <Route path="/" element={<MiniDrawer />}>
          <Route index element={<Home/>}></Route>
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
            <Route path="/edit-product/:id" element={
            <ProtectedRoute>
              <ProductForm/>
            </ProtectedRoute> 
            } />
            </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

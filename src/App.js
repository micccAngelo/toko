import './App.css';
import Navbar from './Components/Navbar/Navbar'
import React, { useState, useEffect } from 'react';
import AuthContext from './Context/AuthContext';
import Login from './Pages/Login/Login';
import { Navigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeAdmin from './Pages/HomeAdmin/HomeAdmin';
import Category from './Components/Category/Category';
import AddProduct from './Pages/AddProduct/AddProduct';
import Home from './Pages/Home/Home';
import ProductDetail from './Pages/Detail/ProductDetail';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true' ? true : false;
  });

  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn);
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <div className="App">
        <Navbar isLoggedIn={isLoggedIn} />
        <Routes>
          <Route path='/' element={<Navigate to='/Login' />} />  
          <Route path='/Categories' element={<Category />} />
          <Route path='/HomeAdmin' element={<HomeAdmin />} />
          <Route path='/AddProduct' element={<AddProduct />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Home' element={<Home />} />
          <Route path='/product/:id' element={<ProductDetail />} />
        </Routes>
      </div>
    </AuthContext.Provider>
  );
};

export default App;

import './App.css';
import React, { useState, useEffect } from 'react';
import AuthContext from './Context/AuthContext';
import Login from './Pages/Login/Login';
import { Navigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeAdmin from './Pages/HomeAdmin/HomeAdmin';
import AddProduct from './Pages/AddProduct/AddProduct';
import Home from './Pages/Home/Home';
import ProductDetail from './Pages/Detail/ProductDetail';
import Cart from './Pages/Cart/Cart'
import OutletNav from './OutletNav';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true' ? true : false;
  });

  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn);
    if (window.location.pathname === '/') {
      window.location.replace('/User/Home');
    }
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <div className="App">
        <Routes>
        <Route path='/' element={<OutletNav />}>
          <Route path='Login' element={<Login />} />

          <Route path='Admin'>
           <Route path='Home' element={<HomeAdmin />} />
           <Route path='AddProduct' element={<AddProduct />} />
          </Route>

          <Route path='User'>
            <Route path='Home' element={<Home />} />
            <Route path='Cart' element={<Cart />} />
            <Route path='Product/:id' element={<ProductDetail />} />
          </Route>

        </Route>
        <Route path='*' element={<Navigate to={'User/Home'} replace/>} />
      </Routes>
      </div>
    </AuthContext.Provider>
  );
};

export default App;

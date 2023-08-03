import React, { useEffect } from 'react';
import Home from './Home';
import Login from './Login';
import { useSelector, useDispatch } from 'react-redux';
import { loginWithToken, fetchCart } from '../store';
import { Routes, Route } from 'react-router-dom';
import NavbarHome from './Navbar';
import Register from './Register';
import AllProducts from './AllProducts';
import SingleProduct from './SingleProduct';
import Success from './Success';
import Cancel from './Cancel';

const App = ()=> {
  const { auth } = useSelector(state => state);
  const dispatch = useDispatch();
  useEffect(()=> {
    dispatch(loginWithToken());
  }, []);

  useEffect(()=> {
    if(auth.id){
      dispatch(fetchCart());
    }
  }, [auth]);

  return (
    <div>
      <NavbarHome />
      <div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/:id' element={<SingleProduct /> } />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} /> 
          <Route path='/all-products' element={<AllProducts />} />
          <Route path='/success' element={<Success />} />
          <Route path='/cancel' element={<Cancel />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
  </div>
  );
};

export default App;

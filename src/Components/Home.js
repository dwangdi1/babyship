import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store';
import AllProducts from './AllProducts';

const Home = ()=> {
  const { auth } = useSelector(state => state);
  const dispatch = useDispatch();
  return (
    <div>
      <h1>Home</h1>
      <h1>All Products: </h1>
      <AllProducts />
    </div>
  );
};

export default Home;

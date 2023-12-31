import {configureStore} from "@reduxjs/toolkit";
import logger from 'redux-logger';
import auth from './auth';
import cart from './cart';
import products from "./productsSlice"
import topSellersSlice from "./topSellersSlice";

const store = configureStore({
  middleware: (defaultMiddleware)=> defaultMiddleware().concat(logger),
  reducer:{
    auth: auth,
    cart: cart,
    products: products,
    topSellers: topSellersSlice
  }
});

export default store;
export * from './auth';
export * from './cart';
export * from './productsSlice';
export * from './topSellersSlice';


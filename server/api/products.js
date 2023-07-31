const express = require('express');
const app = express.Router();
const {Product} = require("../db/Product");



app.get('/', async(req,res,next) => {
    try {
        const products = await Product.findAll();
        res.send(products)
    } catch (error) {
        next(error);
    }
});


app.get('/:id', async(req, res, next) => { 
    try {
        const product = await Product.findByPk(req.params.id);
        res.send(product)
    } catch (error) {
        next(error);
    }
});

app.put('/:id', async(req, res, next)=> {
    try {
      console.log('connect with database, products.js');
      const token = req.headers.authorization;
      if (token){
        const{quantity} = req.body; 
        
        let product = await Product.findByPk(req.params.id);
        if (!product) {
          return res.status(404).json({ message: 'Product not found' });
        }
        product.quantity -= quantity;
        await product.save();
        console.log('connect to database');
        res.send(product);
      }else{
        const{quantity} = req.body; 
        let product = await Product.findByPk(req.params.id);
        if (!product) {
          return res.status(404).json({ message: 'Product not found' });
        }
        product.quantity -= quantity;
        await product.save();
        res.send(product);
      }
    }
    catch(ex){
      next(ex);
    }
  });
  

  
  module.exports = app;
 
  
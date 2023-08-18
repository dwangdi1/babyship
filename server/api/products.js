const express = require('express');
const app = express.Router();
const Product = require("../db/Product");
const Reviews = require("../db/Reviews");
const User = require("../db/User");


app.get('/', async (req, res, next) => {
    try {
        const products = await Product.findAll({
            include: [
                {
                    model: Reviews,
                    as: 'reviews',
                    include: User, // Include the associated user for each review
                },
            ],
        });

        res.send(products);
    } catch (error) {
        next(error);
    }
});

app.get("/top-sellers", async (req, res, next) => {
    try {
        const topSellers = await Product.findAll({
            order: [['salesCount', 'DESC']],
            limit: 4,
        });
        res.send(topSellers);
    } catch (err) {
      next(err);     
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


 
  app.post('/:productId/review', async (req, res) => {
    const productId = req.params.productId;
    const newReviewData = req.body.newReview; 
  
    try {
        const token = req.headers.authorization
        if(token){
            // Find the product
        const product = await Product.findByPk(productId);
    
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
    
        // Create a new review
        const newReview = await Reviews.create({
            ...newReviewData,
            productId: product.id,
        });
    
        return res.status(201).json(newReview);
        }
      
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });

  
  
  
  
  
  module.exports = app;
 
  
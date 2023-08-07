const express = require('express');
const app = express.Router();
const { Order, User, LineItem, Product } = require('../db');
module.exports = app;

app.get('/', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    const orders = await Order.findAll({
      where: { isCart: false, userId: user.id },
      include: [{
        model: LineItem,
        include: [Product]
      }]
    });
    res.send(orders);
  } catch (ex) {
    next(ex);
  }
});

app.post('/', async(req, res, next)=> {
  try {
    const user = await User.findByToken(req.headers.authorization);
    res.send(await user.createOrder());
  }
  catch(ex){
    next(ex);
  }
});

app.get('/cart', async(req, res, next)=> {
  try {
    const user = await User.findByToken(req.headers.authorization);
    console.log("app.get cart getCart");
    res.send(await user.getCart());
  }
  catch(ex){
    next(ex);
  }
});

app.put('/checkout', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    const cart = await user.getCart();

    for (const lineItem of cart.lineItems) {
      const product = await Product.findByPk(lineItem.productId);
      product.salesCount += lineItem.quantity;
      await product.save();
   }

    cart.isCart = false;
    await cart.save();
    res.send(cart);
  } catch (ex) {
    next(ex);
  }
});




app.post('/cart', async(req, res, next)=> {
  try {
    const user = await User.findByToken(req.headers.authorization);
    console.log("adding to cart post orders.js addCart");
    res.send(await user.addToCart(req.body));
  }
  catch(ex){
    next(ex);
  }
});

app.put('/cart', async(req, res, next)=> {
  try {
    const user = await User.findByToken(req.headers.authorization);
    res.send(await user.removeFromCart(req.body));
  }
  catch(ex){
    next(ex);
  }
});
const express = require('express');
const app = express.Router();
const { User } = require('../db');

module.exports = app;

app.post('/', async(req, res, next)=> {
  try {
    res.send(await User.authenticate(req.body));
  }
  catch(ex){
    next(ex);
  }
});

app.get('/', async(req, res, next)=> {
  try {
    res.send(await User.findByToken(req.headers.authorization));
  }
  catch(ex){
    next(ex);
  }
});

app.post('/register', async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    res.send(newUser);
  } catch (ex) {
    if (ex.name === 'SequelizeUniqueConstraintError') {
      // If a unique constraint violation occurs (duplicate username or email), send an error response.
      return res.status(409).send({ error: "Username or Email already in use. Please try again." });
    }

    next(ex);
  }
});


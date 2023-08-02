const express = require('express');
const app = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = app;

// WARM_BABY_KNITTED_HAT=price_1NamJLGFqD9PGqu2wM1OwE8a
// BABY_SAFETY_HELMET=price_1NamJwGFqD9PGqu2ZbnYj2sP
// THICK_BABY_BLANKET=price_1NamKBGFqD9PGqu2mjx3NR2uprice_1NamKBGFqD9PGqu2mjx3NR2u

const priceIds = [
    {name: "Baby Swaddle Blanket", priceId: process.env.BABY_SWADDLE_BLANKET},
    {name: "Warm Baby Knitted Hat", priceId: process.env.WARM_BABY_KNITTED_HAT},
    {name: "Thick Baby Blanket", pricedId: process.env.THICK_BABY_BLANKET},
    {name: "Baby Safety Helmet", priceId: process.env.BABY_SAFETY_HELMET}
];

app.post("/checkout", async(req, res) => {

    const items = req.body.items;
    let lineItems = [];
    items.forEach((item) => {
        lineItems.push(
            {
                price: item.id,
                quantity: item.quantity
            }
        )
    });

    const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: 'payment',
        success_url:"http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel"
    });

    res.send(JSON.stringify({
        url: session.url
    }));

});
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
    {name: "Thick Baby Blanket", priceId: process.env.THICK_BABY_BLANKET},
    {name: "Baby Safety Helmet", priceId: process.env.BABY_SAFETY_HELMET}
];

app.post("/checkout", async(req, res) => {
    const items = req.body.items;
    let lineItems = [];
    items.forEach((item) => {
        const matchedPrice = priceIds.find((p) => p.name === item.product.name);
        if(matchedPrice){
            lineItems.push(
                {
                    price: matchedPrice.priceId,
                    quantity: item.quantity
                }
            );
        }
        
    });

    const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: 'payment',
        success_url:"http://localhost:3000/#/success",
        cancel_url: "http://localhost:3000/#/cancel",
        shipping_address_collection: {
            allowed_countries: [
                "AC", "AD", "AE", "AF", "AG", "AI", "AL", "AM", "AO", "AQ",
                "AR", "AT", "AU", "AW", "AX", "AZ", "BA", "BB", "BD", "BE",
                "BF", "BG", "BH", "BI", "BJ", "BL", "BM", "BN", "BO", "BQ",
                "BR", "BS", "BT", "BV", "BW", "BY", "BZ", "CA", "CD", "CF",
                "CG", "CH", "CI", "CK", "CL", "CM", "CN", "CO", "CR", "CV",
                "CW", "CY", "CZ", "DE", "DJ", "DK", "DM", "DO", "DZ", "EC",
                "EE", "EG", "EH", "ER", "ES", "ET", "FI", "FJ", "FK", "FO",
                "FR", "GA", "GB", "GD", "GE", "GF", "GG", "GH", "GI", "GL",
                "GM", "GN", "GP", "GQ", "GR", "GS", "GT", "GU", "GW", "GY",
                "HK", "HN", "HR", "HT", "HU", "ID", "IE", "IL", "IM", "IN",
                "IO", "IQ", "IS", "IT", "JE", "JM", "JO", "JP", "KE", "KG",
                "KH", "KI", "KM", "KN", "KR", "KW", "KY", "KZ", "LA", "LB",
                "LC", "LI", "LK", "LR", "LS", "LT", "LU", "LV", "LY", "MA",
                "MC", "MD", "ME", "MF", "MG", "MK", "ML", "MM", "MN", "MO",
                "MQ", "MR", "MS", "MT", "MU", "MV", "MW", "MX", "MY", "MZ",
                "NA", "NC", "NE", "NG", "NI", "NL", "NO", "NP", "NR", "NU",
                "NZ", "OM", "PA", "PE", "PF", "PG", "PH", "PK", "PL", "PM",
                "PN", "PR", "PS", "PT", "PY", "QA", "RE", "RO", "RS", "RU",
                "RW", "SA", "SB", "SC", "SE", "SG", "SH", "SI", "SJ", "SK",
                "SL", "SM", "SN", "SO", "SR", "SS", "ST", "SV", "SX", "SZ",
                "TA", "TC", "TD", "TF", "TG", "TH", "TJ", "TK", "TL", "TM",
                "TN", "TO", "TR", "TT", "TV", "TW", "TZ", "UA", "UG", "US",
                "UY", "UZ", "VA", "VC", "VE", "VG", "VN", "VU", "WF", "WS",
                "XK", "YE", "YT", "ZA", "ZM", "ZW", "ZZ"
            ],
        },
        
    });

    res.send(JSON.stringify({
        url: session.url
    }));

});
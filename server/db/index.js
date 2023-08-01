const conn = require('./conn');
const User = require('./User');
const Product = require('./Product');
const Order = require('./Order');
const LineItem  = require('./LineItem');
const Reviews = require('./Reviews');

Order.belongsTo(User, {foreignKey: 'userId', onDelete: 'CASCADE'});
LineItem.belongsTo(Order, {onDelete: 'CASCADE'});
Order.hasMany(LineItem, { onDelete: 'CASCADE'}) ;
LineItem.belongsTo(Product, {onDelete: 'CASCADE'});

const syncAndSeed = async()=> {
  await conn.sync({ force: true });
  const [moe, lucy, larry, babyHat, ethyl] = await Promise.all([
    User.create({ username: 'moe', password: '123' }),
    User.create({ username: 'lucy', password: '123' }),
    User.create({ username: 'larry', password: '123' }),
    Product.create({ 
      name: 'Baby Safety Helmet', 
      productType: 'hat', 
      images:[ 
        "https://ae01.alicdn.com/kf/H38652dc007f24aa89ee4af5d143ae1fap.jpg?width=960&height=960&hash=1920",
        "https://ae01.alicdn.com/kf/Hf225360b6dc04325841399abcb124b84s.jpg?width=960&height=961&hash=1921",
        "https://ae01.alicdn.com/kf/S72446f52c7a24473b0b875177b5288bd9/Baby-Safety-Helmet-Head-Protection-Hat-Toddler-Anti-fall-Pad-Children-Learn-To-Walk-Crash-Cap.jpg_220x220.jpg_.webp",
        "https://ae01.alicdn.com/kf/H2b51436f73c64752bd769655e99865b5N.jpg?width=960&height=736&hash=1696",
      ],
      description: "Baby Safety Helmet Head Protection Hat Toddler Anti-fall Pad Children Learn To Walk Crash Cap Adjustable Protective Headgear. This section is filled with high-quality cotton + high-elastic sponge, which has good protection. Silk wool is not used for cost reduction, most of the low-priced ones on the market are silk wool.",
      quantity: 20,
      price: 8.25,
    }),
    User.create({ username: 'ethyl', password: '123' }),
    Product.create({ 
      name: 'Warm Baby Knitted Hat', 
      productType: 'hat', 
      images:[ 
        "https://ae01.alicdn.com/kf/Sa9e90d35ced4481485921435008fbdfcC.jpg"
      ],
      description: "Winter Children Warm Baby Knitted Hats With Pom Pom Kids Knit Beanie Hats Solid Color Children's Hat For Boys Girls Accessories",
      quantity: 10,
      price: 7.45,
    }),
    Product.create({ 
      name: 'Thick Baby Blanket', 
      productType: 'blanket', 
      images:[ 
        "https://ae01.alicdn.com/kf/Sc13f2125cdd44c388da7a818c8483aba4.jpg",
        "https://ae01.alicdn.com/kf/S3c6969e2679c485288d38f2ace658e73C.jpg"

      ],
      description: "Thickened Solid Color Flannel Pineapple Plaid Baby Blanket Swaddle Blanket Children Sofa Blanket Throw Blanket",
      quantity: 10,
      price: 7.45,
    }),
    Product.create({ 
      name: 'Baby Swaddle Blanket', 
      productType: 'blanket', 
      images:[ 
        "https://ae01.alicdn.com/kf/S953593074dd34c4381514c9703375bd70.jpg",
        "https://ae01.alicdn.com/kf/Scef31bef5b2a4b9fba6c1164f8b3f3a5D.jpg"
      ],
      description: "2PCS Cotton Newborn Sleepsack Baby Swaddle Blanket Wrap Hat Set Infant Adjustable New Born Sleeping Bag Muslin Blankets 0-6M",
      quantity: 10,
      price: 7.45,
    }),
    Product.create({ 
      name: 'Baby Romper', 
      productType: 'clothing', 
      images:[ 
        "https://ae01.alicdn.com/kf/H237ff7c5d7734fe69354c3ee75feee02d.jpg",
        "https://ae01.alicdn.com/kf/H495c579d95ab4c7f839597cd321ef5d9T.jpg",
        "https://ae01.alicdn.com/kf/H53a1b3aa12e64197a0a68fcd6340df9cK.jpg?width=750&height=411&hash=1161"
      ],
      description: "Summer Infant Baby Boys Girls Romper Muslin Sleeveless Newborn Rompers Fashion Baby Clothing",
      quantity: 10,
      price: 7.45,
    }),
    Product.create({ 
      name: 'Shower Hair Cup', 
      productType: 'hat', 
      images:[ 
        "https://ae01.alicdn.com/kf/Sc754fed983fe4319838048a7de46e99cg.jpg?width=844&height=848&hash=1692",
        "https://ae01.alicdn.com/kf/S3c0a356b9fb4407e9f47297f5722b5f0R.jpg?width=844&height=845&hash=1689",
      ],
      description: "Washing Hair Cup Kids Bath Tool\nFeature:\nSize:9.5*10.7cm\nLots of ways to play and learn: Pour, stack and float\nParents can use as a rinse cup\nAges 6 months to 1-3 years old\nInterior ridges create an even pour\nStands up when not in use or hangs by handle to dry",
      quantity: 10,
      price: 7.45,
    }),
    Product.create({ 
      name: 'Newborn Cotton Socks', 
      productType: 'clothing', 
      images:[ 
        "https://ae01.alicdn.com/kf/S046ce66f83434e31b04109466695ddf1d.jpg?width=790&height=1350&hash=2140",
        "https://ae01.alicdn.com/kf/S046ce66f83434e31b04109466695ddf1d.jpg?width=790&height=1350&hash=2140",
        "https://ae01.alicdn.com/kf/S55efe36aa40f4566a471eb99438247d8D.jpg?width=790&height=1545&hash=2335"
      ],
      description: "Baby socks autumn and winter cotton newborn boys and girls loose socks glue non-slip toddler",
      quantity: 10,
      price: 7.45,
    }),
    Product.create({ 
      name: 'Summer Rompers', 
      productType: 'clothing', 
      images:[ 
        "https://ae01.alicdn.com/kf/S0c7f6f34c39a454daf0adfe4f8e47ad2z.jpg",
        "https://ae01.alicdn.com/kf/S8abc385ea73040979c19d1e97ace8158Y.jpg",
      ],
      description: "Baby Rompers Summer Newborn Baby Girl Clothes Boys Short Sleeve Jumpsuit Baby Clothes New Born Baby Items Bodysuit For Newborns",
      quantity: 10,
      price: 7.45,
    }),
    Product.create({ 
      name: 'Cotton Fleece Blanket', 
      productType: 'blanket', 
      images:[ 
        "https://ae01.alicdn.com/kf/S881327a0214b41c1aacbd42892629b7dn.jpg",
        "https://ae01.alicdn.com/kf/Sf2d4f81978ab4775b973f2a76b0534b8F.jpg",
      ],
      description: "80x80 Newborn Wrap Blanket Cotton Fleece Blanket for 0-12 Months Baby 4 Seasons Absorbent Warm Blanket Children Bath Towel DDJ",
      quantity: 10,
      price: 7.45,
    }),
  ]);

  const cart = await ethyl.getCart();
  await ethyl.addToCart({ product: babyHat, quantity: 3});
  await ethyl.addToCart({ product: babyHat, quantity: 2});
  return {
    users: {
      moe,
      lucy,
      larry
    },
    products: {
      babyHat,
  
    }
  };
};


module.exports = {
  syncAndSeed,
  User,
  Product
};

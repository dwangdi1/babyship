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

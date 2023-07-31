const conn = require('./conn');
const { INTEGER, ARRAY, FLOAT, STRING, UUID, UUIDV4, TEXT} = conn.Sequelize;
const Reviews = require("./Reviews");

const Product = conn.define('product', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  productType: {
    type: STRING,
    allowNull: false,
  },
  price:{
    type: FLOAT,
    allowNull: false,
  },
  images: {
    type: ARRAY(STRING),
    defaultValue:[]
  },
  description:{
    type: TEXT,
  },
  quantity: {
    type: INTEGER,
    default: 1
  }
});

Product.hasMany(Reviews, { as: 'reviews', foreignKey: 'productId' });


module.exports = Product;

const conn = require('./conn');
const { ARRAY, STRING, UUID, UUIDV4, TEXT} = conn.Sequelize;
const {Reviews} = require("./Review");

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

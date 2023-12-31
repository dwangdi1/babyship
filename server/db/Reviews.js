const conn = require('./conn');
const { INTEGER, UUID, UUIDV4, TEXT} = conn.Sequelize;
const Product = require("./Product")
const User = require("./User")

const Reviews = conn.define('review', {
    id: {
        type: UUID,
        primaryKey: true,
        defaultValue: UUIDV4
    },
    title: {
        type: TEXT,
    },
    rating: {
        type: INTEGER,
        allowNull: false,
        validate: {
            min: 1, 
            max: 5,
        },
    },
    comment: {
        type: TEXT,
        allowNull: true,
    },
});

Reviews.belongsTo(User, {foreignKey: 'userId'})


module.exports = Reviews;
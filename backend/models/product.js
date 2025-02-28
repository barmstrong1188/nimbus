'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Name must not be empty' }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isDecimal: { msg: 'Price must be a decimal number' },
        min: {
          args: [0],
          msg: 'Price must be positive'
        }
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { msg: 'Quantity must be an integer' },
        min: {
          args: [0],
          msg: 'Quantity cannot be negative'
        }
      }
    }
  }, {
    tableName: 'Products'
  });
  return Product;
};
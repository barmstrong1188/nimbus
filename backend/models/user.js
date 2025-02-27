'use strict';
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: { isEmail: true }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {});

    //Hook to hash password before saving
    User.beforeCreate(async (user, options) => {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
    });

    // Instance method for password validation
    User.prototype.validPassword = async function(password) {
        return await bcrypt.compare(password, this.password);
    };

    return User;
};
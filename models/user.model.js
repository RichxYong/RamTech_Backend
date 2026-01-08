// models/user.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');

const User = sequelize.define('User', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'user_id'
    },
    username: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false,
        field: 'username'
    },
    email: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false,
        field: 'email',
        validate: {
            isEmail: true
        }
    },
    password_hash: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'password_hash'
    },
    first_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: 'first_name'
    },
    last_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: 'last_name'
    },
    role: {
        type: DataTypes.ENUM('admin', 'manager', 'employee'),
        defaultValue: 'employee',
        field: 'role'
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        field: 'is_active'
    },
    last_login: {
        type: DataTypes.DATE,
        field: 'last_login',
        allowNull: true
    }
}, {
    tableName: 'user',  
    modelName:'User',
    timestamps: false,   
    underscored: true
});

module.exports = User;
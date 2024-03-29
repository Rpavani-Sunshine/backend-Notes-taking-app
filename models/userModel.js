const dataBase = require('../connections/database')
const {DataTypes} = require('sequelize');

// const variable_name = Sequelizevariable.define()
// define function contains ("model name", {list of column})
const UsersModel = dataBase.define('Users',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement : true,
        allowNull: false,
        primaryKey: true,
        unique: true,
    },
    Name : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_Name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    Password : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Email_id:{
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true,
    },
});

module.exports = UsersModel;
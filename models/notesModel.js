const dataBase = require('../connections/database')
const { DataTypes } = require('sequelize');

const NotesModel = dataBase.define("Notes", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users', // This is a reference to another model
            key: 'id', // This is the column name of the referenced model
        },
    },
    title: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
    unique: true,
},
content: {
    type: DataTypes.STRING,
    allowNull: false,
}
});

module.exports = NotesModel;
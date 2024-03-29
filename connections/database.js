const Sequelize = require('sequelize').Sequelize;

// new Squelize(database_Name, UserName, Password, {Obtions})
const dataBase = new Sequelize("notes_taking_dataBase", 'root','',{
    dialect : 'mysql',
    host: 'localhost',
});

module.exports = dataBase;
const Sequelize = require('sequelize');
const EmployeeModel = require('../models/employee')

const dotenv = require('dotenv');
dotenv.config();

//Initiallising connection string
var dbConfig = {
    username: process.env.USERNAME,
    password: process.env.PASSWORD || 'Temp2121x',
    server: process.env.SERVER || 'localhost',
    database: process.env.DATABASE || 'dene'
};


const sequelize = new Sequelize({
    dialect: 'mssql',
    username: dbConfig.username,
    database: dbConfig.database,
    host: dbConfig.server,
    port: '1433',
    password: dbConfig.password,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    define: {
        timestamps: false,
        freezeTableName: true
    }
})


sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

Employee = EmployeeModel(sequelize, Sequelize)

// Note: using `force: true` will drop the table if it already exists
// Employee.sync({force: true}).then(() => {
//     // Now the `users` table in the database corresponds to the model definition
//     return Employee.create({
//         firstName: 'test',
//         lastName: 'employee',
//         age: 30
//     });
// });


module.exports = {
    sequelize
}


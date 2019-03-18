const Sequelize = require('sequelize');
const EmployeeModel = require('../models/employee')

var Employee;

const databaseConfig = function (connectionUrl) {
    const sequelize = new Sequelize(connectionUrl, {
        // ...
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
    });

    sequelize
        .authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });

    const Employee = EmployeeModel(sequelize)


// Note: using `force: true` will drop the table if it already exists
    Employee.sync({force: true}).then(() => {
        // Now the `users` table in the database corresponds to the model definition
        return Employee.create({
            firstName: 'John',
            lastName: 'Hancock'
        });
    });

}

module.exports = {
    databaseConfig,
    Employee
}


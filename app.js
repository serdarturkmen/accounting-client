//Initiallising node modules
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var schedule = require('node-schedule');
const request = require('request');
const EmployeeModel = require('./api/models/employee')
const Sequelize = require('sequelize');

const db = require('./api/config/db-config');
const sequelize = db.sequelize;

const dotenv = require('dotenv');
dotenv.config();

// Body Parser Middleware
app.use(bodyParser.json());

//CORS Middleware
app.use(function (req, res, next) {
    //Enabling CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

//Setting up server
var server = app.listen(process.env.PORT || 8000, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});


//Initiallising connection string
// var dbConfig = {
//     username: process.env.USERNAME,
//     password: process.env.PASSWORD || 'Temp2121x',
//     server: process.env.SERVER || 'localhost',
//     database: process.env.DATABASE || 'dene'
// };

var connectionUrl = 'mssql://sa:Temp2121x@localhost:1433/master';

// Option 1: Passing parameters separately

// Option 2: Using a connection URI

// const sequelize = new Sequelize(connectionUrl, {
//     // ...
//     dialect: 'mssql',
//     pool: {
//         max: 5,
//         min: 0,
//         acquire: 30000,
//         idle: 10000
//     },
//     define: {
//         timestamps: false,
//         freezeTableName: true
//     }
// });

// const sequelize = new Sequelize({
//     dialect: 'mssql',
//     username: dbConfig.username,
//     database: dbConfig.database,
//     host: dbConfig.server,
//     port: '1433',
//     password: dbConfig.password,
//     pool: {
//         max: 5,
//         min: 0,
//         acquire: 30000,
//         idle: 10000
//     },
//     define: {
//         timestamps: false,
//         freezeTableName: true
//     }
// })
//
//
// sequelize
//     .authenticate()
//     .then(() => {
//         console.log('Connection has been established successfully.');
//     })
//     .catch(err => {
//         console.error('Unable to connect to the database:', err);
//     });
// Employee = EmployeeModel(sequelize, Sequelize)
//
// // Note: using `force: true` will drop the table if it already exists
// Employee.sync({force: true}).then(() => {
//     // Now the `users` table in the database corresponds to the model definition
//     return Employee.create({
//         firstName: 'test',
//         lastName: 'employee',
//         age: 30
//     });
// });


// Option 2: Using a connection URI
// const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname');

// rule for cron job
var rule = new schedule.RecurrenceRule();
rule.second = 35;

Employee = EmployeeModel(sequelize, Sequelize)

var j = schedule.scheduleJob(rule, function (fireDate) {

    Employee.findAll().then(employees => {
        request.post({
            headers: {'content-type': 'application/json'},
            url: 'http://192.168.10.25:8080/api/person',
            body: JSON.stringify(employees)
        }, function (error, response, body) {
            console.log("response is: ", body);
            if (error) {
                console.log(error);
            }
        });
    });

    console.log('This job was supposed to run at ' + fireDate + ', but actually ran at ' + new Date());
});


app.post("/api/db-config", function (req, res) {
    databaseConfig(req.body.connectionUrl);
    res.send(200);
});

app.post("/api/check-connection", function (req, res) {
    sequelize
        .authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
            res.send(200)
        })
        .catch(err => {
            res.send(500)
            console.error('Unable to connect to the database:', err);
        });
    ;
});


//GET API
app.get("/api/employee", function (req, res) {
    Employee.findAll().then(employees => {
        console.log("All users:", JSON.stringify(employees, null, 4));
        res.send(JSON.stringify(employees, null, 4));
    });
});

//POST API
app.post("/api/employee", function (req, res) {
    Employee.create({
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        age: req.body.age
    }).then(employee => {
        res.send(JSON.stringify(employee, null, 4));
    })
});

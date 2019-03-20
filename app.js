//Initiallising node modules
var express = require("express");
var bodyParser = require("body-parser");
var sql = require("mssql");
var app = express();
const Sequelize = require('sequelize');
var schedule = require('node-schedule');
const request = require('request');
const EmployeeModel = require('./api/models/employee')

const db = require('./api/config/db-config');

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
var dbConfig = {
    user: 'sa',
    password: 'Temp2121x',
    server: 'localhost',
    database: 'master'
};

var connectionUrl = 'mssql://sa:Temp2121x@localhost:1433/master';

// Option 1: Passing parameters separately

// Option 2: Using a connection URI

var Employee = null;

var databaseConfig = function (connectionUrl) {
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
    Employee = EmployeeModel(sequelize, Sequelize)

// Note: using `force: true` will drop the table if it already exists
    Employee.sync({force: true}).then(() => {
        // Now the `users` table in the database corresponds to the model definition
        return Employee.create({
            firstName: 'test',
            lastName: 'employee',
            age:30
        });
    });

}

// Option 2: Using a connection URI
// const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname');

// rule for cron job
var rule = new schedule.RecurrenceRule();
rule.second = 15;

var j = schedule.scheduleJob(rule, function(fireDate){

    Employee.findAll().then(employees => {
        request.post({
            headers: {'content-type' : 'application/json'},
            url:     'http://localhost:8080/api/person',
            body: JSON.stringify(employees)
        }, function(error, response, body){
            console.log("response is: ", body);
        });
    });

    console.log('This job was supposed to run at ' + fireDate + ', but actually ran at ' + new Date());
});

request('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
    console.log(body.url);
    console.log(body.explanation);
});

databaseConfig(connectionUrl);

app.post("/api/db-config", function (req, res) {
    databaseConfig(req.body.connectionUrl);
    res.send(200);
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

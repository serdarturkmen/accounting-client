//Initiallising node modules
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var schedule = require('node-schedule');
const request = require('request');
const CapifirmModel = require('./api/models/default/capifirm');
const EmployeeModel = require('./api/models/employee');
const CariAylikToplamModel = require('./api/models/firm/cariAylikToplam');
const CariHesapCardModel = require('./api/models/firm/cariHesapCard');
const CariHesapHareketModel = require('./api/models/firm/cariHesapHareket');

const loginHelper = require('./api/config/login');

const Sequelize = require('sequelize');

const db = require('./api/config/db-config');
const sequelize = db.sequelize;

const dotenv = require('dotenv');
dotenv.config();

let token = null;

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


Employee = EmployeeModel(sequelize, Sequelize);

Capifirm = CapifirmModel(sequelize, Sequelize);

CariAylikToplam = CariAylikToplamModel(sequelize, Sequelize);

CariHesapCard = CariHesapCardModel(sequelize, Sequelize);

CariHesapHareket = CariHesapHareketModel(sequelize, Sequelize);

// rule for cron job
var rule = new schedule.RecurrenceRule();
rule.second = 40;

var j = schedule.scheduleJob(rule, function (fireDate) {

    console.log('This job was supposed to run at ' + fireDate + ', but actually ran at ' + new Date());



    if (token == null) {
        console.log("token is null");
        loginHelper.login("admin", "admin").then(res => {
            token = res;
            console.log("jwt res is: ", res);
            sendCariHesaps();

        })
    } else {
        console.log("token is not null");
        sendCariHesaps();
    }

});

function sendCariHesaps() {
    CariHesapHareket.findAll().then(cariHareket => {
        console.log("All cari hesaps:", JSON.stringify(cariHareket, null, 4));
        request.post({
            headers: {'content-type': 'application/json', 'Authorization': 'Bearer ' + token},
            url: 'http://91.93.186.173:9001/api/cariHesapHareket/all',
            body: JSON.stringify(cariHareket)
        }, function (error, response, body) {
            console.log("response is: ", body);
            if (error) {
                console.log(error);
            }
        });
    });
}

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

//GET Capifirm
app.get("/api/capifirm", function (req, res) {
    Capifirm.findAll().then(capifirms => {
        console.log("All users:", JSON.stringify(capifirms, null, 4));
        res.send(JSON.stringify(capifirms, null, 4));
    });
});

//GET cari hesap aylık
app.get("/api/cari-aylik", function (req, res) {
    CariAylikToplam.findAll().then(cariAyliks => {
        console.log("All users:", JSON.stringify(cariAyliks, null, 4));
        res.send(JSON.stringify(cariAyliks, null, 4));
    });
});

//GET Cari hesap card
app.get("/api/cari-hesap-card", function (req, res) {
    CariHesapCard.findAll().then(capifirms => {
        console.log("All users:", JSON.stringify(capifirms, null, 4));
        res.send(JSON.stringify(capifirms, null, 4));
    });
});

//GET cari hesap hareket
app.get("/api/cari-hesap-hareket", function (req, res) {
    CariHesapHareket.findAll().then(cariHareket => {
        console.log("All users:", JSON.stringify(cariHareket, null, 4));
        res.send(JSON.stringify(cariHareket, null, 4));
    });
});

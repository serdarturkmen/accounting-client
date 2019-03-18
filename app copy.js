//Initiallising node modules
var express = require("express");
var bodyParser = require("body-parser");
var sql = require("mssql");
var app = express();


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
var server = app.listen(process.env.PORT || 8080, function () {
                        var port = server.address().port;
                        console.log("App now running on port", port);
                        });

//Initiallising connection string
var dbConfig = {
user:  'sa',
password: 'Temp2121x',
server: 'localhost',
database:'master'
};

//Function to connect to database and execute query
var  executeQuery = function(res, query){
    sql.connect(dbConfig, function (err) {
                if (err) {
                console.log("Error while connecting database :- " + err);
                res.send(err);
                }
                else {
                // create Request object
                var request = new sql.Request();
                // query to the database
                request.query(query, function (err, rs) {
                              if (err) {
                              console.log("Error while querying database :- " + err);
                              res.send(err);
                              sql.close();
                              }
                              else {
                              res.send(rs);
                              sql.close();
                              }
                              });
                }
                });
}

//GET API
app.get("/api/employee", function(req , res){
        var query = "select * from employee";
        executeQuery (res, query);
        });

//POST API
app.post("/api/employee", function(req , res){
         var query = "INSERT INTO employee (firstname,lastname,age) VALUES (' " + req.body.firstname + " ',' " + req.body.lastname + " ',' " + req.body.age + " ')";
         executeQuery (res, query);
         });

//PUT API
app.put("/api/employee/:id", function(req , res){
        var query = "UPDATE employee SET firstname= " + req.body.firstname  +  " , lastname=  " + req.body.lastname + "  WHERE Id= " + req.params.id;
        executeQuery (res, query);
        });

// DELETE API
app.delete("/api/employee/:id", function(req , res){
           var query = "DELETE FROM employee WHERE Id=" + req.params.id;
           executeQuery (res, query);
           });

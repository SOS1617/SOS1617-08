var moment = require("moment");
var express = require("express");
var bodyParser = require("body-parser");
var helmet = require("helmet");
var path = require('path');
var cors = require("cors");

var publicFolder = path.join(__dirname, '/public');

var wagesAPI = require('./api/v1/wages.js');
var wagesAPI2 = require('./api/v2/wages.js');

var victimsAPI = require('./api/v1/victims.js');


var app = express();

var MongoClient = require('mongodb').MongoClient;
var mdbURL= "mongodb://test:test@ds133450.mlab.com:33450/sandbox";

var port = (process.env.PORT || 10000);
var BASE_API_PATH = "/api/v1";
var BASE_API_PATH2 = "/api/v2";
var dbPaco;
var dbRoberto;

var API_KEY = "hf5HF86KvZ";

var apikeycheck = function(request, response) {
    if (!request.query.apikey) {
        console.error('WARNING: No apikey was sent!');
        response.sendStatus(401);
        return false;
    }
    if (request.query.apikey !== API_KEY) {
        console.error('WARNING: Incorrect apikey was used!');
        response.sendStatus(403);
        return false;
    }
    return true;
};
app.use(cors());

app.use(bodyParser.json());
app.use(helmet());

MongoClient.connect(mdbURL, {
    native_parser: true
}, function(err, database) {

    if (err) {
        console.log("CAN NOT CONNECT TO DB: " + err);
        process.exit(1);
    }

    dbPaco = database.collection("victims-stats");
    dbRoberto = database.collection("wagess");

    wagesAPI.register(app, dbRoberto, BASE_API_PATH, apikeycheck);

    victimsAPI.register(app, dbPaco, BASE_API_PATH, apikeycheck);


    app.listen(port, () => {
        console.log("Web server is listening on port " + port);
    });

});

app.use("/", express.static(publicFolder));

//postman
//tests

app.use("/api/v1/tests", express.static(path.join(__dirname, "public/tests.html")));


app.get("/proxy/wages", (req, res) => {
    var http = require('http');

    var options = {
        host: 'sos1617-07.herokuapp.com',
        path: '/api/v1/investEducationStats/?apikey=sos07'
    };
    var request = http.request(options, (response) => {
        var str = '';
        response.on('data', function(chunk) {
            str += chunk;
        });

        response.on('end', function() {
            res.send(str);
        });
    });

    request.on('error', function(e) {
        res.sendStatus(503);
    });

    request.end();
});


app.get("/proxy/victims",(req,res)=>{
    var http = require('http');
    
    var options = {
        host: 'sos1617-02.herokuapp.com',
        path: '/api/v1/smi-stats?apikey=rXD8D2b1vP'
    };
    var request = http.request(options, (response) => {
        var str = '';
        response.on('data', function(chunk) {
            str += chunk;
        });

        response.on('end', function() {
            res.send(str);
        });
    });

    request.on('error', function(e) {
        res.sendStatus(503);
    });

    request.end();
});








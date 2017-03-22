"use strict";
/* global __dirname */

var express = require("express");
var bodyParser = require("body-parser");
var helmet = require("helmet");
var path = require('path');
var DataStore = require('nedb');

var port = (process.env.PORT || 10000);
var BASE_API_PATH = "/api/v1";

var dbFileName = path.join(__dirname, 'provinces.db');

var db = new DataStore({
    filename: dbFileName,
    autoload: true
});

var app = express();

app.use(bodyParser.json()); //use default json enconding/decoding
app.use(helmet()); //improve security

// @see: https://curlbuilder.com/
// @see: https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html
// @see: https://i.stack.imgur.com/whhD1.png
// @see: https://blog.agetic.gob.bo/2016/07/elegir-un-codigo-de-estado-http-deja-de-hacerlo-dificil/

console.log("---BEGIN PROBAR LA API CON CURL---");
console.log("curl -v -XGET -H 'Content-type: application/json'  'http://localhost:8080/api/v1/provinces'");
console.log("curl -v -XPOST -H 'Content-type: application/json' -d '{ \"name\": \"David\", \"phone\": \"954556350\", \"email\": \"david@example.com\" }' 'http://localhost:8080/api/v1/provinces'");
console.log("curl -v -XGET -H 'Content-type: application/json'  'http://localhost:8080/api/v1/provinces/David'");
console.log("curl -v -XPUT -H 'Content-type: application/json' -d '{ \"name\": \"Antonio\", \"phone\": \"954556350\", \"email\": \"antonio@example.com\" }' 'http://localhost:8080/api/v1/provinces'");
console.log("curl -v -XPUT -H 'Content-type: application/json' -d '{ \"name\": \"Antonio\", \"phone\": \"954556350\", \"email\": \"antonio@example.com\" }' 'http://localhost:8080/api/v1/provinces/David'");
console.log("curl -v -XGET -H 'Content-type: application/json'  'http://localhost:8080/api/v1/provinces/David'");
console.log("curl -v -XGET -H 'Content-type: application/json'  'http://localhost:8080/api/v1/provinces/Antonio'");
console.log("curl -v -XDELETE -H 'Content-type: application/json'  'http://localhost:8080/api/v1/provinces/Antonio'");
console.log("curl -v -XGET -H 'Content-type: application/json'  'http://localhost:8080/api/v1/provinces/Antonio'");
console.log("curl -v -XDELETE -H 'Content-type: application/json'  'http://localhost:8080/api/v1/provinces'");
console.log("curl -v -XGET -H 'Content-type: application/json'  'http://localhost:8080/api/v1/provinces'");
console.log("---END PROBAR LA API CON CURL---");


db.find({}, function (err, provinces) {
    console.log('INFO: Initialiting DB...');

    if (err) {
        console.error('WARNING: Error while getting initial data from DB');
        return 0;
    }


    if (provinces.length === 0) {
        console.log('INFO: Empty DB, loading initial data');

        var province = [{
                "province": "Seville",
                "year": "2015",
                "varied": "1,23%",
                "averageWage": "15.921"
            },
            {
                "province": "Madrid",
                "year": "2015",
                "varied": "0,66%",
                "averageWage": "24.734"
                
            },
            {
                "province": "Barcelona",
                "year": "2015",
                "varied": "1,29%",
                "averageWage": "22.153"
            },
            {
                "province": "Valencia",
                "year": "2015",
                "varied": "1,35%",
                "averageWage": "18.052"
            }];
        db.insert(province);
    } else {
        console.log('INFO: DB has ' + provinces.length + ' provinces ');
    }
});

// Base GET
app.get("/", function (request, response) {
    console.log("INFO: Redirecting to /provinces");
    response.redirect(301, BASE_API_PATH + "/provinces");
});


// GET a collection
app.get(BASE_API_PATH + "/provinces", function (request, response) {
    console.log("INFO: New GET request to /provinces");
    db.find({}, function (err, provinces) {
        if (err) {
            console.error('WARNING: Error getting data from DB');
            response.sendStatus(500); // internal server error
        } else {
            console.log("INFO: Sending provinces: " + JSON.stringify(provinces, 2, null));
            response.send(provinces);
        }
    });
});

 function isLetter(param)
{
  return param.match("^[a-zA-Z\(\)]+$");    
}
// GET a single resource
app.get(BASE_API_PATH + "/provinces/:year", function (request, response) {
    var param = request.params.year;
    if (!param) {
        console.log("WARNING: New GET request to /provinces/:year without name, sending 400...");
        response.sendStatus(400); // bad request
    } else if(!isLetter(param)){
        console.log("INFO: New GET request to /provinces/" + param);
        db.find({year : param}, function (err, provinces) {
            if (err) {
                console.error('WARNING: Error getting data from DB');
                response.sendStatus(500); // internal server error
            } else {
                var filteredprovinces = provinces.filter((province) => {
                    return (province.year.localeCompare(param, "en", {'sensitivity': 'base'}) === 0);
                });
                if (filteredprovinces.length > 0) {
                    var province = filteredprovinces[0]; //since we expect to have exactly ONE contact with this name
                    console.log("INFO: Sending province: " + JSON.stringify(province, 2, null));
                    response.send(province);
                } else {
                    console.log("WARNING: There are not any contact with year " + param);
                    response.sendStatus(404); // not found
                }
            }
        });
    }else{
        console.log("INFO: New GET request to /provinces/" + param);
        db.find({province : param}, function (err, provinces) {
            if (err) {
                console.error('WARNING: Error getting data from DB');
                response.sendStatus(500); // internal server error
            } else {
                var filteredprovinces = provinces.filter((province) => {
                    return (province.province.localeCompare(param, "en", {'sensitivity': 'base'}) === 0);
                });
                if (filteredprovinces.length > 0) {
                    var province = filteredprovinces[0]; //since we expect to have exactly ONE contact with this name
                    console.log("INFO: Sending province: " + JSON.stringify(province, 2, null));
                    response.send(province);
                } else {
                    console.log("WARNING: There are not any contact with name " + param);
                    response.sendStatus(404); // not found
                }
            }
        });
        
    }
});


//POST over a collection
app.post(BASE_API_PATH + "/provinces", function (request, response) {
    var newContact = request.body;
    if (!newContact) {
        console.log("WARNING: New POST request to /provinces/ without contact, sending 400...");
        response.sendStatus(400); // bad request
    } else {
        console.log("INFO: New POST request to /provinces with body: " + JSON.stringify(newContact, 2, null));
        if (!newContact.name || !newContact.phone || !newContact.email) {
            console.log("WARNING: The contact " + JSON.stringify(newContact, 2, null) + " is not well-formed, sending 422...");
            response.sendStatus(422); // unprocessable entity
        } else {
            db.find({}, function (err, provinces) {
                if (err) {
                    console.error('WARNING: Error getting data from DB');
                    response.sendStatus(500); // internal server error
                } else {
                    var provincesBeforeInsertion = provinces.filter((contact) => {
                        return (contact.name.localeCompare(newContact.name, "en", {'sensitivity': 'base'}) === 0);
                    });
                    if (provincesBeforeInsertion.length > 0) {
                        console.log("WARNING: The contact " + JSON.stringify(newContact, 2, null) + " already extis, sending 409...");
                        response.sendStatus(409); // conflict
                    } else {
                        console.log("INFO: Adding contact " + JSON.stringify(newContact, 2, null));
                        db.insert(newContact);
                        response.sendStatus(201); // created
                    }
                }
            });
        }
    }
});


//POST over a single resource
app.post(BASE_API_PATH + "/provinces/:name", function (request, response) {
    var name = request.params.name;
    console.log("WARNING: New POST request to /provinces/" + name + ", sending 405...");
    response.sendStatus(405); // method not allowed
});


//PUT over a collection
app.put(BASE_API_PATH + "/provinces", function (request, response) {
    console.log("WARNING: New PUT request to /provinces, sending 405...");
    response.sendStatus(405); // method not allowed
});


//PUT over a single resource
app.put(BASE_API_PATH + "/provinces/:name", function (request, response) {
    var updatedContact = request.body;
    var name = request.params.name;
    if (!updatedContact) {
        console.log("WARNING: New PUT request to /provinces/ without contact, sending 400...");
        response.sendStatus(400); // bad request
    } else {
        console.log("INFO: New PUT request to /provinces/" + name + " with data " + JSON.stringify(updatedContact, 2, null));
        if (!updatedContact.name || !updatedContact.phone || !updatedContact.email) {
            console.log("WARNING: The contact " + JSON.stringify(updatedContact, 2, null) + " is not well-formed, sending 422...");
            response.sendStatus(422); // unprocessable entity
        } else {
            db.find({}, function (err, provinces) {
                if (err) {
                    console.error('WARNING: Error getting data from DB');
                    response.sendStatus(500); // internal server error
                } else {
                    var provincesBeforeInsertion = provinces.filter((contact) => {
                        return (contact.name.localeCompare(name, "en", {'sensitivity': 'base'}) === 0);
                    });
                    if (provincesBeforeInsertion.length > 0) {
                        db.update({name: name}, updatedContact);
                        console.log("INFO: Modifying contact with name " + name + " with data " + JSON.stringify(updatedContact, 2, null));
                        response.send(updatedContact); // return the updated contact
                    } else {
                        console.log("WARNING: There are not any contact with name " + name);
                        response.sendStatus(404); // not found
                    }
                }
            });
        }
    }
});


//DELETE over a collection
app.delete(BASE_API_PATH + "/provinces", function (request, response) {
    console.log("INFO: New DELETE request to /provinces");
    db.remove({}, {multi: true}, function (err, numRemoved) {
        if (err) {
            console.error('WARNING: Error removing data from DB');
            response.sendStatus(500); // internal server error
        } else {
            if (numRemoved > 0) {
                console.log("INFO: All the provinces (" + numRemoved + ") have been succesfully deleted, sending 204...");
                response.sendStatus(204); // no content
            } else {
                console.log("WARNING: There are no provinces to delete");
                response.sendStatus(404); // not found
            }
        }
    });
});


//DELETE over a single resource
app.delete(BASE_API_PATH + "/provinces/:name", function (request, response) {
    var name = request.params.name;
    if (!name) {
        console.log("WARNING: New DELETE request to /provinces/:name without name, sending 400...");
        response.sendStatus(400); // bad request
    } else {
        console.log("INFO: New DELETE request to /provinces/" + name);
        db.remove({name: name}, {}, function (err, numRemoved) {
            if (err) {
                console.error('WARNING: Error removing data from DB');
                response.sendStatus(500); // internal server error
            } else {
                console.log("INFO: provinces removed: " + numRemoved);
                if (numRemoved === 1) {
                    console.log("INFO: The contact with name " + name + " has been succesfully deleted, sending 204...");
                    response.sendStatus(204); // no content
                } else {
                    console.log("WARNING: There are no provinces to delete");
                    response.sendStatus(404); // not found
                }
            }
        });
    }
});


app.listen(port);
console.log("Magic is happening on port " + port);
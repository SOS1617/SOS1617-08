var exports = module.exports = {};

exports.register = function(app, dbRoberto, BASE_API_PATH,apiKeyCheck) {

///CREACIÓN DE LA APIKEY///

var apiKeyRoberto = "hf5HF86KvZ";



//Load Initial Data
app.get(BASE_API_PATH + "/wages/loadInitialData",function(request, response) {
       if(apiKeyCheck(request,response)==true){

    dbRoberto.find({}).toArray(function(err,wages){
        
         if (err) {
        console.error('WARNING: Error while getting initial data from DB');
        return 0;
    }
    
      if (wages.length === 0) {
        console.log('INFO: Empty DB, loading initial data');

       var province = [{
                "province": "Seville",
                "year": "2015",
                "varied": "1.23",
                "averageWage": "15.921"
            },
            {
                "province": "Madrid",
                "year": "2014",
                "varied": "0.66",
                "averageWage": "24.734"
                
            },
            {
                "province": "Barcelona",
                "year": "2013",
                "varied": "1.29",
                "averageWage": "22.153"
            },
            {
                "province": "Malaga",
                "year": "2016",
                "varied": "1.05",
                "averageWage": "17.953"
            },
            {
                "province": "Bilbao",
                "year": "2013",
                "varied": "1.21",
                "averageWage": "19.633"
            },
            {
                "province": "Valencia",
                "year": "2012",
                "varied": "1.35",
                "averageWage": "18.052"
            }];
        dbRoberto.insert(province);
        response.sendStatus(201) //created
    } else {
            

        console.log('INFO: DB has ' + wages.length + ' wages ');
            response.sendStatus(200) //created
        
    }
});
}
});

  
 // GET Collection (WITH SEARCH)

app.get(BASE_API_PATH + "/wages", function (request, response) {
    if (!apiKeyCheck(request, response)) return;
    console.log("INFO: New GET request to /wages");
    
            var limit = parseInt(request.query.limit);
            var offset = parseInt(request.query.offset);
            var from = request.query.from;
            var to = request.query.to;
            var aux = [];
            var aux2= [];
            var aux3 = [];

            
            if (limit && offset >=0) {
            dbRoberto.find({}).skip(offset).limit(limit).toArray(function(err, wages) {
                if (err) {
                    console.error('WARNING: Error getting data from DB');
                     response.sendStatus(500); // internal server error
                } else {
                     if (wages.length === 0) {
                            response.send(aux3);
                            return;
                        }
                    console.log("INFO: Sending wages: " + JSON.stringify(wages, 2, null));
                    if (from && to) {

                            aux = buscador(wages, aux, from, to);
                            if (aux.length > 0) {
                                aux2 = aux.slice(offset, offset+limit);
                                console.log("INFO: Sending results with from and to and limit and offset: " + JSON.stringify(aux, 2, null));
                                console.log("INFO: Sending results with from and to and limit and offset: " + JSON.stringify(wages, 2, null));
                                console.log("INFO: Sending results with from and to and limit and offset: " + JSON.stringify(aux2, 2, null));
                                response.send(aux2);
                            }
                            else {
                                response.sendStatus(404); // No content 
                                return;
                            }
                        }
                        else {
                            response.send(wages);
                        }
                }
            });
            
            }
            else {

                dbRoberto.find({}).toArray(function(err, wages) {
                    if (err) {
                        console.error('ERROR from database');
                        response.sendStatus(500); // internal server error
                    }
                    else {
                        if (wages.length === 0) {
                            response.sendStatus(204);
                            return;
                        }
                        console.log("INFO: Sending wages: " + JSON.stringify(wages, 2, null));
                        if (from && to) {
                            aux = buscador(wages, aux, from, to);
                            if (aux.length > 0) {
                                response.send(aux);
                            }
                            else {
                                response.sendStatus(404); //Not found
                                return;
                            }
                        }
                        else {
                            response.send(wages);
                        }
                    }
                });
            }

});


// SEARCH FUNCTION

var buscador = function(base, conjuntoauxiliar, desde, hasta) {

    var from = parseInt(desde);
    var to = parseInt(hasta);


    for (var j = 0; j < base.length; j++) {
        var anyo = base[j].year;
        if (to >= anyo && from <= anyo) {

            conjuntoauxiliar.push(base[j]);
        }
    }

    return conjuntoauxiliar;

};


/*
// GET a collection
app.get(BASE_API_PATH + "/wages", function (request, response) {
        if(apiKeyCheck(request,response)==true){

    console.log("INFO: New GET request to /wages");
    dbRoberto.find({}).toArray( function (err, wages) {
        if (err) {
            console.error('WARNING: Error getting data from DB');
            response.sendStatus(500); // internal server error
        } else {
            console.log("INFO: Sending wages: " + JSON.stringify(wages, 2, null));
            response.send(wages);
        }
    });
        }
});

*/
// GET a collection de paises en un mismo año 

app.get(BASE_API_PATH + "/wages/:year", function (request, response) {
        if(apiKeyCheck(request,response)==true){

    var year = request.params.year;
    var province = request.params.year;
    if(isNaN(request.params.year.charAt(0))){
            if (!province) {
        console.log("WARNING: New GET request to /wages/:province without name, sending 400...");
        response.sendStatus(400); // bad request
    } else {
        console.log("INFO: New GET request to /provices/" + province);
        dbRoberto.find({province:province}).toArray(function (err, results) {
            if (err) {
                console.error('WARNING: Error getting data from DB');
                response.sendStatus(500); // internal server error
            } else if (results.length > 0) { 
                    var result = results; //since we expect to have exactly ONE province with this name
                    console.log("INFO: Sending result: " + JSON.stringify(result, 2, null));
                    response.send(result);
                } else {
                    console.log("WARNING: There are not any result with province " + province);
                    response.sendStatus(404); // not found
                }
        });
}
    }else{
    if (!year) {
        console.log("WARNING: New GET request to /wages/:year without year, sending 400...");
        response.sendStatus(400); // bad request
    } else {
        console.log("INFO: New GET request to /wages/" + year);
        dbRoberto.find({year:year}).toArray(function (err, results) {
            if (err) {
                console.error('WARNING: Error getting data from DB');
                response.sendStatus(500); // internal server error
            } else if (results.length > 0) { 
                    var result = results; //since we expect to have exactly ONE province with this name
                    console.log("INFO: Sending result: " + JSON.stringify(result, 2, null));
                    response.send(result);
                } else {
                    console.log("WARNING: There are not any result with year " + year);
                    response.sendStatus(404); // not found
                
                }
        });
}}
}});


//GET a recurso concreto con 2 parametros

app.get(BASE_API_PATH + "/wages/:province/:year", function (request, response) {
    var province = request.params.province;
    var year = request.params.year;
        if(apiKeyCheck(request,response)==true){

    if (!province || !year) {
        console.log("WARNING: New GET request to /wages/:province without name or without year, sending 400...");
        response.sendStatus(400); // bad request
    } else {
        console.log("INFO: New GET request to /wages/" + province + "/" + year);
        dbRoberto.find({province:province, $and:[{year:year}]}).toArray(function (err, results) {
            if (err) {
                console.error('WARNING: Error getting data from DB');
                response.sendStatus(500); // internal server error
            } else if (results.length > 0) { 
                    var result = results[0]; //since we expect to have exactly ONE province with this name
                    console.log("INFO: Sending result: " + JSON.stringify(result, 2, null));
                    response.send(result);
                } else {
                    console.log("WARNING: There are not any province with name " + province +  "and year " + year);
                    response.sendStatus(404); // not found
                
                }
        });
}}
});


//POST over a collection
app.post(BASE_API_PATH + "/wages", function (request, response) {
    var newstat = request.body;
        if(apiKeyCheck(request,response)==true){

    if (!newstat) {
        console.log("WARNING: New POST request to /wages/ without stat, sending 400...");
        response.sendStatus(400); // bad request
    } else {
        console.log("INFO: New POST request to /wages with body: " + JSON.stringify(newstat, 2, null));
        if (!newstat.province || !newstat.year ||  !newstat.varied || !newstat.averageWage) {
            console.log("WARNING: The stat " + JSON.stringify(newstat, 2, null) + " is not well-formed, sending 422...");
            response.sendStatus(422); // unprocessable entity
        } else {
            dbRoberto.find({}).toArray( function (err, wages) {
                if (err) {
                    console.error('WARNING: Error getting data from DB');
                    response.sendStatus(500); // internal server error
                } else {
                    var wagesBeforeInsertion = wages.filter((stats) => {
                        return (stats.province.localeCompare(newstat.province, "en", {'sensitivity': 'base'}) === 0) && (stats.year.localeCompare(newstat.year, "en", {'sensitivity': 'base'}) === 0);
                    });
                    if (wagesBeforeInsertion.length > 0) {
                        console.log("WARNING: The stat " + JSON.stringify(newstat, 2, null) + " already extis, sending 409...");
                        response.sendStatus(409); // conflict
                    } else {
                        console.log("INFO: Adding stat " + JSON.stringify(newstat, 2, null));
                        dbRoberto.insert(newstat);
                        response.sendStatus(201); // created
                    }
                }
            });
        }
    }}
});

//a

//POST over a single resource NO PERMITIDO
app.post(BASE_API_PATH + "/wages/:province", function (request, response) {
    var province = request.params.province;
        if(apiKeyCheck(request,response)==true){

    console.log("WARNING: New POST request to /wages/" + province + ", sending 405...");
    response.sendStatus(405); // method not allowed
        }
});


//PUT over a collection NO PERMITIDO
app.put(BASE_API_PATH + "/wages", function (request, response) {
        if(apiKeyCheck(request,response)==true){

    console.log("WARNING: New PUT request to /wages, sending 405...");
    response.sendStatus(405); // method not allowed
        }
});


//PUT over a single resource
app.put(BASE_API_PATH + "/wages/:province/:year", function (request, response) {
    var updatedStat = request.body;
    var province = request.params.province;
    var year = request.params.year;
        if(apiKeyCheck(request,response)==true){


    if (!updatedStat) {
        console.log("WARNING: New PUT request to /wages/ without stat, sending 400...");
        response.sendStatus(400); // bad request
    } else {
        console.log("INFO: New PUT request to /wages/" + province + " with data " + JSON.stringify(updatedStat, 2, null));
        if (!updatedStat.province || !updatedStat.year ||  !updatedStat.varied || !updatedStat.averageWage) {
            console.log("WARNING: The stat " + JSON.stringify(updatedStat, 2, null) + " is not well-formed, sending 422...");
            response.sendStatus(422); // unprocessable entity
        } else {
            dbRoberto.find({province:province, $and:[{year:year}]}).toArray( function (err, wages) {
                if (err) {
                    console.error('WARNING: Error getting data from DB');
                    response.sendStatus(500); // internal server error
                } else if (wages.length > 0) {
                        dbRoberto.update({province: province, year: year}, updatedStat);
                        console.log("INFO: Modifying result with proviç " + province + " with data " + JSON.stringify(updatedStat, 2, null));
                        response.send(updatedStat); // return the updated province
                    } else {
                        console.log("WARNING: There are not any result with province " + province);
                        response.sendStatus(404); // not found
                    }
                }
            )}
        }}
    });
           
           
//DELETE over a collection
app.delete(BASE_API_PATH + "/wages", function (request, response) {
        if(apiKeyCheck(request,response)==true){

    console.log("INFO: New DELETE request to /wages");
    dbRoberto.remove({}, {multi: true}, function (err, numRemoved) {
        if (err) {
            console.error('WARNING: Error removing data from DB');
            response.sendStatus(500); // internal server error
        } else {
            if (numRemoved > 0) {
                console.log("WARNING: There are no provinces to delete");
                response.sendStatus(404); // no content
            } else {
                console.log("INFO: All the provinces (" + numRemoved + ") have been succesfully deleted, sending 204...");
                response.sendStatus(204); // not found
            }
        }
    });
        }
});



//DELETE over a single resource
app.delete(BASE_API_PATH + "/wages/:province/:year", function (request, response) {
    var province = request.params.province;
    var year = request.params.year;
        if(apiKeyCheck(request,response)==true){

    if (!province || !year) {
        console.log("WARNING: New DELETE request to /wages/:province/:year without province and year, sending 400...");
        response.sendStatus(400); // bad request
    } else {
        console.log("INFO: New DELETE request to /wages/" + province + " and year " + year);
        dbRoberto.remove({province:province, $and:[{year:year}]}, {}, function (err, result) {
            var numRemoved= JSON.parse(result);
            if (err) {
                console.error('WARNING: Error removing data from DB');
                response.sendStatus(500); // internal server error
            } else {
                console.log("INFO: Results removed: " + numRemoved.n);
                if (numRemoved.n === 1) {
                    console.log("INFO: The result with province " + province + "and year " + year + " has been succesfully deleted, sending 204...");
                    response.sendStatus(204); // not found
                } else {
                    console.log("WARNING: There are no provinces to delete");
                    response.sendStatus(404); // no content
                }
            }
        });
    }}
});



};
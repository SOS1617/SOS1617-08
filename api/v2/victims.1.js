var exports = module.exports = {};

// Register all the functions used in this module
exports.register = function(app, dbPaco, BASE_API_PATH2) {
    

//Load Initial Data
app.get(BASE_API_PATH2 + "/victims/loadInitialData",function(request, response) {
        

    dbPaco.find({}).toArray(function(err,victims){
        
         if (err) {
        console.error('WARNING: Error while getting initial data from DB');
        return 0;
    }
    
      if (victims.length === 0) {
        console.log('INFO: Empty DB, loading initial data');

       var province = [{
                "province": "Cadiz",
                "year": "2015",
                "numberVictims": "2",
                "averageYears": "41"
            },
            {
                "province": "Murcia",
                "year": "2003",
                "numberVictims": "3",
                "averageYears": "28"
                
            },
            {
                "province": "Baleares",
                "year": "2016",
                "numberVictims": "6",
                "averageYears": "40"
            }];
        dbPaco.insert(province);
        response.sendStatus(201) //created
    } else {
            

        console.log('INFO: DB has ' + victims.length + ' victims ');
            response.sendStatus(200) //created
        
    }
});

});

  
 // GET Collection (WITH SEARCH)

app.get(BASE_API_PATH2 + "/victims", function (request, response) {
    
    console.log("INFO: New GET request to /victims");
    
            var limit = parseInt(request.query.limit);
            var offset = parseInt(request.query.offset);
            var from = request.query.from;
            var to = request.query.to;
            var aux = [];
            var aux2= [];

            
            if (limit && offset >=0) {
            dbPaco.find({}).skip(offset).limit(limit).toArray(function(err, victims) {
                if (err) {
                    console.error('WARNING: Error getting data from DB');
                     response.sendStatus(500); // internal server error
                } else {
                     if (victims.length === 0) {
                            response.sendStatus(404);
                        }
                    console.log("INFO: Sending victims: " + JSON.stringify(victims, 2, null));
                    if (from && to) {

                            aux = buscador(victims, aux, from, to);
                            if (aux.length > 0) {
                                aux2 = aux.slice(offset, offset+limit);
                                console.log("INFO: Sending results with from and to and limit and offset: " + JSON.stringify(aux, 2, null));
                                console.log("INFO: Sending results with from and to and limit and offset: " + JSON.stringify(victims, 2, null));
                                console.log("INFO: Sending results with from and to and limit and offset: " + JSON.stringify(aux2, 2, null));
                                response.send(aux2);
                            }
                            else {
                                response.sendStatus(404); 
                            }
                        }
                        else {
                            response.send(victims);
                        }
                }
            });
            
            }
            else {

                dbPaco.find({}).toArray(function(err, victims) {
                    if (err) {
                        console.error('ERROR from database');
                        response.sendStatus(500); // internal server error
                    }
                    else {
                        if (victims.length === 0) {
                            response.sendStatus(204);
                            return;
                        }
                        console.log("INFO: Sending victims: " + JSON.stringify(victims, 2, null));
                        if (from && to) {
                            aux = buscador(victims, aux, from, to);
                            if (aux.length > 0) {
                                response.send(aux);
                            }
                            else {
                                response.sendStatus(404); //No content
                            }
                        }
                        else {
                            response.send(victims);
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
        var anio = base[j].year;
        if (to >= anio && from <= anio) {

            conjuntoauxiliar.push(base[j]);
        }
    }

    return conjuntoauxiliar;

};



// GET a collection de paises en un mismo año 

app.get(BASE_API_PATH2 + "/victims/:year", function (request, response) {
       

    var year = request.params.year;
    var province = request.params.year;
    if(isNaN(request.params.year.charAt(0))){
            if (!province) {
        console.log("WARNING: New GET request to /victims/:province without name, sending 400...");
        response.sendStatus(400); // bad request
    } else {
        console.log("INFO: New GET request to /provices/" + province);
        dbPaco.find({province:province}).toArray(function (err, results) {
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
        console.log("WARNING: New GET request to /victims/:year without year, sending 400...");
        response.sendStatus(400); // bad request
    } else {
        console.log("INFO: New GET request to /victims/" + year);
        dbPaco.find({year:year}).toArray(function (err, results) {
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
});


//GET a recurso concreto con 2 parametros

app.get(BASE_API_PATH2 + "/victims/:province/:year", function (request, response) {
    var province = request.params.province;
    var year = request.params.year;
      

    if (!province || !year) {
        console.log("WARNING: New GET request to /victims/:province without name or without year, sending 400...");
        response.sendStatus(400); // bad request
    } else {
        console.log("INFO: New GET request to /victims/" + province + "/" + year);
        dbPaco.find({province:province, $and:[{year:year}]}).toArray(function (err, results) {
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
}
});


//POST over a collection
app.post(BASE_API_PATH2 + "/victims", function (request, response) {
    var newstat = request.body;

    if (!newstat) {
        console.log("WARNING: New POST request to /victims/ without stat, sending 400...");
        response.sendStatus(400); // bad request
    } else {
        console.log("INFO: New POST request to /victims with body: " + JSON.stringify(newstat, 2, null));
        if (!newstat.province || !newstat.year ||  !newstat. numberVictims || !newstat. averageYears) {
            console.log("WARNING: The stat " + JSON.stringify(newstat, 2, null) + " is not well-formed, sending 422...");
            response.sendStatus(422); // unprocessable entity
        } else {
            dbPaco.find({}).toArray( function (err, victims) {
                if (err) {
                    console.error('WARNING: Error getting data from DB');
                    response.sendStatus(500); // internal server error
                } else {
                    var victimsBeforeInsertion = victims.filter((stats) => {
                        return (stats.province.localeCompare(newstat.province, "en", {'sensitivity': 'base'}) === 0) && (stats.year.localeCompare(newstat.year, "en", {'sensitivity': 'base'}) === 0);
                    });
                    if (victimsBeforeInsertion.length > 0) {
                        console.log("WARNING: The stat " + JSON.stringify(newstat, 2, null) + " already extis, sending 409...");
                        response.sendStatus(409); // conflict
                    } else {
                        console.log("INFO: Adding stat " + JSON.stringify(newstat, 2, null));
                        dbPaco.insert(newstat);
                        response.sendStatus(201); // created
                    }
                }
            });
        }
    }
});

//a

//POST over a single resource NO PERMITIDO
app.post(BASE_API_PATH2 + "/victims/:province", function (request, response) {
    var province = request.params.province;
       
    console.log("WARNING: New POST request to /victims/" + province + ", sending 405...");
    response.sendStatus(405); // method not allowed
        
});


//PUT over a collection NO PERMITIDO
app.put(BASE_API_PATH2 + "/victims", function (request, response) {
        

    console.log("WARNING: New PUT request to /victims, sending 405...");
    response.sendStatus(405); // method not allowed
        
});


//PUT over a single resource
app.put(BASE_API_PATH2 + "/victims/:province/:year", function (request, response) {
    var updatedStat = request.body;
    var province = request.params.province;
    var year = request.params.year;
        
    if (!updatedStat) {
        console.log("WARNING: New PUT request to /victims/ without stat, sending 400...");
        response.sendStatus(400); // bad request
    } else {
        console.log("INFO: New PUT request to /victims/" + province + " with data " + JSON.stringify(updatedStat, 2, null));
        if (!updatedStat.province || !updatedStat.year ||  !updatedStat. numberVictims || !updatedStat. averageYears) {
            console.log("WARNING: The stat " + JSON.stringify(updatedStat, 2, null) + " is not well-formed, sending 422...");
            response.sendStatus(422); // unprocessable entity
        } else {
            dbPaco.find({province:province, $and:[{year:year}]}).toArray( function (err, victims) {
                if (err) {
                    console.error('WARNING: Error getting data from DB');
                    response.sendStatus(500); // internal server error
                } else if (victims.length > 0) {
                        dbPaco.update({province: province, year: year}, updatedStat);
                        console.log("INFO: Modifying result with proviç " + province + " with data " + JSON.stringify(updatedStat, 2, null));
                        response.send(updatedStat); // return the updated province
                    } else {
                        console.log("WARNING: There are not any result with province " + province);
                        response.sendStatus(404); // not found
                    }
                }
            )}
        }
    });
           
           
//DELETE over a collection
app.delete(BASE_API_PATH2 + "/victims", function (request, response) {

    console.log("INFO: New DELETE request to /victims");
    dbPaco.remove({}, {multi: true}, function (err, numRemoved) {
        if (err) {
            console.error('WARNING: Error removing data from DB');
            response.sendStatus(500); // internal server error
        } else {
            if (numRemoved > 0) {
                console.log("WARNING: There are no victims to delete");
                response.sendStatus(404); // no content
            } else {
                console.log("INFO: All the victims (" + numRemoved + ") have been succesfully deleted, sending 204...");
                response.sendStatus(204); // not found
            }
        }
    });
        
});



//DELETE over a single resource
app.delete(BASE_API_PATH2 + "/victims/:province/:year", function (request, response) {
    var province = request.params.province;
    var year = request.params.year;
       
    if (!province || !year) {
        console.log("WARNING: New DELETE request to /victims/:province/:year without province and year, sending 400...");
        response.sendStatus(400); // bad request
    } else {
        console.log("INFO: New DELETE request to /victims/" + province + " and year " + year);
        dbPaco.remove({province:province, $and:[{year:year}]}, {}, function (err, result) {
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
                    console.log("WARNING: There are no victims to delete");
                    response.sendStatus(404); // no content
                }
            }
        });
    }
});

};
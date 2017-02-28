var express = require("express");

var app = express();

var port = (process.env.PORT || 17768);

var dateFormat = require('dateformat');

var time = new Date();

var hora=time.getHours();
hora=hora+1;
time.setHours(hora);

app.listen(port, (err) => {
    if (!err)
        console.log("Server initialized on port " + port);
    else
        console.log("ERROR initializing server on port"+port+ ": "+ err);
});

app.get("/time", (req, res) => {
    res.send("<html><body><h1>" + '"' + dateFormat(time, "dS mmmm 'of' yyyy, HH:MM:ss") + '"' + "</h1></body><html>");
});

app.get("/", (req, res) => {
    res.send("<html><body><h1><a href=/time>/time</a></h1></body><html>");
});
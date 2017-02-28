var express = require("express");

var port= (process.env.PORT || 16778);


var app = express();

app.listen(16778);

app.get("/",(req,res)=>{
    
    res.send("<html><body> "+ cool() +"</body></html>")
});

app.listen (port,(err)=> {
    if(!err)
        console.log("Server initialized on port"+port);
    else 
        console.log("ERROR initializing server on port"+port+ ": "+ err);
});

console.log("---------------------");



const express = require('express');

let app = express();

/* ROUTES */

app.get('/', function(req,res){
    res.send("<h1>Hello from Express</h1>");
})

/* END ROUTES */



app.listen(3000, ()=>{
    console.log("Server started")
})
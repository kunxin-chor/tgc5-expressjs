const express = require('express');

let app = express();

/* ROUTES */

app.get('/', function(req,res){
    res.send("<h1>Hello from Express</h1>");
})

/*
ROUTE PARAMETERS:
@app.get("/add/<n1>/</n2>"):
def add_two(n1, n2):
  return n1 + n2
*/

app.get('/add/:n1/:n2', (req,res)=>{
    let n1 = parseInt(req.params.n1);
    let n2 = parseInt(req.params['n2']);
    let total = n1 + n2;
    res.send("Total =" + total);
})



/* END ROUTES */



app.listen(3000, ()=>{
    console.log("Server started")
})
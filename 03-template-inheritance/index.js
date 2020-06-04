const express = require('express');  // eqv. import in Python --> from express import express
const hbs = require('hbs');

/* 1. SETUP EXPRESS */
let app = express();

// setup the static folder
app.use(express.static('public'));

// setup the view engine aka - how are we going to render our templates (i.e, views)
app.set('view engine', 'hbs');  // choice of pug, jade, ejs etc. to be our view engines

// setup the form processing
app.use(express.urlencoded({extended:false}));
app.use(express.json());

/* 1B. SETUP HBS */
hbs.registerHelper("say_hello", function(){
    return "Hello World"
})


var blocks = {};
hbs.registerHelper('extend', function(name, context) {
    var block = blocks[name];
    if (!block) {
        block = blocks[name] = [];
    }

    block.push(context.fn(this)); // for older versions of handlebars, use block.push(context(this));
});

hbs.registerHelper('block', function(name) {
    var val = (blocks[name] || []).join('\n');

    // clear the block
    blocks[name] = [];
    return val;
});

/* 2. ROUTES */
app.get('/', function(req, res){
    res.render('index');
})

app.get('/greet/:name', function(req,res){
    res.render('greet.hbs',{
        layout: 'layout_bootstrap',
        name: req.params.name
    })
})

app.get('/calc', function(req,res){
    res.render('calc');
})

app.post('/calc', function(req,res){
    let n1 = parseInt(req.body.num1);
    let n2 = parseInt(req.body.num2);
    let total = n1 + n2;
    res.send("Total =" + total);
})

/* 3. SERVE THE APP */
app.listen(3000, ()=>console.log("Server started"))



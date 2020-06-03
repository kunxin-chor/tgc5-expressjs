const express = require('express');
const hbs = require('hbs');

// 1 - create the express app
let app = express();

// 2 - instruct express to use hbs as the view engine (i.e, the templates)
app.set('view engine', 'hbs');

// 3 - setup static files
app.use(express.static('public'));

// 4 - enable processing of form data
app.use(express.urlencoded({extended:true}))
app.use(express.json());

app.get('/', function(req,res){
    res.render('index')
});

app.get('/echo/:msg', function(req,res){
    let message = req.params.msg;
    res.render('echo_back',{
        'message': message
    })
})

app.get('/sayhello', function(req, res){
    res.render('askforname')
});

app.post('/sayhello', function(req,res){

    console.log(req.body);

    // in Flask: we use request.form.get
   let name = req.body.username;

    // Using the TERNARY OPERATOR to check if interest is an array or not
    // let interests = Array.isArray(req.body.interest) ? req.body.interest : [req.body.interest];

    let interests;
    if (Array.isArray(req.body.interest)) {
        interests = req.body.interest;
    } else {
        interests = [req.body.interest];
    }

    res.render("sayhello", {
        name, interests
    })
})

app.listen(3000, ()=>{
    console.log("Server is running")
})
const express = require('express');
const router = express.Router();  // create an instance of the express router

/* 2. ROUTES */
router.get('/', function(req, res){
    res.render('index');
})

router.get('/greet/:name', function(req,res){
    res.render('greet.hbs',{
        layout: 'layout_bootstrap',
        name: req.params.name
    })
})


// default export
// when later we require('routes.js') we will only get back only one object, which is router
module.exports = router;
const express = require('express');
const router = express.Router();

router.get('/calc', function(req,res){
    res.render('calc');
})

router.post('/calc', function(req,res){
    let n1 = parseInt(req.body.num1);
    let n2 = parseInt(req.body.num2);
    let total = n1 + n2;
    res.send("Total =" + total);
})

module.exports = router;
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/restricted', (req,res,next)=>{
    if (!req.isAuthenticated()) {
        res.redirect('auth_required')
    } else {
        res.send("You have access to the restricted area");
    }
})

router.get('/auth_required', (req,res)=>{
    res.render('auth_required')
})

module.exports = router;


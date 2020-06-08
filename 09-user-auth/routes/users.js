var express = require('express');
var router = express.Router();
const users = require('../models/UserModel');
const passport = require('passport');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/create', (req,res)=>{
    res.render('users/create')
})

router.post('/create', async (req,res)=>{
    // CLASSIC WAY
    // let username = req.body.username;
    // let email = req.body.email;
    // let password =req.body.password;
    // users.createUser(username, email, password);

    // SHORTCUT using destructuring
    let {username, email, password} = req.body;
    await users.createUser(username, email, password);
    res.send("User has been created");
})

// router.get('/profile/:userid', async(req,res)=>{
//     let id = req.params.userid;
//     let user = await users.findById(id);
//     res.send("User = " + user.username);
// })

// router.get('/email/:email', async(req,res)=>{
//     let email = req.params.email;
//     let user = await users.findByEmail(email);
//     res.send("User =" + user.username);
// })

router.get('/profile',async(req,res)=>{
    let user = req.user;
    res.render('users/profile',{
        user
    })
})

router.get('/login', (req,res)=>{
    res.render('users/login');
})

router.post('/login', (req,res,next)=>{
    // create the authenticate process
    let authProcess = passport.authenticate("local", async (err, user,info)=>{
        // check if there is error
        if (err) {
            return res.send("Cannot login");
        }
        // check if there is no user
        if (!user) {
            return res.send("Cannot find user");
        }
        req.logIn(user, (loginError)=>{
            if (loginError) {
                res.send("Error logging in");
            } else {
                res.send("User has logged in successfully");
            }
        })
    });

    // ACTUALLY call the authentication process
    authProcess(req, res, next);
})

router.get('/logout', (req,res)=>{
    req.logOut();
    res.send("You have logged out");
})

module.exports = router;

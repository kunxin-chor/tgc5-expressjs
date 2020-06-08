const UserModel = require('../models/UserModel');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// serialize user -- associated a session id with a user
// need to specify which part of the user to associate
passport.serializeUser((user, done)=>{
    // call the done function. 
    // 1st arugment - error messages, if any
    // 2nd argument - how we want to identify the user (i.e how do we want to remember the user in the session file)
    done(null, user._id);
})

// deserialize user -- given a sessionid, retrieve its related userid
passport.deserializeUser(async (userid,done)=>{
    let user = await UserModel.findById(userid);
    // 1st argument - error
    // 2nd argument - the actual user object in the DB
    done(null, user);
})

passport.use(new LocalStrategy(
    // options
    {
        usernameField:'email',
    
    },
    async(email, password, done) => {
        // login logic

        // 1. find the user with the specified email address
        let user = await UserModel.findByEmail(email);

        // 2. check if the password matches
        if (user && user.password == password) {
            done(null, user);
        } else {
            done("Invalid login", false, {
                message:"Invalid login"
            })
        }
    }

))

// default export
module.exports = passport;
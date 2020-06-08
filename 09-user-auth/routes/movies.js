const express = require('express')
const router = express.Router();
const MovieModel = require('../models/MovieModel');

router.get('/create', (req,res)=>{
    if (req.isAuthenticated()) {
        res.render('movies/create')
    } else {
        res.redirect('/auth_required')
    }
});

router.post('/create', async (req,res)=>{
    if (req.isAuthenticated()) {

        let {title, movie, ratings } = req.body;
        await MovieModel.createMovie({
            title, movie, ratings
        }, req.user._id)
        res.send("Movie has been created");

    } else {
        res.redirect('/auth_required')
    }
})


module.exports = router;
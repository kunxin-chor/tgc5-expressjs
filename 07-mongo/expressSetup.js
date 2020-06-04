const hbs = require('hbs');
const express = require('express');

function setupExpressApp(app) {
    // setup the static folder
    app.use(express.static('public'));

    // setup the view engine aka - how are we going to render our templates (i.e, views)
    app.set('view engine', 'hbs');  // choice of pug, jade, ejs etc. to be our view engines

    // setup the form processing
    app.use(express.urlencoded({extended:false}));
    app.use(express.json());
}

module.exports = {
    setupExpressApp
}
const express = require('express');  // eqv. import in Python --> from express import express
const hbs = require('hbs');
const setupExpress = require('./expressSetup');
const setupHbs = require('./hbsSetup');
const homeRoutes = require('./routes/homeRoutes');
const animalRoutes = require('./routes/animalRoutes');
const mongoUtil = require('./mongoUtil');

/* 1. SETUP EXPRESS */
let app = express();
setupExpress.setupExpressApp(app);

/* 1B. SETUP HBS */
setupHbs.setupHbs();

/* 2. SETUP THE ROUTES */

mongoUtil.connect(function(){
    // only when the connection is finished, then set up the route
    app.use('/', homeRoutes);
    app.use('/animals', animalRoutes);
});


/* 3. SERVE THE APP */
app.listen(3000, ()=>console.log("Server started"))



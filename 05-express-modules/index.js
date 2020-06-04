const express = require('express');  // eqv. import in Python --> from express import express
const hbs = require('hbs');
const setupExpress = require('./expressSetup');
const setupHbs = require('./hbsSetup');
const routes = require('./routes')
const mathRoutes = require('./mathRoutes')

/* 1. SETUP EXPRESS */
let app = express();
setupExpress.setupExpressApp(app);

/* 1B. SETUP HBS */
setupHbs.setupHbs();

/* 2. SETUP THE ROUTES */
app.use('/', routes);
app.use('/math', mathRoutes);


/* 3. SERVE THE APP */
app.listen(3000, ()=>console.log("Server started"))



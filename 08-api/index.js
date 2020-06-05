const express = require('express');
const hbs = require('hbs');
const routes = require('./routes');
const apiRoutes = require('./api');
const mongoUtil = require('./mongoUtil');
const methodOverride = require('method-override')
const cors = require('cors')

// to setup flash messaging
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const flash = require('flash')

const app = express();

// setup the static folder
app.use(express.static('public'));

// setup the view engine aka - how are we going to render our templates (i.e, views)
app.set('view engine', 'hbs');  // choice of pug, jade, ejs etc. to be our view engines

// setup the form processing
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(methodOverride('X-HTTP-Method-Override'))

// setup session
app.use(cookieSession({
    name:'session',
    keys:['YS]EMy5_boLygfODC/+XfM_RFu,(a*s[oa2bF3:l8&~R}`.@EvrbVMKPE{{t=xd'],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

app.use(flash());

app.use(cors());

// HBS HELPERS
hbs.registerHelper('display_flash', function(flash){
    let all = [];
    while (message = flash.shift()) {
        all.push(message.message);
    }
    return all;
})

/* 2. REGISTER ROUTES */
mongoUtil.connect(function(){
    app.use('/', routes);
    app.use('/api', apiRoutes)
});


/* 3. SERVE THE APP */
app.listen(3000, ()=>console.log("Server started"))

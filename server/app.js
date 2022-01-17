const express = require('express');
const routes = require('./routes/routes');
const app = express();
const cors = require('cors');

//* Middlewares
app.use( express.urlencoded({ extended: false }))
app.use( express.json())
app.use( cors() ); 

//* Server port
app.set('port', process.env.PORT);

//* Routes
app.use('/api', routes );

module.exports = app;
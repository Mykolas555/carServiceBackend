const express = require('express')
const morgan = require('morgan')
const app = express()
const usersRouter = require('./routes/userRoutes')
const carServiceRouter = require('./routes/carServiceRoutes')
const mechanicRouter = require('./routes/mechanicRoutes')
const reviewRouter = require('./routes/reviewRoutes')
const likesRouter = require('./routes/likesRoutes')
app.use(express.json());
app.use(morgan('dev'))


app.use('/api/v1/carService', usersRouter);
app.use('/api/v1/carService', carServiceRouter);
app.use('/api/v1/carService', mechanicRouter);
app.use('/api/v1/carService', reviewRouter);
app.use('/api/v1/carService', likesRouter);

module.exports = app;
const express = require('express')
const app = express()
const cors = require("cors");
const bodyParser = require("body-parser");

const AuthenticationRoute = require('./routes/routerAuthentication')
const GameRoute = require('./routes/routerGames')
const globalErrorHandler = require('./utils/globalErrorHandler');
const AppError = require('./utils/AppError');
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.text())

app.use('/user', AuthenticationRoute)
app.use('/game', GameRoute)



app.all("*", (req, res, next) => {
    // next(AppError("page not found", 404))
    res.send('hello')
});


app.use(globalErrorHandler);
module.exports = app;
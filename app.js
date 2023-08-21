var createError = require('http-errors');
var express = require('express');
var path = require('path');
// var admin_router = require('./router/admin_router');
var app = express();
var logger = require('morgan');
var mongoCon = require("./config/db");
var bodyParser = require('body-parser');

var app = express();
var logger = require('morgan');
var mongoCon = require("./config/db");
var user_router = require('./router/user.detailsrouter');


// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//set view image
app.use("/", express.static("public/"));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use('/api/user',user_router);
// app.use('/api/admin',admin_router);
// catch 404 and forward to error handler

app.use(function (req, res, next) {
    next(createError(404));
  });
  
  // error handler
  app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    console.log(err.message)
    // res.render('error');
  });
  
  module.exports = app;
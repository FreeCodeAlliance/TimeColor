var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var compression = require('compression');
var token = require('./bin/utils/token');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var mastersRouter = require('./routes/masters');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept, X-Requested-With, x-access-token");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    if(req.method=="OPTIONS")
      res.send(200);
    else
      next();
});

// 启用gzip
app.use(compression());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/:id', (req, res, next)=> {
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

// 验证token
app.use('/:router/:operate', (req, res, next)=> {
    var operate = req.params.operate;
    if (operate != 'login' && operate != 'register' && !tc.TEST_MODE) {
        token.verifyToken(req, res, next, req.params.router);
    } else {
        next();
    }
});

app.use('/index', indexRouter);
app.use('/users', usersRouter);
app.use('/masters', mastersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var submitScheduleCal = require('./routes/submit-cal');
var submitScheduleHTML = require('./routes/submit-html');
var aboutRouter = require('./routes/about');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/*
app.use (function (req, res, next) {
    if (req.secure) { next(); } else {res.redirect('https://' + req.headers.host + req.url); }
});
*/
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/submit-cal', submitScheduleCal);
app.use('/submit-html', submitScheduleHTML);
app.use('/about', aboutRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.errorTitle = err.message;
    console.error(err);
    res.locals.errorMessage = req.app.get('env') === 'development' ? err.toString() : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;

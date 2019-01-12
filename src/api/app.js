const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');

const usersRouter = require('./routes/users');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/users', usersRouter);

app.use(function (req, res, next) {
    next(createError(404));
});

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send({message: err.message})
});

app.listen(8000);

module.exports = app;

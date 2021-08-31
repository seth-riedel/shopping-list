const createError = require('http-errors');
const express = require('express');
require('express-async-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  if (err.message === 'Validation failed') {
    err.status = 400;
  }
  res.status(err.status || 500).end()
})

module.exports = app;

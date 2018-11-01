var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var compress = require('compression');
var methodOverride = require('method-override');
var cors = require('cors');
var httpStatus = require('http-status');
var expressValidation = require('express-validation');
var helmet = require('helmet');
var appRoot = require('app-root-path');
var APIError = require('./helpers/APIError');
var config = require('./config/config');

var indexRouter = require('./routes/index');

var app = express();

if (config.env === 'development') {
  app.use(logger('dev'));
}

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(compress());
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// Middlewares
app.use(express.static(path.join(appRoot.path, 'public')));

app.use('/api', indexRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(appRoot.path, 'public/index.html'));
});

// if error is not an instanceOf APIError, convert it.
app.use((err, req, res, next) => {
  if (err instanceof expressValidation.ValidationError) {
    // validation error contains errors which is an array of error each containing message[]
    const unifiedErrorMessage = err.errors.map(error => error.messages.join('. ')).join(' and ');
    const error = new APIError(unifiedErrorMessage, err.status, true);
    return next(error);
  } else if (!(err instanceof APIError)) {
    const apiError = new APIError(err.message, err.status, err.isPublic);
    return next(apiError);
  }
  return next(err);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => 
  res.status(err.status).json({
    message: err.isPublic ? err.message : httpStatus[err.status],
    // stack: config.env === 'development' ? err.stack : {}
  })
);

module.exports = app;

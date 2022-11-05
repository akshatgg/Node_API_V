const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const {sequelize} = require('./models');
const apiErrorHandler = require('./errors/ApiError.handler');
var cors = require('cors')

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users.route');

const app = express();
const corsOpts = {
  origin: '*',

  methods: [
    'GET',
    'POST',
  ],

  allowedHeaders: [
    'Content-Type',
  ],
};

app.use(cors(corsOpts));

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
app.use(allowCrossDomain);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);

app.use(function (req, res, next) {
    next(createError(404));
});

// app.use(function (err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};
//     res.status(err.status || 500);
//     res.render('error');
// });

app.use(apiErrorHandler)
sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
        // sequelize.sync({alter: true}).then(() => {
        //     console.log("Tables Created if not exists!")
        // });
    }).catch(err => {
    console.error('Unable to connect to the database:', err);
});

module.exports = app;

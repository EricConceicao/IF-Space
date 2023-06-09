const createError = require('http-errors');
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const expressLayouts = require('express-ejs-layouts');

const indexRouter = require('./routes/index');
const homeRouter = require('./routes/home');
const profileRouter = require('./routes/profile');
const userpostRouter = require('./routes/posts');
const seguirRouter = require('./routes/seguir');
const likeRouter = require('./routes/like');
const commentRouter = require('./routes/comment');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(expressLayouts);
app.set('layout', './layouts/layout-home');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

dotenv.config({ path: './.env' });

app.use('/', indexRouter);
app.use('/home', homeRouter);
app.use('/perfil', profileRouter);
app.use('/post', userpostRouter);
app.use('/seguir', seguirRouter);
app.use('/curtir', likeRouter);
app.use('/comentar', commentRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  if (err.status == 404) { // Página 404 não encontrado
    res.status(err.status);
    res.render('404', { layout: './layouts/layout-index', title: 'Não encontrado' });
  }

  if (err.status == 500) { // Página de erro
    res.render('error', { layout: './layouts/layout-index', title: 'Erro no servidor interno' });
  }
});

module.exports = app;
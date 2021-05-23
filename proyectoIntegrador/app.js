var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var registrationRouter = require('./routes/registration');
var loginRouter = require('./routes/login');
var perfilRouter = require('./routes/perfil');
var edicionRouter = require('./routes/edicion');
var comentariosRouter = require('./routes/comentarios');
var productosRouter = require('./routes/productos');
var busqedaRouter = require('./routes/busqueda');
var loguearseRouter = require('./routes/loguearse');
var session = require('express-session');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret:'string secreto',
resave: false,
saveUninitialized: true }));
// configuramos locals para pasar informacion a todas las vistas
app.use((req, res, next) => {
  if(req.session.user != undefined){
    // res.locals = {nombredeusuario: "Juan"}
    res.locals = req.session.user
    console.log(res.locals);
  }
  return next()
})

app.use('/', indexRouter);
app.use('/registration', registrationRouter);
app.use('/login', loginRouter);
app.use('/perfil', perfilRouter);
app.use('/edicion', edicionRouter);
app.use('/comentarios', comentariosRouter);
app.use('/productos', productosRouter);
app.use('/busqueda', busqedaRouter);
app.use('/loguearse', loguearseRouter);

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

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var productosRouter = require('./routes/productos');
var usuariosRouter = require('./routes/usuarios');
var session = require('express-session');
const db = require('./database/models')

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
    res.locals = {nombre: req.session.user.nombre,
                  apellido:  req.session.user.apellido,
                  idusuario: req.session.user.id,
                  avatar: req.session.user.avatar
    }
  }
  else{
    res.locals = {nombre: null}
  }
  return next()
})

app.use((req, res, next) => {
  if(req.cookies.usuarioId && req.session.user == undefined){
    db.Usuario.findByPk(req.cookies.usuarioId)
      .then(user => {
        req.session.user = user
        res.locals = req.session.user
      })
      .catch (error => console.log(error))
  }
  return next()

})



app.use('/', indexRouter);
app.use('/productos', productosRouter);
app.use('/usuarios', usuariosRouter);

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

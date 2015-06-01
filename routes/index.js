var express = require('express');
var passport = require('passport'); // Passport: Middleware de Node que facilita la autenticación de usuarios

var router = express.Router();



// Importamos el modelo usuario y la configuración de passport
require('../models/user');
require('../passport')(passport);

/* GET home page. */
router.get('/', function(req, res, next) {
    //res.render('index', { title: 'Express' });
    res.redirect('/login')
});

router.get('/login', function(req, res, next) {
    res.render('login', {title: 'Login'});
});

router.get('/index', function(req, res, next) {
    res.render('index', { title: 'Express' });

});


/* Rutas de Passport */
// Ruta para desloguearse
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});
// Ruta para autenticarse con Twitter (enlace de login)
router.get('/auth/twitter', passport.authenticate('twitter'));
// Ruta para autenticarse con Facebook (enlace de login)
router.get('/auth/facebook', passport.authenticate('facebook'));
// Ruta de callback, a la que redirigirá tras autenticarse con Twitter.
// En caso de fallo redirige a otra vista '/login'
router.get('/auth/twitter/callback', passport.authenticate('twitter',
  { successRedirect: '/index', failureRedirect: '/login' }
));
// Ruta de callback, a la que redirigirá tras autenticarse con Facebook.
// En caso de fallo redirige a otra vista '/login'
router.get('/auth/facebook/callback', passport.authenticate('facebook',
  { successRedirect: '/index', failureRedirect: '/login' }
));


module.exports = router;

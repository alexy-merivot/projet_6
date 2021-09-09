const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require ('path')
var helmet = require('helmet');
const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');
var session = require('express-session');
var morgan = require('morgan')
const { access } = require('fs');
const xssClean = require('xss-clean');

mongoose.connect('mongodb+srv://alexy_merivot:Peluche02650.@cluster0.adymo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

// OWASP

app.use(helmet());
app.disable('x-powered-by');

app.set('trust proxy', 1)
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

app.use(morgan('combined'));

app.use(xssClean());

// Fin OWASP

app.use((req, res, next) =>
{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')))


app.use("/api/auth", userRoutes)
app.use("/api/sauces", sauceRoutes)

module.exports = app;

// TODO

// - Injection (morgan, bcrypt, jsonwebtoken)
// - Piratage de session (fait : helmet et express-session)
// - Proteger données en transit
// - Proteger données stockées sur une app
// - Empecher l'exploitation des controles d'access
// - Stopper le  cross-site scripting
// - Proteger le code contre les faille XXE et la deseriallisation non sécurisée
// - Sécuriser environnement de travail
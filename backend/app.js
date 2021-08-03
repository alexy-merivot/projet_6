const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Sauce = require('./models/sauce');
const User = require('./models/user');
const userRoutes = require('./routes/user');

mongoose.connect('mongodb+srv://alexy_merivot:Peluche02650.@cluster0.adymo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use((req, res, next) =>
{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json());

app.use("/api/auth", userRoutes)

// // POST (créer un nouvel utilisateur)
// app.post('/api/auth/login', (req, res, next) => {
//     // delete req.body._id;
//     const user = new User({
//       ...req.body
//     });
//     user.save()
//       .then(() => res.status(201).json({ message: 'Nouvel utilisateur enregistré !'}))
//       .catch(error => res.status(400).json({ error }));
//   });

// POST (se connecter)
// app.post('/api/auth/signup', (req, res, next) => {
//     // delete req.body._id;
//     const user = new User({
//       ...req.body
//     });
//     user.save()
//     //   .then(() => res.status(201).json({ userId: userId, token: }))
//       .catch(error => res.status(400).json({ error }));
//   });

// GET (récupérer toutes les sauces)
app.get('/api/sauces', (req, res) => {
    Sauce.find()
      .then(sauces => res.status(200).json(sauces))
      .catch(error => res.status(400).json({ error }));
  });

// GET (reduperer une sauce)
app.get('/api/sauces/:id', (req, res) =>
{
    Sauce.findOne({ _id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
})

// POST (enregistrer une sauce)
app.post('/api/sauces', (req, res) =>
{
    console.log(req.body)
    const sauce = new Sauce({
        ...req.body
      });
      sauce.save()
        .then(() => res.status(201).json({ message: 'Nouvelle sauce enregistrée !'}))
        .catch(error => res.status(400).json({ error }));
})

// PUT (mettre a jour une sauce)
app.put('/api/sauces/:id', (req, res) =>
{
    Sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce modifiée !'}))
    .catch(error => res.status(400).json({ error }));
})

// DELETE (supprimer une sauce)
app.delete('/api/sauces/:id', (req, res) =>
{
    Sauce.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))
    .catch(error => res.status(400).json({ error }));
})

// POST (like ou dislike d'une sauce)
// app.post('/api/sauces/:id/like', (req, res) =>
// {
    
// })

module.exports = app;


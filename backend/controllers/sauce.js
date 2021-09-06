const fs = require("fs");
const Sauce = require("../models/sauce");
const user = require("../models/user");

exports.newSauce = (req, res) => {
  let sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  let likeObject = {
    likes : 0,
    dislikes : 0,
    usersLiked : [],
    usersDisliked : [],
  }
  console.log("sauceObject avant Assign", sauceObject)
  Object.assign(sauceObject, likeObject);
  console.log("sauceObject après assign", sauceObject)
  let sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  sauce.likes = 0;
  sauce.dislikes = 0;
  console.log("sauce" ,sauce)
  // console.log("sauceObject",  sauceObjet)

  sauce.save()
    .then(() => res.status(201).json({ message: 'Nouvel sauce enregistrée !'}))
    .catch(error => res.status(400).json({ error }));
}

exports.getAllSauce = (req, res) => {
  Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
}

exports.getASauce = (req, res) => {
  console.log(("toto1"))
  console.log("toto2")
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
    console.log(res.sauce)
}

exports.updateSauce  = (req, res) => {
  const sauceObject = req.file ?{
    ...JSON.parse(req.body.sauce),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body };
  Sauce.updateOne({ _id: req.params.id }, sauceObject)
    .then(() => res.status(200).json({ message: 'Sauce modifiée !'}))
    .catch(error => res.status(400).json({ error }));
}

exports.deleteSauce = (req, res) => {
  Sauce.findOne({_id: req.params.id})
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))
        .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({error}))
}

exports.likeDislikeSauce = (req, res) => {
  console.log("debug like")
  Sauce.findOne({ _id: req.params.id})
  .then( sauce => {
    console.log(sauce)
    if(req.body.like === 1){ // si le user like la sauce pour la première fois
      sauce.likes++
      sauce.usersLiked.push(req.body.userId)
      console.log("toto sauce" , sauce)
      Sauce.updateOne({ _id: req.params.id }, sauce )
      .then(() => res.status(200).json({ message: 'Sauce likée !'}))
      .catch(error => res.status(400).json({ error })); // sauvegarder sauce sur mongoose
      console.log( "sauce après like pour la première fois après update", sauce)
    }else if(req.body.like === -1){ // si le user dislike la sauce pour la première fois
      sauce.dislikes++
      sauce.usersDisliked.push(user.userId)
      Sauce.updateOne({ _id: req.params.id }, { ...sauce, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Sauce dislikée !'}))
      .catch(error => res.status(400).json({ error })); // sauvegarder sauce sur mongoose
    }else if( req.body.like === 0){
      // création  de balise flag pour savoir si la sauce a déja été likée ou  dislikée
        var flag = 0;
      for(var i=0; i<sauce.usersLiked.length; i++){
        if( sauce.userId === sauce.usersLiked[i]) {flag = 1}
      }
      for(var i=0; i<sauce.usersDisliked.length; i++){
        if( sauce.userId === sauce.usersDisliked[i]) {flag = 2;}
      }
      if(flag = 1) {  // si la sauce a déja été likée
        sauce.likes--;
        console.log(req.body.userId)
        sauce.usersLiked.splice(req.body.userId)
        Sauce.updateOne({ _id: req.params.id }, sauce)
      .then(() => res.status(200).json({ message: 'Sauce délikée !'}))
      .catch(error => res.status(400).json({ error })); // sauvegarder sauce sur mongoose
      }else if(flag = 2)  { // si la sauce a déja été dislikée
        sauce.dislikes--
        sauce.usersDisliked.splice(userId)
        Sauce.updateOne({ _id: req.params.id }, sauce)
      .then(() => res.status(200).json({ message: 'Sauce dédislikée !'}))
      .catch(error => res.status(400).json({ error })); // sauvegarder sauce sur mongoose
      }
    }
    console.log("toto 1 a la fin")
    console.log("toto sauce" ,sauce);
  })
  .catch(error => {
    console.log(error)
    return res.status(500).json({error})
    })
};


// likes et dislike s'incrémentent quand je reste sur la page de la sauce mais les likes/dislikes reviennent a 0 quand je back de la page et reviens sur la sauce


// quand je modifie une sauce :
// - si je modifie juste l'image : ça fonctionne
// - si je modifie le reste sauf l'image : ça marche
// - si je souhaite modifier tout (texte et image) : seulement l'image change
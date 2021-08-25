const fs = require("fs");
const sauce = require("../models/sauce");
const user = require("../models/user");

exports.newSauce = (req, res) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
      ...sauceObject,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });

    sauce.save()
      .then(() => res.status(201).json({ message: 'Nouvel sauce enregistrée !'}))
      .catch(error => res.status(400).json({ error }));
}

exports.getAllSauce = (req, res) => {
  sauce.find()
      .then(sauces => res.status(200).json(sauces))
      .catch(error => res.status(400).json({ error }));
}

exports.getASauce = (req, res) => {
  sauce.findOne({ _id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
}

exports.updateSauce  = (req, res) => {
  const sauceObject = req.file ?{
    ...req.body,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body };
  sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce modifiée !'}))
    .catch(error => res.status(400).json({ error }));
}

exports.deleteSauce = (req, res) => {
  sauce.findOne({_id: req.params.id})
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        sauce.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))
        g.catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({error}))
}

exports.likeDislikeSauce = (req, res) => {
  console.log("debug like")
  sauce.findOne({ _id: req.params.id})
  .then( sauce => {
    if(req.body.like === 1){ // si le user like la sauce pour la première fois
      sauce.likes = sauce.likes++
      sauce.usersLiked.push(req.body.userId)
      sauce.updateOne({ _id: req.params.id }, { ...sauce, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Sauce likée !'}))
      .catch(error => res.status(400).json({ error })); // sauvegarder sauce sur mongoose
    }else if(req.body.like === -1){ // si le user dislike la sauce pour la première fois
      sauce.dislikes = sauce.dislikes++
      sauce.usersDisliked.push(user.userId)
      sauce.updateOne({ _id: req.params.id }, { ...sauce, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Sauce dislikée !'}))
      .catch(error => res.status(400).json({ error })); // sauvegarder sauce sur mongoose
    }else if( req.body.like === 0){
      // création  de balise flag pour savoir si la sauce a déja été likée ou  dislikée
        var flag = 0;
      for(var i=0; i<usersLiked.length; i++){
        if( userId === usersLiked[i]) {flag = 1}
      }
      for(var i=0; i<usersDisliked.length; i++){
        if( userId === usersDisliked[i]) {flag = 2;}
      }
      if(flag = 1) {  // si la sauce a déja été likée
        sauce.likes = sauce.likes--;
        sauce.usersLiked.splice(userId)
        sauce.updateOne({ _id: req.params.id }, { ...sauce, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Sauce délikée !'}))
      .catch(error => res.status(400).json({ error })); // sauvegarder sauce sur mongoose
      }else if(flag = 2)  { // si la sauce a déja été dislikée
        sauce.dislikes = sauce.dislikes--
        sauce.usersDisliked.splice(userId)
        sauce.updateOne({ _id: req.params.id }, { ...sauce, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Sauce dédislikée !'}))
      .catch(error => res.status(400).json({ error })); // sauvegarder sauce sur mongoose
      }
    }
  })
  .catch(error => {
    console.log(error)
    return res.status(500).json({error})
    })
}



// si user id existe dans tableau like ou dislike, alors mettre la  valeur de like a 0 et retirer l'user id du tableau

// si user id n'existe  pas dans le tableau, alors si like = 1 ou -1 : ajouté +1 ou -1 a like de la sauce

// usersLiked.find(userId => userId === req.body.userId)
// userDisliked.find(userId => userId === req.body.userId)
// if(userId){
//   return Sauce.like === 0
//   .then(() => res.status(200).json({ message: 'Sauce délikée !'}))
//   .catch(error => res.status(400).json({ error }));

// }else{

// if( req.body.like === 0){
//   var flag = 0;  // Initialement 0 - Introuvable
// for(var i=0; i<usersLiked.length; i++) {
//     if( userId === usersLiked[i]) {
//          flag = 1;
//     }
// }
// for(var i=0; i<usersDisliked.length; i++) {
//   if( userId === usersDisliked[i]) {
//        flag = 2;
//   }
// }
// if(flag = 1){
//   sauce.likes = sauce.likes--;
//   usersLiked.splice(userId);
// }else if(flag = 2){
//   sauce.dislikes = sauce.dislikes--
//   usersDisliked.splice(userId);
// }
// }



// var flag = 0;  // Initialement 0 - Introuvable
// for(var i=0; i<usersLiked.length; i++) {
//     if( userId === usersLiked[i]) {
//          flag = 1;
//     }else{flag=3}
// }
// for(var i=0; i<usersDisliked.length; i++) {
//   if( userId === usersDisliked[i]) {
//        flag = 2;
//   }else{flag=3}
// }
// if(flag = 1){
//   sauce.likes = sauce.likes--;
//   usersLiked.splice(userId);
// }else if(flag = 2){
//   sauce.dislikes = sauce.dislikes--
//   usersDisliked.splice(userId);
// }
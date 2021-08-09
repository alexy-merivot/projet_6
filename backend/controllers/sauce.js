const Sauce = require("../models/sauce");

exports.newSauce = () =>{
  const sauce = new Sauce({
      ...req.body
    });

    user.save()
      .then(() => res.status(201).json({ message: 'Nouvel sauce enregistrée !'}))
      .catch(error => res.status(400).json({ error }));
}

exports.getAllSauce = () => {
  Sauce.find()
      .then(sauces => res.status(200).json(sauces))
      .catch(error => res.status(400).json({ error }));
}

exports.getASauce = () => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
}

exports.updateSauce  = () => {
  Sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce modifiée !'}))
    .catch(error => res.status(400).json({ error }));
}

exports.deleteSauce = () => {
  Sauce.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))
    .catch(error => res.status(400).json({ error }));
}

exports.likeDislikeSauce = () => {

}
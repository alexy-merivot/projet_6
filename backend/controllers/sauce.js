const Sauce = require("../models/sauce");

exports.newSauce = () =>{
    const sauce = new Sauce({
        ...req.body
      });

      user.save()
        .then(() => res.status(201).json({ message: 'Nouvel sauce enregistrée !'}))
        .catch(error => res.status(400).json({ error }));
}
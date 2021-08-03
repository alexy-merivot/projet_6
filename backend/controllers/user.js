const User = require("../models/user");

exports.signUp = () =>{
    const user = new User({
        ...req.body
      });

      user.save()
        .then(() => res.status(201).json({ message: 'Nouvel utilisateur créé !'}))
        .catch(error => res.status(400).json({ error }));
}

exports.login = () =>{
    
}
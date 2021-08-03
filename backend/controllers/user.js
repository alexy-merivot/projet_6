const User = require("../models/user");
const bcrypt = require("bcrypt")
const cryptoJs = require("crypto-js")
const jsonWebToken = require("jsonwebtoken")

exports.signUp = (req, res) =>
{
    bcrypt.hash(req.body.password, 10)
    .then(hash =>
    {
        const emailCrypte = cryptoJs.HmacSHA512(req.body.email, 'AZERTY' ).toString(cryptoJs.enc.Base64)
        const user = new User({
            email: emailCrypté,
            password: hash
          });
    })
    console.log(user)

      user.save()
        .then(() => res.status(201).json({ message: 'Nouvel utilisateur créé !'}))
        .catch(error => res.status(400).json({ error }));
}

exports.login = () =>{
    Sauce.findOne({ email: emailCrypte})
    .then(user =>
    {
        if(!user)
        {
            return res.statut(401).json({error: "identifiants invalides"})
            // TODO Retourner une 401 utilisateur  non trouvé
        }
    // TOTO si trouvé : récupérer mot de passe soumis (fonction compare de bcrypt)
        bcrypt.compare(req.body.password, user.password)
        .then(valid =>
            {
                if(!valid)
                {
                    // TODO eroor 401
                }
                res.status(200).json({
                    userId: user._id
                    // token: TODO token de cryptage (voir la doc jsonwebtoken)
                })
            })

    }
    .catch(error => res.status(404).json({ error }));
}
const User = require("../models/user");
const jwt = require("jwt-decode")
const bcrypt = require("bcrypt")
const cryptoJs = require("crypto-js")
const jsonWebToken = require("jsonwebtoken")


exports.signUp = (req, res) =>
{
    bcrypt.hash(req.body.password, 10)
    .then(hash =>
    {
        // const emailCrypte = cryptoJs.HmacSHA512(req.body.email, 'AZERTY' ).toString(cryptoJs.enc.Base64)

        let user = new User({
            email: req.body.email,
            password: hash
        });
        console.log(user)
         console.log("coucou")

        //   var decrypted = CryptoJS.AES.decrypt(openSSLEncrypted, "Secret Passphrase");

        user.save()
        .then(() => res.status(201).json({ message: 'Nouvel utilisateur créé !'}));
        console.log("coucou3")
        .catch( error => res.status(400).json({ error }));
        console.log("coucou4")
    })
    .catch( error => res.status(500).json({error}));

}

exports.login = () =>{
    User.findOne({ email: emailCrypte})
    .then(user =>
    {
        if(!user)
        {
            return res.statut(401).json({error: "identifiants invalides"})
            //  Retourner une 401 utilisateur  non trouvé
        }
    //  si trouvé : récupérer mot de passe soumis (fonction compare de bcrypt)
        bcrypt.compare(req.body.password, user.password)
        .then(valid =>
            {
                if(!valid)
                {
                    return res.statut(401).json({error: "identifiants invalides"})
                    //  eroor 401
                }
                res.status(200).json({
                    userId: user._id
                    // token: TODO token de cryptage (voir la doc jsonwebtoken)
                })
            })

    })
    .catch(error => res.status(400).json({ error }));
}
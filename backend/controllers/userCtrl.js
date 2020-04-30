// Imports
const bcrypt = require('bcrypt');
const asyncLib  = require('async');
const models = require('../models');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();


// Constants
const EMAIL_REGEX     = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX  = /^(?=.*\d).{4,16}$/;


// REGISTER
exports.register = (req, res) => {

    // Params
    var email    = req.body.email;
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var password = req.body.password;
    var imgUrl = 'https://www.autourdelacom.fr/wp-content/uploads/2018/03/default-female-user-profile-image.jpg';

    

    asyncLib.waterfall([
        function(done) {
            models.User.findOne({
                attributes: ['email'],
                where: { email: email }
            })
            .then(function(userFound) {
                done(null, userFound);
            })
            .catch(function(err) {
                return res.status(500).json({ 'error': "Impossible de verifier l'utilisateur" });
            });
        },
        function(userFound, done) {
            if (!userFound) {
                bcrypt.hash(password, 5, function( err, bcryptedPassword ) {
                    done(null, userFound, bcryptedPassword);
                });
            } else {
                return res.status(409).json({ 'error': "L'utilisateur existe déjà !" });
            }
        },
        function(userFound, bcryptedPassword, done) {
            var newUser = models.User.create({
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: bcryptedPassword,
                imgUrl: imgUrl,
                isAdmin: 0
            })
            .then(function(newUser) {
                done(newUser);
            })
            .catch(function(err) {
                return res.status(500).json({ 'error': 'cannot add user' });
            });
        }
    ], function(newUser) {
        if (newUser) {
            return res.status(201).json({
                'userId': newUser.id
            });
        } else {
            return res.status(500).json({ 'error': 'cannot add user' });
        }
    });
}

// LOGIN
exports.login = (req, res) => {
      
    

    if (email == null ||  password == null) {
    return res.status(400).json({ 'error': 'champs manquants' });
    }

    asyncLib.waterfall([
        function(done) {
            models.User.findOne({
                where: { email: email }
            })
            .then(function(userFound) {
                done(null, userFound);
            })
            .catch(function(err) {
            return res.status(500).json({ 'error': "impossible de vérifier l'utilisateur" });
            });
        },
        function(userFound, done) {
            if (userFound) {
                bcrypt.compare(password, userFound.password, function(errBycrypt, resBycrypt) {
                    done(null, userFound, resBycrypt);
                });
            } else {
                return res.status(404).json({ 'error': "l'utilisateur n'existe pas dans la base de données" });
            }
        },
        function(userFound, resBycrypt, done) {
            if(resBycrypt) {
                done(userFound);
            } else {
                return res.status(403).json({ 'error': 'Mot de passe incorrect' });
            }
        }
    ], function(userFound) {
        if (userFound) {

            var token = jwt.sign(
                {
                  userId: userFound.id,
                  isAdmin: userFound.isAdmin
                },
                process.env.SECRET_TOKEN,
                { expiresIn: '12h' }
            );

            return res.status(200).json({
                'userId': userFound.id,
                'token': token
            });
        } else {
            return res.status(500).json({ 'error': "impossible de se connecter à l'utilisateur" });
        }
    });
}
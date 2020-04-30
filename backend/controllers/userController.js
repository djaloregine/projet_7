// Imports
const bcrypt = require('bcrypt');
const models = require('../models');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// Constants
const EMAIL_REGEX     = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX  = /^(?=.*\d).{4,16}$/;
const LETTERS_REGEX = /^[A-Za-z]+$/;


// Register User 
exports.register = (req, res) => {

    // Params
    var email      = req.body.email;
    var nom        = req.body.lastname;
    var prenom     = req.body.firstname;
    var motdepasse = req.body.password;
    var imageUrl   = 'http://localhost:3000/images/profiles/user.png';

    // Check input null
    if (!email || !motdepasse || !nom || !prenom) {
        return res.status(400).json({ error: 'Certains champs sont vides !' });
    }

    // Check email
    if (!EMAIL_REGEX.test(email)) {
        return res.status(400).json({ error: "Adresse mail non valide" });
    }

    // Check first name
    if (prenom.length > 21 || prenom.length < 2) {
        return res.status(400).json({ error: 'Le prénom doit avoir une longueur de 3 à 19 caractères.' });
    }
    if(!prenom.match(LETTERS_REGEX)) {
        return res.status(400).json({ error: 'Le prénom doit contenir que des lettres' });
    }

    // Check last name
    if (nom.length >= 20 || nom.length < 3) {
        return res.status(400).json({ error: 'Le nom doit avoir une longueur de 3 à 19 caractères.' });
    }
    if(!nom.match(LETTERS_REGEX)) {
        return res.status(400).json({ error: 'Le nom doit contenir que des lettres' });
    }

    // Check password
    if (!PASSWORD_REGEX.test(motdepasse)) {
        return res.status(400).json({ error: 'Le mot de passe est invalide. Il doit avoir une longueur de 4 à 16 caractères et contenir au moins 1 chiffre.' });
    }
    
    // Check image 
    // if(!req.file) return res.status(400).json({ error: "Une image est obligatoire !" });
    // imageUrl = `${req.protocol}://${req.get('host')}/images/profiles/${req.file.filename}`;

    // Get User by email
    getUserByEmail(email)
        .then(user => {
            if(user) return res.status(400).json({ error: "L'utilisateur existe déjà !" });

            return cryptPassword(motdepasse);
        })
        .then(bcryptedPassword => {
            // Create User in database
            models.User.create({
                firstname: prenom,
                lastname: nom,
                email: email,
                password: bcryptedPassword,
                imgUrl: imageUrl,
                isAdmin: 0
            })

            // return userId & success
            return res.status(200).json({ success: 'Utilisateur enregistré !' });
        })
        .catch(error => {
            return res.status(400).json({ error });
        })

}

// Login User
exports.login = (req, res) => {
    // Params
    var email    = req.body.email;
    var password = req.body.password;

    // Form verification
    if (email == null || password == null) {
        return res.status(400).json({ error: 'Certains champs sont vides !' });
    }

    // Check email
    if (!EMAIL_REGEX.test(email)) {
        return res.status(400).json({ error: "Adresse mail non valide" });
    }
    
    // Check password
    if (!PASSWORD_REGEX.test(password)) {
        return res.status(400).json({ error: 'Le mot de passe est invalide. Il doit avoir une longueur de 4 à 16 caractères et contenir au moins 1 chiffre.' });
    }

    // Get User by email
    getUserByEmail(email)
        .then(user => {
            if(!user) return res.status(400).json({ error: "L'utilisateur n'existe pas !" });

            return comparePassword(password, user.password, user);
        })
        .then(user => {
            // Generate token
            var token = jwt.sign(
                {
                  userId: user.id,
                  isAdmin: user.isAdmin
                },
                process.env.SECRET_TOKEN,
                { expiresIn: '12h' }
            );

            // return userId & token
            res.status(200).json({
                userId: user.id,
                token: token
            });
        })
        .catch(error => {
            res.status(400).json({ error });
        })
}

// Get User Profile
exports.getUserProfile = (req, res) => {

    getUserById(req.userId)
        .then(user =>{
            res.status(200).json({ user });
        })
        .catch(error => {
            res.status(400).json({ error });
        })
}

// Update User Profile
exports.updateUserProfile = (req, res) => {

    getUserById(req.userId)
        .then(user => {
            if(!user) return res.status(400).json({ error: "L'utilisateur n'existe pas !" });

            return queryUpdateUser(user, req.body);
        })
        .then(results => {
            res.status(200).json({ results });
        })
        .catch(error => {
            res.status(400).json({ error });
        })
}

// Delete User Profile
exports.deleteUserProfile = (req, res) => {

    getUserById(req.userId)
        .then(user => {
            if(!user) return res.status(400).json({ error: "L'utilisateur n'existe pas !" });
            return queryDeleteUser(user);
        })
        .then(results => {
            console.log(results);
            res.status(200).json({ message: 'Compte supprimé !' });
        })
        .catch(err => {
            res.status(400).json({ err });
        })
}


// Functions ----------------------------------------
function getUserById(id) {
    return new Promise((resolve, reject) => {

        const user = models.User.findOne({
            attributes: ['id', 'firstname', 'lastname', 'email', 'imgUrl'],
            where: { id: id }
        });

        if(user) {
            resolve(user);
        } else {
            reject(Error('Aucun utilisateur trouvé !'));
        }
    })
}

function getUserByEmail(email) {
    return new Promise((resolve, reject) => {


        // Only function who to get password
        const user = models.User.findOne({
            attributes: ['id', 'firstname', 'lastname', 'email', 'imgUrl', 'password'],
            where: { email: email }
        });

        if(user) {
            resolve(user);
        } else {
            reject('Adresse email incorrect !');
        }
    })
}

function queryUpdateUser(user, formParams) {
    return new Promise((resolve, reject) => {
        // Form parameters
        var prenom   = formParams.firstname;
        var nom      = formParams.lastname;
        var mail     = formParams.email;
        var image    = formParams.imgUrl;

        // Form verification
        if (mail == null || nom == null || prenom == null) {
            return res.status(400).json({ error: 'Certains champs sont vides !' });
        }

        checkEmail(mail, res);
        checkFirstname(prenom, res);
        checkLastname(nom, res);

        // Img verif

        // Update user after verification
        const userModify = user.update(
            {
                firstname: prenom,
                lastname: nom,
                email: mail,
                imgUrl: image
            }
        );

        if(userModify) {
            resolve(userModify);
        } else {
            reject(Error('Erreur dans la modification !'));
        }
    })
}

function queryDeleteUser(user) {
    return new Promise((resolve, reject) => {

        const userRemove = user.destroy();

        if(userRemove) {
            resolve(userRemove);
        } else {
            reject(Error('Erreur dans la suppression du compte !'));
        }
    })
}

function comparePassword(formPassword, dbPassword, userData) {
    return new Promise((resolve, reject) => {

        const result = bcrypt.compareSync(formPassword, dbPassword);

        if(result) {
            resolve(userData);
        } else {
            reject('Le mot de passe est incorrect !');
        }
    })
    
}

function cryptPassword(password) {
    return new Promise((resolve, reject) => {

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        if(hash) {
            resolve(hash);
        } else {
            reject('Un problème est survenu !'); //Probleme pour crypter le mot de passe
        } 
    })
}





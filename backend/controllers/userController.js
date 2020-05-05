// Imports
const bcrypt = require('bcrypt');
const models = require('../models');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const fs = require('fs');

dotenv.config();

// Constants
const EMAIL_REGEX     = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX  = /^(?=.*\d).{4,16}$/;
const LETTERS_REGEX = /^[A-Za-z]+$/;


// Register User 
exports.register = (req, res) => {
    // Params
    var imageUrl;
    var email      = req.body.email;
    var nom        = req.body.lastname;
    var prenom     = req.body.firstname;
    var motdepasse = req.body.password;

    console.log(req.body)
    console.log(req.file)
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
    if(!req.file) return res.status(400).json({ error: "Une image est obligatoire !" });
    imageUrl = `${req.protocol}://${req.get('host')}/images/profiles/${req.file.filename}`;

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
            });

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
                // userId: user.id,
                token: token
            });
        })
        .catch(error => {
            res.status(401).json({ error });
        })
}

// Logout User
exports.logout = (req, res) => {

    getUserById(req.userId)
        .then(user => {
            if(!user) return res.status(400).json({ error: "L'utilisateur n'existe pas !" });

            return res.status(200).json({
                success: 'Déconnexion réussite !'
            });
        })
        .catch(error => {
            return res.status(401).json(error);
        })
}

// Get User Profile
exports.getUserProfile = (req, res) => {

    getUserById(req.userId)
        .then(user =>{
            if(!user) return res.status(400).json({ error: "L'utilisateur n'existe pas !" });

            return res.status(200).json(user);
        })
        .catch(error => {
            return res.status(400).json(error);
        })
}

// Update User Profile
exports.updateUserProfile = (req, res) => {

    // Check input null
    if (!req.body.email || !req.body.firstname || !req.body.lastname) {
        return res.status(400).json({ error: 'Certains champs sont vides !' });
    }

    // Check email
    if (!EMAIL_REGEX.test(req.body.email)) {
        return res.status(400).json({ error: "Adresse mail non valide" });
    }

    // Check first name
    if (req.body.firstname.length > 21 || req.body.firstname.length < 2) {
        return res.status(400).json({ error: 'Le prénom doit avoir une longueur de 3 à 19 caractères.' });
    }
    if(!req.body.firstname.match(LETTERS_REGEX)) {
        return res.status(400).json({ error: 'Le prénom doit contenir que des lettres' });
    }

    // Check last name
    if (req.body.lastname.length >= 20 || req.body.lastname.length < 3) {
        return res.status(400).json({ error: 'Le nom doit avoir une longueur de 3 à 19 caractères.' });
    }
    if(!req.body.lastname.match(LETTERS_REGEX)) {
        return res.status(400).json({ error: 'Le nom doit contenir que des lettres' });
    }

    getUserById(req.userId)
        .then(user => {
            if(!user) return res.status(400).json({ error: "L'utilisateur n'existe pas !" });

            // Reprend l'image dans la bdd si aucune image est ajoutée
            if(!req.file) { 
                imageUrl = user.imgUrl; 
            } else {
                imageUrl = `${req.protocol}://${req.get('host')}/images/profiles/${req.file.filename}`;

                // Supprime l'ancienne image
                const filename = user.imgUrl.split('/images/')[1];

                fs.unlink("images/"+filename, function (error) {
                    if (error) return console.log(error);
                    // si pas d'erreur, l'image est effacé avec succès !
                    console.log('Image supprimée !');
                }); 
            }

            return queryUpdateUser(user, req.body, imageUrl);
        })
        .then(results => {
            res.status(200).json({ success: "Compte modifié !"});
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

            // Supprime l'ancienne image
            const filename = user.imgUrl.split('/images/')[1];

            fs.unlink("images/"+filename, function (error) {
                if (error) return console.log(error);
                // si pas d'erreur, l'image est effacé avec succès !
                console.log('Image supprimée !');
            }); 
            
            return queryDeleteUser(user);
        })
        .then(results => {
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
            attributes: ['id', 'firstname', 'lastname', 'email', 'imgUrl', 'isAdmin'],
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
            attributes: ['id', 'firstname', 'lastname', 'email', 'imgUrl', 'password', 'isAdmin'],
            where: { email: email }
        });

        if(user) {
            resolve(user);
        } else {
            reject('Adresse email incorrect !');
        }
    })
}

function queryUpdateUser(user, formParams, imageUrl) {
    return new Promise((resolve, reject) => {
        
        const userModify = user.update(
            {
                firstname: formParams.firstname,
                lastname: formParams.lastname,
                email: formParams.email,
                imgUrl: imageUrl,
                updatedAt: new Date()
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

// Imports
const asyncLib  = require('async');
const models = require('../models');
const dotenv = require('dotenv');

dotenv.config();


// GET ALL MESSAGES
exports.getAllMessages = (req, res) => {
    
}


// GET ONE MESSAGE
exports.getMessage = (req, res) => {

    models.Message.findOne({
        where: { id: req.params.id }
    })
    .then(function(message) {
        if(message) {
            res.status(200).json({ message });
        } else {
            res.status(400).json({ error : 'Message non trouvé !' })
        }
    }).catch(function(error) {
        res.status(500).json({ error : 'cannot fetch message' });
    });
}

// GET ALL MESSAGES
exports.createMessage = (req, res) => {
      
}

// GET ALL MESSAGES
exports.updateMessage = (req, res) => {
      
}

// GET ALL MESSAGES
exports.deleteMessage = (req, res) => {

    asyncLib.waterfall([
        function(done) {
            models.User.findOne({
                where: { id: req.userId } 
            })
            .then(function(userFound) {
                done(null, userFound);
            })
            .catch(error => res.status(500).json({ error }));
        },
        function(userFound, done) {
            if (userFound) {
                models.User.destroy({
                    where: { id: req.userId } 
                })
                .then(function(userFound) {
                    done(null, userFound);
                })
                .catch(function(err) {
                    return res.status(500).json({ 'error': "impossible de vérifier l'utilisateur" });
                });
            } else {
                return res.status(404).json({ 'error': 'utilisateur non trouvé' });
            }
        }
    ], function(userFound) {
        if (userFound) {
            return res.status(200).json({ message: 'Utilisateur supprimé !'});
        } else {
            res.status(500).json({ error : 'cannot delete user' });
        }
    });
}
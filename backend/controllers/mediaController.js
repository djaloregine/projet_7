// Imports
const models = require('../models');

// Get all medias
exports.getAllMedias = (req, res) => {
    getMedias()
        .then(medias => {  //medias retourne un tableau
            if(medias.length == 0) return res.status(400).json({ error : "Il n'y a aucun contenu multimédia !"});
            return res.status(200).json(medias);
        })
        .catch(error => {
            return res.status(400).json(error);
        })
}

// Get one item
exports.getMedia = (req, res) => {

    getMediaById(req.params.id)
        .then(media =>{
            if(media == null) return res.status(400).json({ error : "Aucun contenu multimédia trouvé !"});
            res.status(200).json(media);
        })
        .catch(error => {
            res.status(400).json(error);
        })
}

// Create new item
exports.createMedia = (req, res) => {
    // Params
    var imageUrl;

    if(!req.file) return res.status(400).json({ error: "Une image est obligatoire !" });

    // Image url
    imageUrl = `${req.protocol}://${req.get('host')}/images/medias/${req.file.filename}`;


    getUserById(req.userId)
        .then(user => {
            if(!user) return res.status(400).json({ error: "L'utilisateur n'existe pas !" });

            return queryCreateMedia(user.id, imageUrl);
        })
        .then(media => {
            res.status(200).json({ success: "L'annonce a bien été créé !" });
        })
        .catch(error => {
            res.status(400).json({ error });
        })
}

// Update a item
exports.updateMedia = (req, res) => {
    var imageUrl;

    getMediaById(req.params.id)
        .then(media => {
            if(!media) return res.status(400).json({ error: "L'annonce n'existe pas !" });

            // Vérifie si c'est l'auteur ou un admin sinon pas accès
            if(media.UserId !== req.userId) {
                if(!req.isAdmin) return res.status(401).json({ error: 'Accès interdit !' });
            }

            // Reprend l'image dans la bdd si aucune image est ajoutée
            if(!req.file) { 
                imageUrl = media.imageUrl; 
            } else {
                imageUrl = `${req.protocol}://${req.get('host')}/images/medias/${req.file.filename}`;
            }

            return queryUpdateMedia(media, imageUrl);
        })
        .then(results => {
            res.status(200).json({ success: "Le media a été modifié !" });
        })
        .catch(error => {
            res.status(400).json({ error });
        })
}

// Delete a item
exports.deleteMedia = (req, res) => {

    getMediaById(req.params.id)
        .then(media => {
            if(!media) return res.status(400).json({ error: "Le contenu multimédia n'existe pas !" });
            
            // Vérifie si c'est l'auteur ou un admin sinon pas accès
            if(media.UserId !== req.userId) {
                if(!req.isAdmin) return res.status(401).json({ error: 'Accès interdit !' });
            }

            return queryDeleteMedia(media);
        })
        .then(results => {
            res.status(200).json({ success: 'Le contenu multimédia a été supprimé !' });
        })
        .catch(error => {
            res.status(400).json({ error });
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

function getMedias() {
    return new Promise((resolve, reject) => {

        const medias = models.Media.findAll({
            order: [
                ['id', 'DESC']
            ],
            include: [{
                model: models.User,
                attributes: ['firstname', 'lastname', 'imgUrl']
            }]
        });

        if(medias) {
            resolve(medias);
        } else {
            reject(Error('Aucunes medias trouvées !'));
        }
    })
}

function getMediaById(id) {
    return new Promise((resolve, reject) => {

        const item = models.Item.findOne({
            where: { id: id },
            include: [{
                model: models.User,
                attributes: ['firstname', 'lastname', 'imgUrl']
            }]
        });

        if(item) {
            resolve(item);
        } else {
            reject(Error('Aucune annonce trouvée !'));
        }
    })
}

function queryCreateMedia(userId, formParams, image) {
    return new Promise((resolve, reject) => {

        const newItem = models.Item.create({
            title: formParams.title,
            description: formParams.description,
            price: formParams.price,
            imageUrl: image,
            UserId: userId
        });

        if(newItem) {
            resolve(newItem);
        } else {
            reject(Error("Erreur dans la creation de l'annonce !"));
        }
    })
    
}

function queryUpdateMedia(item, formParams, image) {
    return new Promise((resolve, reject) => {

        const updateItem = item.update({
            title: formParams.title,
            description: formParams.description,
            price: formParams.price,
            imageUrl: image,
            updatedAt: new Date()
        });

        if(updateItem) {
            resolve(updateItem);
        } else {
            reject(Error("Erreur dans la creation de l'annonce !"));
        }
    })
}

function queryDeleteMedia(item) {
    return new Promise((resolve, reject) => {

        const itemRemove = item.destroy();

        if(itemRemove) {
            resolve(itemRemove);
        } else {
            reject(Error("Erreur dans la suppression de l'annonce !"));
        }
    })
}
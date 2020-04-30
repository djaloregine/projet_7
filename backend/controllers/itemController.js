// Imports
const models = require('../models');

// Get all items
exports.getAllItems = (req, res) => {
    getItems()
        .then(data => {  //data retourne un tableau
            if(data.length == 0) return res.status(400).json({ error : "Il n'y a aucunes annonces !"});
            return res.status(200).json(data);
        })
        .catch(error => {
            return res.status(400).json(error);
        })
}

// Get one item
exports.getItem = (req, res) => {

    getItemById(req.params.id)
        .then(item =>{
            if(item == null) return res.status(400).json({ error : "Aucune annonce trouvée !"});
            res.status(200).json({ item });
        })
        .catch(error => {
            res.status(400).json({ error });
        })
}

// Create new item
exports.createItem = (req, res) => {
    // var text = req.body.text;

    
    // Check text is null
    if(text == null) return res.status(400).json({ error: 'Le champs texte est vide.' });

    // Check text length
    if(text.length < 9 || text.length >= 1000) {
        return res.status(400).json({ error: 'Le texte doit avoir une longueur de 10 à 100 caractères.' });
    }

    
    if(!req.file) return res.status(400).json({ error: "Une image est obligatoire !" });
    imageUrl = `${req.protocol}://${req.get('host')}/images/market/${req.file.filename}`;

    getUserById(req.userId)
        .then(user => {
            if(!user) return res.status(400).json({ error: "L'utilisateur n'existe pas !" });

            return queryCreateMessage(user.id, text);
        })
        .then(message => {
            res.status(200).json({ success: 'Le message a bien été créé !' });
        })
        .catch(error => {
            res.status(400).json({ error });
        })
}

// Update a item
exports.updateItem = (req, res) => {
    var text = req.body.text;
    
    // Check text is null
    if(text == null) return res.status(400).json({ error: 'Le champs texte est vide.' });

    // Check text length
    if(text.length < 9 || text.length >= 1000) {
        return res.status(400).json({ error: 'Le texte doit avoir une longueur de 10 à 100 caractères.' });
    }

    getMessageById(req.params.id)
        .then(message => {
            if(!message) return res.status(400).json({ error: "Le message n'existe pas !" });

            // Vérifie si c'est l'auteur ou un admin sinon pas accès
            if(message.UserId !== req.userId) {
                if(!req.isAdmin) return res.status(401).json({ error: 'Accès interdit !' });
            }

            return queryUpdateMessage(message, text);
        })
        .then(results => {
            res.status(200).json({ success: 'Message modifié !' });
        })
        .catch(error => {
            res.status(400).json({ error });
        })
}

// Delete a item
exports.deleteItem = (req, res) => {

    getMessageById(req.params.id)
        .then(message => {
            if(!message) return res.status(400).json({ error: "Le message n'existe pas !" });
            
            // Vérifie si c'est l'auteur ou un admin sinon pas accès
            if(message.UserId !== req.userId) {
                if(!req.isAdmin) return res.status(401).json({ error: 'Accès interdit !' });
            }

            return queryDeleteMessage(message);
        })
        .then(results => {
            res.status(200).json({ success: 'Message supprimé !' });
        })
        .catch(error => {
            res.status(400).json({ error });
        })
}

// Functions ----------------------------------------
function getItemById(id) {
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

function getItems() {
    return new Promise((resolve, reject) => {

        const items = models.Item.findAll({
            order: [
                ['id', 'DESC']
            ],
            include: [{
                model: models.User,
                attributes: ['firstname', 'lastname', 'imgUrl']
            }]
        });

        if(items) {
            resolve(items);
        } else {
            reject(Error('Aucunes annonces trouvées !'));
        }
    })
}

function getItemById(id) {
    return new Promise((resolve, reject) => {

        const message = models.Message.findOne({
            where: { id: id },
            include: [{
                model: models.User,
                attributes: ['firstname', 'lastname', 'imgUrl']
            }]
        });

        if(message) {
            resolve(message);
        } else {
            reject(Error('Aucun message trouvé !'));
        }
    })
}

function queryCreateItem(userId, text) {
    return new Promise((resolve, reject) => {

        const newMessage = models.Message.create({
            text: text,
            UserId: userId
        });

        if(newMessage) {
            resolve(newMessage);
        } else {
            reject(Error('Erreur dans la creation du message !'));
        }
    })
    
}

function queryUpdateItem(item, formParams) {
    return new Promise((resolve, reject) => {

        const updateMessage = message.update({
            text: text,
            updatedAt: new Date()
        });

        if(updateMessage) {
            resolve(updateMessage);
        } else {
            reject(Error('Erreur dans la creation du message !'));
        }
    })
}

function queryDeleteItem(item) {
    return new Promise((resolve, reject) => {

        const messageRemove = message.destroy();

        if(messageRemove) {
            resolve(messageRemove);
        } else {
            reject(Error('Erreur dans la suppression du message !'));
        }
    })
}
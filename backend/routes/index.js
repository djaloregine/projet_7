// Imports
var express = require('express');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const multer = require('../middleware/multer-config.js');

var userController = require('../controllers/userController');
var messageController = require('../controllers/messageController');
var itemController = require('../controllers/itemController');
var mediaController = require('../controllers/mediaController');

// Router
exports.router = (function() {
    var router = express.Router();

    // Auth routes
    router.post('/auth/login/', userController.login);
    router.post('/auth/register/', multer, userController.register);

    // Users routes
    router.get('/users/me/', auth, userController.getUserProfile);
    router.put('/users/me/', auth, multer, userController.updateUserProfile);
    router.delete('/users/me/', auth, userController.deleteUserProfile);

    // Messages routes
    router.get('/messages/', auth, messageController.getAllMessages);
    router.get('/messages/:id', auth, messageController.getMessage);
    router.post('/messages/', auth, messageController.createMessage);
    router.put('/messages/:id', auth, messageController.updateMessage);
    router.delete('/messages/:id', auth, messageController.deleteMessage);

    // Market Routes
    // router.get('/items/', auth, itemController.getAllItems);
    // router.get('/items/:id', auth, itemController.getItem);
    router.post('/items/', auth, multer, itemController.createItem);
    // router.put('/items/:id', auth, multer, itemController.updateItem);
    // router.delete('/items/:id', auth, itemController.deleteItem);

    // Medias routes
    // router.get('/medias/', auth, mediaController.getAllMedias);
    // router.get('/medias/:id', auth, mediaController.getMedia);
    // router.post('/medias/', auth, multer, mediaController.createMedia);
    // router.put('/medias/:id', auth, multer, mediaController.updateMedia);
    // router.delete('/medias/:id', auth, mediaController.deleteMedia);


  return router;
})();
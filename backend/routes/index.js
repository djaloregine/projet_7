// Imports
var express = require('express');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const multer = require('../middleware/multer-config.js');

var userCtrl = require('../controllers/userCtrl');
var userController = require('../controllers/userController');

var marketCtrl = require('../controllers/marketCtrl');
var messageCtrl = require('../controllers/messageCtrl');
var mediaCtrl = require('../controllers/mediaCtrl');

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
    // router.get('/messages/', auth, messageCtrl.getAllMessages);
    // router.get('/messages/:id', auth, messageCtrl.getMessage);
    // router.post('/messages/', auth, messageCtrl.createMessage);
    // router.put('/messages/:id', auth, messageCtrl.updateMessage);
    // router.delete('/messages/:id', auth, messageCtrl.deleteMessage);

    // Market Routes
    // router.get('/items/', auth, marketCtrl.getAllItems);
    // router.get('/items/:id', auth, marketCtrl.getItem);
    // router.post('/items/', auth, multer, marketCtrl.createItem);
    // router.put('/items/:id', auth, multer, marketCtrl.updateItem);
    // router.delete('/items/:id', auth, marketCtrl.deleteItem);

    // Medias routes
    // router.get('/medias/', auth, mediaCtrl.getAllMedias);
    // router.get('/medias/:id', auth, mediaCtrl.getMedia);
    // router.post('/medias/', auth, multer, mediaCtrl.createMedia);
    // router.put('/medias/:id', auth, multer, mediaCtrl.updateMedia);
    // router.delete('/medias/:id', auth, mediaCtrl.deleteMedia);


  return router;
})();
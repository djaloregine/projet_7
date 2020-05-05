const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    debugger;
    
    // Change destination de l'image en fonction de l'url 
    var domaine = req.url.split('/')[1];
    var target;

    if(domaine == "auth" || domaine == "users") {
      target = 'images/profiles';
    } else if (domaine == "medias") {
      target = 'images/medias';
    } else if(domaine == "items") {
      target = 'images/items';
    }

    callback(null, target);
  },
  filename: (req, file, callback) => {
    const nameWithExt = file.originalname.split(' ').join('_');
    const name = nameWithExt.split('.')[0];
  
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({storage: storage}).single('file');
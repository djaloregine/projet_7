const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if(!token) return res.status(400).send('Accès refusé !');

        const verified = jwt.verify(token, process.env.SECRET_TOKEN);

        // rajouter une condition plutard : req.body.userId == userID
        if (!verified.userId) return res.status(401).send('Token invalid !');
        
        req.userId = verified.userId;
        req.isAdmin = verified.isAdmin;
        next();
    } catch {
        res.status(401).json({ error: 'Accès refusé ! (InvalideToken)' });
    }
};
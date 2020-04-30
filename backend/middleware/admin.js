const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if(!token) return res.status(400).send('Accès refusé !');

        const verified = jwt.verify(token, process.env.SECRET_TOKEN);
        const admin = verified.isAdmin;

        // rajouter une condition plutard : req.body.userId == userID
        if (!admin) return res.status(401).json({ error: 'Invalid role' });
        
        next();
    } catch {
        res.status(401).json({ error: 'Invalid request!' });
    }
};
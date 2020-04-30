const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if(!token) return res.status(400).send('Accès refusé !');

        const verified = jwt.verify(token, process.env.SECRET_TOKEN);
        const userID = verified.userId;

        // rajouter une condition plutard : req.body.userId == userID
        if (!userID) return res.status(400).send('Invalid user !');
        
        req.userId = userID;
        next();
    } catch {
        res.status(401).json({ error: 'Invalid request!' });
    }
};
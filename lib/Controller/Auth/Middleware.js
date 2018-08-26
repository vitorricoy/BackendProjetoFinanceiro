verifyToken = require('./AuthVerify');

function verifyAuth(req, res, next) {
    if(req.headers.grant_type === "password") {
        let token = getToken(req);

        if(!token) {
            res.status(401);
            res.send('No token provided');
            return;
        }

        verifyToken(token)
            .then((decodedToken) => {
                req.body.user_id = decodedToken.user_id;
                req.query.user_id = decodedToken.user_id;
                next();
            })
            .catch(() => {
                res.status(401);
                res.send('Invalid token provided');
            });
        return;
    }

    res.status(401);
    res.send('Wrong grant type');
    
}

function getToken(req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    } else {
        return undefined;
    }
}

module.exports = verifyAuth;
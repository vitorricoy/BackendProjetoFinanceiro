express = require('express');
loginService = require('../Service/LoginService');

let router = express.Router();
router.post('/login', function(req, res) {
    loginService.login(req.body.username, req.body.password)
        .then((userId) => {
            res.send(userId);
        })
        .catch((err) => {
            res.status(500);
            res.send(err);  
        });
});

router.post('/register', function(req, res) {
    let userId = loginService.register(req.body.username, req.body.password);
    res.send(userId);
});

router.post('/refresh', function(req, res) {
    loginService.refresh(req.body.refresh_token, req.body.user_id)
        .then((newToken) => res.send(newToken))
        .catch((err) => {
            res.status(401);
            res.send(err);
        });
});

module.exports = router;
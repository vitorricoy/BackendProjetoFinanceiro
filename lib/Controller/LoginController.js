express = require('express');
LoginService = require('../Service/LoginService');

let router = express.Router();

let _loginService = new LoginService();

router.post('/login', function(req, res) {
    _loginService.login(req.body.username, req.body.password)
        .then((token) => {
            res.send(token);
        })
        .catch((err) => {
            res.status(500);
            res.send(err);  
        });
});

router.post('/register', function(req, res) {
    _loginService.register(req.body.username, req.body.password)
        .then((token) => res.send(token))
        .catch((err) => {
	    res.status(400);
	    res.send(err);
	});
});

router.post('/refresh', function(req, res) {
    _loginService.refresh(req.body.refresh_token, req.body.user_id)
        .then((newToken) => res.send(newToken))
        .catch((err) => {
            res.status(401);
            res.send(err);
        });
});

module.exports = router;
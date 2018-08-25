express = require('express');
middleware = require('./Auth/Middleware');

let router = express.Router();

router.use(middleware);

router.get('/', function(req, res) {
    res.send('hi');
});

module.exports = router;

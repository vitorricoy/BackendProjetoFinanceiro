express = require('express');

let router = express.Router();
router.get('/', function(req, res) {
    return 'hi';
});

module.exports = router;

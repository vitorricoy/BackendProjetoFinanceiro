express = require('express');
middleware = require('./Auth/Middleware');
TransactionService = require('../Service/TransactionService');

let _transactionService = new TransactionService();
let router = express.Router();

router.use(middleware);

router.get('/', function(req, res) {
    _transactionService.getTransactions(req.query.month, req.query.user_id)
        .then((transactions) => {
            res.send(transactions);
        })
        .catch((err) => {
            res.status(500);
            res.send(err);
        });
});

module.exports = router;

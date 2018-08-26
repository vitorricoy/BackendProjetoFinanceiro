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

router.post('/', function(req, res) {
    _transactionService.saveTransaction(req.body.new_transaction, req.body.month, req.body.user_id)
        .then((newTransaction) => {
            res.send(newTransaction);
        })
        .catch((err) => {
            res.status(500);
            res.send(err);
        });
});

router.put('/', function(req, res) {
    _transactionService.updateTransaction(req.body.user_id, req.body.month, req.body.new_transaction)
        .then((success) => {
            res.send(success);
        })
        .catch((err) => {
            res.status(500);
            res.send(err);
        });
});

router.delete('/', function(req, res) {
    _transactionService.removeTransaction(req.query.user_id, req.query.month, req.query.transaction_id)
        .then((success) => {
            res.send(success);
        })
        .catch((err) => {
            res.status(500);
            res.send(err);
        });
});

module.exports = router;

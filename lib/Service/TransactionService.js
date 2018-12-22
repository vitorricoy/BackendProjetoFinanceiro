TransactionRepository = require('../SQL/TransactionRepository');

let _transactionRepository = new TransactionRepository();

function TransactionService() {
    
}

TransactionService.prototype.getTransactions = function(month, year, userId) {
    return new Promise((resolve, reject) => {
        _transactionRepository.getTransactionsByMonth(month, year, userId)
            .then((transactions) => resolve(transactions))
            .catch((err) => reject(err));
    });
    
}

TransactionService.prototype.saveTransaction = function(newTransaction, month, year, userId) {
    return new Promise((resolve, reject) => {
        _transactionRepository.saveTransaction(newTransaction, month, year, userId)
            .then((newTransaction) => resolve(newTransaction))
            .catch((err) => reject(err));
    });
}

TransactionService.prototype.updateTransaction = function(userId, month, year, newTransaction) {
    return new Promise((resolve, reject) => {
        _transactionRepository.updateTransaction(userId, month, year, newTransaction)
            .then((success) => resolve(success))
            .catch((err) => reject(err));
    });
}

TransactionService.prototype.removeTransaction = function(userId, month, year, transactionId) {
    return new Promise((resolve, reject) => {
        _transactionRepository.removeTransaction(userId, month, year, transactionId)
            .then((success) => resolve(success))
            .catch((err) => reject(err));
    });
}

TransactionService.prototype.createDataBase = function() {
    _transactionRepository.createDataBase();
}

module.exports = TransactionService;
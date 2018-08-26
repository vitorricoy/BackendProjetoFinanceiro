TransactionRepository = require('../SQL/TransactionRepository');

let _transactionRepository = new TransactionRepository();

function TransactionService() {
    
}

TransactionService.prototype.getTransactions = function(month, userId) {
    return new Promise((resolve, reject) => {
        _transactionRepository.getTransactionsByMonth(month, userId)
            .then((transactions) => resolve(transactions))
            .catch((err) => reject(err));
    });
    
}

TransactionService.prototype.saveTransaction = function(newTransaction, month, userId) {
    return new Promise((resolve, reject) => {
        _transactionRepository.saveTransaction(newTransaction, month, userId)
            .then((newTransaction) => resolve(newTransaction))
            .catch((err) => reject(err));
    });
}

TransactionService.prototype.updateTransaction = function(userId, month, transactionId, newTransaction) {
    return new Promise((resolve, reject) => {
        _transactionRepository.updateTransaction(userId, month, transactionId, newTransaction)
            .then((success) => resolve(success))
            .catch((err) => reject(err));
    });
}

TransactionService.prototype.removeTransaction = function(transactionId) {
    return new Promise((resolve, reject) => {
        _transactionRepository.removeTransaction(userId, month, transactionId, newTransaction)
            .then((success) => resolve(success))
            .catch((err) => reject(err));
    });
}

module.exports = TransactionService;
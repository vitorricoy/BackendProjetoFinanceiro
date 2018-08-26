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

TransactionService.prototype.saveTransaction = function(transactionId, password) {
    return new Promise((resolve, reject) => {
        
    });
}

TransactionService.prototype.removeTransaction = function(refresh_token, userId) {
    return new Promise((resolve, reject) => {
        
    });
}

module.exports = TransactionService;
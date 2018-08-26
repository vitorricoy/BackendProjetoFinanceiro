pg = require('pg');
uuidv4 = require('uuid/v4');

const client = new pg.Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    ssl: true
  });


function TransactionRepository() {

}


TransactionRepository.prototype.getTransactionsByMonth = function(month, user_id) {
    return new Promise((resolve, reject) => {
        client.connect();
        client.query('SELECT * FROM Transactions WHERE Month=$1 AND UserId=$2', [month, user_id], (err, res) => {
            if(err) {
                return reject(err.stack);
            }
            client.end();
            if(res.length > 0) {
                return resolve(JSON.parse(res[0].Data));
            } else {
                return resolve([]);
            }
        });
    });
}

TransactionRepository.prototype.saveTransaction = function(newTransaction, month, userId) {
    return new Promise((resolve, reject) => {
        this.getTransactionsByMonth(month, userId).then((transactions) => {
            newTransaction.id = uuidv4();
            transactions.append(newTransaction);
            client.connect();
            
            if(transactions.length === 0) {
                client.query('INSERT INTO Transactions (Data, Month, UserId) VALUES ($1, $2, $3)', [JSON.stringify(transactions), month, userId], (err, res) => {
                    if(err) {
                        return reject(err.stack);
                    }
                    client.end()
                    return resolve(true);
                });
            } else {
                client.query('UPDATE FROM Transactions SET Data=$1 WHERE Month=$2 AND UserId=$3', [JSON.stringify(transactions), month, userId], (err, res) => {
                    if(err) {
                        return reject(err.stack);
                    }
                    client.end()
                    return resolve(true);
                }); 
            }
        });
        
    });
}

TransactionRepository.prototype.updateTransaction = function(userId, month, transactionId, newTransaction) {
    return new Promise((resolve, reject) => {
        
        this.getTransactionsByMonth(month, userId).then((transactions) => {
            transactions.forEach((transaction, index) => {
                if(transaction.id == newTransaction.id) {
                    transactions[index] = newTransaction;
                }
            });

            client.connect();
            client.query('UPDATE Transactions SET Data=$1 WHERE id=$2', [JSON.stringify(transactions), transactionId], (err) => {
                if(err) {
                    return reject(err.stack);
                }
                client.end()
                return resolve(true);
            });
        });
    });
}

TransactionRepository.prototype.deleteTransaction = function(transactionId) {
    return new Promise((resolve, reject) => {
        this.getTransactionsByMonth(month, userId).then((transactions) => {
            client.connect();
            if(transactions.length === 1) {
                client.query('DELETE FROM Transactions WHERE id=$1', [transactionId], (err, res) => {
                    if(err) {
                        return reject(err.stack);
                    }
                    client.end()
                    return resolve(true);
                });
            } else {
                transactions.append(newTransaction)
                client.query('UPDATE Transactions SET Data = $1 WHERE Month=$2 AND UserId=$3', [JSON.stringify(transactions), month, userId], (err, res) => {
                    if(err) {
                        return reject(err.stack);
                    }
                    client.end()
                    return resolve(true);
                });
            }
        });
        
    });
}

module.exports = TransactionRepository;


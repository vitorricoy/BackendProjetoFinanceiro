pg = require('pg');
uuidv4 = require('uuid/v4');

const pool = new pg.Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    ssl: true
  });


function TransactionRepository() {

}


TransactionRepository.prototype.getTransactionsByMonth = function(month, userId) {
    return new Promise((resolve, reject) => {
        pool.connect(function(err, client, done) {
            if(err) {
                return reject(err);
            }
            client.query('SELECT * FROM Transactions WHERE Month=$1 AND UserId=$2', [month, userId], (err, res) => {
                done();
                if(err) {
                    return reject(err.stack);
                }
                if(res.rows.length > 0) {
                    return resolve(JSON.parse(res.rows[0].data));
                } else {
                    return resolve([]);
                }
            });
        });
    });
}

TransactionRepository.prototype.saveTransaction = function(newTransaction, month, userId) {
    return new Promise((resolve, reject) => {
        this.getTransactionsByMonth(month, userId)
            .then((transactions) => {
                newTransaction.id = uuidv4();
                transactions.push(newTransaction);
                pool.connect(function(err, client, done) {
                    if(err) {
                        return reject(err);
                    }

                    if(transactions.length === 1) {
                        client.query('INSERT INTO Transactions (Data, Month, UserId) VALUES ($1, $2, $3)', [JSON.stringify(transactions), month, userId], (err, res) => {
                            done();
                            if(err) {
                                return reject(err.stack);
                            }
                            return resolve(newTransaction);
                        });
                    } else {
                        client.query('UPDATE Transactions SET Data=$1 WHERE Month=$2 AND UserId=$3', [JSON.stringify(transactions), month, userId], (err, res) => {
                            done();
                            if(err) {
                                return reject(err.stack);
                            }
                            return resolve(newTransaction);
                        }); 
                    }
                });
            })
            .catch((err) => reject(err));
        
    });
}

TransactionRepository.prototype.updateTransaction = function(userId, month, newTransaction) {
    return new Promise((resolve, reject) => {
        
        this.getTransactionsByMonth(month, userId)
            .then((transactions) => {
                transactions.forEach((transaction, index) => {
                    if(transaction.id == newTransaction.id) {
                        transactions[index] = newTransaction;
                    }
                });
                pool.connect(function(err, client, done) {
                    if(err) {
                        return reject(err);
                    }
                    client.query('UPDATE Transactions SET Data=$1 WHERE Month=$2 AND UserId=$3', [JSON.stringify(transactions), month, userId], (err) => {
                        done();
                        if(err) {
                            return reject(err.stack);
                        }
                        return resolve(true);
                    });
                });
            })
            .catch((err) => reject(err));
    });
}

TransactionRepository.prototype.removeTransaction = function(userId, month, transactionId) {
    return new Promise((resolve, reject) => {
        this.getTransactionsByMonth(month, userId)
            .then((transactions) => {
                pool.connect(function(err, client, done) {
                    if(err) {
                        return reject(err.stack);
                    }

                    if(transactions.length === 1 && transactions[0].id == transactionId) {
                        client.query('DELETE FROM Transactions WHERE Month=$1 AND UserId=$2', [month, userId], (err, res) => {
                            done();
                            if(err) {
                                return reject(err.stack);
                            }
                            return resolve(true);
                        });
                    } else {
                        for(let i=0; i<transactions.length; i++){
                            if(transactions[i].id == transactionId) {
                                transactions.splice(i, 1);
                                i--;
                            }
                        }
                        client.query('UPDATE Transactions SET Data = $1 WHERE Month=$2 AND UserId=$3', [JSON.stringify(transactions), month, userId], (err, res) => {
                            done();
                            if(err) {
                                return reject(err.stack);
                            }
                            return resolve(true);
                        });
                    }
                });
            })
            .catch((err) => reject(err));
        
    });
}

TransactionRepository.prototype.createDataBase = function() {
    pool.connect(function(err, client, done) {
        if(err) {
            return reject(err.stack);
        }
        client.query('CREATE TABLE Transactions(id SERIAL PRIMARY KEY, Month INT NOT NULL, Data Text NOT NULL, UserId Text NOT NULL)', [], (err, res) => { done(); });
    });
}
    
module.exports = TransactionRepository;


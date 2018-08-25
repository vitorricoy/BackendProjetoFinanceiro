require("dotenv").config();
express = require('express');
bodyParser = require('body-parser');
transactionController = require('./lib/Controller/TransactionController');
loginController = require('./lib/Controller/LoginController');
mongoDB = require('./lib/NoSQL/MongoDB');

app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let port = process.env.PORT || 8080;

app.use('/api/Transaction', transactionController);

app.use('/api/Login', loginController);

app.listen(port);

module.exports = app;



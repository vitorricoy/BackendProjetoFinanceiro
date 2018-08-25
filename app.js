require("dotenv").config();
express = require('express');
bodyParser = require('body-parser');
transactionController = require('./lib/Controller/TransactionController');
mongoDB = require('./lib/NoSQL/MongoDB');
middleware = require('./lib/Controller/Auth/Middleware');

app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let port = process.env.PORT || 8080;

transactionController.use(middleware);

app.use('/api/Transaction', transactionController);

app.listen(port);

module.exports = app;



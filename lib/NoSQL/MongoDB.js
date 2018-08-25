mongoose = require('mongoose');  

let userMongo = process.env.USER_MONGO;
let passwordMongo = process.env.PASSWORD_MONGO;
let hostMongo = process.env.HOST_MONGO;
mongoose.connect('mongodb://'+userMongo+':'+passwordMongo+'@'+hostMongo+'/user_data', {useNewUrlParser: true});  

mongoose.set('useFindAndModify', false);

module.exports = mongoose;
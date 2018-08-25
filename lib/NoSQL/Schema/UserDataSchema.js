mongoose = require('mongoose'); 
let Schema = mongoose.Schema;

let user = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true},
    refresh_token: { type: String, required: true }
});

let UserData = mongoose.model('UserData', user);

module.exports = UserData;
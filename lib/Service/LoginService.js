UserScheme = require('../../NoSQL/Schema/UserDataSchema');
verifyRefreshToken = require('../Controller/Auth/VerifyRefresh');

function LoginService() {
    
}

LoginService.prototype.login = function(username, password) {
    return new Promise((resolve, reject) => {
        let query = {
            username: username,
            password: password
        }
    
        UserScheme.findOne(query, function(err, result) {
            if(err) {
                return reject(err);
            }

            if(result) {
                return resolve(result._id);
            }
        });
    });
    
}

LoginService.prototype.register = function(username, password) {
    let user = {
        username: username,
        password: password,
        refresh_token: ''
    };

    let userDB = new UserScheme(user);

    userDB.save();

    return userDB._id;
}

LoginService.prototype.refresh = function(refresh_token, userId) {
    return new Promise((resolve, reject) => {
        verifyRefreshToken(refresh_token, userId)
            .then((newToken) => resolve(newToken))
            .catch((err) => reject(err));
    });
}

module.exports = LoginService;
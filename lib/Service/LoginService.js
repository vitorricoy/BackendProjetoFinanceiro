UserScheme = require('../NoSQL/Schema/UserDataSchema');
verifyRefreshToken = require('../Controller/Auth/VerifyRefresh');
generateToken = require('../Controller/Auth/AuthProvider');

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
                return resolve(generateToken(result._id));
            }
        });
    });
    
}

LoginService.prototype.register = function(username, password) {
    return new Promise((resolve, reject) => {
        let user = {
            username: username,
            password: password,
            refresh_token: ' '
        };

        let query = {
            username: username,
            password: password
        }
    
        UserScheme.findOne(query, function(err, result) {
            if(err) {
                return reject(err);
            }

            if(result === null) {
                let userDB = new UserScheme(user);
    
                userDB.save().then(() => {
                    return resolve(generateToken(userDB._id.toString()));
                });
            } else {
                return reject('Usuario já cadastrado');
            }
        });
    }); 
}

LoginService.prototype.refresh = function(refresh_token, userId) {
    return new Promise((resolve, reject) => {
        verifyRefreshToken(refresh_token, userId)
            .then((newToken) => resolve(newToken))
            .catch((err) => reject(err));
    });
}

module.exports = LoginService;
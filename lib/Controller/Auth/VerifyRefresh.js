UserScheme = require('../../NoSQL/Schema/UserDataSchema');
generateToken = require('./AuthProvider');

function verifyRefreshToken(refresh_token, user_id) {
    return new Promise((resolve, reject) => {
        UserScheme.findById(user_id, function(err, result) {
            if(err) {
                return reject(err);
            }

            if(result.refresh_token === refresh_token) {
                return resolve(generateToken(user_id));
            } else {
                return reject('Invalid refresh token');
            }
        });
    });
}

module.exports = verifyRefreshToken;
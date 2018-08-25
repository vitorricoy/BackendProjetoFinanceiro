jwt = require('jsonwebtoken');
UserScheme = require('../../NoSQL/Schema/UserDataSchema')
Crypto = require('crypto');
Base64url = require('base64url');

function createJwtToken(user_id) {
    if(!user_id) {
      return {};
    }

    let token = jwt.sign(
      {
        user_id: user_id
      }, 
      process.env.JWT_SECRET, 
      {
         expiresIn: 1800,
         algorithm: 'HS256'
      }
    );

    let refresh_token = generateRefreshToken();

    UserScheme.findById(user_id, function(err, user) {  
      if (err) {  
        console.error('Error, no entry found');  
      }  
      user.refresh_token = refresh_token
      user.save();
    })

    return {
      token: token, 
      refresh_token: refresh_token, 
      user_id: user_id
    };
}

function generateRefreshToken() {
  return Base64url(Crypto.randomBytes(25));
}

module.exports = createJwtToken;
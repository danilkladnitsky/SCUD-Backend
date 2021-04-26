const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
// get config vars
dotenv.config();
const TOKEN_SECRET="df223ec6c44ad004c2d4318e5a5a26a7c73be8f117f922b734f91f63d12767cf27a5aa610d0e5318d3c7768cc451cdb8e61658d0a7df6140fca35d6bf28d9db2"

module.exports = {
  generateAccessToken: function(data) {
    return jwt.sign(data, TOKEN_SECRET, { expiresIn: '46800s' });
  },

  authenticateToken: function(args, callback) {
    return new Promise((resolve, reject) => {
     // if (args.token == null) 
    jwt.verify(args.token, TOKEN_SECRET, (err, user) => {
      if (err){
        resolve()
      }else{
       resolve(callback(args))
      }
    })
    })
    
  }
}


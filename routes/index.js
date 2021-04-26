const Auth = require('./auth');
const Users = require('./users')
const Code = require('./code')
const Logs = require('./logs')
let secure = require('../secure')
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
       res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
       res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
  });


  //app.all('*', checkUser);
  function checkUser(req, res, next) {
    console.log(req.path+"-current root")
    const nonSecurePaths = ['/auth*', '/graphql'];
    if (nonSecurePaths.includes(req.path)) return next();
    const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)
    console.log(token)
  jwt.verify(token, secure.TOKEN_SECRET, (err, user) => {
    console.log(err)
    if (err) return res.sendStatus(403)
    console.log("WRONG TOKEN")
    req.user = user

    next()
  })
  }
  Auth(app)
  Users(app)
  Code(app)
  Logs(app)
};
let users = require('../config/users')
var bodyParser = require('body-parser'); 
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var jsonParser = bodyParser.json()

module.exports = function(app) {
  app.get('/users', async(req, res) => {
    users.getAllUsers(res)
    console.log("Get users");
  });

  app.get('/usersOnObject', async(req, res) => {
    users.getUsersOnObject(res)
    console.log("Get users on objects");
  });

  app.get('/usersByParam/:param/:value', async(req, res) => {
    users.getUserByParam(req.params.param, req.params.value, res);
  });

  app.get('/usersGetByID', async(req, res) => {
    console.log(req.query.login)
    users.getUserID(req.query.login, res)
    console.log("Get user by id");
  });

  app.get('/users/:id', async(req, res) => {
    users.getUser(req.params.id, res)
  });

  app.put('/users/:id', jsonParser, async(req, res) => {
      users.updateUser(req.body, req.params.id, res)
  });

  app.delete('/users/:id', async(req, res) => {
    users.deleteUser(req.params.id, res)
  });
};
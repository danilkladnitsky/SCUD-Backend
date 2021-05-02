//Подключаем необходимые модули
let users = require('../config/users')
var bodyParser = require('body-parser'); 
var jsonParser = bodyParser.json()

module.exports = function(app) {
  app.get('/users', async(req, res) => {
    //Получаем всех пользователей
    users.getAllUsers(res)
  });

  app.get('/usersOnObject', async(req, res) => {
    //Получаем пользователей на объекте
    users.getUsersOnObject(res)
  });

  app.get('/usersByParam/:param/:value', async(req, res) => {
    //Получаем всех пользователей по параметрам
    users.getUserByParam(req.params.param, req.params.value, res);
  });

  app.get('/usersGetByID', async(req, res) => {
    //Получаем ID пользователя
    users.getUserID(req.query.login, res)
  });

  app.get('/users/:id', async(req, res) => {
    //Получаем пользователя по ID
    users.getUser(req.params.id, res)
  });

  app.put('/users/:id', jsonParser, async(req, res) => {
    //Обновляем пользователя
      users.updateUser(req.body, req.params.id, res)
  });

  app.delete('/users/:id', async(req, res) => {
    //Удаляем пользователя
    users.deleteUser(req.params.id, res)
  });
};

const { Pool } = require("pg")
const settings = require("./settings")
const pool = new Pool(settings.pool_settings)
let secure = require('../secure')
module.exports = {
  _loginUser: function(args, output){
    return new Promise((resolve, reject) => {
      pool.query("SELECT id FROM users WHERE login = $1 AND pwd = $2", [args.login, args.pwd], (err, res) => {
        if(err){
          console.log(err)
        }else{
            if(res.rowCount > 0){
              resolve({msg: "Login Succesful", token: secure.generateAccessToken({name: args.login}), id: res.rows[0].id});
  
            }else{
              resolve({msg: "Login Unsuccesful", token: "", id: 0})
            }
        }
  
    })
    });
    
  },
loginUser: function(username, pwd, output){
  pool.query("SELECT id FROM users WHERE login = $1 AND pwd = $2", [username, pwd], (err, res) => {
      if(err){
        console.log(err)
      }else{
          if(res.rowCount > 0){
            output.status(200).json({msg: "Login Succesful", token: secure.generateAccessToken({username: username, id: res.rows[0].id}), id: res.rows[0].id});

          }else{
            output.status(400).json({error: "Login Unsuccesful"});
          }
      }

  })
},

createUser: function(username, login, pwd, mode, output){
pool.query("INSERT INTO users (name, login, pwd, mode) VALUES($1, $2, $3, $4)", [username, login, pwd, mode], (err, res) => {
    if(err){
      console.log(err)
    }else{
      output.status(201).json({msg: "User was created"});
    }

})
},

UserExist: function(username, login, pwd, mode, output, callback){
pool.query("SELECT id FROM users WHERE login = $1", [login], (err, res) => {
  if(err){
    console.log(err)
  }else{
    if(res.rowCount > 0){
     output.status(409).json({msg: "User already registered"});
    }else{
      callback(username, login, pwd, mode, output);
    }
      
  }

})
}
}
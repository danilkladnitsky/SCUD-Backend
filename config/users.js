const {
  Pool
} = require("pg")
const settings = require("./settings")
const secure = require("../secure")
const pool = new Pool(settings.pool_settings)
const code = require("./code")
const qr = require("../config/code")

module.exports = {
  _getUser: function (args) {
    return new Promise((resolve, reject) => {
      pool.query("SELECT * FROM users WHERE id = $1", [args.id], (err, res) => {
        if (err) {
          console.log(err)
        } else {
          console.log(res.rows[0])
          resolve(res.rows[0])
        }
      })
    })
  },
  _getUsers: function (args) {
    return new Promise((resolve, reject) => {
      let request = "SELECT * FROM users WHERE mode != 100";
      if (args.param != undefined && args.value != undefined) {
        request = "SELECT * FROM users WHERE mode != 100 AND " + args.param + " = " + args.value;
      }
      pool.query(request, (err, res) => {
        if (err) {
          console.log(err)
        } else {
          resolve(res.rows)
        }
      })
    })

  },

  _updateUser: function (args) {
    return new Promise((resolve, reject) => {
      pool.query("UPDATE users SET name = $1, mode = $2, pwd = $3, login = $4 WHERE id = $5 ", [args.name, args.mode, args.pwd, args.login, args.id], (err, res) => {
        if (err) {
          console.log(err)
        } else {
          console.log(res.rowCount)
          if (!res.rowCount) {
            resolve({
              message: "User not found"
            })
          } else {
            resolve({
              message: "User was updated"
            })
          }

        }
      })
    })
  },

  _createUser: function (args) {
    return new Promise((resolve, reject) => {
      //Checking existence
      pool.query("SELECT id FROM users WHERE login = $1", [args.login], (err, res) => {
        if (err) {
          console.log(err)
        } else {
          if (res.rowCount == 0) {
            pool.query("INSERT INTO users (name, mode, pwd, login) VALUES($1,$2,$3,$4)", [args.name, args.mode, args.pwd, args.login], (err, res) => {
              if (err) {
                console.log(err)
              } else {
                console.log("User was created")
                resolve({
                  message: "User was created"
                })
              }
            })
          } else {
            resolve({
              message: "User was already created"
            })
          }
        }
      })
    })
  },


  _getStats: function (args) {
    return new Promise((resolve, object) => {

    })
  },
  _createCode: function(args){
    return new Promise((resolve, object) => {
  
      qr.createUniqueCode({username: args.name, mode: args.mode}, function(result){
        let path = "static/" + args.name + "_" + args.mode + ".png";
        let real_path = args.name + "_" + args.mode + ".png";
        require("fs").writeFile(path,result, 'base64', function(err) {
          resolve({message: real_path})
        });
        
      });
    })
    
  },
  getAllUsers: function (output) {
    pool.query("SELECT * FROM users WHERE mode != 100", (err, res) => {
      if (err) {
        console.log(err)
      } else {
        output.json(res.rows)
      }
    })
  },
  getUser: function (id, output) {
    pool.query("SELECT * FROM users WHERE id = $1", [id], (err, res) => {
      if (err) {
        console.log(err)
      } else {
        output.json(res.rows)
      }
    })
  },

  getUserByParam: function (param, value, output) {
    pool.query(`SELECT * FROM users WHERE ${param} = $1`, [value], (err, res) => {
      if (err) {
        console.log(err)
      } else {
        output.json(res.rows)
      }
    })
  },

  getUserID: function (name, output) {
    pool.query("SELECT id FROM users WHERE login = $1", [name], (err, res) => {
      if (err) {
        console.log(err)
      } else {
        output.json(res.rows)
      }
    })
  },

  updateUser: function (body, id, output) {
    pool.query("UPDATE users SET name = $1, mode = $2, pwd = $3, login = $4 WHERE id = $5 ", [body.name, body.mode, body.pwd, body.login, id], (err, res) => {
      if (err) {
        console.log(err)
      } else {
        if (res.rowCount) {
          output.status(204).json("User was updated")
        } else {
          output.status(400).json("User not found")
        }

      }
    })
  },

  deleteUser: function (id, output) {
    pool.query("DELETE FROM users WHERE id = $1", [id], (err, res) => {
      if (err) {
        console.log(err)
      } else {
        if (res.rowCount) {
          output.json("User was deleted")
        } else {
          output.json("User not found")
        }
      }
    })
  },

  getUsersOnObject: function (output) {
    pool.query("SELECT DISTINCT(guest_id) FROM logs", (err, res) => {
      if (err) {
        console.log(err)
      } else {
        output.json(res.rows)
      }
    })
  }
}
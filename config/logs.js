
const { Pool } = require("pg")
const settings = require("./settings")
const secure = require("../secure")
const pool = new Pool(settings.pool_settings)

module.exports = {
  _getLogs: function(args){
      return new Promise((resolve, reject) => {
        let request = "SELECT * FROM logs";
        if(args.param != undefined && args.value != undefined){
          request = "SELECT * FROM logs WHERE " + args.param + " = '" + args.value + "'";
        }
        pool.query(request, (err, res) => {
          if(err){
            console.log(err)
          }else{
              resolve(res.rows)
          }
      })
      })
    
  },

getAllLogs: function(output){
  pool.query("SELECT * FROM logs", (err, res) => {
      if(err){
        console.log(err)
      }else{
          output.json(res.rows)
      }
  })
},

getLogsByParam: function(param, value, output){
  pool.query(`SELECT * FROM logs WHERE ${param} = $1`, [value], (err, res) => {
      if(err){
        console.log(err)
      }else{
          output.json(res.rows)
      }
  })
},

insertLog: function(guest_id, guest_name, mode, zone, status, output){
  pool.query("INSERT INTO logs (guest_id, guest_name, mode, zone, status) VALUES($1, $2, $3, $4, $5)", [guest_id, guest_name, mode, zone, status], (err, res) => {
    if(err){
      console.log(err)
    }else{
        output.json(res.rows)
    }
})
},


}

const { Pool } = require("pg")
const settings = require("./settings")
const QRCode = require("qrcode")
const secure = require("../secure")
const pool = new Pool(settings.pool_settings)
module.exports = {
  createCode: function(id, output){
    pool.query("SELECT id, login, mode FROM users WHERE id = $1", [id], (err, res) => {
        if(err){
          console.log(err)
        }else{
          let token = secure.generateAccessToken({login: res.rows[0]['login'], mode: res.rows[0]['mode'], id: res.rows[0]['id']});
          console.log(token)
          QRCode.toDataURL(token ,{type:'terminal'} , function (err, url) {
            if(err) return console.log("error occured")
            console.log("code received: id: " + id)
            
  let base64Data = url.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
  
  let img = Buffer.from(base64Data, 'base64');
  output.writeHead(200, {
    'Content-Type': 'image/png',
    'Content-Length':img.length
  });
  output.end(img);
  console.log(img)
          })
        }
    })
  },
  createUniqueCode: function(args,  callback){
    let token = secure.generateAccessToken(args);
          QRCode.toDataURL(token ,{type:'terminal'} , function (err, url) {
            if(err) return console.log("error occured")
    
  let base64Data = url.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
  
  let img = Buffer.from(base64Data, 'base64');
  console.log(img)

  callback(img)
          })
  }
}
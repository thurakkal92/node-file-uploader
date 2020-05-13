const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const formidable = require('formidable')
const app = express();
const PORT = process.env.PORT || 3000

var allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  if ('OPTIONS' == req.method) {
    res.send(200);
  }
  else {
    next();
  }
};

app.use(allowCrossDomain)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/upload', fileUpload);
app.get('/', function (req, res) { res.send('This is file reader') })


function fileUpload(req, res) {
  new formidable.IncomingForm().parse(req, (err, fields, files) => {
    if (err) {
      console.error('Error', err)
      throw err
    }

    fs.readFile(files.file.path, 'utf8', function (err, data) {
      if (err) {
        res.send({status: 500, message: err}).status(500)
        return console.log(err);
      }
      const dataToSend = data.toString().split('\n').join()
      res.send({status: 200, data: dataToSend}).status(200)
    })
  })
}


app.listen(PORT, () => {
  console.log("server started")
})







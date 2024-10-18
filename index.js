var express = require('express');
var cors = require('cors');
var multer = require('multer');
require('dotenv').config();

var app = express();

// Configura Multer
var storage = multer.memoryStorage(); // Almacena el archivo en memoria
var upload = multer({ storage: storage });

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Endpoint para manejar la carga de archivos
app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {
  // Verifica si se ha subido un archivo
  if (!req.file) {
    return res.status(400).send({ error: 'No file uploaded' });
  }
  
  // Prepara la respuesta
  const fileInfo = {
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size,
  };

  res.json(fileInfo); // Devuelve la información del archivo como JSON
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});

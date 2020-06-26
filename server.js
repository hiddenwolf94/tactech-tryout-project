// Creación de servidor.
// Módulos requeridos.
const http          = require('http'),
      path          = require('path'),
      express       = require('express'),
      bodyParser    = require('body-parser'),
      cors          = require('cors'),
      iaf           = require('api-iceandfire')
      mongoose      = require('mongoose');

// Base de datos a utilizar.
mongoose.connect('mongodb://localhost:27017/got_db', {
  useNewUrlParser: true,    // Configuraciones en orden de
  useUnifiedTopology: true  // mantener la integridad del proyecto.
})
        .then(() =>  console.log('Conexion con la base de datos Exitosa'))
        .catch((error) => console.error(`No se ha podido establecer la conexion: ${error}`));

// Puerto y Aplicación.
const port    = 5000,
      app     = express(),
      Routing = require('./routes'),
      server  = http.createServer(app);

// Rutas y modelo.
const characterModel = require('./models/characterModel'),
      houseModel     = require('./models/houseModel');

app.use(cors());

app.get('/', (req, res) => {
  for (let i = 1; i < 1076; i++) {
    // const personajes = [];
    iaf.getCharacter(i).then(character => {
      let personaje = new characterModel(character);
      // console.log(personaje);
      personaje.save((error, res)=> {
        if (error) {
          console.error('Error en guardar personaje', error.message)
        }
      })
    })
  }
})

// iaf.getCharacter('').then(character => console.log(character));
app.use(Routing)

app.use(express.static(__dirname + 'client'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

server.listen(port, () => console.log(`Server is running in http://localhost:${port}`));
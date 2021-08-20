import express from 'express';
import path from 'path';
import handlebars from 'express-handlebars';
import routesproduct from './ruta/routesproduct';
import * as http from 'http';
import { ProductoController } from './classProduct';
import { sockerService } from './services/socket';

const app = express();
const puerto = 8080;

app.use(express.json());

const publicFolderPath = path.resolve(__dirname, '../public');
app.use(express.static(publicFolderPath));

const layoutFolderPath = path.resolve(__dirname, '../views/layouts');
const defaultLayerPth = path.resolve(__dirname, '../views/layouts/index');
const partialsDirPath = path.resolve(__dirname, '../views/partials');

app.set('view engine', 'handlebars');
app.engine(
  'handlebars',
  handlebars({
    layoutDir: layoutFolderPath,
    defaultLayout: defaultLayerPth,
    partialsDir: partialsDirPath,
  })
);

const myServer = http.Server(app);
myServer.listen(puerto, () => console.log('SERVER UP en puerto', puerto));

sockerService.initWSServer(myServer);

app.get('/', (req, res) => {
  const data = {
    layout: 'index',
    productos: ProductoController.leerItems(),
  };
  res.render('main', data);
});



app.use('/api/productos', routesproduct);

app.get('/', (req, res) => {
  res.sendFile(__dirname + './public/html.html');
});

 socket.on("chatMessage", (chat) => {
    guardarNewMessage(chat);
    const chatfile = readfile();
    
    socket.emit("message", chatfile);
    socket.broadcast.emit("message", chatfile);
  });


const guardarMessages = (messages) => {
  fs.writeFileSync(
    "./chat.txt",
    JSON.stringify(messages, undefined, 2),
    "utf-8"
  );
};

const guardarNewMessage = (data) => {
  let messages = JSON.parse(readfile());
  let now = new Date();
  let date = moment(now).format("DD/MM/YYYY HH:MM:SS");
  const newMessage = { email: data.email, fecha: date, mensaje: data.mensaje };
  messages.push(newMessage);
  guardarMessages(messages);
};
import socketIo from 'socket.io';
import fs from 'fs';
import moment from 'moment';

const messages = [];

class SocketService {
  initWSServer(server) {
    if (!this.io) {
      this.io = socketIo(server);

      this.io.on('connection', (socket) => {
        console.log('Nueva Conexion establecida!');

        socket.on('new-message', (data) => {
          console.log('RECIBI UN MSJ NUEVO');
          console.log(data);
          messages.push(data);
          socket.emit('messages', messages);
        });
      });
    }

    return this.io;
  }

  getServer() {
    return this.io;
  }
}


const readfile = () => {
    let filenames = fs.readdirSync("./");
    const found = filenames.find((element) => "chat.txt" === element);
    if (found === "chat.txt") {
      const data = fs.readFileSync("./chat.txt", "utf-8");
      return data;
    } else {
      console.log("Archivo no leido");
    }
  


const chatfile = readfile();
  
 this.io.on("chatMessage", (chat) => {
    guardarNewMessage(chat);
    
    
    socket.emit("messages", chatfile);
    socket.broadcast.emit("messages", chatfile);
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

const chatForm = document.getElementById("chatForm");
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  
  let chat = {
    email: e.target.elements.email.value,
    mensaje: e.target.elements.msg.value,
  };

  if (!Messages) {
    return false;
  }

 
  socket.emit("chatMessage", chat);

 
  e.target.elements.msg.value = "";
  e.target.elements.email.value = "";
  e.target.elements.msg.focus();
});
}
export const sockerService = new SocketService();




export const sockerService = new SocketService();

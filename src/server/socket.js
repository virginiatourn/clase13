import socketIo from 'socket.io';

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

const chatForm = document.getElementById("chatForm");
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  
  let chat = {
    email: e.target.elements.email.value,
    mensaje: e.target.elements.msg.value,
  };

  if (!msg) {
    return false;
  }

 
  socketIO.emit("chatMessage", chat);

 
  e.target.elements.msg.value = "";
  e.target.elements.email.value = "";
  e.target.elements.msg.focus();
});

export const sockerService = new SocketService();

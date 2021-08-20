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

export const sockerService = new SocketService();
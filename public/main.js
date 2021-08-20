const socket = io.connect();
const nombre = document.getElementById('nombre');
const precio = document.getElementById('price');
const imagen = document.getElementById('thumbnail');

function sendMsg(e) {
  let mensaje = {
    nombre: nombre.value,
    precio: precio.value,
    imagen: imagen.value,
  };
  socket.emit('new-message', mensaje);
}

function render(data) {
  var html = data
    .map(function (elem, index) {
      return `<div>
                        <strong>${elem.nombre}</strong>
                        <em>${elem.precio}</em>
                        <em>${elem.imagen}</em>
                    </div>`;
    })
    .join(' ');

  document.getElementById('messages').innerHTML = html;
}

function AddProduct(item) {
  const row = `
  <tr>
  <th class="row">${item.title}</th>
  <td>${item.price}</td>
  <td><img src="${item.thumbnail}" width="50px" height="50px"></td>
  </tr>
  `;

  const newData = document.getElementById('myProducts').innerHTML + row;
  // console.log(newData);
  document.getElementById('myProducts').innerHTML = newData;
}

socket.on('messages', (data) => {
  console.log('Recibi Mensaje');

  render(data);
});

socket.on('newProduct', (data) => {
  console.log('Recibi Mensaje');
  const { newItem } = data;
  AddProduct(newItem);
  console.log(newItem);
});

const form = document.getElementById('miForm');

form.addEventListener('submit', function (e) {
  console.log('HOLA');
  e.preventDefault();

  console.log('HACER AQUI EL POST REQUEST USANDO FETCH');
  const data = {
    title: nombre.value,
    price: precio.value,
    thumbnail: imagen.value,
  };

  const options = {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(data),
  };

  fetch('/api/productos/guardar', options)
    .then((response) => response.json())
    .then((data) => {
      console.log('TODO BIEN');

      const { id } = data.newItem;

      console.log(id);

      console.log('LUEGO ACTUALIZAR LA INFO DE LA PAGINA AQUI');
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      return false;
    });
});
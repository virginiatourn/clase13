import express from 'express';
import { ProductoController } from '../classProduct';
import { sockerService } from '../services/socket';

const router = express.Router();

router.get('/listar', (req, res) => {
  const productos = ProductoController.leerItems();
  if (productos.length === []) {
    return res.status(404).render('Error');
  }
  res.json({
    productos,
  });
});

router.get('/listar/:id', (req, res) => {
  const idSearch = Number(req.params.id);
  const producto = ProductoController.buscarItem(idSearch);

  if (!producto) {
    return res.status(404).json({
      Error: 'Producto no encontrado',
    });
  }
  res.json({
    data: producto,
  });
});

router.get('/guardar', (req, res) => {
  res.render('ingresar');
});

router.post('/guardar', (req, res) => {
  try {
    const body = req.body;
    console.log(req.body);

    if (body == undefined) {
      return res.status(400).json({
        Error: 'Producto no encontrado',
      });
    }

    const newProduct = {
      title: body.title,
      thumbnail: body.thumbnail,
      price: body.price,
    };

    console.log(newProduct);

    const newItem = ProductoController.agregarItem(newProduct);

    //LE envio a todos el nuevo producto usando ws
    const wsserver = sockerService.getServer();
    wsserver.emit('newProduct', {
      newItem,
    });

    res.status(201).json({
      mensaje: 'Producto agregado',
      newItem,
    });
  } catch (err) {
    console.log('ERRROR');
    console.log(err);
    res.status(500).json({
      msg: err.message,
    });
  }
});

router.put('/actualizar/:id', (req, res) => {
  const idActualizar = parseInt(req.params.id);
  const body = req.body;

  const newData = {
    id: idActualizar,
    title: body.title,
    thumbnail: body.thumbnail,
    price: body.price,
  };

  const result = ProductoController.actualizarItem(idActualizar, newData);

  res.status(201).json({
    mensaje: 'Producto actualizado',
    result,
  });
});

router.delete('/borrar/:id', (req, res) => {
  const idBorrar = parseInt(req.params.id);

  const productos = ProductoController.eliminarItem(idBorrar);

  res.status(201).json({
    mensaje: 'Se borro el producto',
    data: productos,
  });
});

export default router;
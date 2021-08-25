let productos = [
    { id: 1, title: 'Pan', price: 200, thumbnail: 'foto' },
    { id: 2, title: 'Queso', price: 400, thumbnail: 'url' },
    { id: 3, title: 'Jamon', price: 300, thumbnail: 'fotoo' },
  ];
  
  class Producto {
    leerItems() {
      return productos;
    }
  
    agregarItem(item) {
      const newProduct = {
        id: productos.length + 1,
        title: item.title,
        price: item.price,
        thumbnail: item.thumbnail,
      };
  
      productos.push(newProduct);
  
      return newProduct;
    }
  
    eliminarItem(itemId) {
      productos = productos.filter((anItem) => anItem.id !== itemId);
      return productos;
    }
  
    buscarItem(itemId) {
      return productos.find((aProduct) => aProduct.id === itemId);
    }
  
    actualizarItem(itemId, newData) {
      const index = productos.findIndex((anItem) => anItem.id === itemId);
      console.log(index);
  
      if (index < 0) {
        console.log('No existe el producto');
      } else {
        productos[index] = newData;
      }
  
      return productos[index];
    }
  }
  
  export const ProductoController = new Producto();
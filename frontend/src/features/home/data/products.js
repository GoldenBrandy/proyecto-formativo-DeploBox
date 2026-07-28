/* Importamos laptop desde "@/assets/images/products/card-laptop.png". Esto permite usar esa pieza en este archivo sin volver a escribir su logica. */
import laptop from '@/assets/images/products/card-laptop.png';
/* Importamos monitor desde "@/assets/images/products/card-monitor.png". Esto permite usar esa pieza en este archivo sin volver a escribir su logica. */
import monitor from '@/assets/images/products/card-monitor.png';
/* Importamos mouse desde "@/assets/images/products/card-mouse.png". Esto permite usar esa pieza en este archivo sin volver a escribir su logica. */
import mouse from '@/assets/images/products/card-mouse.png';
/* Importamos teclado desde "@/assets/images/products/card-teclado.png". Esto permite usar esa pieza en este archivo sin volver a escribir su logica. */
import teclado from '@/assets/images/products/card-teclado.png';
/* Exportamos esta constante o funcion con nombre para que otros archivos puedan reutilizarla de forma clara. */
export
/* Creamos products como arreglo. Sirve para guardar listas de rutas, campos, usuarios, permisos u opciones. */
const products = [{
  id: 1,
  tittle: 'Laptop Gamer',
  price: 4300000,
  description: 'Laptos de alto rendimiento para desarrollo y diseño web',
  image: laptop,
  category: 'perifericos'
}, {
  id: 2,
  tittle: "Monitor 27\"",
  price: 1500000,
  description: 'Monitor ideal para programación y diseño.',
  image: monitor,
  category: 'perifericos'
}, {
  id: 3,
  tittle: 'Mouse',
  price: 45000,
  description: 'Mouse ergonómico para mayor comodidad',
  image: mouse,
  category: 'perifericos'
}, {
  id: 4,
  tittle: 'Teclado Mecánico',
  price: 300000,
  description: 'Teclado mecánico con switches de alta calidad',
  image: teclado,
  category: 'perifericos'
}];
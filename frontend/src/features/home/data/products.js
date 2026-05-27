import laptop from '@/assets/images/products/card-laptop.png';
import monitor from '@/assets/images/products/card-monitor.png';
import mouse from '@/assets/images/products/card-mouse.png';
import teclado from '@/assets/images/products/card-teclado.png';


export const products = [
    {
        id: 1,
        tittle: 'Laptop Gamer',
        price: 4300000,
        description: 'Laptos de alto rendimiento para desarrollo y diseño web',
        image: laptop,
        category: 'perifericos'
    },
    {
        id: 2,
        tittle: "Monitor 27\"",
        price: 1500000,
        description: 'Monitor ideal para programación y diseño.',
        image: monitor,
        category: 'perifericos'
    },
    {
        id: 3,
        tittle: 'Mouse',
        price: 45000,
        description: 'Mouse ergonómico para mayor comodidad',
        image: mouse,
        category: 'perifericos'
    },
    {
        id: 4,
        tittle: 'Teclado Mecánico',
        price: 300000,
        description: 'Teclado mecánico con switches de alta calidad',
        image: teclado,
        category: 'perifericos'
    }
]
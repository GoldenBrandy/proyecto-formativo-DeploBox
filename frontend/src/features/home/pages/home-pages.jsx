/* Importamos Card desde "@/shared". Esto permite usar esa pieza en este archivo sin volver a escribir su logica. */
import { Card } from "@/shared";
/* Importamos products desde "../data/products". Esto permite usar esa pieza en este archivo sin volver a escribir su logica. */
import { products } from "../data/products";
/* Exportamos como valor principal de este archivo la funcion, pagina o configuracion que representa este modulo. */
export default
/* Esta funcion HomePage construye una pantalla completa. Aqui se preparan datos, eventos y componentes que vera el usuario. */
function HomePage() {
  /* Devolvemos la interfaz JSX que React pintara en pantalla. Aqui se conectan los datos y eventos con los componentes visuales. */
  return <div className="mt-4 max-w-7xl mx-auto "> 
        {/* Hero */}
        {/* Carrusel */}
        {/* Título */}
         <h2 className="text-h2 place-self-center mb-12">
            Productos
        </h2>
            {/* Cards */}
         <div className="
            grid
            gap-4
            mx-6
            sm:grid-cols-2
            sm:mx-12
            lg:grid-cols-3
            xl:grid-cols-4
            justify-items-center
            ">
            {products.map(product => <Card key={product.id} product={product} />)}
        </div>
    </div>;
}
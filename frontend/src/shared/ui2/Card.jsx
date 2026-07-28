// Define una tarjeta reutilizable para mostrar datos de un producto.
export default function Card({
    // Recibe el objeto product con titulo, precio, descripcion e imagen.
    product,
// Cierra la lista de propiedades del componente.
}) {
    // Extrae los datos esperados del producto; tittle conserva el nombre original usado por el proyecto.
    const { tittle, price, description, image } = product;
    // Devuelve la tarjeta visual.
    return (
        // Crea el contenedor principal con fondo, texto, animacion y efecto hover.
        <div className="w-full rounded-xl overflow-hidden bg-white/10 text-text-inverse dark:bg-neutral-950/80 dark:text-white transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl hover:shadow-black/20 hover:ring-1 hover:ring-white/10">
            {/* Muestra la imagen del producto y usa el titulo como texto alternativo. */}
            <img src={image} alt={tittle} className="w-full h-48 object-contain" />
            {/* Agrupa el contenido textual de la tarjeta. */}
            <div className="p-5 space-y-3">
                {/* Muestra el titulo del producto. */}
                <h2 className="text-h2 font-heading place-self-center">{tittle}</h2>
                {/* Muestra la descripcion del producto. */}
                <p className="text-body">{description}</p>
                {/* Muestra el precio formateado; Number evita fallos si llega como string numerico. */}
                <p className="text-h2 font-heading text-brand">${Number(price).toLocaleString()}</p>
            {/* Cierra el bloque textual. */}
            </div>
        {/* Cierra la tarjeta. */}
        </div>
    // Cierra el retorno JSX.
    );
// Cierra la funcion Card.
}

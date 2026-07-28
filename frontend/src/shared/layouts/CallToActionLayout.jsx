// Define un layout compartido para secciones de llamada a la accion o bloques destacados.
export default function CallToActionLayout({
    // Recibe el contenido que el componente padre quiera colocar dentro de este layout.
    children,
// Cierra la lista de propiedades recibidas por el layout.
}) {
    // Devuelve una seccion semantica que sirve como contenedor reutilizable.
    return (
        // Crea una seccion de ancho completo con espaciado interno basico.
        <section className="w-full px-4 py-8">
            {/* Inserta el contenido que se envio entre las etiquetas del layout. */}
            {children}
        {/* Cierra la seccion contenedora. */}
        </section>
    // Cierra el retorno JSX.
    );
// Cierra la funcion CallToActionLayout.
}

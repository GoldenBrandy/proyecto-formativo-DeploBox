// Define un footer compartido para usarlo como pie de pagina en pantallas que lo necesiten.
export default function Footer({
    // Recibe contenido personalizado para el pie de pagina.
    children,
// Cierra la lista de propiedades recibidas por el componente.
}) {
    // Devuelve el pie de pagina semantico.
    return (
        // Crea un footer con borde superior, espaciado y texto discreto.
        <footer className="w-full border-t border-slate-200 px-4 py-4 text-sm text-slate-600">
            {/* Muestra children cuando existe; si no existe, no pinta texto de relleno. */}
            {children ?? null}
        {/* Cierra el elemento footer. */}
        </footer>
    // Cierra el retorno JSX.
    );
// Cierra la funcion Footer.
}

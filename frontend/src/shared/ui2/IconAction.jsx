// Importa clsx para unir clases condicionales sin construir strings dificiles de leer.
import clsx from "clsx";
// Exporta por defecto un boton compacto pensado para acciones con iconos en tablas, tarjetas o barras de herramientas.
export default function IconAction({
    // Recibe el icono o contenido que se va a mostrar dentro del boton.
    children,
    // Recibe la etiqueta accesible que explica la accion cuando el boton solo muestra un icono.
    ariaLabel,
    // Recibe la funcion que se ejecuta cuando el usuario hace clic en la accion.
    onClick,
    // Permite desactivar la accion y bloquear clics cuando no debe usarse.
    disabled = false,
    // Permite pintar la accion como destructiva, por ejemplo eliminar o quitar.
    destructive = false,
    // Permite agregar clases adicionales desde el componente que usa IconAction.
    className = "",
    // Recoge propiedades HTML adicionales, como title, id, data-* o aria-*.
    ...props
// Cierra la lista de propiedades que recibe el componente.
}) {
    // Devuelve el boton real que el navegador renderiza.
    return (
        // Crea un boton de tipo button para evitar envios accidentales en formularios.
        <button
            // Define el tipo HTML del boton como accion normal, no como submit.
            type="button"
            // Conecta el texto accesible con lectores de pantalla.
            aria-label={ariaLabel}
            // Ejecuta la funcion de clic recibida desde afuera.
            onClick={onClick}
            // Deshabilita el boton cuando disabled es true.
            disabled={disabled}
            // Combina clases base, clases por estado destructivo y clases externas.
            className={clsx("inline-flex h-9 w-9 items-center justify-center rounded-md border transition-colors disabled:pointer-events-none disabled:opacity-50", destructive ? "border-red-200 text-red-700 hover:bg-red-50" : "border-slate-200 text-slate-700 hover:bg-slate-50", className)}
            // Expande las propiedades extra al boton.
            {...props}
        // Cierra la apertura del elemento button.
        >
            {/* Renderiza el icono o contenido recibido como hijo. */}
            {children}
        {/* Cierra el boton de accion. */}
        </button>
    // Cierra el retorno JSX.
    );
// Cierra la funcion IconAction.
}

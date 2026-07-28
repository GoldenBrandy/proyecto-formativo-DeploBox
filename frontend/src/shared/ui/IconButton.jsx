// Importa React para usar React.forwardRef y reenviar la referencia al boton real.
import React from "react";
// Importa clsx para combinar clases de forma segura y condicional.
import clsx from "clsx";
// Exporta IconButton como componente nombrado con soporte de ref.
export const IconButton = React.forwardRef(function IconButton(
    // Recibe las propiedades del componente.
    {
        // Recibe el icono o contenido visual del boton.
        children,
        // Recibe la funcion de clic.
        onClick,
        // Permite deshabilitar el boton.
        disabled = false,
        // Permite agregar clases externas.
        className = "",
        // Selecciona una variante visual.
        variant = "default",
        // Define el area tactil del boton en pixeles.
        hitSize = 48,
        // Define el tamano visual del icono en pixeles.
        iconSize = 24,
        // Recibe el texto accesible para lectores de pantalla.
        ariaLabel,
        // Permite marcar el boton como activo.
        isActive = false,
        // Recoge cualquier otra propiedad valida del boton.
        ...props
    // Cierra el objeto de propiedades.
    },
    // Recibe la ref que se conectara al elemento button.
    ref,
// Cierra la firma de la funcion interna.
) {
    // Define estilos comunes para todas las variantes del boton con icono.
    const baseStyles = "inline-flex items-center justify-center rounded-full cursor-pointer transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
    // Define las variantes visuales disponibles.
    const variants = {
        // Variante neutra para acciones generales.
        default: "text-neutral-700 hover:bg-neutral-200 focus-visible:ring-neutral-400",
        // Variante ghost para acciones secundarias o discretas.
        ghost: "text-neutral-600 hover:bg-neutral-100 focus-visible:ring-neutral-300",
        // Variante primaria para acciones destacadas.
        primary: "text-white bg-blue-600 hover:bg-blue-700 focus-visible:ring-blue-500",
    // Cierra el objeto de variantes.
    };
    // Devuelve el boton con icono.
    return (
        // Crea el boton real con ref, accesibilidad, estilos y propiedades externas.
        <button ref={ref} type="button" aria-label={ariaLabel} disabled={disabled} onClick={onClick} className={clsx(baseStyles, variants[variant] ?? variants.default, className, { "bg-neutral-300": isActive })} style={{ width: `${hitSize}px`, height: `${hitSize}px` }} {...props}>
            {/* Controla el tamano visual del icono sin reducir el area tactil del boton. */}
            <span style={{ width: `${iconSize}px`, height: `${iconSize}px` }} className="flex items-center justify-center">
                {/* Renderiza el icono enviado como children. */}
                {children}
            {/* Cierra el contenedor del icono. */}
            </span>
        {/* Cierra el boton. */}
        </button>
    // Cierra el retorno JSX.
    );
// Cierra la funcion usada por forwardRef.
});

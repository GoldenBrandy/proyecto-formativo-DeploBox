// Define un boton reutilizable con variantes y tamanos controlados desde props.
export default function Button({
    // Recibe la variante visual; primary es el estilo por defecto.
    variant = "primary",
    // Recibe el tamano visual; base es el tamano por defecto.
    size = "base",
    // Define el tipo HTML del boton; button evita submit accidental dentro de formularios.
    type = "button",
    // Recibe el contenido interno del boton, como texto, iconos o ambos.
    children,
    // Permite sumar clases externas sin perder los estilos base.
    className = "",
    // Recoge cualquier otra propiedad valida para un boton HTML.
    ...props
// Cierra la lista de propiedades del componente.
}) {
    // Agrupa las variantes visuales para no repetir clases en cada uso del boton.
    const variants = {
        // Variante principal con borde verde y hover invertido.
        primary: "bg-[color:var(--white)] border border-[color:var(--primary-950)] text-[color:var(--primary-950)] hover:bg-[color:var(--primary-950)] hover:text-[color:var(--white)]",
        // Variante secundaria conservada igual que el original para mantener fidelidad visual.
        secondary: "bg-[color:var(--white)] border border-[color:var(--primary-950)] text-[color:var(--primary-950)] hover:bg-[color:var(--primary-950)] hover:text-[color:var(--white)]",
    // Cierra el objeto de variantes.
    };
    // Agrupa los tamanos disponibles del boton.
    const sizes = {
        // Tamano base para acciones normales.
        base: "h-auto w-auto px-4 py-1.5 text-medium",
        // Tamano pequeno para controles compactos.
        sm: "h-auto w-auto px-3 py-1 text-small",
        // Tamano medio para acciones mas visibles.
        md: "h-auto w-auto px-5 py-2 text-medium",
    // Cierra el objeto de tamanos.
    };
    // Obtiene las clases de variante y usa primary como respaldo si llega una variante invalida.
    const variantClasses = variants[variant] ?? variants.primary;
    // Obtiene las clases de tamano y usa base como respaldo si llega un tamano invalido.
    const sizeClasses = sizes[size] ?? sizes.base;
    // Devuelve el boton que se renderiza en pantalla.
    return (
        // Crea el elemento button con clases base, variante, tamano, clases externas y props adicionales.
        <button className={`inline-flex items-center justify-center rounded-md transition-colors duration-200 ${variantClasses} ${sizeClasses} ${className}`} type={type} {...props}>
            {/* Inserta el contenido recibido dentro del boton. */}
            {children}
        {/* Cierra el elemento button. */}
        </button>
    // Cierra el retorno JSX.
    );
// Cierra la funcion Button.
}

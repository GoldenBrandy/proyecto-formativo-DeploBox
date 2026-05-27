/**
 * Componente Boton
 *
 * Boton reutilizable con variantes visuales y tamanos controlados.
 */

export default function Button({
    variant = "primary", // Define el estilo visual
    size = "base", // Define tamano visual
    type = "button", // Tipos de boton (button, submit, reset)
    children, // Contenido interno del boton (texto, icono)
    className = "",
    ...props // Propiedades adicionales (onClick, disabled, etc)
}) {
    const variants = {
        primary: `
            bg-[color:var(--white)]
            border border-[color:var(--primary-950)]
            text-[color:var(--primary-950)]
            hover:bg-[color:var(--primary-950)]
            hover:text-[color:var(--white)]
        `,
        secondary: `
            bg-[color:var(--white)]
            border border-[color:var(--primary-950)]
            text-[color:var(--primary-950)]
            hover:bg-[color:var(--primary-950)]
            hover:text-[color:var(--white)]
        `,
    };

    const sizes = {
        base: "h-auto w-auto px-4 py-1.5 text-medium",
        sm: "h-auto w-auto px-3 py-1 text-small",
        md: "h-auto w-auto px-5 py-2 text-medium",
    };

    return (
        <button
            className={`
                inline-flex items-center justify-center
                rounded-md
                transition-colors duration-200
                ${variants[variant]}
                ${sizes[size]}
                ${className}
            `}
            type={type}
            {...props}
        >
            {children}
        </button>
    );
}

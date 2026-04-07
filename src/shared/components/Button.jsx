/**
 * Componente Botón
 * 
 * Botón reutilizable con variantes visuales y tamaños controlados, área intectiva mínima de 48px
 */

export default function Button({
    variant = "primary", // Define el estilo visual
    size = "md", // Define tamaño visual
    type = "button", // Tipos de botón (button, submit, reset)
    children, // Contenido interno del botón (texto, icono)
    ...props //Propiedades adicionales (onClick, disable, ect)
}) {
    const variants = {
        primary: "bg-green text-brand border text-h1",
        secondary: "bg-background border border-border text-text-inverse hover:bg-surface-muted"
    };

    const sizes = {
        sm: `
            h-9 px-3
            before:absolute before:content['']
            before:-inset-y-[6px] before:-inset-x-[0px]
        `,

        md: `
            h-20 w-40 px-4
            before:absolute before:content['']
            before:-inset-y-[7px] before:-inset-x-[0px]
        `
    }

    return (

        <button
            className= {`
                relative
                inline-flex items-center justify-center
                rounded-md
                transition-colors
                ${variants[variant]}
                ${sizes[size]}
                ${type}
            `}
            {...props}
            >        
            {children}
        </button>
    )
}
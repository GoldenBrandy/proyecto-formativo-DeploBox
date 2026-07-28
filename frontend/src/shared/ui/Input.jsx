// Define un campo de texto reutilizable con label opcional y mensaje de error.
export default function Input({
    // Recibe el texto que aparece encima del campo.
    label,
    // Define el tipo del input; text es el tipo por defecto.
    type = "text",
    // Recibe el mensaje de error; si existe, cambia estilos y muestra feedback.
    error,
    // Recibe un elemento opcional (por ejemplo un boton de mostrar/ocultar contrasena) que se renderiza dentro del input, pegado al borde derecho.
    endAdornment,
    // Recoge props como name, value, onChange, placeholder, disabled y required.
    ...props
// Cierra la lista de propiedades del componente.
}) {
    // Devuelve el bloque completo del campo.
    return (
        // Contiene label, input y mensaje de error en una sola columna.
        <div className="w-full">
            {/* Muestra el label solo cuando se envia texto en la prop label. */}
            {label && <label className={`block text-caption mb-1 w-full text-left place-self-start ${error ? "text-red-800" : "text-text-primary"}`}>{label}</label>}
            {/* Crea un contenedor relativo para ampliar el area clicable del input. */}
            <div className="relative h-12 flex items-center">
                {/* Esta capa invisible permite enfocar el input al hacer clic dentro del area. */}
                <div className="absolute inset-0" onMouseDown={(event) => { event.preventDefault(); event.currentTarget.nextElementSibling?.focus(); }} />
                {/* Crea el input real y aplica estilos diferentes cuando existe error. */}
                <input type={type} className={`relative w-full h-12 rounded-md border px-4 text-base transition-colors focus:outline-none ${endAdornment ? "pr-11" : ""} ${error ? "border-red-800 hover:border-red-800 focus:border-[3px] focus:border-red-800" : "border-border hover:border-(--primary-950) hover:border-2 focus:border-[3px] focus:border-(--primary-950)"}`} {...props} />
                {/* Renderiza el elemento adicional (ej. boton de mostrar/ocultar contrasena) sobre el borde derecho del input. */}
                {endAdornment && <div className="absolute right-3 flex items-center">{endAdornment}</div>}
            </div>
            {/* Muestra el texto de error solo cuando la prop error tiene contenido. */}
            {error && <p className="mt-1 w-full text-left text-caption text-red-800">{error}</p>}
        </div>
    );
}

// Define un checkbox controlado y reutilizable para formularios.
export default function Checkbox({
    // Recibe el id que conecta el label con el input mediante htmlFor.
    id,
    // Recibe el nombre del campo para formularios.
    name,
    // Recibe el texto visible que acompana al checkbox.
    label,
    // Recibe el estado marcado; false es el valor inicial por defecto.
    checked = false,
    // Recibe la funcion que maneja cambios del checkbox.
    onChange,
    // Permite bloquear la interaccion del usuario con el checkbox.
    disabled = false,
    // Permite agregar clases externas desde donde se usa el componente.
    className = "",
// Cierra la lista de propiedades del componente.
}) {
    // Devuelve el label completo, que incluye el input y su texto visible.
    return (
        // Crea un label clicable; htmlFor mejora accesibilidad y experiencia de uso.
        <label htmlFor={id} className={`flex items-center gap-2 text-sm cursor-pointer ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}>
            {/* Crea el input real de tipo checkbox y lo mantiene controlado con checked. */}
            <input id={id} name={name} type="checkbox" checked={checked} disabled={disabled} onChange={onChange} className="w-5 h-5" />
            {/* Muestra el texto descriptivo del checkbox. */}
            <span>{label}</span>
        {/* Cierra el label que agrupa input y texto. */}
        </label>
    // Cierra el retorno JSX.
    );
// Cierra la funcion Checkbox.
}

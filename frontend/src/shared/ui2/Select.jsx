// Define un campo select reutilizable con label, opciones y error opcionales.
export default function Select({
    // Recibe el texto que se muestra encima del select.
    label,
    // Recibe el nombre del campo para formularios.
    name,
    // Recibe las opciones; acepta strings u objetos con value, id y label.
    options = [],
    // Recibe el mensaje de error para modificar estilos y mostrar feedback.
    error,
    // Recoge props como value, onChange, disabled, required o className.
    ...props
// Cierra la lista de propiedades del componente.
}) {
    // Devuelve el bloque visual completo del select.
    return (
        // Contiene label, select y mensaje de error.
        <div className="w-full">
            {/* Renderiza el label solo si fue enviado. */}
            {label && <label className={`block text-caption mb-1 w-full text-left ${error ? "text-red-800" : "text-text-secondary"}`}>{label}</label>}
            {/* Crea el select real con estilos de error o estado normal. */}
            <select name={name} className={`w-full h-12 rounded-md border px-4 transition-colors focus:outline-none focus:ring-0 ${error ? "border-red-800 hover:border-red-800 focus:border-[3px] focus:border-red-800" : "border-border hover:border-(--primary-950) hover:border-2 focus:border-[3px] focus:border-(--primary-950)"}`} {...props}>
                {/* Recorre options de manera defensiva para evitar error si llega null. */}
                {(options || []).map((opt) => {
                    // Detecta si la opcion es un string simple.
                    const isString = typeof opt === "string";
                    // Calcula el value usando el string, value, id o cadena vacia como respaldo.
                    const value = isString ? opt : opt?.value ?? opt?.id ?? "";
                    // Calcula el texto visible usando label o el value convertido a texto.
                    const labelText = isString ? opt : opt?.label ?? String(value);
                    // Calcula una key estable para que React identifique cada option.
                    const key = isString ? opt : opt?.id ?? opt?.value ?? value;
                    // Devuelve la option que se mostrara dentro del desplegable.
                    return <option key={key} value={value}>{labelText}</option>;
                // Cierra la funcion del map.
                })}
            {/* Cierra el select. */}
            </select>
            {/* Muestra el mensaje de error solo cuando existe. */}
            {error && <p className="mt-1 w-full text-left text-caption text-red-800">{error}</p>}
        {/* Cierra el contenedor principal del campo. */}
        </div>
    // Cierra el retorno JSX.
    );
// Cierra la funcion Select.
}

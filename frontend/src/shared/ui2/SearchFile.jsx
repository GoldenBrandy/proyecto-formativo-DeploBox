// Importa forwardRef para exponer el input interno al componente padre si lo necesita.
import { forwardRef } from "react";
// Importa los iconos usados dentro del campo de busqueda.
import { Search, X, LoaderCircle } from "lucide-react";
// Importa clsx para combinar clases base, variantes y estados.
import clsx from "clsx";
// Define las clases base del contenedor de busqueda.
const baseStyles = "search flex items-center rounded-xl px-3 transition-all border";
// Define clases por tamano del campo.
const sizeStyle = {
    // Tamano pequeno para areas compactas.
    sm: "h-9 text-sm",
    // Tamano medio como opcion por defecto.
    md: "h-12 text-sm",
    // Tamano grande para areas mas visibles.
    lg: "h-12 text-base",
// Cierra el mapa de tamanos.
};
// Define clases por variante visual.
const variantStyles = {
    // Variante filled con fondo suave y borde azul.
    filled: "bg-neutral-100 border-blue-500 hover:border-blue-700 focus-within:bg-white",
    // Variante outlined con fondo transparente y borde verde.
    outlined: "bg-transparent border-green-500 hover:border-green-600",
// Cierra el mapa de variantes.
};
// Define el componente SearchField con ref hacia el input.
const SearchField = forwardRef(
    // Inicia la funcion render que recibe props y ref.
    (
        // Inicia el objeto de props configurables.
        {
            // Valor controlado del campo.
            value = "",
            // Placeholder mostrado cuando el campo esta vacio.
            placeholder = "Buscar...",
            // Funcion que actualiza el valor desde el padre.
            onChange = () => {},
            // Funcion opcional que se ejecuta al enviar el formulario.
            onSubmit,
            // Funcion opcional que se ejecuta al limpiar el campo.
            onClear = () => {},
            // Tamano visual del campo.
            size = "md",
            // Variante visual del campo.
            variant = "filled",
            // Permite que el campo ocupe todo el ancho disponible.
            fullWidth = false,
            // Deshabilita el campo cuando es true.
            disabled = false,
            // Muestra estado de carga cuando es true.
            loading = false,
            // Marca visualmente el campo como erroneo.
            error = false,
            // Nombre del input para formularios.
            name = "search",
            // Texto accesible del input; se corrige el typo original arialLabel a ariaLabel.
            ariaLabel = "Campo de busqueda",
            // Mantiene el autocompletado apagado por defecto.
            autoComplete = "off",
            // Permite cambiar el icono de busqueda.
            icon,
            // Permite agregar clases externas.
            className,
        // Cierra el objeto de props.
        },
        // Recibe la referencia del input.
        ref,
    // Cierra los parametros de la funcion.
    ) => {
        // Escoge el icono enviado por props o usa Search como respaldo.
        const SearchIcon = icon || Search;
        // Define la funcion que limpia el campo.
        const handleClear = () => {
            // Envia cadena vacia al padre para limpiar el valor controlado.
            onChange("");
            // Ejecuta el callback de limpieza si el padre necesita reaccionar.
            onClear();
        // Cierra handleClear.
        };
        // Define la funcion que maneja el submit del formulario.
        const handleSubmit = (event) => {
            // Evita que el navegador recargue la pagina.
            event.preventDefault();
            // Detiene el submit si el campo esta deshabilitado o cargando.
            if (disabled || loading) return;
            // Ejecuta onSubmit si existe, enviando el valor actual.
            onSubmit?.(value);
        // Cierra handleSubmit.
        };
        // Devuelve el formulario de busqueda.
        return (
            // Crea el form contenedor y combina clases por tamano, variante, estado y personalizacion.
            <form onSubmit={handleSubmit} className={clsx(baseStyles, sizeStyle[size] ?? sizeStyle.md, variantStyles[variant] ?? variantStyles.filled, fullWidth && "w-full", disabled && "opacity-60 pointer-events-none", error ? "border-red-500 focus-within:ring-2 focus-within:ring-red-500" : "focus-within:ring-2 focus-within:ring-primary", className)}>
                {/* Muestra loader cuando loading es true; si no, muestra el icono de busqueda. */}
                {loading ? <LoaderCircle className="size-4 shrink-0 animate-spin text-neutral-500" /> : <SearchIcon className="size-4 shrink-0 text-neutral-500" />}
                {/* Crea el input controlado de busqueda. */}
                <input ref={ref} type="search" name={name} value={value} disabled={disabled} placeholder={placeholder} aria-label={ariaLabel} autoComplete={autoComplete} onChange={(event) => onChange(event.target.value)} className="search_input flex-1 bg-transparent px-2 outline-none" />
                {/* Muestra el boton de limpiar solo si hay valor y el campo esta habilitado. */}
                {!!value && !disabled && (
                    // Crea el boton que limpia la busqueda sin enviar el formulario.
                    <button type="button" onClick={handleClear} aria-label="Limpiar busqueda" className="search_clear rounded-full p-1 hover:bg-neutral-200">
                        {/* Muestra el icono X del boton limpiar. */}
                        <X className="size-4 text-neutral-500" />
                    {/* Cierra el boton limpiar. */}
                    </button>
                // Cierra el render condicional del boton limpiar.
                )}
            {/* Cierra el formulario de busqueda. */}
            </form>
        // Cierra el retorno JSX.
        );
    // Cierra la funcion interna de forwardRef.
    },
// Cierra la llamada a forwardRef.
);
// Asigna un nombre visible para React DevTools.
SearchField.displayName = "SearchField";
// Exporta el componente como default.
export default SearchField;

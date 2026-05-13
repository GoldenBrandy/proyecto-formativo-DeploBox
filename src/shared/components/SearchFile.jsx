// src/shared
//Mejorado: accesibilidad, props defensivas, loading, erros, disabled y estilos desacoplados
import { forwardRef } from "react"; //Acceso a los elementos dentro de un padre. expone los nodos dentro del componente
import { Search, X, LoaderCircle } from "lucide-react";
//Libreria para colocar condiciones de clases
import clsx from "clsx";

const baseStyles = "search flex items-center rounded-xl px-3 transition-all border";

const sizeStyle = {
    sm: "h-9 text-sm",
    md: "h-12 text-sm",
    lg: "h-12 text-base",
};

const variantStyles = {
    //Filled: campo con fondo relleno, borde mínimo o sutil (Material "Filled TextFiled").
    filled:
    "bg-neutral-100 border-blue-500 hover:border-blue-700 focus-withing:bg-white",

    //Outlined: campo con fondo transparente y borde visible siempre.
    outlined: "bg-transparent border-green-500 hover:border-green-600",
};

const SearchField = forwardRef(
    (
        {
            value = "",
            placeholder = "Buscar...",
            onChange = () => {},
            onSubmit,
            onClear = () => {},
            size = "md",
            variant = "filled",
            fullWidth = false,
            disabled = false,
            loading = false,
            error = false,
            name = "search",
            arialLabel = "Campo de búsqueda",
            autoComplete = "off",
            icon,
            className, 
        },
        ref
    ) => {
        const SearchIcon = icon || Search; 
        const handleClear = () => {
            onChange("");
            onClear();
        }; //Limpia el campo y llama a la función onClear

        const handleSubmit = (e) => { 
            e.preventDefault(); 
            if (disabled || loading) return;
            onSubmit?.(value);
        }; //Previene el comportamiento por defecto del formulario, verifica si el campo está deshabilitado o en estado de carga, y llama a la función onSubmit con el valor actual

        return (
            <form
                onSubmit={handleSubmit}
                className={clsx(
                    baseStyles,
                    sizeStyle[size],
                    variantStyles[variant],
                    fullWidth && "w-full",
                    disabled && "opacity-60 pointer-events-none",
                    error
                        ? "border-red-500 focus-within:ring-2 focus-within:ring-red-500"
                        : "focus-within:ring-2 focus-within:ring-primary",
                    className
                )}
            > 
                {loading ? (
                    <SearchIcon className="size-4 shrink-0 text-neutral-500" />
                ) : (
                    <SearchIcon className="size-4 shrink-0 text-neutral-500" />
                )}

                <input
                    ref={ref}
                    type="search"
                    name={name}
                    value={value}
                    disabled={disabled}
                    placeholder={placeholder}
                    aria-label={arialLabel}
                    autoComplete={autoComplete}
                    onChange={(e) => onChange(e.target.value)}
                    className="search_input flex-1 bg-transparent px-2 outline-none"
                />

                {!!value && !disabled && (
                    <button
                        type="button"
                        onClick={handleClear}
                        aria-label="Limpiar búsqueda"
                        className="search_clear rounded-full p-1 hover:bg-neutral-200"
                    >
                        <X className="size-4 text-neutral-500" />
                    </button>
                )}
            </form> //Muestra el botón de limpiar solo si hay un valor presente y el campo no está deshabilitado. Al hacer clic, llama a la función handleClear para limpiar el campo de búsqueda. el !!value convierte el valor a un booleano, por lo que el botón solo se muestra si hay texto en el campo de búsqueda.
        );
});

SearchField.displayName = "SearchField"; 

export default SearchField;

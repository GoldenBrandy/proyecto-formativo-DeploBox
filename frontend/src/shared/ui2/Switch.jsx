// Importa useEffect para sincronizar props y useState para estado interno.
import { useEffect, useState } from "react";
// Importa iconos que comunican visualmente si el switch esta activo o inactivo.
import { Check, X } from "lucide-react";
// Define un switch reutilizable para valores booleanos.
export default function Switch({
    // Recibe el valor controlado desde el componente padre.
    checked = false,
    // Recibe la funcion que se llama cuando el usuario cambia el valor.
    onChange,
    // Conserva compatibilidad con la prop original disable.
    disable = false,
    // Permite usar el nombre estandar disabled.
    disabled,
    // Recibe el tamano visual del switch.
    size = "md",
    // Permite agregar clases externas.
    className = "",
// Cierra la lista de propiedades.
}) {
    // Crea el estado interno para reflejar el valor visual del switch.
    const [isActive, setIsActive] = useState(checked);
    // Une disabled y disable para aceptar ambas formas sin romper codigo existente.
    const isDisabled = disabled ?? disable;
    // Sincroniza el estado interno cuando el padre cambia la prop checked.
    useEffect(() => {
        // Copia el valor externo al estado interno.
        setIsActive(checked);
    // Ejecuta la sincronizacion cada vez que cambia checked.
    }, [checked]);
    // Define la funcion que alterna el estado cuando el usuario pulsa el switch.
    const handleToggle = () => {
        // Detiene la interaccion si el switch esta deshabilitado.
        if (isDisabled) return;
        // Calcula el nuevo valor invirtiendo el estado actual.
        const newValue = !isActive;
        // Actualiza el estado interno para que la interfaz cambie.
        setIsActive(newValue);
        // Avisa al componente padre del cambio si recibio onChange.
        onChange?.(newValue);
    // Cierra la funcion handleToggle.
    };
    // Define las clases de tamano del contenedor.
    const sizes = { sm: "h-5 w-9", md: "h-6 w-11", lg: "h-7 w-14" };
    // Define las clases de tamano del circulo interno.
    const knobSizes = { sm: "h-4 w-4", md: "h-5 w-5", lg: "h-6 w-6" };
    // Devuelve el boton que funciona como switch.
    return (
        // Crea el control interactivo con rol switch para mejorar accesibilidad.
        <button type="button" role="switch" aria-checked={isActive} onClick={handleToggle} disabled={isDisabled} className={`relative inline-flex shrink-0 items-center rounded-full border-0 p-0 align-middle transition-colors ${sizes[size] ?? sizes.md} ${isActive ? "bg-green-500" : "bg-gray-300"} ${isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"} ${className}`}>
            {/* Crea el circulo interno que se mueve segun el estado activo. */}
            <span className={`absolute left-0.5 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-full bg-white shadow transition-transform duration-200 ${knobSizes[size] ?? knobSizes.md} ${isActive ? "translate-x-full" : "translate-x-0"}`}>
                {/* Muestra Check cuando esta activo y X cuando esta inactivo. */}
                {isActive ? <Check size={12} className="text-green-600" /> : <X size={12} className="text-gray-500" />}
            {/* Cierra el circulo interno. */}
            </span>
        {/* Cierra el boton switch. */}
        </button>
    // Cierra el retorno JSX.
    );
// Cierra la funcion Switch.
}

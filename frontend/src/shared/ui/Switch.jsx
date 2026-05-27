//Hooks de React para manejar estado y efectos.
import { useState, useEffect } from "react";

// Iconos usados dentro del componente.
import { Check, X } from "lucide-react";

// Componente reutilizable para representar un Switch de estado (activo/inactivo).
export default function Switch({
    checked = false,
    onChange,
    disable = false,
    disabled,
    size = "md",
    className,
}) {
    /**Estado interno del componente
     * Se inicializa con el valor recibido desde la prop "checked", 
      **/

    const [isActive, setIsActive] = useState(checked);
    const isDisabled = disabled ?? disable;

    // Efecto que sincroniza el estado interno con el valor recibido desde el componente padre
    useEffect(() => {
        setIsActive(checked);
    }, [checked]); // Se ejecuta cada vez que cambia "checked"

    // Función que maneja el cambio del switch
    const handleToggle = () => {

        // Si el switch está deshabilitado no permite interacción
        if (isDisabled) return;

        // Calcula el nuevo estado (invierte el estado actual)
        const newValue = !isActive;

        // Actualiza el estado interno
        setIsActive(newValue);

        // Si existe un callback onChange, se ejecuta enviando el nuevo valor al componente padre
        if (onChange) {
            onChange(newValue);
        }
    };

    // Clases de tamaño del contenedor del switch
    const sizes = {
        sm: "h-5 w-9",
        md: "h-6 w-11",
        lg: "h-7 w-14",
    };

    // Clases de tamaño "knob" (el círculo que se mueve)
    const knobSizes = {
        sm: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6",
    };
    
    return (

        // Botón que funciona como switch
        <button
            type="button"
            onClick={handleToggle} // Evento que cambia el estado
            disabled={isDisabled} // Permite deshabilitar el botón
            className={`
                relative inline-flex shrink-0 items-center rounded-full border-0 p-0 align-middle transition-colors
                ${sizes[size] ?? sizes.md}
                ${isActive ? "bg-green-500" : "bg-gray-300"}
                ${isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                ${className}
            `}
        >

            {/* "Knob" del switch (el círculo que se mueve de izquierda a derecha) */}
            <span
                className={`
                    absolute left-0.5 top-1/2 flex -translate-y-1/2 items-center justify-center
                    rounded-full bg-white shadow
                    transition-transform duration-200
                    ${knobSizes[size] ?? knobSizes.md}
                    ${isActive ? "translate-x-full" : "translate-x-0"}
                `}
            >
                {/* Icono que cambia dependiendo del estado ✅❎ */}
                {isActive ? (
                    <Check size={12} className="text-green-600" />
                ) : (
                    <X size={12} className="text-gray-500" />
                )}
            </span>

        </button>
    );
}
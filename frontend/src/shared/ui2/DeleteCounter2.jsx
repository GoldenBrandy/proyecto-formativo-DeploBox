// Importa useEffect para reaccionar a cambios y useState para guardar estado local.
import { useEffect, useState } from "react";
// Define un contador de practica que tambien actualiza un mensaje derivado.
export default function DeleteCounter2() {
    // Crea el estado count con valor inicial cero.
    const [count, setCount] = useState(0);
    // Crea el estado message con un texto inicial antes de cualquier cambio.
    const [message, setMessage] = useState("El contador no ha cambiado");
    // Ejecuta un efecto cada vez que cambia count.
    useEffect(() => {
        // Actualiza el mensaje para reflejar el valor actual del contador.
        setMessage(`El contador ha cambiado a: ${count}`);
    // Declara que este efecto depende solo de count.
    }, [count]);
    // Devuelve la interfaz del segundo contador.
    return (
        // Agrupa el numero, el mensaje y el boton.
        <div>
            {/* Muestra el valor actual del contador. */}
            <h2>{count}</h2>
            {/* Muestra el mensaje sincronizado con el contador. */}
            <p>{message}</p>
            {/* Incrementa el contador usando actualizacion funcional. */}
            <button onClick={() => setCount((currentCount) => currentCount + 1)} className="border p-3">
                {/* Muestra el texto visible del boton. */}
                Incrementar
            {/* Cierra el boton de incremento. */}
            </button>
        {/* Cierra el contenedor principal. */}
        </div>
    // Cierra el retorno JSX.
    );
// Cierra la funcion DeleteCounter2.
}

// Importa useState para guardar el numero actual del contador.
import { useState } from "react";
// Define un componente de practica que muestra como cambia el estado con un boton.
export default function DeleteCounter() {
    // Crea el estado count con valor inicial cero y su funcion actualizadora.
    const [count, setCount] = useState(0);
    // Devuelve la interfaz del contador.
    return (
        // Agrupa el texto y el boton del contador.
        <div>
            {/* Muestra el valor actual del contador. */}
            <p>Contador: {count}</p>
            {/* Incrementa usando el valor anterior para evitar problemas con actualizaciones acumuladas. */}
            <button onClick={() => setCount((currentCount) => currentCount + 1)} className="border p-3">
                {/* Muestra el texto visible de la accion. */}
                Incrementar
            {/* Cierra el boton de incremento. */}
            </button>
        {/* Cierra el contenedor del contador. */}
        </div>
    // Cierra el retorno JSX.
    );
// Cierra la funcion DeleteCounter.
}

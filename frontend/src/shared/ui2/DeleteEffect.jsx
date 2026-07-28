// Importa useEffect para ejecutar logica al montar y useState para guardar el mensaje.
import { useEffect, useState } from "react";
// Define un componente de practica para explicar efectos en React.
export default function DeleteEffect() {
    // Crea el mensaje inicial que se muestra antes de terminar la carga simulada.
    const [message, setMessage] = useState("Cargando...");
    // Ejecuta este efecto una sola vez cuando el componente se monta.
    useEffect(() => {
        // Crea un temporizador para simular una tarea asincrona.
        const timerId = setTimeout(() => {
            // Cambia el mensaje cuando termina el temporizador.
            setMessage("componente cargado");
        // Define el retraso del temporizador en milisegundos.
        }, 2000);
        // Limpia el temporizador si el componente se desmonta antes de que termine.
        return () => clearTimeout(timerId);
    // Mantiene el efecto limitado al montaje del componente.
    }, []);
    // Renderiza el mensaje actual.
    return <h1>{message}</h1>;
// Cierra la funcion DeleteEffect.
}

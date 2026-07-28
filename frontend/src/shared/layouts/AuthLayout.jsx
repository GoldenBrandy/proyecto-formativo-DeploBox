// Importa Outlet para renderizar dentro del layout la ruta hija activa.
import { Outlet } from "react-router-dom";
// Importa la imagen de fondo usada en la pantalla de autenticacion.
import heroBg from "@/assets/images/bg-4.jpg";
// Define el layout usado por las rutas de autenticacion.
export default function AuthLayout() {
    // Devuelve la estructura visual de la pantalla de autenticacion.
    return (
        // Crea un contenedor de pantalla completa con posicion relativa.
        <div className="relative min-h-screen text-text-primary">
            {/* Crea una capa de fondo absoluta detras del contenido. */}
            <div className="absolute inset-0 -z-10 bg-cover bg-center" style={{ backgroundImage: `url(${heroBg})` }} />
            {/* Centra el contenido hijo en la pantalla. */}
            <main className="relative flex min-h-screen items-center justify-center p-6">
                {/* Renderiza la pagina hija, por ejemplo el Login. */}
                <Outlet />
            {/* Cierra el area principal centrada. */}
            </main>
        {/* Cierra el contenedor del layout. */}
        </div>
    // Cierra el retorno JSX.
    );
// Cierra la funcion AuthLayout.
}

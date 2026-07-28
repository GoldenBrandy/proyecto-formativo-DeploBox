// Importa Outlet para renderizar la pagina hija que corresponda segun la ruta actual.
import { Outlet } from "react-router-dom";
// Importa la imagen de fondo usada por el area de dashboard.
import dashboardBackground from "@/assets/images/bg-4.jpg";
// Importa Navbar desde shared para mostrar la navegacion superior compartida.
import { Navbar } from "@/shared";
// Define el unico layout de dashboard del proyecto.
export default function DashboardLayout() {
    // Devuelve la estructura comun para todas las pantallas internas del dashboard.
    return (
        // Crea el contenedor principal a pantalla completa con imagen de fondo.
        <div className="relative h-screen w-full flex flex-col bg-cover bg-center" style={{ backgroundImage: `url(${dashboardBackground})` }}>
            {/* Muestra la barra de navegacion en la parte superior del dashboard. */}
            <Navbar />
            {/* Define el area de contenido que cambia segun la ruta hija; ocupa el resto del alto y hace scroll solo si su contenido no cabe. */}
            <main className="flex-1 overflow-y-auto">
                {/* Renderiza la pantalla hija, por ejemplo crear usuario, lista de usuarios o permisos. */}
                <Outlet />
            {/* Cierra el area principal del contenido dinamico. */}
            </main>
        {/* Cierra el contenedor principal del dashboard. */}
        </div>
    // Cierra el retorno JSX.
    );
// Cierra la funcion DashboardLayout.
}

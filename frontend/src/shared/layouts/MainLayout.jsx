// Importa la pantalla de creacion de usuarios usada por este layout simple.
import { CreateUserPage } from "@/features/users";
// Define un layout principal minimo.
export default function MainLayout() {
    // Devuelve el contenedor que envuelve la pagina de creacion.
    return (
        // Crea un main de pantalla completa.
        <main className="min-h-screen">
            {/* Renderiza la pantalla de creacion de usuarios. */}
            <CreateUserPage />
        {/* Cierra el main principal. */}
        </main>
    // Cierra el retorno JSX.
    );
// Cierra la funcion MainLayout.
}

import { Outlet } from "react-router-dom";
import dashboardBackground from "@/assets/images/bg-4.jpg";
import { Navbar } from "@/shared";
import HomePage from "@/features/home/pages/home-pages";


export default function Dashboard() {

    return (
        <div
            className="relative min-h-screen w-full bg-cover bg-center "
            style={{ backgroundImage: `url(${dashboardBackground})` }}
        >
            
            <Navbar />

            {/* Contenido dinamico de las páginas */}
            <main className="min-h-[calc(100vh-4rem)]">
                <HomePage/>
                <Outlet />
            </main>
        </div>
    );
}

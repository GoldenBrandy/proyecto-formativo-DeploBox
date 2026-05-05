import { Search, User } from "lucide-react";
import { Link } from "react-router-dom";
import { IconButton } from "../components/IconButton";
import Switch from "../components/Switch";
import { Dropdown, DropdownTrigger, DropdownContent, DropdownItem } from "../components/Dropdown";
import logo_1  from "@/assets/images/logo_1.png";
import { useState } from "react";


export default function Navbar() {
    //Estado que controla el switch
    const [isActive, setIsActive] = useState(false);

    // Manejador del estado del switch
    const handleStatusChange = (value) => {
        setIsActive(value);

        // Aquí generalmente va el llamado a una API
        console.log("Nuevo estado del switch:", value);
    };

    return(
        <nav className="w-full bg-transparent border-b-2">
            <div className="mx-auto max-w-7xl px-4 ">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo de marca */}
                    <div className="flex items-center">
                        <Link to={"/"} className="text-h1 font-heading ">
                            <img src={logo_1} alt="Logo" className="h-12"/> 
                        </Link>
                    </div>

                    {/* Switch */}
                    <Switch 
                        checked={isActive}
                        onChange={handleStatusChange}
                        size="md"
                    />

                    {/* Links de navegación */}
                    <ul className="hidden md:flex items-center gap-6">
                        <li>
                            <Link to={"/inicio"} className="hover:text-text-primary transition">
                            Inicio
                            </Link>
                        </li>
                        <li>
                            <Link to={"/inicio"} className="hover:text-text-primary transition">
                            Cursos
                            </Link>
                        </li>
                        <li>
                            <Link to={"/"} className="hover:text-text-primary transition">
                            Recursos
                            </Link>
                        </li>
                        <li>
                            <Link to={"/inicio"} className="hover:text-text-primary transition">
                            Contacto
                            </Link>
                        </li>
                    </ul>

                    {/* Sección de la derecha: búsqueda + 'usuario' */}
                    <div className="flex items-center gap-5">
                        {/* Buscador */}
                        <div className="relative hidden sm:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-500"/>

                        {/* Input */}
                        
                        <input type="text" placeholder="Buscar" className="pl-9 pr-4 py-2.5 border rounded-lg text-body focus:ring-outline-none focus:right-2 focus:ring-text-primary" />
                        </div>
                        {/* Icono de usuario */}
                        <div>
                        <Dropdown>
                            <DropdownTrigger>
                                <IconButton ariaLabel="Menú de usuario">
                                    <User />
                                </IconButton>
                            </DropdownTrigger>

                        <DropdownContent>
                            <DropdownItem>
                                <Link to="/dashboard/auth" className="block w-full">
                                    Cerrar Sesión
                                </Link>
                            </DropdownItem>
                            <DropdownItem>
                                <Link to="/dashboard" className="block w-full">
                                    Panel de control
                                </Link>
                            </DropdownItem>
                        </DropdownContent>
                        </Dropdown>
                    </div>
                    </div>
                </div>
            </div>
        </nav>
    )
};

import { User } from "lucide-react";
import { Link } from "react-router-dom";
import { IconButton } from "../ui/IconButton";
import SearchFile from "../ui/SearchFile";
import Switch from "../ui/Switch";
import { Dropdown, DropdownTrigger, DropdownContent, DropdownItem } from "../ui/Dropdown";
import logo_1  from "@/assets/images/logo_1.png";
import { useState } from "react";


export default function Navbar() {

    // Componente Search 🔍

    const [search, setSearch] = useState("");//Estado para el campo de búsqueda, lo que hace que el componente sea controlado. El valor del campo de búsqueda se almacena en este estado, y se actualiza cada vez que el usuario escribe algo en el campo.

    const handleSearch = (value) => {
        console.log("Buscar:", value);
    }; //Función que se llama cada vez que el valor del campo de búsqueda cambia. Recibe el nuevo valor como argumento y, en este caso, simplemente lo imprime en la consola. En una aplicación real, esta función podría realizar una búsqueda o filtrar resultados en función del valor ingresado por el usuario.

    const handleClear = () => {
        console.log("Búsqueda limpiada");
    }; //Función que se llama cuando el usuario hace clic en el botón de limpiar (X). En este caso, simplemente imprime un mensaje en la consola. En una aplicación real, esta función podría restablecer el estado del campo de búsqueda a una cadena vacía o realizar otras acciones para limpiar los resultados de búsqueda.

// Componente Switch ▶️⏸️

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
                    <div className="items-center hidden sm:block">
                        <Link to={'/'} className="text-h1 font-heading">
                            <img src={logo_1} alt="Logo" className="h-16"/> 
                        </Link>
                    </div>

                    {/* Barra de búsqueda */}
                    <div className=" md:block md:mx-8 min-w-95">
                        <SearchFile
                            value={search}
                            onChange={setSearch}
                            onSubmit={handleSearch}
                            onClear={handleClear}
                            placeholder="Buscar..."
                            size="md"
                            variant="filled"
                        />
                    </div>

                    {/* Links de navegación */}
                    <ul className="hidden md:flex items-center gap-6">
                        <li>
                            <Link to={'/inicio'} className="relative inline-block transition-colors duration-300 ease-in-out group">
                                <span className="group-hover:text-green-600">Inicio</span>
                                <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-green-600 group-hover:w-full transition-all duration-300"></span>
                            </Link>
                        </li>
                        <li>
                            <Link to={'/inicio'} className="relative inline-block transition-colors duration-300 ease-in-out group">
                                <span className="group-hover:text-green-600">Cursos</span>
                                <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-green-600 group-hover:w-full transition-all duration-300"></span>
                            </Link>
                        </li>
                        <li>
                            <Link to={'/'} className="relative inline-block transition-colors duration-300 ease-in-out group">
                                <span className="group-hover:text-green-600">Recursos</span>
                                <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-green-600 group-hover:w-full transition-all duration-300"></span>
                            </Link>
                        </li>
                        <li>
                            <Link to={'/inicio'} className="relative inline-block transition-colors duration-300 ease-in-out group">
                                <span className="group-hover:text-green-600">Contacto</span>
                                <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-green-600 group-hover:w-full transition-all duration-300"></span>
                            </Link>
                        </li>
                    </ul>

                    {/* Sección de la derecha: búsqueda + 'usuario' */}
                    <div className="flex items-center gap-5">
                        {/* Switch movido al lado del icono de usuario */}
                        <div className="hidden sm:flex items-center px-2">
                            <Switch
                                checked={isActive}
                                onChange={handleStatusChange}
                                size="md"
                                className="hidden sm:inline-flex"
                            />
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
                                <Link to="/dashboard/userList" className="block w-full">
                                    Gestión Usuarios
                                </Link>
                            </DropdownItem>
                            <DropdownItem>
                                <Link to="/dashboard" className="block w-full">
                                    Panel de control
                                </Link>
                            </DropdownItem>
                            <DropdownItem>
                                <Link to="/dashboard/auth" className="block w-full">
                                    Cerrar Sesión
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

// Importa iconos usados en el menu de usuario.
import { ChevronDown, LogOut, User } from "lucide-react";
// Importa Link para navegacion declarativa y useNavigate para redireccionar al cerrar sesion.
import { Link, useNavigate } from "react-router-dom";
// Importa el campo de busqueda compartido.
import SearchFile from "../ui/SearchFile";
// Importa las piezas del dropdown compartido.
import { Dropdown, DropdownContent, DropdownItem, DropdownTrigger } from "../ui/Dropdown";
// Importa el logo usado en la barra de navegacion.
import logo_1 from "@/assets/images/logo_1.png";
// Importa useState para controlar el campo de busqueda.
import { useState } from "react";
// Define la barra de navegacion principal del dashboard.
export default function Navbar() {
    // Crea la funcion de navegacion programatica de React Router.
    const navigate = useNavigate();
    // Guarda el valor actual del campo de busqueda.
    const [search, setSearch] = useState("");
    // Maneja el envio del campo de busqueda.
    const handleSearch = (value) => {
        // Imprime el valor buscado como punto de integracion futuro con filtros reales.
        console.log("Buscar:", value);
    // Cierra handleSearch.
    };
    // Maneja la limpieza del campo de busqueda.
    const handleClear = () => {
        // Imprime un mensaje de depuracion cuando se limpia la busqueda.
        console.log("Busqueda limpiada");
    // Cierra handleClear.
    };
    // Maneja el cierre de sesion del usuario autenticado.
    const handleLogout = () => {
        // Elimina el token guardado en sessionStorage.
        sessionStorage.removeItem("token");
        // Elimina la informacion del usuario guardada en sessionStorage.
        sessionStorage.removeItem("user");
        // Redirige al login y reemplaza la entrada actual del historial.
        navigate("/auth", { replace: true });
    // Cierra handleLogout.
    };
    // Devuelve la estructura visual de la barra de navegacion.
    return (
        // Crea el nav principal con ancho completo y borde inferior.
        <nav className="w-full bg-transparent border-b-2">
            {/* Limita el ancho del contenido y agrega padding horizontal. */}
            <div className="mx-auto max-w-7xl px-4">
                {/* Alinea logo, busqueda, links y acciones en una fila. */}
                <div className="flex h-16 items-center justify-between">
                    {/* Contenedor del logo, oculto en pantallas muy pequenas. */}
                    <div className="items-center hidden sm:block">
                        {/* Link del logo hacia la raiz. */}
                        <Link to="/" className="text-h1 font-heading">
                            {/* Imagen del logo con texto alternativo accesible. */}
                            <img src={logo_1} alt="Logo" className="h-16" />
                        {/* Cierra el link del logo. */}
                        </Link>
                    {/* Cierra el contenedor del logo. */}
                    </div>
                    {/* Contenedor del campo de busqueda. */}
                    <div className="md:block md:mx-8 min-w-95">
                        {/* Renderiza el campo de busqueda controlado. */}
                        <SearchFile value={search} onChange={setSearch} onSubmit={handleSearch} onClear={handleClear} placeholder="Buscar..." size="md" variant="filled" />
                    {/* Cierra el contenedor de busqueda. */}
                    </div>
                    {/* Lista de enlaces principales visible desde tamano md. */}
                    <ul className="hidden md:flex items-center gap-6">
                        {/* Enlace desplegable hacia Materiales. */}
                        <li>
                            <Dropdown>
                                <DropdownTrigger>
                                    <button type="button" className="relative inline-flex items-center gap-1 transition-colors duration-300 ease-in-out group">
                                        <span className="group-hover:text-green-600">Materiales</span>
                                        <ChevronDown size={14} className="group-hover:text-green-600" />
                                    </button>
                                </DropdownTrigger>
                                <DropdownContent>
                                    <DropdownItem><Link to="/dashboard/materiales?tipo=devolutivo" className="block w-full">Material Devolutivo</Link></DropdownItem>
                                    <DropdownItem><Link to="/dashboard/materiales?tipo=consumo" className="block w-full">Material de Consumo</Link></DropdownItem>
                                </DropdownContent>
                            </Dropdown>
                        </li>
                        {/* Enlace hacia Grupos. */}
                        <li><Link to="/dashboard/grupos" className="relative inline-block transition-colors duration-300 ease-in-out group"><span className="group-hover:text-green-600">Grupos</span><span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-green-600 group-hover:w-full transition-all duration-300" /></Link></li>
                        {/* Enlace hacia Producto. */}
                        <li><Link to="/dashboard/productos" className="relative inline-block transition-colors duration-300 ease-in-out group"><span className="group-hover:text-green-600">Producto</span><span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-green-600 group-hover:w-full transition-all duration-300" /></Link></li>
                        {/* Enlace hacia Reportes. */}
                        <li><Link to="/dashboard/reportes" className="relative inline-block transition-colors duration-300 ease-in-out group"><span className="group-hover:text-green-600">Reportes</span><span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-green-600 group-hover:w-full transition-all duration-300" /></Link></li>
                        {/* Enlace hacia Cursos. */}
                        <li><Link to="/inicio" className="relative inline-block transition-colors duration-300 ease-in-out group"><span className="group-hover:text-green-600">Cursos</span><span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-green-600 group-hover:w-full transition-all duration-300" /></Link></li>
                        {/* Enlace hacia Recursos. */}
                        <li><Link to="/" className="relative inline-block transition-colors duration-300 ease-in-out group"><span className="group-hover:text-green-600">Recursos</span><span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-green-600 group-hover:w-full transition-all duration-300" /></Link></li>
                        {/* Enlace hacia Contacto. */}
                        <li><Link to="/inicio" className="relative inline-block transition-colors duration-300 ease-in-out group"><span className="group-hover:text-green-600">Contacto</span><span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-green-600 group-hover:w-full transition-all duration-300" /></Link></li>
                    {/* Cierra la lista de enlaces. */}
                    </ul>
                    {/* Agrupa el menu de usuario en el lado derecho. */}
                    <div className="flex items-center gap-5">
                        {/* Contenedor del menu de administracion. */}
                        <div>
                            {/* Crea el dropdown del usuario. */}
                            <Dropdown>
                                {/* Define el boton que abre el dropdown. */}
                                <DropdownTrigger>
                                    {/* Boton visible del usuario administrador. */}
                                    <button type="button" className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/80 px-4 py-2 text-sm font-semibold text-neutral-900 shadow-sm transition-colors hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300"><User size={16} />Admin<ChevronDown size={14} /></button>
                                {/* Cierra el trigger del dropdown. */}
                                </DropdownTrigger>
                                {/* Define el panel flotante del dropdown. */}
                                <DropdownContent>
                                    {/* Item que navega al panel principal. */}
                                    <DropdownItem><Link to="/dashboard" className="block w-full">Panel de control</Link></DropdownItem>
                                    {/* Item que navega a gestion de usuarios. */}
                                    <DropdownItem><Link to="/dashboard/userList" className="block w-full">Gestion Usuarios</Link></DropdownItem>
                                    {/* Item que navega a gestion de permisos. */}
                                    <DropdownItem><Link to="/dashboard/permisos" className="block w-full">Gestion Permisos</Link></DropdownItem>
                                    {/* Item que ejecuta cierre de sesion. */}
                                    <DropdownItem onClick={handleLogout}><span className="inline-flex items-center gap-2"><LogOut size={16} />Cerrar sesion</span></DropdownItem>
                                {/* Cierra el panel del dropdown. */}
                                </DropdownContent>
                            {/* Cierra el dropdown. */}
                            </Dropdown>
                        {/* Cierra el contenedor del menu. */}
                        </div>
                    {/* Cierra el grupo derecho. */}
                    </div>
                {/* Cierra la fila principal del navbar. */}
                </div>
            {/* Cierra el contenedor centrado. */}
            </div>
        {/* Cierra el nav principal. */}
        </nav>
    // Cierra el retorno JSX.
    );
// Cierra la funcion Navbar.
}

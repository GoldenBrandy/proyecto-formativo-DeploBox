import { useState, useEffect } from "react";
import { getDocumentTypes } from "../services/selectService";
import { userSchema } from "../schemas/userSchema";
import { Input, Button, Select, Checkbox, IconButton, Dropdown, DropdownTrigger, DropdownContent, DropdownItem } from "@/shared";
import { Link, useNavigate } from "react-router-dom";
import { SquareArrowRightEnter, Menu } from "lucide-react";



export default function UserRegisterForm({
    backgroundImage = null,
    nextTo = "/dashboard",
    cancelTo = "/",
    showBackButton = false,
    backTo = "/auth",
}){
    const navigate = useNavigate();
    const [documentType, setDocumentType] = useState([]);
    const [formData, setFormData] = useState({
        userName: "",
        userEmail: "",
        userPhone: "",
        userDocumentType: "",
        userDocumentNumber: "",
        userPassword: "",
        isStaff: false,
        isActive: true,
        isSuperAdmin: false,
    });

    useEffect(() => {
        getDocumentTypes().then(setDocumentType);
    },[]);

    // ===========================================
    //          Handle Genérico 
    // ===========================================
    /**
     * Función que se ejecuta cada vez que cambia el valor de un input del formulario
     */
    const handleChange = (e) => {
        // Se obtiene el nombre del input y su valor
        const { name, type, value, checked } = e.target;

        // Se actualiza el estado del formulario con el nuevo valor
        setFormData((prev) => ({
            // Se copian todos los valores anteriores del estado
            ...prev,

            // Se actualiza el valor del input que cambió
            [name]: type === "checkbox" ? checked : value, 
        }))
    };

    const [ errors, setErrors] = useState({});

    
    
    // ============ Handle Submit ==============
    /**
     * Función que se ejecuta cada vez que se envía el formulario
     */
    const handleSubmit = (e) => {
        // Evita que el formulario recargue la página al enviarse
        e.preventDefault();

        // Se valida el objeto formData usando el esquema definido con zod
        // safeParse devuelve un objeto indicando si la validación fue exitosa o no
        const result = userSchema.safeParse(formData);

        // Si la validacion falla
        if(!result.success){
            // Objeto donde se almacenarán los errores por campo
            const feldErrors = {};

            // Zod devuelve los errores en un arreglo llamado issues
            // Se recorren para asociar cada error a su campo correspondiente
            result.error.issues.forEach((issue) => {
                // issue.path contiene la ruta del campo que falló 

                //Se guarda el mensaje de error en el objeto feldErrors usando el nombre del campo como clave
                feldErrors[issue.path[0]] = issue.message;
            });
            // Se actualiza el estado de errores para mostrarlos en el formulario
            setErrors(feldErrors);
            
            // se detiene la ejecución
            return;
        }

        setErrors({}); // Si la validación es exitosa, se limpian los errores
        console.log("Usuario Válido:", result.data); // Se muestra el objeto validado en la consola
    };


    return (
         <div

            className={`relative min-h-[calc(100vh-4rem)] w-full flex-1 overflow-hidden p-6 ${backgroundImage ? "bg-cover bg-center" : ""}`}
            style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : undefined}
         >
            <div className="relative text-black [&_button]:text-black [&_h1]:text-black [&_input]:text-black [&_input::placeholder]:text-black/70 [&_label]:text-black [&_select]:text-black [&_span]:text-black">

            {showBackButton && (
                <div className="mb-4">
                    <IconButton
                        ariaLabel="Volver"
                        variant="ghost"
                        onClick={() => navigate(backTo)}
                        className="text-black"
                    >
                        <MoveLeft />
                    </IconButton>
                </div>
            )}

            <h1 className='text-text-primary text-2xl mb-6 text-center '>
                Registro de usuarios
            </h1>

            <form 
            className="grid grid-cols-1 items-center " 
            onSubmit={handleSubmit}
            noValidate
            >


                <div className="grid grid-cols-2 gap-6 my-0 mx-auto border p-12 rounded-md">

                    {/* Inputs */}

                    <Input 
                    label="Nombre"
                    name="userName"
                    placeholder="Ingrese su nombre"
                    value = {formData.userName}
                    onChange={handleChange}
                    error = {errors.userName}
                    />

                    <Input 
                    label="Correo"
                    name="userEmail"
                    placeholder="Ingrese su correo"
                    type="email"
                    value = {formData.userEmail}
                    onChange={handleChange}
                    error = {errors.userEmail}
                    />

                    <Input 
                    label="Telefono"
                    name="userPhone"
                    placeholder="Ingrese su telefono"
                    type="tel"
                    value = {formData.userPhone}
                    onChange={handleChange}
                    error = {errors.userPhone}

                    />

                    <Select
                    label="Tipo de documento"
                    name="userDocumentType"
                    options={documentType}
                    value = {formData.userDocumentType}
                    onChange={handleChange}
                    error = {errors.userDocumentType}
                    >
                    </Select>

                    <Input 
                    label="Número de documento"
                    name="userDocumentNumber"
                    placeholder="Ingrese su número de documento"
                    value = {formData.userDocumentNumber}
                    onChange={handleChange}
                    error = {errors.userDocumentNumber}
                    />

                    <Input 
                    label="Contrasena"
                    name="userPassword"
                    placeholder="Ingrese su contrasena"
                    type='password'
                    value = {formData.userPassword}
                    onChange={handleChange}
                    error = {errors.userPassword}
                    />

                    <div className="flex h-12 items-center">
                        <Checkbox
                            id="isStaff"
                            name="isStaff"
                            label="Es staff"
                            checked={formData.isStaff}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex h-12 items-center">
                        <Checkbox
                            id="isActive"
                            name="isActive"
                            label="Está activo?"
                            checked={formData.isActive}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex h-12 items-center">
                        <Checkbox
                            id="isSuperAdmin"
                            name="isSuperAdmin"
                            label="Es un super administrador?"
                            checked={formData.isSuperAdmin}
                            onChange={handleChange}
                        />
                    </div>

                {/* Actions */}

                <div className="flex h-12 items-center justify-end gap-6">
                    <Button  
                        variant="secondary"
                        type="button"
                        onClick={() => navigate(cancelTo)}
                    >
                        Cancelar
                    </Button>

                    <Button  
                        variant="primary"
                        type="submit"
                    >
                        Guardar
                    </Button>

                    <IconButton
                        ariaLabel="Ir al dashboard"
                        variant="ghost"
                        onClick={() => navigate(nextTo)}
                    >
                        <SquareArrowRightEnter />
                    </IconButton>

                    {/* ======= Dropdown ======= */}
                    <div>
                        <Dropdown>
                            <DropdownTrigger>
                                <IconButton ariaLabel="Menú de usuario">
                                    <Menu />
                                </IconButton>
                            </DropdownTrigger>

                        <DropdownContent>
                            <DropdownItem>
                                <Link to="/auth" className="block w-full">
                                    Autenticación
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
        </form>
        </div>
    </div>
    )
};

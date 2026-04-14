import { useState, useEffect } from "react";
import { getDocumentTypes } from "../services/selectService";
import { userSchema } from "../schemas/userSchema";

import { Input, Button, Select } from "@/shared";


export default function UserRegisterForm(){
    const [documentType, setDocumentType] = useState([]);
    const [formData, setFormData] = useState({
        userName: "",
        userEmail: "",
        userPhone: "",
        userDocumentType: "",
        userDocumentNumber: "",
        userPassword: ""
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
        const { name, value } = e.target;

        // Se actualiza el estado del formulario con el nuevo valor
        setFormData((prev) => ({
            // Se copian todos los valores anteriores del estado
            ...prev,

            // Se actualiza el valor del input que cambió
            [name]: value, 
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
         <div className="w-full max-w-4xl mx-auto p-6">

            <h1 className='text-text-primary text-2xl mb-6'>
                Registro de usuarios
            </h1>

            <form 
            className="grid grid-cols-1 items-center" 
            onSubmit={handleSubmit}
            noValidate
            >


                <div className="grid grid-cols-2 gap-6 my-0 mx-auto">

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


                {/* Actions */}

                <div className="col-span-2 flex items-center justify-center gap-6 mt-2">
                    <Button  
                        variant="secondary"
                        type="button"
                    >
                        Cancelar
                    </Button>

                    <Button  
                        variant="primary"
                        type="submit"
                    >
                        Guardar
                    </Button>
                </div>
            </div>
        </form>
    </div>
    )
};

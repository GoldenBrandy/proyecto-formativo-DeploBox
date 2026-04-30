
import { useState } from "react";
// import { userSchema } from "../schemas/userSchema";
import { Input, Button, IconButton } from "@/shared";
import { useNavigate } from "react-router-dom";
import { MoveLeft } from "lucide-react";



export default function Login({
    nextTo = "/dashboard",
    cancelTo = "/",
    showBackButton = false,
    backTo = "/auth",
}){
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        userEmail: "",
        userPassword: ""
    });

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

    const [ errors, _setErrors] = useState({});

    
    
    // ============ Handle Submit ==============
    /**
     * Función que se ejecuta cada vez que se envía el formulario
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        // Se valida el objeto formData usando el esquema definido con zod
        // safeParse devuelve un objeto indicando si la validación fue exitosa o no
    };

//

     return (
            <section className="w-full max-w-md text-black [&_button]:text-black [&_h1]:text-black [&_input]:text-black [&_input::placeholder]:text-black/70 [&_label]:text-black [&_select]:text-black [&_span]:text-black">

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
                Iniciar sesión
            </h1>

            <form 
            className="grid grid-cols-1 items-center " 
            onSubmit={handleSubmit}
            noValidate
            >


                <div className="mx-auto grid w-full max-w-md gap-6 rounded-md border bg-white/80 p-8 shadow-lg backdrop-blur-sm">

                    {/* Inputs */}

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
                    label="Contrasena"
                    name="userPassword"
                    placeholder="Ingrese su contrasena"
                    type='password'
                    value = {formData.userPassword}
                    onChange={handleChange}
                    error = {errors.userPassword}
                    />


                {/* Actions */}

                <div className="flex justify-center gap-4 pt-2">
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
                        onClick={() => navigate(nextTo)}                  >
                        Iniciar sesión
                    </Button>

                </div>
            </div>
        </form>
    </section>
    )
    }

 

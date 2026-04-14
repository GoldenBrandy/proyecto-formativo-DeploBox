import { useState, useEffect } from "react";
import { getDocumentTypes } from "../services/selectService";

import { Input, Button, Select } from "@/shared";


export default function UserRegisterForm(){

    const [documentType, setDocumentType] = useState([]);

    useEffect(() => {
        getDocumentTypes().then(setDocumentType);
    },[]);


    // Handle

    const handleNameChange = (e) => {
        console.log("Nombre: ", e.target.value)
    }

    const handleEmailBlur = (e) => {
        console.log('Email: ', e.target.value)
    }



    return(
        <div>

            <h1 className='text-text-primary text-2xl mb-6'>
                Registro de usuarios
            </h1>

            <form className="grid grid-cols-1 items-center">

                <div className="grid grid-cols-2 gap-6 my-0 mx-auto">

                    {/* Inputs */}

                    <Input 
                    label="Nombre"
                    name="userName"
                    placeholder="Ingrese su nombre"
                    onChange={handleNameChange}
                    />

                    <Input 
                    label="Correo"
                    name="userEmail"
                    placeholder="Ingrese su correo"
                    type="email"
                    />

                    <Input 
                    label="Telefono"
                    name="userPhone"
                    placeholder="Ingrese su telefono"
                    type="tel"
                    />

                    <Select
                    label="Tipo de documento"
                    name="userDocumentType"
                    options={documentType}
                    >
                    </Select>

                    <Input 
                    label="Número de documento"
                    name="userDocumentNumber"
                    placeholder="Ingrese su número de documento"
                    />

                    <Input 
                    label="Contrasena"
                    name="userPassword"
                    placeholder="Ingrese su contrasena"
                    type='password'
                    />


                {/* Actions */}

                <div className="flex items-end justify-end gap-6">
                    <Button  
                        variant = "primary" 
                        size="sm"
                    >
                        Cancelar
                    </Button>

                    <Button  
                        variant = "primary" 
                        size="md">
                        Guardar
                    </Button>
                </div>
            </div>
        </form>
        {/* <DeleteCounter /> */}
        {/* <DeleteEffect /> */}
        {/* <DeleteCounter2 /> */}
    </div>
    )
};
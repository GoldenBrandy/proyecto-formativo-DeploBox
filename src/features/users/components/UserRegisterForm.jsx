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
                    placeholder="Ingrese su nombre"
                    onChange={handleNameChange}

                    
                    />
                    <Input 
                    label="Nombre"
                    placeholder="Ingrese su nombre"
                    /*
                    onKeyDown={() => console.log("")}
                    onKeyUp={() => console.log("")}
                    onKeyPress={() => console.log("")}
                    onChange={(e) => console.log(e.target.value)}
                    onFocus={() => console.log("input enfocado - Cristian Salazar")}
                    */
                    onBlur={() => console.log("input desenfocado - Cristian Salazar")}
                    />
                    <Input 
                    label="Nombre"
                    placeholder="Ingrese su nombre"

                    
                    />
                    <Input 
                    label="Nombre"
                    placeholder="Ingrese su nombre"
                    />
                    <Input 
                    label="Telefono"
                    placeholder="Ingrese su telefono"
                    type="tel"
                    onSelect={() => console.log("texto seleccionado - Cristian Salazar")}
                    />
                    <Input 
                    label="Correo"
                    placeholder="Ingrese su correo"
                    type="email"
                    onBlur={handleEmailBlur}
                    />
                    <Input 
                    label="Contrasena"
                    placeholder="Ingrese su contrasena"
                    type='password'
                    />
                    <Input 
                    label="Edad"
                    placeholder="Ingrese su edad"
                    type="number"
                    />

                    <Select
                    label="Tipo de documento"
                    name="documentType"
                    options={documentType}
                    >
                    </Select>


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
// el checkbox no acepta clases ,necesitamos un id 
// las clases se usan para estilos, estados, variantes, layout -> CSS 
// los id se usan para JS,accesibilidad y anclas 

export default function Checkbox({

    id,                         //Identificador unico(necesario para accesibilidad)
    name,                       //Nombre del campo (Util para formulario)
    label,                      //Texto cisible asociado al checkbox
    checked = false,            //Estado controlado del checkbox
    onChange,                   //Funcion que maneja el camcio de estado
    disabled = false,            //Indica si el checkbox esta habilitado
    className = "",             //Clases adicionales ´para personalizacion 


}){


    return(
        <label 
            htmlFor={id}
                className= {`
                    flex items-center gap-2
                    text-sm 
                    cursor-pointer
                    ${disabled  ? "opacity-50 cursor-not-allowed" : ""}
                    ${className}
                `}
            >
                {/* input del checkbox */}
                <input 
                    id = {id}
                    name= {name}
                    type= "checkbox"
                    checked = {checked}
                    disabled = {disabled}
                    onChange={onChange}
                    className="w-5 h-5"
                 />

                 {/* Texto del checkbox */}
                 <span>{label}</span>
            </label>
    )
}
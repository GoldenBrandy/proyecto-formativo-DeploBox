export default function Input({    label,   type = "text",   ...props })
{
     //Cuerpo de la función
    return(
        // Contenedor del input que se exporta con label, cuerpo y feedback message
        <div className="w-[320px]">
        {/* Label */}
        {label && (
            <label 
                className="
                    block
                    text-caption
                    mb-1
                    w-full
                    text-left
                    ">    
                {label}
            </label>


        )}

            

            {/*===========================================*/}

            {/* Contenedor del input */}
            <div
                className="
                    relative
                    h-12
                    flex
                    item-center
                ">
                {/* Área Interactiva invisible de un input 48px */}
                <div 
                    className="
                        absolute
                        inset-0
                    "
                onMouseDown={(e) => { 
                    e.preventDefault();
                    e.currentTarget.nextSibling.focus();
                }}
                >
                </div>

                {/* Area visual del input */}

                <input
                    type={type}
                    className="
                        relative
                        w-full
                        h-12
                        rounded-md
                        border
                        border-border
                        px-4
                        text-base

                        focus: outline-none
                        focus:ring-2
                        focus:ring-focus-ring
                        focus:border-focus-border
                    "
                    {...props}
                    
                    >
                       
                </input>
            </div>
        </div>
    )
};

export default function Input({    label,   type = "text", error,  ...props })
{
     //Cuerpo de la función
    return(
        // Contenedor del input que se exporta con label, cuerpo y feedback message
        <div className="w-[320px]">
        {/* Label */}
        {label && (
            <label 
                className= {
                    `block
                    text-caption
                    mb-1
                    w-full
                    text-left
                    place-self-start
                    ${error ? "text-red-800" : "text-text-primary"}
                `}
                    
                    >    
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
                    className= {` relative
                        w-full
                        h-12
                        rounded-md
                        border
                        px-4
                        text-base
                        transition-colors

                        focus:outline-none
                        ${
                            error
                                ? "border-red-800 hover:border-red-800 focus:border-[3px] focus:border-red-800"
                                : "border-border hover:border-[color:var(--primary-950)] hover:border-2 focus:border-[3px] focus:border-[color:var(--primary-950)]"
                        }
                        `}
                       
                    
                    {...props}
                    
                    >
                       
                </input>
            </div>

            {/* FeedBack */}
            {error && <p className="mt-1 w-full text-left text-caption text-red-800">{error}</p>}
        </div>
    )
};

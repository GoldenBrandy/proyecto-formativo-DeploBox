// Importa utilidades de React para contexto, estado, refs, efectos y clonacion de elementos.
import { cloneElement, createContext, useContext, useEffect, useRef, useState } from "react";
// Importa createPortal para renderizar el menu fuera del flujo normal del DOM.
import { createPortal } from "react-dom";
// Crea un contexto para compartir estado del dropdown entre Trigger, Content e Item.
const DropdownContext = createContext(null);
// Define el componente raiz que controla si el dropdown esta abierto o cerrado.
export function Dropdown({
    // Recibe los subcomponentes internos del dropdown.
    children,
    // Permite agregar clases al wrapper externo.
    className = "",
// Cierra la lista de props.
}) {
    // Guarda si el menu esta abierto.
    const [open, setOpen] = useState(false);
    // Guarda una referencia al elemento que abre el menu.
    const triggerRef = useRef(null);
    // Guarda una referencia al contenido del menu.
    const contentRef = useRef(null);
    // Registra listeners globales para cerrar el menu al hacer clic afuera o presionar Escape.
    useEffect(() => {
        // Define la funcion que cierra el menu cuando el clic ocurre fuera del trigger y del contenido.
        const closeDropdown = (event) => {
            // Detecta si el clic ocurrio dentro del trigger.
            const clickedTrigger = triggerRef.current?.contains(event.target);
            // Detecta si el clic ocurrio dentro del contenido.
            const clickedContent = contentRef.current?.contains(event.target);
            // Cierra el menu solo si el clic no fue en ninguna parte del dropdown.
            if (!clickedTrigger && !clickedContent) setOpen(false);
        // Cierra closeDropdown.
        };
        // Define la funcion que cierra el menu con la tecla Escape.
        const closeWithEscape = (event) => {
            // Cierra el dropdown si la tecla presionada fue Escape.
            if (event.key === "Escape") setOpen(false);
        // Cierra closeWithEscape.
        };
        // Escucha clics del mouse en todo el documento.
        document.addEventListener("mousedown", closeDropdown);
        // Escucha teclas en todo el documento.
        document.addEventListener("keydown", closeWithEscape);
        // Limpia los listeners cuando el componente se desmonta.
        return () => {
            // Remueve el listener de clic global.
            document.removeEventListener("mousedown", closeDropdown);
            // Remueve el listener de teclado global.
            document.removeEventListener("keydown", closeWithEscape);
        // Cierra la funcion de limpieza.
        };
    // Ejecuta el efecto una sola vez al montar.
    }, []);
    // Devuelve el proveedor de contexto para todos los subcomponentes.
    return (
        // Entrega open, setOpen y refs a los hijos del dropdown.
        <DropdownContext.Provider value={{ open, setOpen, triggerRef, contentRef }}>
            {/* Usa display contents para no introducir una caja visual extra en el layout. */}
            <div className={className} style={{ display: "contents" }}>{children}</div>
        {/* Cierra el proveedor de contexto. */}
        </DropdownContext.Provider>
    // Cierra el retorno JSX.
    );
// Cierra Dropdown.
}
// Define el disparador del dropdown, normalmente un boton.
export function DropdownTrigger({
    // Recibe un unico elemento hijo que sera clonado para agregar eventos y aria.
    children,
// Cierra la lista de props.
}) {
    // Lee el estado y la ref desde el contexto del dropdown.
    const { open, setOpen, triggerRef } = useContext(DropdownContext);
    // Clona el hijo para agregarle comportamiento sin obligar a escribir un boton especifico.
    return cloneElement(children, {
        // Conecta la ref al elemento disparador.
        ref: triggerRef,
        // Informa a tecnologias asistivas si el menu esta abierto.
        "aria-expanded": open,
        // Indica que este control abre un menu.
        "aria-haspopup": "menu",
        // Agrega el manejador de clic conservando el onClick original del hijo.
        onClick: (event) => {
            // Ejecuta el onClick original del hijo si existia.
            children.props.onClick?.(event);
            // Alterna el estado abierto/cerrado.
            setOpen(!open);
        // Cierra el manejador de clic.
        },
    // Cierra las props inyectadas al hijo.
    });
// Cierra DropdownTrigger.
}
// Define el contenedor flotante del menu.
export function DropdownContent({
    // Recibe los items del menu.
    children,
    // Permite agregar clases externas al panel.
    className = "",
// Cierra la lista de props.
}) {
    // Lee estado abierto y refs desde el contexto.
    const { open, triggerRef, contentRef } = useContext(DropdownContext);
    // Guarda la posicion calculada del menu en pantalla.
    const [position, setPosition] = useState({ top: 0, left: 0 });
    // Recalcula la posicion cuando el menu se abre.
    useEffect(() => {
        // Si no esta abierto o no existe trigger, no calcula nada.
        if (!open || !triggerRef.current) return;
        // Obtiene posicion y tamano del trigger en viewport.
        const trigger = triggerRef.current.getBoundingClientRect();
        // Define un ancho estimado para alinear el menu a la derecha.
        const dropdownWidth = 192;
        // Define margen minimo contra el borde de la ventana.
        const pageMargin = 16;
        // Calcula la posicion izquierda ideal alineada al borde derecho del trigger.
        const left = trigger.right + window.scrollX - dropdownWidth;
        // Calcula el maximo left permitido antes de tocar el borde derecho.
        const maxLeft = window.innerWidth + window.scrollX - dropdownWidth - pageMargin;
        // Guarda la posicion final del menu.
        setPosition({ top: trigger.bottom + window.scrollY + 8, left: Math.min(left, maxLeft) });
    // Recalcula cuando cambia open o la referencia del trigger.
    }, [open, triggerRef]);
    // Si el menu esta cerrado, no renderiza nada.
    if (!open) return null;
    // Renderiza el menu dentro de document.body para evitar cortes por overflow de contenedores padres.
    return createPortal(
        // Crea el panel flotante del dropdown.
        <div ref={contentRef} role="menu" className={`fixed z-110 min-w-48 rounded-xl border border-neutral-200 bg-white p-1 text-neutral-950 shadow-lg shadow-black/10 overflow-hidden dark:border-neutral-700 dark:bg-neutral-950 dark:text-white ${className}`} style={{ top: position.top, left: position.left }}>
            {/* Inserta los items del menu. */}
            {children}
        {/* Cierra el panel flotante. */}
        </div>,
        // Indica que el portal se monta al final del body.
        document.body,
    // Cierra createPortal.
    );
// Cierra DropdownContent.
}
// Define un item de menu que puede envolver un Link o funcionar como boton.
export function DropdownItem({
    // Recibe contenido visible o un Link como hijo.
    children,
    // Recibe la accion opcional del item.
    onClick,
    // Permite agregar clases externas al item.
    className = "",
// Cierra la lista de props.
}) {
    // Lee setOpen para cerrar el menu despues de seleccionar un item.
    const { setOpen } = useContext(DropdownContext);
    // Define clases comunes de item.
    const itemClasses = `w-full rounded-lg px-3 py-2 text-left transition-colors hover:bg-neutral-100 focus:bg-neutral-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800 ${className}`;
    // Define una funcion que ejecuta la accion y luego cierra el menu.
    const closeAfterClick = (event) => {
        // Ejecuta el callback del item si existe.
        onClick?.(event);
        // Cierra el dropdown despues del clic.
        setOpen(false);
    // Cierra closeAfterClick.
    };
    // Si el hijo parece ser un Link de React Router, lo clona para aplicar clases y cierre.
    if (children?.props?.to) {
        // Devuelve un contenedor con rol menuitem para el Link.
        return (
            // Crea el contenedor semantico del item.
            <div role="menuitem" className="w-full">
                {/* Clona el Link para sumarle clases y cerrar el menu al hacer clic. */}
                {cloneElement(children, { className: `${children.props.className || ""} block ${itemClasses}`, onClick: (event) => { children.props.onClick?.(event); setOpen(false); } })}
            {/* Cierra el contenedor del item Link. */}
            </div>
        // Cierra el retorno del caso Link.
        );
    // Cierra la condicion de Link.
    }
    // Si no es Link, renderiza un boton de menu normal.
    return (
        // Crea el boton item del dropdown.
        <button role="menuitem" type="button" onClick={closeAfterClick} className={itemClasses}>
            {/* Inserta el contenido visible del item. */}
            {children}
        {/* Cierra el boton item. */}
        </button>
    // Cierra el retorno JSX.
    );
// Cierra DropdownItem.
}

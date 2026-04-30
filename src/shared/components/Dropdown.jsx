import {
    createContext, // Define un contenedor de datos
    useContext,    // Consume el estado en cualquier subcomponente(Button,Menu,Item)
    useState,
    useRef,
    useEffect,
    useCallback,
    cloneElement
} from "react";

const DropdownContext = createContext(null);

export function Dropdown({
    children,
    open: controlledOpen,
    onOpenChange,
    className = ""
}) {
    const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
    const isControlled = controlledOpen !== undefined;
    const open = isControlled ? controlledOpen : uncontrolledOpen;
    const setOpen = useCallback((value) => {
        if (isControlled) {
            onOpenChange?.(value);
        } else {
            setUncontrolledOpen(value);
        }
    }, [isControlled, onOpenChange]);

    //useRef: Se usa para referenciar el trigger o menú del Dropdown
    //El trigger es el elemento que abre o cierra el componente
    const containerRef = useRef(null);

    // Click outside o fuera del componente
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [setOpen]);

    // Escape key o tecla escape 
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === "Escape") setOpen(false);
        };

        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, [setOpen]);

    return (
        //Inyecta el estado compartido al dropdown 
        <DropdownContext.Provider value={{ open, setOpen }}>
            <div ref={containerRef} className={`relative inline-block ${className}`}>
                {children}
            </div>
        </DropdownContext.Provider>
    );
}

// Trigger (asChild pattern)
export function DropdownTrigger({ children }) {
    const { open, setOpen } = useContext(DropdownContext);

    if (!children) return null;

    return cloneElement(children, {
        onClick: (e) => {
            children.props.onClick?.(e);
            setOpen(!open);
        },
        "aria-expanded": open,
        "aria-haspopup": "menu",
    });
}

// Content
export function DropdownContent({ children, className = "" }) {
    const { open } = useContext(DropdownContext);

    if (!open) return null;
    return (
        <div
            role="menu"
            className={`
                absolute right-0 top-full z-50
                mt-2
                min-w-48
                border border-neutral-200
                bg-white
                text-black
                shadow-lg shadow-black/10
                p-1
                dark:border-neutral-700
                dark:bg-neutral-950
                dark:text-white
                backdrop-blur-[1px]
                rounded-xl
                overflow-hidden
                ${className}
            `}
        >
            {children}
        </div>
    );
}

// Item
export function DropdownItem({ 
    children, 
    onClick, 
    className = "" 
}) {
    const { setOpen } = useContext(DropdownContext);

    const handleClick = (e) => {
        onClick?.(e);
        setOpen(false);
    };

    return (
        <button
            role="menuitem"
            onClick={handleClick}
            className={`
                w-full text-left px-3 py-2 rounded-lg hover:bg-neutral-100 focus:bg-neutral-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800 transition-colors
                ${className}
            `}
        >
            {children}
        </button>
    );
}

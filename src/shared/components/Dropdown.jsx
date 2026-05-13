import {
    createContext, // Define un contenedor de datos
    useContext,    // Consume el estado en cualquier subcomponente(Button,Menu,Item)
    useState,
    useRef,
    useEffect,
    useCallback,
    cloneElement
} from "react";
import { createPortal } from "react-dom";

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
    const triggerRef = useRef(null);
    const contentRef = useRef(null);

    // Click outside o fuera del componente
    useEffect(() => {
        const handleClickOutside = (e) => {
            const clickedInsideContainer = containerRef.current && containerRef.current.contains(e.target);
            const clickedInsideContent = contentRef.current && contentRef.current.contains(e.target);

            if (!clickedInsideContainer && !clickedInsideContent) {
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
        <DropdownContext.Provider value={{ open, setOpen, triggerRef, contentRef }}>
            <div ref={containerRef} className={`relative ${className}`} style={{ display: 'contents' }}>
                {children}
            </div>
        </DropdownContext.Provider>
    );
}

// Trigger (asChild pattern)
export function DropdownTrigger({ children }) {
    const { open, setOpen, triggerRef } = useContext(DropdownContext);

    if (!children) return null;

    return cloneElement(children, {
        ref: triggerRef,
        onClick: (e) => {
            children.props.onClick?.(e);
            setOpen(!open);
        },
        "aria-expanded": open,
        "aria-haspopup": "menu",
        className: `${children.props.className || ""} relative`,
    });
}

// Content
export function DropdownContent({ children, className = "" }) {
    const { open, triggerRef, contentRef } = useContext(DropdownContext);
    const [position, setPosition] = useState({ top: 0, left: 0 });

    useEffect(() => {
        if (open && triggerRef?.current) {
            const rect = triggerRef.current.getBoundingClientRect();
            const dropdownWidth = 192;
            const margin = 16;
            const calculatedLeft = rect.right + window.scrollX - dropdownWidth;
            const maxLeft = window.innerWidth + window.scrollX - dropdownWidth - margin;
            
            setPosition({
                top: rect.bottom + window.scrollY + 8,
                left: Math.min(calculatedLeft, maxLeft),
            });
        }
    }, [open, triggerRef]);

    if (!open) return null;

    const contentElement = (
        <div
            ref={contentRef}
            role="menu"
            className={`
                fixed z-110
                min-w-48
                border border-neutral-200
                bg-white
                text-neutral-950
                shadow-lg shadow-black/10
                p-1
                dark:border-neutral-700
                dark:bg-neutral-950
                dark:text-white
                rounded-xl
                overflow-hidden
                ${className}
            `}
            style={{
                top: `${position.top}px`,
                left: `${position.left}px`,
            }}
        >
            {children}
        </div>
    );

    return createPortal(contentElement, document.body);
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

    // Si el children es un Link (tiene props.to), renderizar como <div> para permitir navegación
    if (children?.type?.name === 'Link' || children?.props?.to) {
        return (
            <div
                role="menuitem"
                className={`
                    w-full text-left px-0 py-0 rounded-lg hover:bg-neutral-100 focus:bg-neutral-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800 transition-colors
                    ${className}
                `}
            >
                {cloneElement(children, {
                    className: `${children.props.className || ""} block px-3 py-2 w-full`,
                    onClick: (e) => {
                        children.props.onClick?.(e);
                        setOpen(false);
                    }
                })}
            </div>
        );
    }

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

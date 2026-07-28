// Importa hooks de React para referencias, estado, efectos y calculos memorizados.
import { useEffect, useMemo, useRef, useState } from "react";
// Importa el loader visual usado mientras se procesan archivos.
import { Infinity as InfinityLoader } from "ldrs/react";
// Importa los estilos necesarios para que el loader se vea correctamente.
import "ldrs/react/Infinity.css";
// Define un input de archivos controlado con preview, eliminacion y reordenamiento.
export default function FileInput({
    // Recibe la lista externa de archivos; por defecto inicia vacia.
    value = [],
    // Recibe la funcion externa que actualiza la lista de archivos.
    onChange,
    // Indica si se pueden seleccionar varios archivos.
    multiple = false,
    // Define los tipos aceptados por el input nativo.
    accept = "image/*,application/pdf",
// Cierra la lista de propiedades.
}) {
    // Guarda una referencia al input file oculto para abrirlo desde un contenedor personalizado.
    const inputRef = useRef(null);
    // Guarda si el componente esta simulando/procesando una carga.
    const [isLoading, setIsLoading] = useState(false);
    // Guarda el indice del archivo que se esta arrastrando para reordenar.
    const [dragIndex, setDragIndex] = useState(null);
    // Define un helper que detecta si un archivo es imagen por su MIME type.
    const isImage = (file) => file.type.startsWith("image/");
    // Memoriza el conteo de archivos para evitar recalcularlo sin necesidad.
    const fileCount = useMemo(() => value.length, [value]);
    // Crea previews temporales solo para imagenes y null para archivos no visuales como PDF.
    const previews = useMemo(() => value.map((file) => (isImage(file) ? URL.createObjectURL(file) : null)), [value]);
    // Ejecuta limpieza cada vez que cambian los previews o cuando el componente se desmonta.
    useEffect(() => {
        // Devuelve una funcion de limpieza para liberar URLs temporales y evitar fugas de memoria.
        return () => {
            // Recorre cada URL creada para preview.
            previews.forEach((url) => {
                // Libera la URL solo si existe, porque los PDF guardan null.
                if (url) URL.revokeObjectURL(url);
            // Cierra el recorrido de previews.
            });
        // Cierra la funcion de limpieza.
        };
    // Ejecuta la limpieza cuando cambia la lista de previews.
    }, [previews]);
    // Normaliza FileList, simula espera corta y actualiza el estado externo.
    const handleFiles = async (files) => {
        // Si no llegan archivos, no hace nada.
        if (!files?.length) return;
        // Activa el estado de carga.
        setIsLoading(true);
        // Convierte FileList en arreglo para poder mapear, concatenar y cortar.
        const list = Array.from(files);
        // Simula una pequena espera para mostrar el loader.
        await new Promise((resolve) => setTimeout(resolve, 500));
        // Si multiple es true concatena archivos nuevos; si no, conserva solo el primero.
        const data = multiple ? [...value, ...list] : [list[0]];
        // Actualiza el padre limitando la lista a doce archivos.
        onChange?.(data.slice(0, 12));
        // Apaga el estado de carga.
        setIsLoading(false);
    // Cierra handleFiles.
    };
    // Elimina un archivo por indice sin mutar directamente el arreglo original.
    const remove = (index) => {
        // Crea una copia del arreglo para mantener inmutabilidad.
        const copy = [...value];
        // Quita un elemento en la posicion indicada.
        copy.splice(index, 1);
        // Envia la nueva lista al componente padre.
        onChange?.(copy);
    // Cierra remove.
    };
    // Reordena un archivo desde una posicion hacia otra.
    const reorder = (from, to) => {
        // Si el indice de origen no es numero, cancela el reordenamiento.
        if (typeof from !== "number") return;
        // Crea una copia para no mutar value directamente.
        const copy = [...value];
        // Extrae el archivo movido desde su posicion original.
        const [movedFile] = copy.splice(from, 1);
        // Inserta el archivo movido en la nueva posicion.
        copy.splice(to, 0, movedFile);
        // Envia el nuevo orden al componente padre.
        onChange?.(copy);
    // Cierra reorder.
    };
    // Devuelve la interfaz del selector de archivos.
    return (
        // Crea una fila flexible con contador, previews y boton selector.
        <div className="flex items-center gap-2">
            {/* Muestra cuantos archivos hay seleccionados. */}
            <span className="text-xs text-gray-500">{fileCount} archivo(s)</span>
            {/* Recorre los archivos seleccionados para pintar su preview. */}
            {value.map((file, index) => (
                // Crea una tarjeta de archivo arrastrable para reordenar.
                <div key={`${file.name}-${index}`} draggable onDragStart={() => setDragIndex(index)} onDragOver={(event) => event.preventDefault()} onDrop={() => reorder(dragIndex, index)} className="relative w-24 h-24 border rounded overflow-hidden group">
                    {/* Si es imagen muestra preview; si no, muestra un bloque generico para PDF. */}
                    {isImage(file) ? <img src={previews[index]} alt={file.name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 text-[10px] px-1"><span className="font-semibold">PDF</span><span className="truncate w-full text-center">{file.name}</span></div>}
                    {/* Agrupa acciones visibles al pasar el mouse. */}
                    <div className="absolute top-1 right-1 flex flex-col gap-1 opacity-0 group-hover:opacity-100">
                        {/* Elimina el archivo actual. */}
                        <button type="button" onClick={() => remove(index)} className="w-7 h-7 bg-white rounded-full text-black text-xs">X</button>
                    {/* Cierra el contenedor de acciones. */}
                    </div>
                {/* Cierra la tarjeta de archivo. */}
                </div>
            // Cierra el map de archivos.
            ))}
            {/* Crea el disparador visual que abre el input oculto. */}
            <div onClick={() => !isLoading && inputRef.current?.click()} className="w-24 h-24 border-2 border-dashed rounded flex items-center justify-center cursor-pointer">
                {/* Muestra loader durante la carga o texto para seleccionar cuando esta listo. */}
                {isLoading ? <InfinityLoader size="55" stroke="4" strokeLength="0.15" bgOpacity="0.1" speed="1.3" color="black" /> : <span className="text-blue-500 text-sm">Seleccionar</span>}
            {/* Cierra el disparador visual. */}
            </div>
            {/* Mantiene el input nativo oculto para usar el selector de archivos del navegador. */}
            <input ref={inputRef} type="file" hidden multiple={multiple} accept={accept} onChange={(event) => handleFiles(event.target.files)} />
        {/* Cierra el contenedor principal. */}
        </div>
    // Cierra el retorno JSX.
    );
// Cierra la funcion FileInput.
}

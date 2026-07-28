// Importa utilidades de TanStack Table para crear tabla, renderizar celdas, filtrar y paginar.
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
// Importa useState para controlar filtro global y paginacion.
import { useState } from "react";
// Importa Button desde shared para mantener botones consistentes.
import { Button } from "@/shared";
// Define una tabla reutilizable que recibe datos y configuracion de columnas.
export default function DataTable({
    // Recibe el arreglo de datos que se mostrara en filas.
    data,
    // Recibe la definicion de columnas compatible con TanStack Table.
    columns,
// Cierra la lista de propiedades.
}) {
    // Guarda el estado de paginacion controlado por el componente.
    const [pagination, setPagination] = useState({
        // Define que la primera pagina tiene indice cero.
        pageIndex: 0,
        // Define cinco filas por pagina como valor inicial.
        pageSize: 5,
    // Cierra el estado inicial de paginacion.
    });
    // Guarda el texto del filtro global usado por el buscador.
    const [globalFilter, setGlobalFilter] = useState("");
    // Crea la instancia de tabla con TanStack Table.
    const table = useReactTable({
        // Entrega los datos; si llegan null o undefined, usa arreglo vacio como respaldo.
        data: data ?? [],
        // Entrega las columnas; si llegan null o undefined, usa arreglo vacio.
        columns: columns ?? [],
        // Conecta los estados controlados de filtro y paginacion.
        state: { globalFilter, pagination },
        // Permite que TanStack actualice el estado de paginacion.
        onPaginationChange: setPagination,
        // Permite que TanStack actualice el filtro global.
        onGlobalFilterChange: setGlobalFilter,
        // Activa el modelo base de filas.
        getCoreRowModel: getCoreRowModel(),
        // Activa el modelo de filas filtradas.
        getFilteredRowModel: getFilteredRowModel(),
        // Activa el modelo de filas paginadas.
        getPaginationRowModel: getPaginationRowModel(),
    // Cierra la configuracion de la tabla.
    });
    // Devuelve la interfaz completa de tabla, filtros y paginacion.
    return (
        // Contenedor principal con separacion vertical entre toolbar, tabla y controles.
        <div className="space-y-4">
            {/* Barra superior con buscador y selector de cantidad de filas. */}
            <div className="flex items-center justify-between gap-4">
                {/* Input que actualiza el filtro global de la tabla. */}
                <input type="text" placeholder="Buscar..." value={globalFilter ?? ""} onChange={(event) => setGlobalFilter(event.target.value)} className="border rounded px-3 py-2 w-64" />
                {/* Select que cambia cuantas filas se muestran por pagina. */}
                <select value={table.getState().pagination.pageSize} onChange={(event) => table.setPageSize(Number(event.target.value))} className="border rounded px-2 py-2">
                    {/* Genera las opciones disponibles de tamano de pagina. */}
                    {[5, 7, 10, 20, 50].map((size) => (
                        // Crea una opcion por cada tamano disponible.
                        <option key={size} value={size}>{size} filas</option>
                    // Cierra el map de tamanos.
                    ))}
                {/* Cierra el select de cantidad de filas. */}
                </select>
            {/* Cierra la toolbar superior. */}
            </div>
            {/* Contenedor con borde que envuelve la tabla. */}
            <div className="border rounded overflow-visible">
                {/* Permite scroll horizontal en pantallas pequenas. */}
                <div className="overflow-x-auto">
                    {/* Tabla HTML principal. */}
                    <table className="w-full">
                        {/* Cabecera generada por TanStack Table. */}
                        <thead className="bg-gray-100">
                            {/* Recorre grupos de encabezados para soportar columnas agrupadas. */}
                            {table.getHeaderGroups().map((headerGroup) => (
                                // Crea una fila de encabezado por cada grupo.
                                <tr key={headerGroup.id}>
                                    {/* Recorre cada encabezado visible del grupo. */}
                                    {headerGroup.headers.map((header) => (
                                        // Crea una celda de encabezado.
                                        <th key={header.id} className="p-3 text-left border-b">
                                            {/* Renderiza texto, JSX o funcion definida en columnDef.header. */}
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                        {/* Cierra la celda de encabezado. */}
                                        </th>
                                    // Cierra el map de encabezados.
                                    ))}
                                {/* Cierra la fila de encabezado. */}
                                </tr>
                            // Cierra el map de grupos de encabezados.
                            ))}
                        {/* Cierra la cabecera. */}
                        </thead>
                        {/* Cuerpo de la tabla. */}
                        <tbody>
                            {/* Recorre las filas ya filtradas y paginadas por TanStack. */}
                            {table.getRowModel().rows.map((row) => (
                                // Crea una fila de datos.
                                <tr key={row.id} className="hover:bg-gray-50">
                                    {/* Recorre las celdas visibles de la fila. */}
                                    {row.getVisibleCells().map((cell) => (
                                        // Crea una celda y permite overflow visible si es columna de acciones.
                                        <td key={cell.id} className={`p-3 border-b ${cell.column.id === "actions" ? "relative overflow-visible" : ""}`}>
                                            {/* Renderiza el contenido definido en columnDef.cell. */}
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        {/* Cierra la celda de datos. */}
                                        </td>
                                    // Cierra el map de celdas.
                                    ))}
                                {/* Cierra la fila de datos. */}
                                </tr>
                            // Cierra el map de filas.
                            ))}
                        {/* Cierra el cuerpo de la tabla. */}
                        </tbody>
                    {/* Cierra la tabla. */}
                    </table>
                {/* Cierra el contenedor con scroll horizontal. */}
                </div>
            {/* Cierra el contenedor con borde. */}
            </div>
            {/* Footer de informacion y botones de paginacion. */}
            <div className="flex items-center justify-between">
                {/* Muestra cuantos registros se ven frente al total filtrado. */}
                <span className="text-sm text-gray-600">Mostrando {table.getRowModel().rows.length} de {table.getFilteredRowModel().rows.length} registros</span>
                {/* Agrupa los botones de paginacion. */}
                <div className="flex items-center gap-2">
                    {/* Boton para ir a la primera pagina. */}
                    <Button size="sm" variant="secondary" onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>Inicio</Button>
                    {/* Boton para ir a la pagina anterior. */}
                    <Button size="sm" variant="secondary" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>Anterior</Button>
                    {/* Texto que muestra pagina actual y total de paginas. */}
                    <span className="text-sm px-2">Pagina {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}</span>
                    {/* Boton para avanzar a la siguiente pagina. */}
                    <Button size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>Siguiente</Button>
                    {/* Boton para ir a la ultima pagina. */}
                    <Button size="sm" onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()}>Final</Button>
                {/* Cierra el grupo de botones de paginacion. */}
                </div>
            {/* Cierra el footer de paginacion. */}
            </div>
            {/* Bloque para saltar directamente a una pagina especifica. */}
            <div className="flex items-center gap-2 text-sm">
                {/* Texto descriptivo del input numerico. */}
                <span>Ir a pagina:</span>
                {/* Input numerico que convierte numero humano a indice interno basado en cero. */}
                <input type="number" defaultValue={table.getState().pagination.pageIndex + 1} onChange={(event) => { const page = event.target.value ? Number(event.target.value) - 1 : 0; table.setPageIndex(page); }} className="border rounded px-2 py-1 w-16" />
            {/* Cierra el bloque de salto de pagina. */}
            </div>
        {/* Cierra el contenedor principal. */}
        </div>
    // Cierra el retorno JSX.
    );
// Cierra la funcion DataTable.
}

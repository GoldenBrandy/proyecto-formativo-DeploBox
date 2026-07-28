// Componente reutilizable que muestra un switch para activar o desactivar estados
import { Switch } from "@/shared";

// Componente que contiene los botones de acciones (editar y eliminar) para cada material
import MaterialRowActions from "../components/MaterialRowActions";

// Definición de las columnas de la tabla de materiales
export const materialColumns = [
  // Columna ID
  {
    accessorKey: "id",
    header: "Id",
  },
  // Columna Nombre
  {
    accessorKey: "name",
    header: "Nombre",
  },
  // Columna Tipo (Devolutivo / Consumo)
  {
    accessorKey: "type",
    header: "Tipo",
  },
  // Columna Cantidad
  {
    accessorKey: "quantity",
    header: "Cantidad",
  },
  // Columna Estado (activo / inactivo)
  {
    accessorKey: "is_active",
    header: "Estado",
    // Render personalizado de la celda
    cell: ({ row }) => {
      // Se obtiene el objeto completo del material de la fila
      const material = row.original;

      // Función que se ejecuta cuando cambia el switch
      const handleChange = (value) => {
        // value representa el nuevo estado del switch (true o false)
        console.log("Actualizar estado material:", material.id, value);

        // Aquí normalmente se llamaría una API para actualizar el estado
        // updateMaterialStatus(material.id, value)
      };

      return <Switch checked={material.is_active} onChange={handleChange} />;
    },
  },
  // Columna de acciones (editar / eliminar)
  {
    id: "actions",
    // No usa accessorKey porque no corresponde a un campo del material
    cell: ({ row }) => <MaterialRowActions material={row.original} />,
  },
];

// Iconos usados en las acciones
import { EllipsisVertical, Eye, Pencil } from "lucide-react";

// Hook de React Router para navegar programáticamente entre rutas
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dropdown, DropdownTrigger, DropdownContent, DropdownItem, ViewDetailsModal } from "@/shared";

// Componente que renderiza las acciones de cada fila de material
// Recibe como prop el objeto material
export default function MaterialRowActions({ material }) {
  // Controla si el modal de "ver" esta abierto para este material.
  const [isViewOpen, setIsViewOpen] = useState(false);

  // Hook que permite redirigir a otra ruta desde código
  const navigate = useNavigate();

  // Acción para editar el material
  // Redirige a la página de edición usando el id del material
  const handleEdit = () => {
    navigate(`/dashboard/materiales/${material.id}/edit`);
  };

  // Acción para eliminar el material
  // Actualmente solo imprime en consola el id
  // En una aplicación real aquí se llamaría a la API
  const handleDelete = () => {
    console.log("Eliminar material", material.id);
  };

  const iconButtonClasses = "inline-flex h-9 w-9 items-center justify-center rounded-full text-neutral-600 transition-colors hover:bg-neutral-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300";

  return (
    <div className="flex items-center justify-end gap-1">
      <button type="button" aria-label="Ver material" onClick={() => setIsViewOpen(true)} className={iconButtonClasses}>
        <Eye size={18} />
      </button>

      <button type="button" aria-label="Editar material" onClick={handleEdit} className={iconButtonClasses}>
        <Pencil size={18} />
      </button>

      <Dropdown>
        <DropdownTrigger>
          <button type="button" aria-label="Acciones de material" className={iconButtonClasses}>
            <EllipsisVertical size={18} />
          </button>
        </DropdownTrigger>

        <DropdownContent>
          <DropdownItem onClick={handleEdit}>Editar</DropdownItem>
          <DropdownItem onClick={handleDelete}>Eliminar</DropdownItem>
        </DropdownContent>
      </Dropdown>

      <ViewDetailsModal
        isOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        title={material.name}
        fields={[
          { label: "Nombre", value: material.name },
          { label: "Tipo", value: material.type },
          { label: "Cantidad", value: material.quantity },
          { label: "Estado", value: material.is_active ? "Activo" : "Inactivo" },
        ]}
        onEdit={handleEdit}
      />
    </div>
  );
}

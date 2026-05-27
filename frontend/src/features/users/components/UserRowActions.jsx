// Iconos usados en las acciones
import { EllipsisVertical, Pencil } from "lucide-react";

// Hook de React Router para navegar programáticamente entre rutas
import { useNavigate } from "react-router-dom";

import { Dropdown, DropdownTrigger, DropdownContent, DropdownItem } from "@/shared";
// Componente que renderiza las acciones de cada fila de usuario
// Recibe como prop el objeto user
export default function UserRowActions({ user }) {
  // const handleEdit = () => {
  //   console.log("Editar usuario", user.id);
  // };

  // Hook que permite redirigir a otra ruta desde código
  const navigate = useNavigate();

  // Acción para editar el usuario
  // Redirige a la página de edición usando el id del usuario
  const handleEdit = () => {
    navigate(`/dashboard/users/${user.id}/edit`);
  };

  // Acción para eliminar el usuario
  // Actualmente solo imprime en consola el id
  // En una aplicación real aquí se llamaría a la API
  const handleDelete = () => {
    console.log("Eliminar usuario", user.id);
  };

  const iconButtonClasses =
    "inline-flex h-9 w-9 items-center justify-center rounded-full text-neutral-600 transition-colors hover:bg-neutral-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300";

  return (
    <div className="flex items-center justify-end gap-1">
      <button
        type="button"
        aria-label="Editar usuario"
        onClick={handleEdit}
        className={iconButtonClasses}
      >
        <Pencil size={18} />
      </button>

      <Dropdown>
        <DropdownTrigger>
          <button
            type="button"
            aria-label="Acciones de usuario"
            className={iconButtonClasses}
          >
            <EllipsisVertical size={18} />
          </button>
        </DropdownTrigger>

        <DropdownContent >
          <DropdownItem onClick={handleEdit}>
            Opcion 1
          </DropdownItem>
          <DropdownItem onClick={handleDelete}>
            Opcion 2
          </DropdownItem>
          <DropdownItem onClick={handleDelete}>
            Opcion 3
          </DropdownItem>
        </DropdownContent>
      </Dropdown>
    </div>
  );
}

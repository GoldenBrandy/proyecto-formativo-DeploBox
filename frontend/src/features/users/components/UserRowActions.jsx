// Iconos usados en las acciones

import { EllipsisVertical, Eye, Pencil } from "lucide-react";

// Hook de React Router para navegar programáticamente entre rutas

import { useState } from "react";
import { useNavigate } from "react-router-dom";
/* Importamos Dropdown, DropdownTrigger, DropdownContent, DropdownItem y ViewDetailsModal desde "@/shared". Esto permite usar esa pieza en este archivo sin volver a escribir su logica. */
import { Dropdown, DropdownTrigger, DropdownContent, DropdownItem, ViewDetailsModal } from "@/shared";
// Componente que renderiza las acciones de cada fila de usuario
// Recibe como prop el objeto user

export default
/* Esta funcion UserRowActions agrupa la logica de esta parte del proyecto. Recibe datos, los procesa y devuelve el resultado necesario. */
function UserRowActions({
  user
}) {
  // Controla si el modal de "ver" esta abierto para este usuario.

  const [isViewOpen, setIsViewOpen] = useState(false);

  // Hook que permite redirigir a otra ruta desde código

  const navigate = useNavigate();

  // Acción para editar el usuario
  // Redirige a la página de edición usando el id del usuario

  const handleEdit = () => {
    /* Llamamos a navigate para ejecutar una accion necesaria en este punto del flujo. */
    navigate(`/dashboard/users/${user.id}/edit`);
  };

  // Acción para eliminar el usuario
  // Actualmente solo imprime en consola el id
  // En una aplicación real aquí se llamaría a la API

  const handleDelete = () => {
    /* Escribimos informacion en consola con console.log; esto ayuda a revisar errores o datos durante el desarrollo. */
    console.log("Eliminar usuario", user.id);
  };
  /* Declaramos iconButtonClasses. Este valor se usa despues para mantener la logica ordenada y evitar repetir codigo. */
  const iconButtonClasses = "inline-flex h-9 w-9 items-center justify-center rounded-full text-neutral-600 transition-colors hover:bg-neutral-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300";
  /* Devolvemos la interfaz JSX que React pintara en pantalla. Aqui se conectan los datos y eventos con los componentes visuales. */
  return <div className="flex items-center justify-end gap-1">
       <button type="button" aria-label="Ver usuario" onClick={() => setIsViewOpen(true)} className={iconButtonClasses}>
         <Eye size={18} />
      </button>

       <button type="button" aria-label="Editar usuario" onClick={handleEdit} className={iconButtonClasses}>
         <Pencil size={18} />
      </button>

       <Dropdown>
         <DropdownTrigger>
           <button type="button" aria-label="Acciones de usuario" className={iconButtonClasses}>
             <EllipsisVertical size={18} />
          </button>
        </DropdownTrigger>

         <DropdownContent>
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

       <ViewDetailsModal
        isOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        title={user.name}
        fields={[
          { label: "Nombre", value: user.name },
          { label: "Email", value: user.email },
          { label: "Dirección", value: user.address },
          { label: "Tipo de documento", value: user.document_type },
          { label: "Número de documento", value: user.document_number },
        ]}
        onEdit={handleEdit}
      />
    </div>;
}

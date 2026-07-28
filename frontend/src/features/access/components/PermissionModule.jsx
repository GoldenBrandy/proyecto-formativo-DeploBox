// frontend/src/features/access/components/PermissionModule.jsx
// Corrección: se usa estado global desde AccessPage

import { Checkbox, Button, IconButton } from "@/shared";
/* Importamos Pencil desde "lucide-react". Esto permite usar esa pieza en este archivo sin volver a escribir su logica. */
import { Pencil } from "lucide-react";
/* Exportamos como valor principal de este archivo la funcion, pagina o configuracion que representa este modulo. */
export default
/* Esta funcion PermissionModule agrupa la logica de esta parte del proyecto. Recibe datos, los procesa y devuelve el resultado necesario. */
function PermissionModule({
  selectedGroupName,
  allPermissions,
  isEditing,
  permissionsDraft,
  setPermissionsDraft,
  onEdit,
  onCancel,
  onSave
}) {
  /* Definimos hasPermission como funcion. Esta funcion se usa como manejador, transformador o ayuda interna dentro del archivo. */
  const hasPermission = codename => {
    /* Devolvemos este valor para que la funcion entregue el resultado que otra parte del codigo necesita. */
    return permissionsDraft.some(permission => permission.permission_codename === codename);
  };
  /* Definimos handlePermissionChange como funcion. Esta funcion se usa como manejador, transformador o ayuda interna dentro del archivo. */
  const handlePermissionChange = (permission, checked) => {
    /* Validamos esta condicion para decidir que hacer. Si se cumple, manejamos un caso especial como error, dato faltante, permiso o estado deshabilitado. */
    if (!checked) {
      /* Actualizamos el estado usando setPermissionsDraft; esto hace que React vuelva a renderizar con el nuevo dato. */
      setPermissionsDraft(prev => prev.filter(item => item.permission_id !== permission.permission_id));
      /* Devolvemos este valor para que la funcion entregue el resultado que otra parte del codigo necesita. */
      return;
    }
    /* Actualizamos el estado usando setPermissionsDraft; esto hace que React vuelva a renderizar con el nuevo dato. */
    setPermissionsDraft(prev => [...prev, permission]);
  };

  // agrupar permisos por modulo

  const permissionsByModule = allPermissions.reduce((groupedPermissions, permission) => {
    /* Declaramos moduleName. Este valor se usa despues para mantener la logica ordenada y evitar repetir codigo. */
    const moduleName = permission.display_name || permission.model || permission.app_label || permission.content_type_id;

    // inicializa el arreglo si el modulo no existe

    if (!groupedPermissions[moduleName]) {
      /* Asignamos un nuevo valor para actualizar una estructura local antes de seguir procesando datos. */
      groupedPermissions[moduleName] = [];
    }
    /* Ejecutamos el objeto.push para usar una utilidad o metodo propio de ese objeto. */
    groupedPermissions[moduleName].push(permission); // agrega el permiso al modulo

    return groupedPermissions; // retorna el acumulador en cada interaccion
  }, {}); //objecto inicial

  return <section className="border rounded-lg p-6">
       <div className="flex items-center justify-between mb-6">
         <div>
           <p className="text-sm text-neutral-500">Grupo</p>

           <h2 className="text-lg font-semibold">
            {selectedGroupName || "Seleccione un grupo"}
          </h2>
        </div>

        {!isEditing && selectedGroupName && <IconButton ariaLabel="Editar permisos" onClick={onEdit}>
             <Pencil size={20} />
          </IconButton>}
      </div>

       <div className="space-y-8">
        {Object.entries(permissionsByModule).map(([moduleName, permissions]) => <div key={moduleName} className="border-b-2 pb-6">
               <h3 className="font-medium mb-4">Módulo {moduleName}</h3>

               <div className="flex flex-wrap gap-6">
                {permissions.map(permission => <Checkbox key={permission.permission_id} id={permission.permission_codename} name={permission.permission_codename} label={permission.permission_name} checked={hasPermission(permission.permission_codename)} disabled={!isEditing} onChange={e => handlePermissionChange(permission, e.target.checked)} />)}
              </div>
            </div>)}
      </div>

      {isEditing && <div className="flex justify-end gap-3 mt-8">
           <Button type="button" variant="secondary" onClick={onCancel}>
            Cancelar
          </Button>

           <Button type="button" variant="primary" onClick={onSave}>
            Guardar
          </Button>
        </div>}
    </section>;
}
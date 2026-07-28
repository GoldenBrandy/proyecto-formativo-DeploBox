// frontend/src/features/access/pages/AccessPage.jsx
// Corrección: el estado de edición pasa a AccessPage

import { useEffect, useState } from "react";
/* Importamos AccessSidebar desde "../../../shared/ui/AccessSidebar". Esto permite usar esa pieza en este archivo sin volver a escribir su logica. */
import AccessSidebar from "../../../shared/ui/AccessSidebar";
/* Importamos PermissionModule desde "../components/PermissionModule". Esto permite usar esa pieza en este archivo sin volver a escribir su logica. */
import PermissionModule from "../components/PermissionModule";
/* Importamos updateGroupPermissions desde "../services/groupService". Esto permite usar esa pieza en este archivo sin volver a escribir su logica. */
import { updateGroupPermissions } from "../services/groupService";
/* Importamos getAllPermissions desde "../services/permissionService". Esto permite usar esa pieza en este archivo sin volver a escribir su logica. */
import { getAllPermissions } from "../services/permissionService";
/* Exportamos como valor principal de este archivo la funcion, pagina o configuracion que representa este modulo. */
export default
/* Esta funcion AccessPage construye una pantalla completa. Aqui se preparan datos, eventos y componentes que vera el usuario. */
function AccessPage() {
  /* Creamos [selectedGroup, setSelectedGroup] con useState. Esto guarda un dato que puede cambiar y hace que React actualice la pantalla cuando se modifica. */
  const [selectedGroup, setSelectedGroup] = useState("");
  /* Creamos [selectedGroupName, setSelectedGroupName] con useState. Esto guarda un dato que puede cambiar y hace que React actualice la pantalla cuando se modifica. */
  const [selectedGroupName, setSelectedGroupName] = useState("");
  /* Creamos [groupPermissions, setGroupPermissions] con useState. Esto guarda un dato que puede cambiar y hace que React actualice la pantalla cuando se modifica. */
  const [groupPermissions, setGroupPermissions] = useState([]); //Estoy exportando el estado de permisos del grupo para poder usarlo en PermissionModule

  const [allPermissions, setAllPermissions] = useState([]); // Estado para almacenar todos los permisos disponibles

  const [isEditing, setIsEditing] = useState(false);
  /* Creamos [permissionsDraft, setPermissionsDraft] con useState. Esto guarda un dato que puede cambiar y hace que React actualice la pantalla cuando se modifica. */
  const [permissionsDraft, setPermissionsDraft] = useState([]);
  /* Creamos [isSaving, setIsSaving] con useState. Esto guarda un dato que puede cambiar y hace que React actualice la pantalla cuando se modifica. */
  const [isSaving, setIsSaving] = useState(false);
  /* Creamos [saveError, setSaveError] con useState. Esto guarda un dato que puede cambiar y hace que React actualice la pantalla cuando se modifica. */
  const [saveError, setSaveError] = useState("");
  /* Llamamos a useEffect para ejecutar una accion necesaria en este punto del flujo. */
  useEffect(() => {
    /* Actualizamos el estado usando setPermissionsDraft; esto hace que React vuelva a renderizar con el nuevo dato. */
    setPermissionsDraft(groupPermissions);
  }, [groupPermissions]);
  /* Llamamos a useEffect para ejecutar una accion necesaria en este punto del flujo. */
  useEffect(() => {
    /* Ejecutamos el objeto.catch para usar una utilidad o metodo propio de ese objeto. */
    getAllPermissions().then(setAllPermissions).catch(console.error);
  }, []);
  /* Definimos handleEdit como funcion. Esta funcion se usa como manejador, transformador o ayuda interna dentro del archivo. */
  const handleEdit = () => {
    /* Actualizamos el estado usando setSaveError; esto hace que React vuelva a renderizar con el nuevo dato. */
    setSaveError("");
    /* Actualizamos el estado usando setIsEditing; esto hace que React vuelva a renderizar con el nuevo dato. */
    setIsEditing(true);
  };
  /* Definimos handleCancel como funcion. Esta funcion se usa como manejador, transformador o ayuda interna dentro del archivo. */
  const handleCancel = () => {
    /* Actualizamos el estado usando setPermissionsDraft; esto hace que React vuelva a renderizar con el nuevo dato. */
    setPermissionsDraft(groupPermissions);
    /* Actualizamos el estado usando setSaveError; esto hace que React vuelva a renderizar con el nuevo dato. */
    setSaveError("");
    /* Actualizamos el estado usando setIsEditing; esto hace que React vuelva a renderizar con el nuevo dato. */
    setIsEditing(false);
  };
  /* Definimos handleSave como funcion. Esta funcion se usa como manejador, transformador o ayuda interna dentro del archivo. */
  const handleSave = async () => {
    /* Declaramos permissionCodenames. Este valor se usa despues para mantener la logica ordenada y evitar repetir codigo. */
    const permissionCodenames = permissionsDraft.map(permission => permission.permission_codename);
    /* Intentamos ejecutar una operacion que puede fallar, como guardar datos, consultar la API o generar un reporte. */
    try {
      /* Actualizamos el estado usando setIsSaving; esto hace que React vuelva a renderizar con el nuevo dato. */
      setIsSaving(true);
      /* Actualizamos el estado usando setSaveError; esto hace que React vuelva a renderizar con el nuevo dato. */
      setSaveError("");
      /* Declaramos response. Este valor se usa despues para mantener la logica ordenada y evitar repetir codigo. */
      const response = await updateGroupPermissions(selectedGroup, permissionCodenames);
      /* Actualizamos el estado usando setGroupPermissions; esto hace que React vuelva a renderizar con el nuevo dato. */
      setGroupPermissions(response.permissions);
      /* Actualizamos el estado usando setIsEditing; esto hace que React vuelva a renderizar con el nuevo dato. */
      setIsEditing(false);
    } /* Capturamos el error para mostrar un mensaje, limpiar estados o evitar que la aplicacion se rompa por completo. */catch (error) {
      /* Actualizamos el estado usando setSaveError; esto hace que React vuelva a renderizar con el nuevo dato. */
      setSaveError(error.message);
    } finally {
      /* Actualizamos el estado usando setIsSaving; esto hace que React vuelva a renderizar con el nuevo dato. */
      setIsSaving(false);
    }
  };
  /* Devolvemos la interfaz JSX que React pintara en pantalla. Aqui se conectan los datos y eventos con los componentes visuales. */
  return <div className="mx-auto w-full max-w-[1500px] p-4 sm:p-6 lg:p-8">
       <div className="grid min-w-0 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,380px)] lg:items-start lg:gap-8">
         <AccessSidebar selectedGroup={selectedGroup} setSelectedGroup={setSelectedGroup} setSelectedGroupName={setSelectedGroupName} setGroupPermissions={setGroupPermissions} />

         <div className="min-w-0">
           <h1 className="mb-4 text-2xl font-semibold text-slate-900">
            Gestión de permisos
          </h1>

           <PermissionModule selectedGroupName={selectedGroupName} isEditing={isEditing} allPermissions={allPermissions} permissionsDraft={permissionsDraft} setPermissionsDraft={setPermissionsDraft} onEdit={handleEdit} onCancel={handleCancel} onSave={handleSave} isSaving={isSaving} saveError={saveError} />
        </div>
      </div>
    </div>;
}
// Importa hooks de React para cargar datos, memorizar opciones y manejar estado local.
import { useEffect, useMemo, useState } from "react";
// Importa Select desde shared para mantener el mismo control visual del proyecto.
import { Select } from "@/shared";
// Importa el servicio que consulta los grupos disponibles.
import { getGroups } from "@/features/access/services/groupService";
// Importa el servicio que consulta permisos asociados a un grupo.
import { getGroupPermissions } from "@/features/access/services/permissionService";
// Define la barra lateral que permite escoger grupo o usuario individual.
export default function AccessSidebar({
    // Recibe el id del grupo seleccionado desde AccessPage.
    selectedGroup,
    // Recibe el setter para actualizar el grupo seleccionado en AccessPage.
    setSelectedGroup,
    // Recibe el setter para actualizar el nombre visible del grupo seleccionado.
    setSelectedGroupName,
    // Recibe el setter para enviar permisos del grupo hacia AccessPage y PermissionModule.
    setGroupPermissions,
// Cierra la lista de propiedades del componente.
}) {
    // Guarda el usuario individual seleccionado dentro de esta barra lateral.
    const [userId, setUserId] = useState("");
    // Guarda la lista de grupos cargados desde el backend.
    const [groups, setGroups] = useState([]);
    // Carga los grupos una sola vez cuando el componente se monta.
    useEffect(() => {
        // Llama al servicio de grupos y normaliza la respuesta a arreglo.
        getGroups()
            // Guarda los grupos solo si la respuesta es un arreglo.
            .then((data) => setGroups(Array.isArray(data) ? data : []))
            // Muestra errores de carga en consola sin romper la pantalla.
            .catch(console.error);
    // El arreglo vacio hace que este efecto corra solo al montar.
    }, []);
    // Convierte los grupos del backend al formato que espera el componente Select.
    const groupOptions = useMemo(
        // Crea una opcion inicial y concatena los grupos reales.
        () => [
            // Opcion vacia que obliga al usuario a elegir.
            { value: "", label: "Seleccione una opcion" },
            // Convierte cada grupo en value y label para el select.
            ...groups.map((group) => ({
                // Convierte group_id a string porque los valores de select llegan como texto.
                value: String(group.group_id),
                // Usa group_name como texto visible.
                label: group.group_name,
            // Cierra el objeto de opcion.
            })),
        // Cierra el arreglo de opciones.
        ],
        // Recalcula opciones solo cuando cambia groups.
        [groups],
    );
    // Define opciones estaticas de usuarios individuales como en el proyecto original.
    const userOptions = [
        // Opcion vacia inicial.
        { value: "", label: "Seleccione una opcion" },
        // Usuario de ejemplo con id 10.
        { value: "10", label: "Sebastian Arce" },
        // Usuario de ejemplo con id 11.
        { value: "11", label: "Sofia Valencia" },
        // Usuario de ejemplo con id 12.
        { value: "12", label: "Jose Marin" },
    // Cierra el arreglo de usuarios.
    ];
    // Define clases compartidas para ambos selects.
    const selectClassName = "h-12 w-full rounded-md border border-slate-300 bg-white px-4 text-base text-slate-500 shadow-sm outline-none transition focus:border-slate-500 focus:ring-0";
    // Maneja el cambio del select de grupos y centraliza la logica que antes estaba duplicada.
    const handleGroupChange = async (event) => {
        // Extrae el id del grupo seleccionado desde el evento del select.
        const groupId = event.target.value;
        // Busca los datos completos del grupo para obtener su nombre.
        const selectedGroupData = groups.find((group) => String(group.group_id) === groupId);
        // Actualiza el id del grupo seleccionado en el estado del padre.
        setSelectedGroup(groupId);
        // Actualiza el nombre visible del grupo en el estado del padre.
        setSelectedGroupName(selectedGroupData?.group_name ?? "");
        // Limpia el usuario individual porque se esta trabajando por grupo.
        setUserId("");
        // Si el usuario selecciona la opcion vacia, limpia permisos y termina.
        if (!groupId) {
            // Limpia los permisos del grupo en la pantalla principal.
            setGroupPermissions([]);
            // Detiene la ejecucion para no consultar permisos sin id.
            return;
        // Cierra la condicion de grupo vacio.
        }
        // Intenta consultar los permisos del grupo seleccionado.
        try {
            // Espera la respuesta del servicio de permisos por grupo.
            const permissions = await getGroupPermissions(groupId);
            // Envia los permisos consultados al estado del padre.
            setGroupPermissions(Array.isArray(permissions) ? permissions : []);
        // Captura errores de red o backend.
        } catch (error) {
            // Muestra el error en consola para depuracion.
            console.error(error);
            // Limpia permisos para no dejar datos viejos visibles.
            setGroupPermissions([]);
        // Cierra el bloque catch.
        }
    // Cierra handleGroupChange.
    };
    // Maneja el cambio del select de usuario individual.
    const handleUserChange = (event) => {
        // Actualiza el usuario individual seleccionado.
        setUserId(event.target.value);
        // Limpia el grupo porque se esta cambiando a seleccion individual.
        setSelectedGroup("");
        // Limpia el nombre del grupo seleccionado.
        setSelectedGroupName("");
        // Limpia permisos de grupo porque ya no hay grupo activo.
        setGroupPermissions([]);
    // Cierra handleUserChange.
    };
    // Devuelve la barra lateral con los dos selects.
    return (
        // Crea el contenedor lateral con borde, fondo blanco translucido y separacion vertical.
        <aside className="min-w-0 space-y-8 rounded-xl border border-slate-200/80 bg-white/85 p-5 shadow-sm backdrop-blur-sm sm:p-6">
            {/* Agrupa el selector de grupos. */}
            <section>
                {/* Titulo visible del bloque de grupos. */}
                <h2 className="mb-3 text-lg font-semibold text-slate-800">Grupos usuarios</h2>
                {/* Renderiza el select de grupos usando opciones cargadas desde el backend. */}
                <Select name="groupId" value={selectedGroup} onChange={handleGroupChange} options={groupOptions} className={selectClassName} />
            {/* Cierra la seccion de grupos. */}
            </section>
            {/* Agrupa el selector de usuario individual. */}
            <section>
                {/* Titulo visible del bloque de usuario individual. */}
                <h2 className="mb-3 text-lg font-semibold text-slate-800">Usuario individual</h2>
                {/* Renderiza el select de usuarios estaticos. */}
                <Select name="userId" value={userId} onChange={handleUserChange} options={userOptions} className={selectClassName} />
            {/* Cierra la seccion de usuario individual. */}
            </section>
        {/* Cierra el aside principal. */}
        </aside>
    // Cierra el retorno JSX.
    );
// Cierra la funcion AccessSidebar.
}

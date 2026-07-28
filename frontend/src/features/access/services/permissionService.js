/* Declaramos GROUPS_API_URL. Este valor se usa despues para mantener la logica ordenada y evitar repetir codigo. */
const GROUPS_API_URL = "http://localhost:4000/api/groups";
/* Declaramos PERMISSIONS_API_URL. Este valor se usa despues para mantener la logica ordenada y evitar repetir codigo. */
const PERMISSIONS_API_URL = "http://localhost:4000/api/permissions";
/* Exportamos esta constante o funcion con nombre para que otros archivos puedan reutilizarla de forma clara. */
export
/* Esta funcion getGroupPermissions consulta informacion y la devuelve lista para que la interfaz pueda usarla. */
async function getGroupPermissions(groupId) {
  /* Declaramos response. Este valor se usa despues para mantener la logica ordenada y evitar repetir codigo. */
  const response = await fetch(`${GROUPS_API_URL}/${groupId}/permissions`);
  /* Validamos esta condicion para decidir que hacer. Si se cumple, manejamos un caso especial como error, dato faltante, permiso o estado deshabilitado. */
  if (!response.ok) {
    throw new Error("Error al obtener los permisos del grupo");
  }
  /* Devolvemos este valor para que la funcion entregue el resultado que otra parte del codigo necesita. */
  return response.json();
}
/* Exportamos esta constante o funcion con nombre para que otros archivos puedan reutilizarla de forma clara. */
export
/* Esta funcion getAllPermissions consulta informacion y la devuelve lista para que la interfaz pueda usarla. */
async function getAllPermissions() {
  /* Declaramos response. Este valor se usa despues para mantener la logica ordenada y evitar repetir codigo. */
  const response = await fetch(PERMISSIONS_API_URL);
  /* Validamos esta condicion para decidir que hacer. Si se cumple, manejamos un caso especial como error, dato faltante, permiso o estado deshabilitado. */
  if (!response.ok) {
    throw new Error("Error al obtener todos los permisos");
  }
  /* Devolvemos este valor para que la funcion entregue el resultado que otra parte del codigo necesita. */
  return response.json();
}
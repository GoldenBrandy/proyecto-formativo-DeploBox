/* Declaramos API_URL. Este valor se usa despues para mantener la logica ordenada y evitar repetir codigo. */
const API_URL = "http://localhost:4000/api/groups";
/* Exportamos esta constante o funcion con nombre para que otros archivos puedan reutilizarla de forma clara. */
export
/* Esta funcion getGroups consulta informacion y la devuelve lista para que la interfaz pueda usarla. */
async function getGroups() {
  /* Declaramos response. Este valor se usa despues para mantener la logica ordenada y evitar repetir codigo. */
  const response = await fetch(API_URL);
  /* Validamos esta condicion para decidir que hacer. Si se cumple, manejamos un caso especial como error, dato faltante, permiso o estado deshabilitado. */
  if (!response.ok) {
    throw new Error("Error obteniendo grupos");
  }
  /* Devolvemos este valor para que la funcion entregue el resultado que otra parte del codigo necesita. */
  return response.json();
}
/* Exportamos esta constante o funcion con nombre para que otros archivos puedan reutilizarla de forma clara. */
export
/* Esta funcion updateGroupPermissions agrupa la logica de esta parte del proyecto. Recibe datos, los procesa y devuelve el resultado necesario. */
async function updateGroupPermissions(groupId, permissionCodenames) {
  /* Declaramos token. Este valor se usa despues para mantener la logica ordenada y evitar repetir codigo. */
  const token = localStorage.getItem("token");
  /* Declaramos response. Este valor se usa despues para mantener la logica ordenada y evitar repetir codigo. */
  const response = await fetch(`${API_URL}/${groupId}/permissions`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    // Agregar el token de autorización en el encabezado

    body: JSON.stringify({
      permissions: permissionCodenames
    })
  });
  // la diferencia entre put y patch, patch lo que hace es actualizar parcialmente un recurso, mientras que put reemplaza completamente el recurso con la nueva representación proporcionada. En este caso, estamos actualizando los permisos de un grupo, por lo que tiene sentido usar put para reemplazar la lista completa de permisos del grupo con la nueva lista proporcionada en el cuerpo de la solicitud.

  if (!response.ok) {
    /* Declaramos data. Este valor se usa despues para mantener la logica ordenada y evitar repetir codigo. */
    const data = await response.json().catch(() => ({}));
    throw new Error(data.error || "Error actualizando permisos del grupo");
  }
  /* Devolvemos este valor para que la funcion entregue el resultado que otra parte del codigo necesita. */
  return response.json();
}
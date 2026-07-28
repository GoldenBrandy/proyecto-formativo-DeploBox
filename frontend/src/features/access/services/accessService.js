/* Declaramos API_URL. Este valor se usa despues para mantener la logica ordenada y evitar repetir codigo. */
const API_URL = 'http://localhost:4000/api/access';
/* Exportamos esta constante o funcion con nombre para que otros archivos puedan reutilizarla de forma clara. */
export
/* Esta funcion hasPermission agrupa la logica de esta parte del proyecto. Recibe datos, los procesa y devuelve el resultado necesario. */
async function hasPermission(permissionCode) {
  /* Declaramos token. Este valor se usa despues para mantener la logica ordenada y evitar repetir codigo. */
  const token = sessionStorage.getItem('token');
  /* Declaramos response. Este valor se usa despues para mantener la logica ordenada y evitar repetir codigo. */
  const response = await fetch(`${API_URL}/check/${permissionCode}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  /* Validamos esta condicion para decidir que hacer. Si se cumple, manejamos un caso especial como error, dato faltante, permiso o estado deshabilitado. */
  if (!response.ok) {
    throw new Error('Error verificando permiso');
  }
  /* Devolvemos este valor para que la funcion entregue el resultado que otra parte del codigo necesita. */
  return response.json();
}
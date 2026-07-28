/* Importamos dataDocumentos desde "../data/documentTypes.json". Esto permite usar esa pieza en este archivo sin volver a escribir su logica. */
import dataDocumentos from "../data/documentTypes.json";
/* Exportamos esta constante o funcion con nombre para que otros archivos puedan reutilizarla de forma clara. */
export
/* Esta funcion getDocumentTypes consulta informacion y la devuelve lista para que la interfaz pueda usarla. */
async function getDocumentTypes() {
  /* Devolvemos este valor para que la funcion entregue el resultado que otra parte del codigo necesita. */
  return dataDocumentos;
}
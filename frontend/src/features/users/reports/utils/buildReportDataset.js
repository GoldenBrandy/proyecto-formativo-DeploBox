//Función utilitaria para construir el dataset de un reporte (tabla)
//Patrón: transformación de datos (input -> output listo para exportar)

export
/* Esta funcion buildReportDataset agrupa la logica de esta parte del proyecto. Recibe datos, los procesa y devuelve el resultado necesario. */
function buildReportDataset({
  users,
  //Array de usuarios origen

  selectedFields,
  //Campos seleccionados para el reporte [{ key, label }]

  scope,
  //Alcance del reporte (ej: "all", "active", "inactive, "document")

  documentNumber //Número de documento para filtrar (si aplica)
}) {
  // Copia inmutable del array original (evita mutaciones)

  let filteredUsers = [...users];

  // Filtor por alcance: si es por documento se aplica el filtro correspondiente

  if (scope === "document" && documentNumber) {
    /* Asignamos un nuevo valor para actualizar una estructura local antes de seguir procesando datos. */
    filteredUsers = filteredUsers.filter(user => user.document_number === documentNumber);
  }
  // Construcción de encabezados del reporte
  // Se toma el label de cada campo seleccionado

  const headers = selectedFields.map(field => field.label);
  // Construcción de filas del reporte
  // Cada usuario se transforma en un array de valores según los campos seleccionados

  const rows = filteredUsers.map(user => selectedFields.map(field => {
    /* Declaramos value. Este valor se usa despues para mantener la logica ordenada y evitar repetir codigo. */
    const value = user[field.key]; //Acceso dinámico a la propiedad

    //Normalización: evita undefined/null en el reporte

    return value ?? "";
  }));
  // Retorno del dataset listo para exportar

  return {
    headers,
    rows
  };
}
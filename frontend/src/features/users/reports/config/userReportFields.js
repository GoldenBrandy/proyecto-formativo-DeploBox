/* Exportamos esta constante o funcion con nombre para que otros archivos puedan reutilizarla de forma clara. */
export
/* Creamos userReportFields como arreglo. Sirve para guardar listas de rutas, campos, usuarios, permisos u opciones. */
const userReportFields = [{
  key: "name",
  label: "Nombre",
  default: true
}, {
  key: "email",
  label: "Correo electrónico",
  default: true
}, {
  key: "document_type",
  label: "Tipo de documento",
  default: true
}, {
  key: "document_number",
  label: "Número de documento",
  default: true
}, {
  key: "phone",
  label: "Teléfono",
  default: false
}, {
  key: "address",
  label: "Dirección",
  default: false
}];
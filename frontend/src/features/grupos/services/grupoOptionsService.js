// Opciones estaticas para los selects del formulario de grupos.
// Son listas simples y faciles de editar; no dependen de un backend todavia.

export async function getGroupTypeOptions() {
  return [
    { id: "administrativo", label: "Administrativo" },
    { id: "academico", label: "Académico" },
    { id: "operativo", label: "Operativo" },
    { id: "proyecto", label: "Proyecto" },
  ];
}

export async function getPermissionsScopeOptions() {
  return [
    { id: "lectura", label: "Solo lectura" },
    { id: "escritura", label: "Lectura y escritura" },
    { id: "total", label: "Control total" },
  ];
}

export async function getLevelOptions() {
  return [
    { id: "basico", label: "Básico" },
    { id: "intermedio", label: "Intermedio" },
    { id: "avanzado", label: "Avanzado" },
  ];
}

// Opciones estaticas para los selects del formulario de productos.
// Son listas simples y faciles de editar; no dependen de un backend todavia.

export async function getProductTypeOptions() {
  return [
    { id: "equipo", label: "Equipo" },
    { id: "consumible", label: "Consumible" },
    { id: "herramienta", label: "Herramienta" },
    { id: "insumo", label: "Insumo" },
  ];
}

export async function getCategoryOptions() {
  return [
    { id: "tecnologia", label: "Tecnología" },
    { id: "oficina", label: "Oficina" },
    { id: "laboratorio", label: "Laboratorio" },
    { id: "mantenimiento", label: "Mantenimiento" },
  ];
}

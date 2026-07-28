// Tipos de material disponibles para el select del formulario.
// Coinciden con las opciones del dropdown "Inicio" del Navbar.
export async function getMaterialTypes() {
  return [
    { label: "Material Devolutivo", value: "Devolutivo" },
    { label: "Material de Consumo", value: "Consumo" },
  ];
}

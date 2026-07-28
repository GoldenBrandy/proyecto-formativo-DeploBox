// data/materiales/materiales.js

export const materiales = [
  { id: 1, name: "Martillo", type: "Devolutivo", quantity: 12, is_active: true },
  { id: 2, name: "Taladro percutor", type: "Devolutivo", quantity: 6, is_active: true },
  { id: 3, name: "Guantes de nitrilo", type: "Consumo", quantity: 200, is_active: true },
  { id: 4, name: "Casco de seguridad", type: "Devolutivo", quantity: 15, is_active: true },
  { id: 5, name: "Cinta aislante", type: "Consumo", quantity: 80, is_active: true },
  { id: 6, name: "Tijeras industriales", type: "Devolutivo", quantity: 10, is_active: false },
  { id: 7, name: "Papel lija", type: "Consumo", quantity: 150, is_active: true },
  { id: 8, name: "Multímetro digital", type: "Devolutivo", quantity: 5, is_active: true },
  { id: 9, name: "Tapabocas desechables", type: "Consumo", quantity: 500, is_active: true },
  { id: 10, name: "Escuadra metálica", type: "Devolutivo", quantity: 8, is_active: true },
];

// Busca un material por id; se usa para precargar el formulario de edicion.
export function getMaterialById(id) {
  return materiales.find((material) => String(material.id) === String(id));
}

// Actualiza un material existente directamente en el mock (no hay backend todavia).
export function updateMaterialInStore(id, changes) {
  const index = materiales.findIndex((material) => String(material.id) === String(id));
  if (index === -1) return null;
  materiales[index] = { ...materiales[index], ...changes, id: materiales[index].id };
  return materiales[index];
}

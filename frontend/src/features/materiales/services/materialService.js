// URL base del endpoint de materiales en el backend
// En desarrollo apunta al servidor Express local
// En producción debería provenir de variables de entorno
const API_URL = "http://localhost:4000/api/materiales";

// Función para crear un material en el backend
// Recibe un objeto con los datos del material
// Retorna la respuesta JSON del servidor
export async function createMaterial(materialData) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(materialData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Error al crear material");
  }

  return response.json();
}

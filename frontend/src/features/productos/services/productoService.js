// URL base del endpoint de productos en el backend.
// Sigue el mismo patron que userService.js/materialService.js.
const API_URL = "http://localhost:4000/api/productos";

export async function createProducto(productoData) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productoData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Error al crear el producto");
  }

  return response.json();
}

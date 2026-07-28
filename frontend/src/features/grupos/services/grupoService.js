// URL base del endpoint de grupos en el backend.
// Sigue el mismo patron que userService.js/materialService.js.
const API_URL = "http://localhost:4000/api/grupos";

export async function createGrupo(grupoData) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(grupoData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Error al crear el grupo");
  }

  return response.json();
}

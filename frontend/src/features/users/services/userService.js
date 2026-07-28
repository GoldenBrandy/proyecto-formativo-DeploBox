// URL base del endpoint de usuarios en el backend
// En desarrollo apunta al servidor Express local
// En producción debería provenir de variables de entorno

const API_URL = "http://localhost:4000/api/users";

// Función para crear un usuario en el backend
// Recibe un objeto con los datos del usuario
// Retorna la respuesta JSON del servidor

export
/* Esta funcion createUser agrupa la logica de esta parte del proyecto. Recibe datos, los procesa y devuelve el resultado necesario. */
async function createUser(userData) {
  // Realizamos la petición HTTP usando fetch

  const response = await fetch(API_URL, {
    // Método HTTP según convención REST

    method: "POST",
    // Cabeceras de la petición
    // Indicamos que enviamos JSON

    headers: {
      "Content-Type": "application/json"
    },
    // Convertimos el objeto userData a JSON

    body: JSON.stringify(userData)
  });

  // Verificamos si la respuesta NO fue exitosa (status != 2xx)

  if (!response.ok) {
    // Leemos el cuerpo de la respuesta de error

    const error = await response.json();

    // Lanzamos una excepción con el mensaje de error
    // Esto permite que el componente que llama maneje el error con try/catch
    throw new Error(error.error || "Error al crear usuario");
  }

  // Si la petición fue exitosa, retornamos la respuesta parseada como JSON

  return response.json();
}

// Función para obtener un usuario existente por id
// Se usa para precargar el formulario de edición con sus datos actuales

export
async function getUserById(userId) {
  const response = await fetch(`${API_URL}/${userId}`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Error al obtener el usuario");
  }

  return response.json();
}

// Función para actualizar un usuario existente
// Recibe el id del usuario y un objeto con los datos a actualizar

export
async function updateUser(userId, userData) {
  const response = await fetch(`${API_URL}/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userData)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Error al actualizar el usuario");
  }

  return response.json();
}

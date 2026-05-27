// Importamos el repositorio de usuarios.
// El service depende del repository para acceder a la persistencia,
// pero el repository NO debe conocer el service.
import { userRepository } from "./user.repository.js";


// Exportamos el servicio de usuarios.
// El service representa la capa de lógica de negocio de la aplicación.
export const userService = {


  // Método encargado de crear un usuario
  // Recibe datos provenientes del controller,
  // idealmente ya validados a nivel estructural (DTO / schema)
  async createUser(data) {


    // En este punto, en una arquitectura real, deberían ocurrir:
    // - Validaciones de reglas de negocio
    // - Transformaciones (ej: hash de contraseña)
    // - Verificaciones de unicidad (email, documento, etc.)
    // - Decisiones de negocio (roles, flags, estados iniciales)


    // Actualmente, el método solo delega directamente al repository,
    // sin agregar ninguna lógica adicional.
    return await userRepository.create(data);
  },
};

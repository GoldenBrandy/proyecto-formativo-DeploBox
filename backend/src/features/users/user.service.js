// Importamos el repositorio de usuarios.
// El service depende del repository para acceder a la persistencia,
// pero el repository NO debe conocer el service.
import { userRepository } from "./user.repository.js";
import bcrypt from "bcrypt";


// Convierte el id de grupo recibido del frontend (string o numero) a un entero o null.
function toGroupId(value) {
  if (value === undefined || value === null || value === "") return null;
  const parsed = Number(value);
  return Number.isNaN(parsed) ? null : parsed;
}


// Convierte el "Estado" (activo/inactivo) del frontend al booleano is_active.
function toIsActive(status, fallback) {
  if (status === undefined) return fallback;
  return status === "activo";
}


// Exportamos el servicio de usuarios.
// El service representa la capa de lógica de negocio de la aplicación.
export const userService = {


  // Método encargado de crear un usuario
  // Recibe datos provenientes del controller,
  // idealmente ya validados a nivel estructural (DTO / schema)
  async createUser(data) {
    const plainPassword = data.userPassword ?? data.password;

    if (!plainPassword) {
      throw new Error("La contrasena es obligatoria");
    }

    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    // Traduce el payload que envia el formulario de registro (firstName, group, status, ...)
    // al contrato que espera el repository (name, groupId, isActive, ...).
    const userData = {
      name: data.name ?? data.firstName,
      middleName: data.middleName,
      lastName1: data.lastName1,
      lastName2: data.lastName2,
      userEmail: data.userEmail,
      institutionalEmail: data.institutionalEmail,
      phone: data.phone,
      documentType: data.documentType,
      documentNumber: data.documentNumber,
      groupId: toGroupId(data.group ?? data.groupId),
      address: data.address,
      startDate: data.startDate || null,
      endDate: data.endDate || null,
      userPassword: hashedPassword,
      avatarUrl: data.avatarUrl ?? null,
      isStaff: data.isStaff ?? false,
      isActive: toIsActive(data.status, data.isActive ?? true),
      isSuperUser: data.isSuperUser ?? false,
    };

    // Actualmente, el método solo delega directamente al repository,
    // sin agregar ninguna lógica adicional.
    return userRepository.create(userData);
  },


  // Busca un usuario existente para precargar el formulario de edicion.
  async getUserById(id) {
    const user = await userRepository.findById(id);

    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    return user;
  },


  // Actualiza un usuario existente.
  // La contrasena solo se rehashea y se guarda si el usuario escribio una nueva.
  async updateUser(id, data) {
    const userData = {
      name: data.name ?? data.firstName,
      middleName: data.middleName,
      lastName1: data.lastName1,
      lastName2: data.lastName2,
      userEmail: data.userEmail,
      institutionalEmail: data.institutionalEmail,
      phone: data.phone,
      documentType: data.documentType,
      documentNumber: data.documentNumber,
      groupId: toGroupId(data.group ?? data.groupId),
      address: data.address,
      startDate: data.startDate || null,
      endDate: data.endDate || null,
      isActive: toIsActive(data.status, true),
    };

    const plainPassword = data.userPassword ?? data.password;
    if (plainPassword) {
      userData.userPassword = await bcrypt.hash(plainPassword, 10);
    }

    const updated = await userRepository.update(id, userData);

    if (!updated) {
      throw new Error("Usuario no encontrado");
    }

    return updated;
  },
};

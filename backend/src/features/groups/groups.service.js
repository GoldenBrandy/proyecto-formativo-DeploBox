import { groupsRepository } from "./groups.repository.js";

export const groupsService = {
    async getAll() {
        return await groupsRepository.getAll();
    },

    async getPermissionsByGroupId(groupId) {
        return await groupsRepository.getPermissionsByGroupId(groupId);
    },

    async updatePermissions(groupId, permissionCodenames) {
        const uniqueCodenames = [...new Set(permissionCodenames)];
        return await groupsRepository.updatePermissions(groupId, uniqueCodenames);
    }
};

// La funcion de este servicio es manejar la logica de negocio relacionada con los grupos y sus permisos. Se encarga de interactuar con el repositorio de grupos para obtener todos los grupos, obtener los permisos asociados a un grupo especifico y actualizar los permisos de un grupo.

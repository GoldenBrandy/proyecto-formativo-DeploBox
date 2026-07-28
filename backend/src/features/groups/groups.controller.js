import { groupsService } from "./groups.service.js";

export const groupsController = {
  async getAll(req, res) {
    try {
      const groups = await groupsService.getAll();

      res.json(groups);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        error: "Error al obtener los grupos",
      });
    }
  },

  // Permisos de Grupo
  async getPermissionsByGroupId(req, res) {
    try {
      const groupId = Number(req.params.groupId);

      if (Number.isNaN(groupId)) {
        return res.status(400).json({
          error: "El ID del grupo no es válido",
        });
      }

      const permissions = await groupsService.getPermissionsByGroupId(groupId);
      res.json(permissions);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "Error al obtener los permisos del grupo",
      });
    }
  },

  async updatePermissions(req, res) {
    try {
      const groupId = Number(req.params.groupId);
      const { permissions } = req.body;

      if (!Number.isInteger(groupId) || groupId <= 0) {
        return res.status(400).json({
          error: "El ID del grupo no es válido",
        });
      }

      if (
        !Array.isArray(permissions) ||
        permissions.some((permission) => typeof permission !== "string")
      ) {
        return res.status(400).json({
          error: "Los permisos deben ser una lista de códigos",
        });
      }

      const updatedPermissions = await groupsService.updatePermissions(
        groupId,
        permissions,
      );

      res.status(200).json({
        message: "Permisos actualizados correctamente",
        permissions: updatedPermissions,
      });
    } catch (error) {
      console.error(error);
      res.status(error.statusCode ?? 500).json({
        error: error.message || "Error al actualizar los permisos del grupo",
      });
    }
  },
};

import { z } from "zod";

export const grupoSchema = z.object({
  groupName: z.string().min(1, "El nombre del grupo es obligatorio").max(80, "El nombre es demasiado largo"),
  groupCode: z.string().min(1, "El código de grupo es obligatorio").max(30, "El código es demasiado largo"),
  groupType: z.string().min(1, "Debe seleccionar un tipo de grupo"),
  groupLeader: z.string().min(1, "Debe seleccionar un líder de grupo"),
  groupMembers: z.string().min(1, "Debe ingresar al menos un integrante"),
  permissionsScope: z.string().min(1, "Debe seleccionar un alcance de permisos"),
  level: z.string().min(1, "Debe seleccionar un nivel"),
  status: z.string().min(1, "Debe seleccionar un estado"),
  description: z.string().max(300, "La descripción es demasiado larga").optional(),
});

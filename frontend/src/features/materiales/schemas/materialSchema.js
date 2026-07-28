import { z } from "zod";

export const materialSchema = z.object({
  materialName: z.string().min(3, "El nombre debe tener al menos 3 caracteres").max(60, "El nombre es demasiado largo"),
  materialType: z.string().min(1, "Debe seleccionar un tipo de material"),
  materialQuantity: z.coerce.number({ invalid_type_error: "La cantidad debe ser un número" }).min(0, "La cantidad no puede ser negativa"),
  materialDescription: z.string().max(200, "La descripción es demasiado larga").optional(),
  isActive: z.boolean(),
});

import { z } from "zod";

export const productoSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio").max(80, "El nombre es demasiado largo"),
  productCode: z.string().min(1, "El código de producto es obligatorio").max(30, "El código es demasiado largo"),
  type: z.string().min(1, "Debe seleccionar un tipo"),
  category: z.string().min(1, "Debe seleccionar una categoría"),
  responsible: z.string().min(1, "Debe seleccionar un responsable"),
  status: z.string().min(1, "Debe seleccionar un estado"),
  lastMovement: z.string().min(1, "El último movimiento es obligatorio"),
  location: z.string().min(1, "La ubicación es obligatoria"),
  quantity: z.coerce.number({ invalid_type_error: "La cantidad debe ser un número" }).min(0, "La cantidad no puede ser negativa"),
  supplier: z.string().min(1, "El proveedor / origen es obligatorio"),
  observations: z.string().max(300, "Las observaciones son demasiado largas").optional(),
});

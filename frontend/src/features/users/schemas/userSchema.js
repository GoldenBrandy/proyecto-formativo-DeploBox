/* Importamos z desde "zod". Esto permite usar esa pieza en este archivo sin volver a escribir su logica. */
import { z } from "zod";
/* Importamos fileSchema desde "../../../shared/schemas/fileSchema". Esto permite usar esa pieza en este archivo sin volver a escribir su logica. */
import { fileSchema } from "../../../shared/schemas/fileSchema";
/* Exportamos esta constante o funcion con nombre para que otros archivos puedan reutilizarla de forma clara. */
export
/* Creamos userSchema como objeto. Sirve para agrupar datos relacionados, como formularios, opciones, payloads o configuraciones. */
const userSchema = z.object({
  userFirstName: z.string().min(1, "El primer nombre es obligatorio").max(60, "El nombre es demasiado largo"),
  userMiddleName: z.string().max(60, "El nombre es demasiado largo").optional(),
  userLastName1: z.string().min(1, "El primer apellido es obligatorio").max(60, "El apellido es demasiado largo"),
  userLastName2: z.string().min(1, "El segundo apellido es obligatorio").max(60, "El apellido es demasiado largo"),
  userDocumentType: z.string().min(1, "Debe seleccionar un tipo de documento"),
  userDocumentNumber: z.string().min(5, "Número de documento inválido").max(20, "El número de documento es demasiado largo"),
  userGroup: z.string().min(1, "Debe seleccionar un tipo de usuario"),
  userStatus: z.string().min(1, "Debe seleccionar un estado"),
  userEmail: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "El correo electrónico no es válido"),
  userInstitutionalEmail: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "El correo institucional no es válido").optional().or(z.literal("")),
  userPhone: z.string().regex(/^[0-9]{10}$/, "El teléfono debe contener solo números y tener 10 dígitos"),
  userAddress: z.string().min(1, "La dirección es obligatoria").max(120, "La dirección es demasiado larga"),
  userStartDate: z.string().optional(),
  userEndDate: z.string().optional(),
  // Opcional porque al editar un usuario se puede dejar en blanco para conservar la actual.
  userPassword: z.string().min(8, "La contraseña debe tener al menos 8 caracteres").regex(/[A-Z]/, "La contraseña debe contener al menos una mayúscula").regex(/[a-z]/, "La contraseña debe contener al menos una minúscula").regex(/[0-9]/, "La contraseña debe contener al menos un número").regex(/[^A-Za-z0-9]/, "La contraseña debe contener al menos un carácter especial").optional().or(z.literal("")),
  userImage: fileSchema.shape.files.optional()
});

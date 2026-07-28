/* Importamos z desde "zod". Esto permite usar esa pieza en este archivo sin volver a escribir su logica. */
import { z } from "zod";
/* Exportamos esta constante o funcion con nombre para que otros archivos puedan reutilizarla de forma clara. */
export
/* Creamos loginSchema como objeto. Sirve para agrupar datos relacionados, como formularios, opciones, payloads o configuraciones. */
const loginSchema = z.object({
  userEmail: z.string().email("Debe ser un correo electrónico válido"),
  userPassword: z.string().min(2, "La contraseña debe tener al menos 2 caracteres")
});
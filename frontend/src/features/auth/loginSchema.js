import { z } from "zod";

export const loginSchema = z.object({
    userEmail: z.string().email("Debe ser un correo electrónico válido"),
    userPassword: z.string().min(2, "La contraseña debe tener al menos 2 caracteres"),
});
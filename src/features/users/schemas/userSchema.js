import { z } from "zod";

export const userSchema = z.object({

    userName: z
    .string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(60, "El nombre es demasiado largo"),

    userEmail: z
    .string()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "El correo electrónico no es válido"),

    userPhone: z
    .string()
    .regex(/^[0-9]{10}$/, "El teléfono debe contener solo números y tener 10 dígitos"),

    userDocumentType: z
    .string()
    .min(1, "Debe seleccionar un tipo de documento"),

    userDocumentNumber: z
    .string()
    .min(5, "Número de documento inválido")
    .max(20, "El número de documento es demasiado largo"),

    userPassword: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .regex(/[A-Z]/, "La contraseña debe contener al menos una mayúscula")
    .regex(/[a-z]/, "La contraseña debe contener al menos una minúscula")
    .regex(/[0-9]/, "La contraseña debe contener al menos un número")
    .regex(/[^A-Za-z0-9]/, "La contraseña debe contener al menos un carácter especial"),
    isStaff: z.boolean(),
    isActive: z.boolean(),
    isSuperAdmin: z.boolean(),
})

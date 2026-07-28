// Importa z desde Zod para construir validaciones declarativas.
import { z } from "zod";
// Define una lista centralizada de tipos MIME permitidos para los archivos.
const ACCEPTED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "application/pdf"];
// Define el peso maximo permitido por archivo; 10 * 1024 * 1024 equivale a 10 MB.
const MAX_SIZE = 10 * 1024 * 1024;
// Exporta el schema que valida un objeto con una propiedad files.
export const fileSchema = z.object({
    // Declara que files debe ser un arreglo de archivos validos.
    files: z
        // Indica que la propiedad files es un arreglo.
        .array(
            // Exige que cada item sea una instancia real de File del navegador.
            z.instanceof(File)
                // Valida que el tipo MIME del archivo este en la lista permitida.
                .refine((file) => ACCEPTED_TYPES.includes(file.type), "Tipo invalido")
                // Valida que el archivo no supere el peso maximo.
                .refine((file) => file.size <= MAX_SIZE, "Max 10MB"),
        )
        // Exige al menos un archivo seleccionado.
        .min(1, "Requerido")
        // Limita la seleccion a doce archivos como maximo.
        .max(12, "Maximo 12 archivos"),
// Cierra la definicion del objeto validado por Zod.
});

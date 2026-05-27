// Fuente de datos de usuarios (mock o fuente centralizada)
import { users } from "../../data/users";

//Utilidad para transformar datos en dataset de reporte 
import { buildReportDataset } from "../utils/buildReportDataset";

// Servicios de exportación
import { generateExcelReport } from "./generateExcelReport";
import { generatePdfReport } from "./generatePdfReport";

// Caso de uso: orquestador de generación de reportes de usuarios
//Patrón: Application Service (orquestador utilidades y servicios)
export function generateUserReport({
    format, // Formato de salida: "pdf" o "excel"
    selectedFields, // Campos seleccionados para el reporte
    scope, // Alcance del reporte: "all" o "active"
    documentNumber // Número de documento para reporte específico
}) {
    // Construcción del dataset (desacoplado de la UI)
    const { headers, rows } = buildReportDataset({
        users,
        selectedFields,
        scope,
        documentNumber
    });

    const timestamp = new Date().toISOString().slice(0, 10);
    // Lógica de generación de reporte según el formato seleccionado
    if (!rows.length) {
        alert("No hay datos para generar el reporte");
        return;
    }

    //Generaración de timestamp para el nombre del archivo
    if (format === "excel") {
        generateExcelReport({
            headers,
            rows,
            fileName: `user-report-${timestamp}.xlsx`
        });
    }
    if (format === "pdf") {
        generatePdfReport({
            headers,
            rows,
            fileName: `user-report-${timestamp}.pdf`
        });
    }

}
// Fuente de datos de usuarios (mock o fuente centralizada)

import { users } from "../../data/users";

//Utilidad para transformar datos en dataset de reporte

import { buildReportDataset } from "../utils/buildReportDataset";

// Servicios de exportación

import { generateExcelReport } from "./generateExcelReport";
/* Importamos generatePdfReport desde "./generatePdfReport". Esto permite usar esa pieza en este archivo sin volver a escribir su logica. */
import { generatePdfReport } from "./generatePdfReport";
// Notificaciones (toasts) para avisos al usuario

import { sileo } from "sileo";

// Caso de uso: orquestador de generación de reportes de usuarios
//Patrón: Application Service (orquestador utilidades y servicios)

export
/* Esta funcion generateUserReport genera un archivo o reporte usando los datos que recibe. */
function generateUserReport({
  format,
  // Formato de salida: "pdf" o "excel"

  selectedFields,
  // Campos seleccionados para el reporte

  scope,
  // Alcance del reporte: "all" o "active"

  documentNumber // Número de documento para reporte específico
}) {
  // Construcción del dataset (desacoplado de la UI)

  const {
    headers,
    rows
  } = buildReportDataset({
    users,
    selectedFields,
    scope,
    documentNumber
  });
  /* Declaramos timestamp. Este valor se usa despues para mantener la logica ordenada y evitar repetir codigo. */
  const timestamp = new Date().toISOString().slice(0, 10);
  // Lógica de generación de reporte según el formato seleccionado

  if (!rows.length) {
    /* Mostramos una advertencia con Sileo en vez de un alert nativo. */
    sileo.warning({
      title: "Sin datos",
      description: "No hay datos para generar el reporte"
    });
    /* Devolvemos este valor para que la funcion entregue el resultado que otra parte del codigo necesita. */
    return;
  }

  //Generaración de timestamp para el nombre del archivo

  if (format === "excel") {
    /* Llamamos a generateExcelReport para ejecutar una accion necesaria en este punto del flujo. */
    generateExcelReport({
      headers,
      rows,
      fileName: `user-report-${timestamp}.xlsx`
    });
  }
  /* Validamos esta condicion para decidir que hacer. Si se cumple, manejamos un caso especial como error, dato faltante, permiso o estado deshabilitado. */
  if (format === "pdf") {
    /* Llamamos a generatePdfReport para ejecutar una accion necesaria en este punto del flujo. */
    generatePdfReport({
      headers,
      rows,
      fileName: `user-report-${timestamp}.pdf`
    });
  }
}
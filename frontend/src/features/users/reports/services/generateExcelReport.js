// Librería para manipulación de archivos Excel

import * as XLSX from "xlsx";
// Función principal para generar el reporte Excel

export
/* Esta funcion generateExcelReport genera un archivo o reporte usando los datos que recibe. */
function generateExcelReport({
  headers,
  // Array de encabezados (columnas)

  rows,
  // Array de files (array de arrays)

  fileName = "user-report.xlsx" // Nombre del archivo de salida
}) {
  /* Declaramos currentDate. Este valor se usa despues para mantener la logica ordenada y evitar repetir codigo. */
  const currentDate = new Date().toLocaleDateString();
  /* Declaramos reportTittle. Este valor se usa despues para mantener la logica ordenada y evitar repetir codigo. */
  const reportTittle = `Reporte de Usuarios - ${currentDate}`;
  //Estructura final de la hoja:
  //Primera fila = headers
  // Siguientes filas =  datos

  const worksheetData = [[reportTittle], [], headers,
  //Encabezados como primera fila
  ...rows // Filas de datos
  ];
  // Convierte un array de arrays (ADA = Array of Arrays) a una hoja de Excel

  const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
  /* Declaramos range. Este valor se usa despues para mantener la logica ordenada y evitar repetir codigo. */
  const range = XLSX.utils.decode_range(worksheet["!ref"]);
  /* Asignamos un nuevo valor para actualizar una estructura local antes de seguir procesando datos. */
  worksheet["!merges"] = [{
    s: {
      r: 0,
      c: 0
    },
    // Celda de inicio (fila 0, columna 0)

    e: {
      r: 0,
      c: range.e.c
    } // Celda de fin (misma fila, última columna)
  }];

  //Ancho columnas

  worksheet["!rows"] = headers.map(() => ({
    wch: 25
  })); // Ancho de 20 caracteres para cada columna

  worksheet["!cols"] = [{
    hpt: 25
  }];

  // Crea un nuevo libro de Excel y agrega la hoja creada

  const workbook = XLSX.utils.book_new();

  // Agrega la hoja al libro con el nombre "Reporte de Usuarios"

  XLSX.utils.book_append_sheet(workbook, worksheet, "Reporte de Usuarios");

  // Genera un archivo Excel en formato binario

  XLSX.writeFile(workbook, fileName);
}
// Librería para generacion de archivos PDF

import jsPDF from "jspdf";

// Plugin para creación de tablas en PDF

import autoTable from "jspdf-autotable";

//Función utilitaria para generar un reporte en PDF
//Patrón: exportación de datos (dataset -> documento estructurado)

export
/* Esta funcion generatePdfReport genera un archivo o reporte usando los datos que recibe. */
function generatePdfReport({
  headers,
  // Array de encabezados (columnas)

  rows,
  // Array de files (array de arrays)

  fileName = "user-report.pdf" // Nombre del archivo de salida
}) {
  // Inicializa el documento PDF

  const doc = new jsPDF();

  // Configuración del título

  doc.setFontSize(16);
  /* Ejecutamos doc.text para usar una utilidad o metodo propio de ese objeto. */
  doc.text("Reporte de Usuarios", 14, 20); //Posicion del título (x, y)

  // generación de la tabla automática

  autoTable(doc, {
    startY: 30,
    // Posición vertical de inicio de la tabla

    head: [headers],
    // Encabezados de la tabla

    body: rows,
    // Filas de datos

    theme: "grid",
    headStyles: {
      fillColor: [33, 150, 243],
      // Color de fondo para los encabezados

      textColor: 255,
      // Color del texto para los encabezados

      fontStyle: 11
    },
    // Estilos globales de la celda

    styles: {
      fontSize: 10
    },
    // Margenes del documento

    margin: {
      left: 14,
      right: 14
    }
  });

  // Genera y descarga el archivo PDF

  doc.save(fileName);
}
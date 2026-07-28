import { DataTable } from "@/shared";
import { reportColumns } from "../table/reportes.column.jsx";
import { reportes } from "../data/reportes.js";

export default function ListReportesPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-xl font-semibold">Reportes</h1>

      <DataTable data={reportes} columns={reportColumns} />
    </div>
  );
}

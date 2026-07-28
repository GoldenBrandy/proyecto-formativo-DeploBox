import { useMemo, useState } from "react";
import { DataTable, Button } from "@/shared";
import { Plus } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { materialColumns } from "../table/materiales.column.jsx";
import { materiales } from "../data/materiales.js";

// Traduce el valor de la query "tipo" al texto mostrado en el título.
const TYPE_LABELS = {
  devolutivo: "Devolutivo",
  consumo: "Consumo",
};

export default function ListMaterialPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const tipo = searchParams.get("tipo");

  const filteredMateriales = useMemo(() => {
    if (!tipo) return materiales;
    return materiales.filter((material) => material.type.toLowerCase() === tipo.toLowerCase());
  }, [tipo]);

  const title = tipo ? `Materiales - ${TYPE_LABELS[tipo.toLowerCase()] ?? tipo}` : "Materiales";

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-xl font-semibold">{title}</h1>

        <div className="flex items-center gap-2">
          <Button variant="primary" size="md" onClick={() => setIsReportModalOpen(true)} className="gap-2">
            <Plus size={18} />
            Reporte
          </Button>

          <Button variant="primary" size="md" onClick={() => navigate("/dashboard/materiales/crear")} className="gap-2">
            <Plus size={18} />
            Crear material
          </Button>
        </div>
      </div>

      {isReportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-lg">
            <h2 className="mb-6 text-xl font-semibold">Generar reporte de materiales</h2>
            <p className="mb-6 text-sm text-neutral-600">
              La configuración de reporte para materiales aún no está implementada.
            </p>
            <div className="flex justify-end gap-2">
              <Button variant="secondary" onClick={() => setIsReportModalOpen(false)}>
                Cerrar
              </Button>
            </div>
          </div>
        </div>
      )}

      <DataTable data={filteredMateriales} columns={materialColumns} />
    </div>
  );
}

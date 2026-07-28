/* Importamos useState desde "react". Esto permite usar esa pieza en este archivo sin volver a escribir su logica. */
import { useState } from "react";
/* Importamos DataTable desde "@/shared". Esto permite usar esa pieza en este archivo sin volver a escribir su logica. */
import { DataTable } from "@/shared";
/* Importamos Button desde "@/shared". Esto permite usar esa pieza en este archivo sin volver a escribir su logica. */
import { Button } from "@/shared";
/* Importamos Plus desde "lucide-react". Esto permite usar esa pieza en este archivo sin volver a escribir su logica. */
import { Plus } from "lucide-react";
/* Importamos useNavigate desde "react-router-dom". Esto permite usar esa pieza en este archivo sin volver a escribir su logica. */
import { useNavigate } from "react-router-dom";
/* Importamos ReportConfigModal desde "../reports/components/ReportConfigModal". Esto permite usar esa pieza en este archivo sin volver a escribir su logica. */
import ReportConfigModal from "../reports/components/ReportConfigModal";
/* Importamos userColumns desde "../table/users.column.jsx". Esto permite usar esa pieza en este archivo sin volver a escribir su logica. */
import { userColumns } from "../table/users.column.jsx";
/* Importamos users desde "../data/users.js". Esto permite usar esa pieza en este archivo sin volver a escribir su logica. */
import { users } from "../data/users.js";
/* Exportamos como valor principal de este archivo la funcion, pagina o configuracion que representa este modulo. */
export default
/* Esta funcion ListUserPage construye una pantalla completa. Aqui se preparan datos, eventos y componentes que vera el usuario. */
function ListUserPage() {
  /* Creamos navigate con useNavigate. Esto permite mover al usuario a otra ruta desde codigo, por ejemplo despues de guardar o cancelar. */
  const navigate = useNavigate();
  /* Creamos [isReportModalOpen, setIsReportModalOpen] con useState. Esto guarda un dato que puede cambiar y hace que React actualice la pantalla cuando se modifica. */
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  /* Devolvemos la interfaz JSX que React pintara en pantalla. Aqui se conectan los datos y eventos con los componentes visuales. */
  return <div className="p-6 space-y-6">
       <div className="flex items-center justify-between gap-4">
         <h1 className="text-xl font-semibold">
          Usuarios
        </h1>

         <div className="flex items-center gap-2">
           <Button variant="primary" size="md" onClick={() => setIsReportModalOpen(true)} className="gap-2">
             <Plus size={18} />
            Reporte
          </Button>

           <Button variant="primary" size="md" onClick={() => navigate("/dashboard")} className="gap-2">
             <Plus size={18} />
            Crear usuario
          </Button>
        </div>
      </div>

       <ReportConfigModal isOpen={isReportModalOpen} onClose={() => setIsReportModalOpen(false)} />

       <DataTable data={users} columns={userColumns} />
    </div>;
}
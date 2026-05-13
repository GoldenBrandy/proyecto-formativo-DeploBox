import { DataTable } from "@/shared"
import { Button } from "@/shared"
import { Plus } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { userColumns } from "../table/users.column.jsx"
import { users } from "../data/users.js"


export default function ListUserPage() {
  const navigate = useNavigate()


  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-xl font-semibold">
          Usuarios
        </h1>

        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            size="md"
            onClick={() => navigate("/dashboard")}
            className="gap-2"
          >
            <Plus size={18} />
            Reporte
          </Button>

          <Button
            variant="primary"
            size="md"
            onClick={() => navigate("/dashboard")}
            className="gap-2"
          >
            <Plus size={18} />
            Crear usuario
          </Button>
        </div>
      </div>

      <DataTable
        data={users}
        columns={userColumns}
      />
    </div>
  )
}

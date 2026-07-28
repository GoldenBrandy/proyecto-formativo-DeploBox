import { useState, useEffect, useMemo } from "react";
import { grupoSchema } from "../schemas/grupoSchema";
import { createGrupo } from "../services/grupoService";
import { getGroupTypeOptions, getPermissionsScopeOptions, getLevelOptions } from "../services/grupoOptionsService";
import { users } from "@/features/users/data/users";
import { Input, Button, Select, IconButton } from "@/shared";
import { useNavigate } from "react-router-dom";
import { MoveLeft } from "lucide-react";
import { sileo } from "sileo";

const statusOptions = [
  { id: "", label: "Selecciona estado" },
  { id: "activo", label: "Activo" },
  { id: "inactivo", label: "Inactivo" },
];

export default function GrupoRegisterForm({
  nextTo = "/dashboard/grupos",
  cancelTo = "/dashboard/grupos",
  showBackButton = false,
  backTo = "/dashboard",
}) {
  const navigate = useNavigate();

  const [groupTypeOptions, setGroupTypeOptions] = useState([{ id: "", label: "Selecciona tipo de grupo" }]);
  const [permissionsScopeOptions, setPermissionsScopeOptions] = useState([{ id: "", label: "Selecciona alcance de permisos" }]);
  const [levelOptions, setLevelOptions] = useState([{ id: "", label: "Selecciona nivel" }]);

  useEffect(() => {
    getGroupTypeOptions().then((data) => setGroupTypeOptions((prev) => [prev[0], ...data]));
    getPermissionsScopeOptions().then((data) => setPermissionsScopeOptions((prev) => [prev[0], ...data]));
    getLevelOptions().then((data) => setLevelOptions((prev) => [prev[0], ...data]));
  }, []);

  const leaderOptions = useMemo(
    () => [{ id: "", label: "Selecciona líder del grupo" }, ...users.map((user) => ({ id: String(user.id), label: user.name }))],
    [],
  );

  const [formData, setFormData] = useState({
    groupName: "",
    groupCode: "",
    groupType: "",
    groupLeader: "",
    groupMembers: "",
    permissionsScope: "",
    level: "",
    status: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = grupoSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = {};
      result.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0]] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const res = await createGrupo(result.data);
      sileo.success({
        title: "Grupo creado",
        description: res?.message ?? "Grupo creado correctamente",
      });
      navigate(nextTo);
    } catch (err) {
      console.error(err);
      sileo.error({
        title: "Error al guardar el grupo",
        description: err?.message || String(err),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-full w-full flex-1 overflow-hidden p-6">
      <div className="relative text-black [&_h1]:text-black [&_input]:text-black [&_input::placeholder]:text-black/70 [&_label]:text-black [&_select]:text-black [&_span]:text-black">
        {showBackButton && (
          <div className="mb-4">
            <IconButton ariaLabel="Volver" variant="ghost" onClick={() => navigate(backTo)} className="text-black">
              <MoveLeft />
            </IconButton>
          </div>
        )}

        <h1 className="mb-6 text-center text-2xl text-text-primary">Registro de grupos</h1>

        <form className="grid grid-cols-1 items-center" onSubmit={handleSubmit} noValidate autoComplete="off">
          <div className="mx-auto grid grid-cols sm:grid-cols-3 gap-6 rounded-md border p-8">
            <Input label="Nombre del grupo *" name="groupName" placeholder="Nombre del grupo" value={formData.groupName} onChange={handleChange} error={errors.groupName} />

            <Input label="Codigo de grupo *" name="groupCode" placeholder="Codigo de grupo" value={formData.groupCode} onChange={handleChange} error={errors.groupCode} />

            <Select label="Tipo de grupo *" name="groupType" options={groupTypeOptions} value={formData.groupType} onChange={handleChange} error={errors.groupType} />

            <Select label="Lider del grupo *" name="groupLeader" options={leaderOptions} value={formData.groupLeader} onChange={handleChange} error={errors.groupLeader} />

            <Input label="Integrantes *" name="groupMembers" placeholder="Ej: JD, AM, KP, LT" value={formData.groupMembers} onChange={handleChange} error={errors.groupMembers} />

            <Select label="Alcance de permisos *" name="permissionsScope" options={permissionsScopeOptions} value={formData.permissionsScope} onChange={handleChange} error={errors.permissionsScope} />

            <Select label="Nivel *" name="level" options={levelOptions} value={formData.level} onChange={handleChange} error={errors.level} />

            <Select label="Estado *" name="status" options={statusOptions} value={formData.status} onChange={handleChange} error={errors.status} />

            <Input label="Descripcion" name="description" placeholder="Descripcion" value={formData.description} onChange={handleChange} error={errors.description} />

            <div className="col-span-full flex items-center justify-between">
              <Button variant="secondary" type="button" onClick={() => navigate(cancelTo)}>
                Cancelar
              </Button>

              <Button variant="primary" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Guardando..." : "Guardar"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

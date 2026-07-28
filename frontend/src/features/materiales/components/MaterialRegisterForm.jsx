import { useState, useEffect } from "react";
import { getMaterialTypes } from "../services/materialTypeService";
import { materialSchema } from "../schemas/materialSchema";
import { createMaterial } from "../services/materialService";
import { getMaterialById, updateMaterialInStore } from "../data/materiales";
import { Input, Button, Select, Checkbox, IconButton, Dropdown, DropdownTrigger, DropdownContent, DropdownItem } from "@/shared";
import { Link, useNavigate } from "react-router-dom";
import { SquareArrowRightEnter, Menu, MoveLeft } from "lucide-react";
import { sileo } from "sileo";

export default function MaterialRegisterForm({
  materialId = null,
  nextTo = "/dashboard/materiales",
  cancelTo = "/dashboard/materiales",
  showBackButton = false,
  backTo = "/dashboard/materiales",
}) {
  const isEditing = Boolean(materialId);
  const navigate = useNavigate();

  // Estados
  const [materialTypes, setMaterialTypes] = useState([]);

  // Si hay un materialId, precarga los datos actuales del material desde el estado inicial
  // (evita disparar setState dentro de un efecto).
  const [formData, setFormData] = useState(() => {
    const defaults = {
      materialName: "",
      materialType: "",
      materialQuantity: "",
      materialDescription: "",
      isActive: true,
    };
    if (!materialId) return defaults;
    const material = getMaterialById(materialId);
    if (!material) return defaults;
    return {
      materialName: material.name ?? "",
      materialType: material.type ?? "",
      materialQuantity: material.quantity ?? "",
      materialDescription: material.description ?? "",
      isActive: material.is_active ?? true,
    };
  });

  useEffect(() => {
    getMaterialTypes().then(setMaterialTypes);
  }, []);

  // Avisa si se intenta editar un material que ya no existe en el mock.
  useEffect(() => {
    if (isEditing && !getMaterialById(materialId)) {
      sileo.error({
        title: "Material no encontrado",
        description: "No se encontró el material que intentas editar",
      });
    }
  }, [isEditing, materialId]);

  // ===========================================
  //          Handle Genérico
  // ===========================================
  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ============ Handle Submit ==============
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = materialSchema.safeParse(formData);

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
      if (isEditing) {
        // Todavia no existe backend para materiales: la edicion se guarda
        // directamente en el mock (data/materiales.js) para que la lista la refleje.
        updateMaterialInStore(materialId, {
          name: result.data.materialName,
          type: result.data.materialType,
          quantity: result.data.materialQuantity,
          description: result.data.materialDescription,
          is_active: result.data.isActive,
        });
        sileo.success({
          title: "Material actualizado",
          description: `${result.data.materialName} se actualizó correctamente`,
        });
      } else {
        const payload = {
          name: result.data.materialName,
          type: result.data.materialType,
          quantity: result.data.materialQuantity,
          description: result.data.materialDescription,
          isActive: result.data.isActive,
        };

        const res = await createMaterial(payload);
        sileo.success({
          title: "Material creado",
          description: res?.message ?? "Material creado correctamente",
        });
      }
      navigate(nextTo);
    } catch (err) {
      console.error(err);
      sileo.error({
        title: "Error al guardar material",
        description: err?.message || String(err),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] w-full flex-1 overflow-hidden p-6">
      <div className="relative text-black [&_button]:text-black [&_h1]:text-black [&_input]:text-black [&_input::placeholder]:text-black/70 [&_label]:text-black [&_select]:text-black [&_span]:text-black">
        {showBackButton && (
          <div className="mb-4">
            <IconButton ariaLabel="Volver" variant="ghost" onClick={() => navigate(backTo)}>
              <MoveLeft />
            </IconButton>
          </div>
        )}

        <h1 className="mb-6 text-center text-2xl text-text-primary">
          {isEditing ? "Editar material" : "Registro de materiales"}
        </h1>

        <form className="grid grid-cols-1 items-center" onSubmit={handleSubmit} noValidate>
          <div className="mx-auto grid grid-cols sm:grid-cols-2 gap-6 rounded-md border p-12">
            <Input label="Nombre" name="materialName" placeholder="Ingrese el nombre del material" value={formData.materialName} onChange={handleChange} error={errors.materialName} />

            <Select label="Tipo de material" name="materialType" options={materialTypes} value={formData.materialType} onChange={handleChange} error={errors.materialType} />

            <Input label="Cantidad" name="materialQuantity" placeholder="Ingrese la cantidad" type="number" min="0" value={formData.materialQuantity} onChange={handleChange} error={errors.materialQuantity} />

            <Input label="Descripción" name="materialDescription" placeholder="Ingrese una descripción (opcional)" value={formData.materialDescription} onChange={handleChange} error={errors.materialDescription} />

            <div className="flex h-12 items-center">
              <Checkbox id="isActive" name="isActive" label="Material activo" checked={formData.isActive} onChange={handleChange} />
            </div>
          </div>

          <div className="flex h-12 items-center justify-end gap-6">
            <Button variant="secondary" type="button" onClick={() => navigate(cancelTo)}>
              Cancelar
            </Button>

            <Button variant="primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Guardando..." : "Guardar"}
            </Button>

            <IconButton ariaLabel="Ir a materiales" variant="ghost" onClick={() => navigate("/dashboard/materiales")}>
              <SquareArrowRightEnter />
            </IconButton>

            <Dropdown>
              <DropdownTrigger>
                <IconButton ariaLabel="Menú">
                  <Menu />
                </IconButton>
              </DropdownTrigger>

              <DropdownContent>
                <DropdownItem>
                  <Link to="/dashboard/materiales" className="block w-full">
                    Materiales
                  </Link>
                </DropdownItem>
                <DropdownItem>
                  <Link to="/dashboard" className="block w-full">
                    Panel de control
                  </Link>
                </DropdownItem>
              </DropdownContent>
            </Dropdown>
          </div>
        </form>
      </div>
    </div>
  );
}

import { useState, useEffect, useMemo } from "react";
import { productoSchema } from "../schemas/productoSchema";
import { createProducto } from "../services/productoService";
import { getProductTypeOptions, getCategoryOptions } from "../services/productoOptionsService";
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

export default function ProductoRegisterForm({
  nextTo = "/dashboard/productos",
  cancelTo = "/dashboard/productos",
  showBackButton = false,
  backTo = "/dashboard",
}) {
  const navigate = useNavigate();

  const [typeOptions, setTypeOptions] = useState([{ id: "", label: "Selecciona tipo" }]);
  const [categoryOptions, setCategoryOptions] = useState([{ id: "", label: "Selecciona categoria" }]);

  useEffect(() => {
    getProductTypeOptions().then((data) => setTypeOptions((prev) => [prev[0], ...data]));
    getCategoryOptions().then((data) => setCategoryOptions((prev) => [prev[0], ...data]));
  }, []);

  const responsibleOptions = useMemo(
    () => [{ id: "", label: "Selecciona responsable" }, ...users.map((user) => ({ id: String(user.id), label: user.name }))],
    [],
  );

  const [formData, setFormData] = useState({
    name: "",
    productCode: "",
    type: "",
    category: "",
    responsible: "",
    status: "",
    lastMovement: "",
    location: "",
    quantity: "",
    supplier: "",
    observations: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = productoSchema.safeParse(formData);

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
      const res = await createProducto(result.data);
      sileo.success({
        title: "Producto creado",
        description: res?.message ?? "Producto creado correctamente",
      });
      navigate(nextTo);
    } catch (err) {
      console.error(err);
      sileo.error({
        title: "Error al guardar el producto",
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

        <h1 className="mb-6 text-center text-2xl text-text-primary">Registro de productos</h1>

        <form className="grid grid-cols-1 items-center" onSubmit={handleSubmit} noValidate autoComplete="off">
          <div className="mx-auto grid grid-cols sm:grid-cols-3 gap-6 rounded-md border p-8">
            <Input label="Nombre *" name="name" placeholder="Nombre" value={formData.name} onChange={handleChange} error={errors.name} />

            <Input label="Codigo de producto *" name="productCode" placeholder="Codigo de producto" value={formData.productCode} onChange={handleChange} error={errors.productCode} />

            <Select label="Tipo *" name="type" options={typeOptions} value={formData.type} onChange={handleChange} error={errors.type} />

            <Select label="Categoria *" name="category" options={categoryOptions} value={formData.category} onChange={handleChange} error={errors.category} />

            <Select label="Responsable *" name="responsible" options={responsibleOptions} value={formData.responsible} onChange={handleChange} error={errors.responsible} />

            <Select label="Estado *" name="status" options={statusOptions} value={formData.status} onChange={handleChange} error={errors.status} />

            <Input label="Ultimo movimiento *" name="lastMovement" placeholder="Ultimo movimiento" value={formData.lastMovement} onChange={handleChange} error={errors.lastMovement} />

            <Input label="Ubicacion *" name="location" placeholder="Ubicacion" value={formData.location} onChange={handleChange} error={errors.location} />

            <Input label="Cantidad *" name="quantity" placeholder="Cantidad" type="number" min="0" value={formData.quantity} onChange={handleChange} error={errors.quantity} />

            <Input label="Proveedor / origen *" name="supplier" placeholder="Proveedor / origen" value={formData.supplier} onChange={handleChange} error={errors.supplier} />

            <Input label="Observaciones" name="observations" placeholder="Observaciones" value={formData.observations} onChange={handleChange} error={errors.observations} />

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

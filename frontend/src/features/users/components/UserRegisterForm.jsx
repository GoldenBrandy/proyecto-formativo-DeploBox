/* Importamos useState, useEffect, useMemo y useRef desde "react". Esto permite usar esa pieza en este archivo sin volver a escribir su logica. */
import { useState, useEffect, useMemo, useRef } from "react";
/* Importamos getDocumentTypes desde "../services/selectService". Esto permite usar esa pieza en este archivo sin volver a escribir su logica. */
import { getDocumentTypes } from "../services/selectService";
/* Importamos getGroups desde el feature de acceso; los grupos ya existentes representan los tipos de usuario. */
import { getGroups } from "@/features/access/services/groupService";
/* Importamos userSchema desde "../schemas/userSchema". Esto permite usar esa pieza en este archivo sin volver a escribir su logica. */
import { userSchema } from "../schemas/userSchema";
/* Importamos createUser, getUserById y updateUser desde "../services/userService". Esto permite usar esa pieza en este archivo sin volver a escribir su logica. */
import { createUser, getUserById, updateUser } from "../services/userService";
/* Importamos Input, Button, Select, IconButton y FileInput desde "@/shared". Esto permite usar esa pieza en este archivo sin volver a escribir su logica. */
import { Input, Button, Select, IconButton } from "@/shared";
/* Importamos useNavigate desde "react-router-dom". Esto permite usar esa pieza en este archivo sin volver a escribir su logica. */
import { useNavigate } from "react-router-dom";
/* Importamos MoveLeft, Eye, EyeOff y UserRoundPlus desde "lucide-react". Esto permite usar esa pieza en este archivo sin volver a escribir su logica. */
import { MoveLeft, Eye, EyeOff, UserRoundPlus } from "lucide-react";
/* Importamos sileo para mostrar notificaciones (toasts) de exito y error. */
import { sileo } from "sileo";
/* Define las opciones estaticas del estado del usuario. */
const statusOptions = [
  { id: "activo", label: "Activo" },
  { id: "inactivo", label: "Inactivo" },
];
/* Exportamos como valor principal de este archivo la funcion, pagina o configuracion que representa este modulo. */
export default
/* Esta funcion UserRegisterForm agrupa la logica de esta parte del proyecto. Recibe datos, los procesa y devuelve el resultado necesario. */
function UserRegisterForm({
  userId = null,
  backgroundImage = null,
  nextTo = "/dashboard",
  cancelTo = "/",
  showBackButton = false,
  backTo = "/auth"
}) {
  /* Determina si el formulario esta editando un usuario existente o creando uno nuevo. */
  const isEditing = Boolean(userId);
  /* Creamos navigate con useNavigate. Esto permite mover al usuario a otra ruta desde codigo, por ejemplo despues de guardar o cancelar. */
  const navigate = useNavigate();
  //Estados

  const [documentType, setDocumentType] = useState([]);
  /* Guarda los grupos (tipos de usuario) cargados desde el backend de acceso. */
  const [groups, setGroups] = useState([]);
  /* Controla si el campo de contrasena muestra el texto plano o los puntos ocultos. */
  const [showPassword, setShowPassword] = useState(false);
  /* Referencia al input de archivo oculto que abre la foto de perfil. */
  const avatarInputRef = useRef(null);
  /* Guarda la foto de perfil ya guardada del usuario cuando se esta editando. */
  const [existingAvatarUrl, setExistingAvatarUrl] = useState(null);
  /* Creamos [formData, setFormData] con useState. Esto guarda un dato que puede cambiar y hace que React actualice la pantalla cuando se modifica. */
  const [formData, setFormData] = useState({
    userFirstName: "",
    userMiddleName: "",
    userLastName1: "",
    userLastName2: "",
    userDocumentType: "",
    userDocumentNumber: "",
    userGroup: "",
    userStatus: "activo",
    userEmail: "",
    userInstitutionalEmail: "",
    userPhone: "",
    userAddress: "",
    userStartDate: "",
    userEndDate: "",
    userPassword: "",
    userImage: []
  });
  /* Agrega una opcion vacia al inicio para que el select no arranque con un tipo de documento ya elegido. */
  const documentTypeOptions = useMemo(() => [{
    id: "",
    label: "Selecciona tipo de documento"
  }, ...documentType], [documentType]);
  /* Convierte los grupos del backend al formato que espera el componente Select, igual que en AccessSidebar,
     y agrega una opcion vacia para que el select no arranque con un tipo de usuario ya elegido. */
  const groupOptions = useMemo(() => [{
    id: "",
    label: "Selecciona tipo de usuario"
  }, ...groups.map((group) => ({
    id: String(group.group_id),
    label: group.group_name
  }))], [groups]);
  /* Genera una URL temporal para previsualizar la foto de perfil seleccionada, o usa la ya guardada al editar. */
  const avatarPreview = useMemo(() => {
    const file = formData.userImage[0];
    if (file) return URL.createObjectURL(file);
    return existingAvatarUrl;
  }, [formData.userImage, existingAvatarUrl]);
  /* Libera la URL temporal de la foto cuando cambia o cuando el componente se desmonta. */
  useEffect(() => {
    return () => {
      if (avatarPreview) URL.revokeObjectURL(avatarPreview);
    };
  }, [avatarPreview]);
  /* Llamamos a useEffect para ejecutar una accion necesaria en este punto del flujo. */
  useEffect(() => {
    /* Ejecutamos el objeto.then para usar una utilidad o metodo propio de ese objeto. */
    getDocumentTypes().then(setDocumentType);
    /* Consulta los grupos existentes para usarlos como tipos de usuario. */
    getGroups().then((data) => setGroups(Array.isArray(data) ? data : [])).catch(console.error);
  }, []);
  /* Cuando hay un userId, precarga los datos actuales del usuario para editarlos. */
  useEffect(() => {
    if (!isEditing) return;
    getUserById(userId).then((user) => {
      setFormData((prev) => ({
        ...prev,
        userFirstName: user.user_name ?? "",
        userMiddleName: user.middle_name ?? "",
        userLastName1: user.last_name_1 ?? "",
        userLastName2: user.last_name_2 ?? "",
        userDocumentType: user.document_type ?? "",
        userDocumentNumber: user.document_number ?? "",
        userGroup: user.group_id ? String(user.group_id) : "",
        userStatus: user.is_active ? "activo" : "inactivo",
        userEmail: user.user_email ?? "",
        userInstitutionalEmail: user.institutional_email ?? "",
        userPhone: user.user_phone ?? "",
        userAddress: user.address ?? "",
        userStartDate: user.start_date ? String(user.start_date).slice(0, 10) : "",
        userEndDate: user.end_date ? String(user.end_date).slice(0, 10) : "",
        userPassword: ""
      }));
      setExistingAvatarUrl(user.avatar_url ?? null);
    }).catch((err) => {
      console.error(err);
      sileo.error({
        title: "No se pudo cargar el usuario",
        description: err?.message || String(err)
      });
    });
  }, [isEditing, userId]);
  /* Maneja la seleccion de una nueva foto de perfil. */
  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setFormData((prev) => ({
      ...prev,
      userImage: [file]
    }));
  };

  // ===========================================
  //          Handle Genérico
  // ===========================================
  /**
   * Función que se ejecuta cada vez que cambia el valor de un input del formulario
   */

  const handleChange = e => {
    // Se obtiene el nombre del input y su valor

    const {
      name,
      type,
      value,
      checked
    } = e.target;

    // Se actualiza el estado del formulario con el nuevo valor

    setFormData(prev => ({
      // Se copian todos los valores anteriores del estado
      ...prev,
      // Se actualiza el valor del input que cambió

      [name]: type === "checkbox" ? checked : value
    }));
  };
  /* Creamos [errors, setErrors] con useState. Esto guarda un dato que puede cambiar y hace que React actualice la pantalla cuando se modifica. */
  const [errors, setErrors] = useState({});
  /* Creamos [isSubmitting, setIsSubmitting] con useState. Esto guarda un dato que puede cambiar y hace que React actualice la pantalla cuando se modifica. */
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ============ Handle Submit ==============
  /**
   * Función que se ejecuta cada vez que se envía el formulario
   */

  const handleSubmit = async e => {
    /* Ejecutamos e.preventDefault para usar una utilidad o metodo propio de ese objeto. */
    e.preventDefault();
    /* Al crear un usuario nuevo la contrasena es obligatoria; al editar puede quedar en blanco para conservar la actual. */
    if (!isEditing && !formData.userPassword) {
      setErrors({ userPassword: "La contraseña es obligatoria" });
      return;
    }
    /* Declaramos result. Este valor se usa despues para mantener la logica ordenada y evitar repetir codigo. */
    const result = userSchema.safeParse(formData);
    /* Validamos esta condicion para decidir que hacer. Si se cumple, manejamos un caso especial como error, dato faltante, permiso o estado deshabilitado. */
    if (!result.success) {
      /* Creamos feldErrors como objeto. Sirve para agrupar datos relacionados, como formularios, opciones, payloads o configuraciones. */
      const feldErrors = {};
      /* Ejecutamos el objeto.forEach para usar una utilidad o metodo propio de ese objeto. */
      result.error.issues.forEach(issue => {
        /* Asignamos un nuevo valor para actualizar una estructura local antes de seguir procesando datos. */
        feldErrors[issue.path[0]] = issue.message;
      });
      /* Actualizamos el estado usando setErrors; esto hace que React vuelva a renderizar con el nuevo dato. */
      setErrors(feldErrors);
      /* Devolvemos este valor para que la funcion entregue el resultado que otra parte del codigo necesita. */
      return;
    }
    /* Actualizamos el estado usando setErrors; esto hace que React vuelva a renderizar con el nuevo dato. */
    setErrors({});
    /* Actualizamos el estado usando setIsSubmitting; esto hace que React vuelva a renderizar con el nuevo dato. */
    setIsSubmitting(true);
    /* Intentamos ejecutar una operacion que puede fallar, como guardar datos, consultar la API o generar un reporte. */
    try {
      /* Creamos payload como objeto. Sirve para agrupar datos relacionados, como formularios, opciones, payloads o configuraciones. */
      const payload = {
        firstName: result.data.userFirstName,
        middleName: result.data.userMiddleName,
        lastName1: result.data.userLastName1,
        lastName2: result.data.userLastName2,
        documentType: result.data.userDocumentType,
        documentNumber: result.data.userDocumentNumber,
        group: result.data.userGroup,
        status: result.data.userStatus,
        userEmail: result.data.userEmail,
        institutionalEmail: result.data.userInstitutionalEmail,
        phone: result.data.userPhone,
        address: result.data.userAddress,
        startDate: result.data.userStartDate,
        endDate: result.data.userEndDate,
        // avatarUrl: could be derived from uploaded file; leave null for now

        avatarUrl: null
      };
      /* Solo se envia la contrasena si el usuario escribio una nueva. */
      if (result.data.userPassword) {
        payload.password = result.data.userPassword;
      }
      /* Declaramos res. Este valor se usa despues para mantener la logica ordenada y evitar repetir codigo. */
      const res = isEditing ? await updateUser(userId, payload) : await createUser(payload);
      /* Mostramos una notificacion de exito con Sileo. */
      sileo.success({
        title: isEditing ? 'Usuario actualizado' : 'Usuario creado',
        description: res?.message ?? (isEditing ? 'Usuario actualizado correctamente' : 'Usuario creado correctamente')
      });
      /* Llamamos a navigate para ejecutar una accion necesaria en este punto del flujo. */
      navigate(nextTo);
    } /* Capturamos el error para mostrar un mensaje, limpiar estados o evitar que la aplicacion se rompa por completo. */catch (err) {
      /* Escribimos informacion en consola con console.error; esto ayuda a revisar errores o datos durante el desarrollo. */
      console.error(err);
      /* Mostramos una notificacion de error con Sileo. */
      sileo.error({
        title: "Error al guardar usuario",
        description: err?.message || String(err)
      });
    } finally {
      /* Actualizamos el estado usando setIsSubmitting; esto hace que React vuelva a renderizar con el nuevo dato. */
      setIsSubmitting(false);
    }
  };
  /* Devolvemos la interfaz JSX que React pintara en pantalla. Aqui se conectan los datos y eventos con los componentes visuales. */
  return <div className={`relative min-h-full w-full flex-1 overflow-hidden p-6 ${backgroundImage ? "bg-cover bg-center" : ""}`} style={backgroundImage ? {
    backgroundImage: `url(${backgroundImage})`
  } : undefined}>
             <div className="relative text-black [&_h1]:text-black [&_input]:text-black [&_input::placeholder]:text-black/70 [&_label]:text-black [&_select]:text-black [&_span]:text-black">
                {showBackButton && <div className="mb-4">
                         <IconButton ariaLabel="Volver" variant="ghost" onClick={() => navigate(backTo)} className="text-black">
                             <MoveLeft />
                        </IconButton>
                    </div>}

                 <h1 className="mb-6 text-center text-2xl text-text-primary">
                    {isEditing ? "Editar usuario" : "Registro de usuarios"}
                </h1>

                 <form className="grid grid-cols-1 items-center" onSubmit={handleSubmit} noValidate autoComplete="off">
                     {/* Foto de perfil: primer elemento de la jerarquia del formulario, con area tactil amplia. */}
                     <div className="mx-auto mb-6 flex flex-col items-center gap-2">
                         <button type="button" onClick={() => avatarInputRef.current?.click()} aria-label="Agregar foto de perfil" className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-(--primary-950) text-black cursor-pointer transition-colors hover:bg-black/5">
                            {avatarPreview ? <img src={avatarPreview} alt="Foto de perfil" className="h-full w-full object-cover" /> : <UserRoundPlus size={40} />}
                        </button>

                         <input ref={avatarInputRef} type="file" accept="image/*" hidden onChange={handleAvatarChange} />
                    </div>

                     <div className="mx-auto grid grid-cols sm:grid-cols-3 gap-6 rounded-md border p-8">
                         <Input label="Nombre 1" name="userFirstName" placeholder="Ingrese el primer nombre" value={formData.userFirstName} onChange={handleChange} error={errors.userFirstName} />

                         <Input label="Nombre 2" name="userMiddleName" placeholder="Ingrese el segundo nombre" value={formData.userMiddleName} onChange={handleChange} error={errors.userMiddleName} />

                         <Input label="Apellido 1" name="userLastName1" placeholder="Ingrese el primer apellido" value={formData.userLastName1} onChange={handleChange} error={errors.userLastName1} />

                         <Input label="Apellido 2" name="userLastName2" placeholder="Ingrese el segundo apellido" value={formData.userLastName2} onChange={handleChange} error={errors.userLastName2} />

                         <Select label="Tipo de Documento" name="userDocumentType" options={documentTypeOptions} value={formData.userDocumentType} onChange={handleChange} error={errors.userDocumentType} />

                         <Input label="Número de Documento" name="userDocumentNumber" placeholder="Ingrese el número de documento" value={formData.userDocumentNumber} onChange={handleChange} error={errors.userDocumentNumber} />

                         <Select label="Tipo de Usuario" name="userGroup" options={groupOptions} value={formData.userGroup} onChange={handleChange} error={errors.userGroup} />

                         <Select label="Estado" name="userStatus" options={statusOptions} value={formData.userStatus} onChange={handleChange} error={errors.userStatus} />

                         <Input label="Correo Electronico" name="userEmail" placeholder="Ingrese su correo" type="email" autoComplete="off" value={formData.userEmail} onChange={handleChange} error={errors.userEmail} />

                         <Input label="Correo Institucional" name="userInstitutionalEmail" placeholder="Ingrese su correo institucional" type="email" value={formData.userInstitutionalEmail} onChange={handleChange} error={errors.userInstitutionalEmail} />

                         <Input label="Numero de Celular" name="userPhone" placeholder="Ingrese su número de celular" type="tel" value={formData.userPhone} onChange={handleChange} error={errors.userPhone} />

                         <Input label="Direccion" name="userAddress" placeholder="Ingrese su dirección" value={formData.userAddress} onChange={handleChange} error={errors.userAddress} />

                         <Input label="Fecha de Inicio" name="userStartDate" type="date" value={formData.userStartDate} onChange={handleChange} error={errors.userStartDate} />

                         <Input label="Fecha de Finalizacion" name="userEndDate" type="date" value={formData.userEndDate} onChange={handleChange} error={errors.userEndDate} />

                         <Input label="Contrasena" name="userPassword" placeholder={isEditing ? "Dejar en blanco para no cambiarla" : "Ingrese su contrasena"} type={showPassword ? "text" : "password"} autoComplete="new-password" value={formData.userPassword} onChange={handleChange} error={errors.userPassword} endAdornment={<button type="button" onClick={() => setShowPassword(prev => !prev)} aria-label={showPassword ? "Ocultar contrasena" : "Mostrar contrasena"} className="text-black cursor-pointer">
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>} />

                         {/* Fila de acciones dentro del recuadro: Cancelar en la esquina inferior izquierda, Guardar en la esquina inferior derecha. */}
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
        </div>;
}

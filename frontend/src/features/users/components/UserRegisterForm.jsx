import { useState, useEffect } from "react";
import { getDocumentTypes } from "../services/selectService";
import { userSchema } from "../schemas/userSchema";
import { createUser } from "../services/userService";
import { 
    Input, 
    Button, 
    Select, 
    Checkbox, 
    IconButton, 
    Dropdown, 
    DropdownTrigger, 
    DropdownContent, 
    DropdownItem, 
    FileInput 
} from "@/shared";
import { Link, useNavigate } from "react-router-dom";
import { SquareArrowRightEnter, Menu, MoveLeft } from "lucide-react";



export default function UserRegisterForm({
    backgroundImage = null,
    nextTo = "/dashboard",
    cancelTo = "/",
    showBackButton = false,
    backTo = "/auth",
}){
    const navigate = useNavigate();
    //Estados
    
    const [documentType, setDocumentType] = useState([]);
    const [formData, setFormData] = useState({
        userName: "",
        userEmail: "",
        userPhone: "",
        userDocumentType: "",
        userDocumentNumber: "",
        userPassword: "",
        isStaff: false,
        isActive: true,
        isSuperUser: false,
        userImage: [],
    });

    useEffect(() => {
        getDocumentTypes().then(setDocumentType);
    },[]);

    // ===========================================
    //          Handle Genérico 
    // ===========================================
    /**
     * Función que se ejecuta cada vez que cambia el valor de un input del formulario
     */
    const handleChange = (e) => {
        // Se obtiene el nombre del input y su valor
        const { name, type, value, checked } = e.target;

        // Se actualiza el estado del formulario con el nuevo valor
        setFormData((prev) => ({
            // Se copian todos los valores anteriores del estado
            ...prev,

            // Se actualiza el valor del input que cambió
            [name]: type === "checkbox" ? checked : value, 
        }))
    };

    const [ errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    
    
    // ============ Handle Submit ==============
    /**
     * Función que se ejecuta cada vez que se envía el formulario
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = userSchema.safeParse(formData);

        if(!result.success){
            const feldErrors = {};
            result.error.issues.forEach((issue) => {
                feldErrors[issue.path[0]] = issue.message;
            });
            setErrors(feldErrors);
            return;
        }

        setErrors({});
        setIsSubmitting(true);
        const showBrowserNotification = (title, body) => {
            if (typeof window === 'undefined') return;
            if (!('Notification' in window)) {
                alert(body);
                return;
            }

            if (Notification.permission === 'granted') {
                new Notification(title, { body });
                return;
            }

            if (Notification.permission !== 'denied') {
                Notification.requestPermission().then((permission) => {
                    if (permission === 'granted') new Notification(title, { body });
                    else alert(body);
                });
                return;
            }

            alert(body);
        };

        try {
            const payload = {
                name: result.data.userName,
                userEmail: result.data.userEmail,
                phone: result.data.userPhone,
                documentType: result.data.userDocumentType,
                documentNumber: result.data.userDocumentNumber,
                password: result.data.userPassword,
                // avatarUrl: could be derived from uploaded file; leave null for now
                avatarUrl: null,
                isStaff: result.data.isStaff,
                isActive: result.data.isActive,
                isSuperUser: result.data.isSuperUser,
            };
            const res = await createUser(payload);
            showBrowserNotification('Usuario creado', res?.message ?? 'Usuario creado correctamente');
            navigate(nextTo);
        } catch (err) {
            console.error(err);
            alert("Error al guardar usuario: " + (err?.message || err));
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <div
            className={`relative min-h-[calc(100vh-4rem)] w-full flex-1 overflow-hidden p-6 ${backgroundImage ? "bg-cover bg-center" : ""}`}
            style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : undefined}
        >
            <div className="relative text-black [&_button]:text-black [&_h1]:text-black [&_input]:text-black [&_input::placeholder]:text-black/70 [&_label]:text-black [&_select]:text-black [&_span]:text-black">
                {showBackButton && (
                    <div className="mb-4">
                        <IconButton
                            ariaLabel="Volver"
                            variant="ghost"
                            onClick={() => navigate(backTo)}
                            className="text-black"
                        >
                            <MoveLeft />
                        </IconButton>
                    </div>
                )}

                <h1 className="mb-6 text-center text-2xl text-text-primary">
                    Registro de usuarios
                </h1>

                <form className="grid grid-cols-1 items-center" onSubmit={handleSubmit} noValidate>
                    <div className="mx-auto grid grid-cols sm:grid-cols-2 gap-6 rounded-md border p-12">
                        <Input
                            label="Nombre"
                            name="userName"
                            placeholder="Ingrese su nombre"
                            value={formData.userName}
                            onChange={handleChange}
                            error={errors.userName}
                        />

                        <Input
                            label="Correo"
                            name="userEmail"
                            placeholder="Ingrese su correo"
                            type="email"
                            value={formData.userEmail}
                            onChange={handleChange}
                            error={errors.userEmail}
                        />

                        <Input
                            label="Telefono"
                            name="userPhone"
                            placeholder="Ingrese su telefono"
                            type="tel"
                            value={formData.userPhone}
                            onChange={handleChange}
                            error={errors.userPhone}
                        />

                        <Select
                            label="Tipo de documento"
                            name="userDocumentType"
                            options={documentType}
                            value={formData.userDocumentType}
                            onChange={handleChange}
                            error={errors.userDocumentType}
                        />

                        <Input
                            label="Número de documento"
                            name="userDocumentNumber"
                            placeholder="Ingrese su número de documento"
                            value={formData.userDocumentNumber}
                            onChange={handleChange}
                            error={errors.userDocumentNumber}
                        />

                        <Input
                            label="Contrasena"
                            name="userPassword"
                            placeholder="Ingrese su contrasena"
                            type="password"
                            value={formData.userPassword}
                            onChange={handleChange}
                            error={errors.userPassword}
                        />

                        <div className="flex h-12 items-center">
                            <Checkbox
                                id="isSuperUser"
                                name="isSuperUser"
                                label="Es super usuario"
                                checked={formData.isSuperUser}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="flex h-12 items-center gap-4">
                            <FileInput
                                value={formData.userImage}
                                onChange={(files) =>
                                    setFormData((prev) => ({ ...prev, userImage: files }))
                                }
                                multiple={true}
                            />
                        </div>
                    </div>

                    <div className="flex h-12 items-center justify-end gap-6">
                        <Button variant="secondary" type="button" onClick={() => navigate(cancelTo)}>
                            Cancelar
                        </Button>

                        <Button variant="primary" type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Guardando..." : "Guardar"}
                        </Button>

                        <IconButton ariaLabel="Ir al dashboard" variant="ghost" onClick={() => navigate(nextTo)}>
                            <SquareArrowRightEnter />
                        </IconButton>

                        <Dropdown>
                            <DropdownTrigger>
                                <IconButton ariaLabel="Menú de usuario">
                                    <Menu />
                                </IconButton>
                            </DropdownTrigger>

                            <DropdownContent>
                                <DropdownItem>
                                    <Link to="/auth" className="block w-full">
                                        Autenticación
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


/* Importamos useState desde "react". Esto permite usar esa pieza en este archivo sin volver a escribir su logica. */
import { useState } from "react";
// import { userSchema } from "../schemas/userSchema";

import { Input, Button, IconButton } from "@/shared";
/* Importamos useNavigate desde "react-router-dom". Esto permite usar esa pieza en este archivo sin volver a escribir su logica. */
import { useNavigate } from "react-router-dom";
/* Importamos MoveLeft desde "lucide-react". Esto permite usar esa pieza en este archivo sin volver a escribir su logica. */
import { MoveLeft } from "lucide-react";
/* Declaramos API_URL. Este valor se usa despues para mantener la logica ordenada y evitar repetir codigo. */
const API_URL = "http://localhost:4000/api/auth/login";
/* Exportamos como valor principal de este archivo la funcion, pagina o configuracion que representa este modulo. */
export default
/* Esta funcion Login agrupa la logica de esta parte del proyecto. Recibe datos, los procesa y devuelve el resultado necesario. */
function Login({
  nextTo = "/dashboard",
  cancelTo = "/",
  showBackButton = false,
  backTo = "/auth"
}) {
  /* Creamos navigate con useNavigate. Esto permite mover al usuario a otra ruta desde codigo, por ejemplo despues de guardar o cancelar. */
  const navigate = useNavigate();
  /* Creamos [formData, setFormData] con useState. Esto guarda un dato que puede cambiar y hace que React actualice la pantalla cuando se modifica. */
  const [formData, setFormData] = useState({
    userEmail: "",
    userPassword: ""
  });
  /* Creamos [errorMessage, setErrorMessage] con useState. Esto guarda un dato que puede cambiar y hace que React actualice la pantalla cuando se modifica. */
  const [errorMessage, setErrorMessage] = useState("");
  /* Creamos [isSubmitting, setIsSubmitting] con useState. Esto guarda un dato que puede cambiar y hace que React actualice la pantalla cuando se modifica. */
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  // ============ Handle Submit ==============
  /**
   * Función que se ejecuta cada vez que se envía el formulario
   */

  const handleSubmit = async e => {
    /* Ejecutamos e.preventDefault para usar una utilidad o metodo propio de ese objeto. */
    e.preventDefault();
    /* Actualizamos el estado usando setErrorMessage; esto hace que React vuelva a renderizar con el nuevo dato. */
    setErrorMessage("");
    /* Actualizamos el estado usando setIsSubmitting; esto hace que React vuelva a renderizar con el nuevo dato. */
    setIsSubmitting(true);
    /* Intentamos ejecutar una operacion que puede fallar, como guardar datos, consultar la API o generar un reporte. */
    try {
      /* Declaramos response. Este valor se usa despues para mantener la logica ordenada y evitar repetir codigo. */
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      /* Declaramos data. Este valor se usa despues para mantener la logica ordenada y evitar repetir codigo. */
      const data = await response.json();
      /* Validamos esta condicion para decidir que hacer. Si se cumple, manejamos un caso especial como error, dato faltante, permiso o estado deshabilitado. */
      if (!response.ok) {
        throw new Error(data.error || "No fue posible iniciar sesión");
      }
      /* Usamos sessionStorage.setItem para leer o guardar datos del navegador, como token o usuario. */
      sessionStorage.setItem("token", data.token);
      /* Usamos sessionStorage.setItem para leer o guardar datos del navegador, como token o usuario. */
      sessionStorage.setItem("user", JSON.stringify(data.user));
      /* Llamamos a navigate para ejecutar una accion necesaria en este punto del flujo. */
      navigate(nextTo, {
        replace: true
      });
    } /* Capturamos el error para mostrar un mensaje, limpiar estados o evitar que la aplicacion se rompa por completo. */catch (error) {
      /* Actualizamos el estado usando setErrorMessage; esto hace que React vuelva a renderizar con el nuevo dato. */
      setErrorMessage(error.message);
    } finally {
      /* Actualizamos el estado usando setIsSubmitting; esto hace que React vuelva a renderizar con el nuevo dato. */
      setIsSubmitting(false);
    }
  };

  //

  /* Devolvemos la interfaz JSX que React pintara en pantalla. Aqui se conectan los datos y eventos con los componentes visuales. */
  return <section className="w-full max-w-md text-black [&_button]:text-black [&_h1]:text-black [&_input]:text-black [&_input::placeholder]:text-black/70 [&_label]:text-black [&_select]:text-black [&_span]:text-black">

            {showBackButton && <div className="mb-4">
                     <IconButton ariaLabel="Volver" variant="ghost" onClick={() => navigate(backTo)} className="text-black">
                         <MoveLeft />
                    </IconButton>
                </div>}

             <h1 className='text-text-primary text-2xl mb-6 text-center '>
                Iniciar sesión
            </h1>

             <form className="grid grid-cols-1 items-center " onSubmit={handleSubmit} noValidate>


                 <div className="mx-auto grid w-full max-w-md gap-6 rounded-md border bg-white/80 p-8 shadow-lg backdrop-blur-sm">

                    {/* Inputs */}

                     <Input label="Correo" name="userEmail" placeholder="Ingrese su correo" type="email" value={formData.userEmail} onChange={handleChange} />

                     <Input label="Contrasena" name="userPassword" placeholder="Ingrese su contrasena" type='password' value={formData.userPassword} onChange={handleChange} />

                    {errorMessage && <p className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                            {errorMessage}
                        </p>}


                {/* Actions */}

                 <div className="flex justify-center gap-4 pt-2">
                     <Button variant="secondary" type="button" onClick={() => navigate(cancelTo)}>
                        Cancelar
                    </Button>

                     <Button variant="primary" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Ingresando..." : "Iniciar sesión"}
                    </Button>

                </div>
            </div>
        </form>
    </section>;
}
/* Explicacion pedagogica: esta importacion trae dependencias externas o modulos internos que este archivo necesita para funcionar sin duplicar codigo. */
import { RouterProvider } from "react-router-dom";
/* Explicacion pedagogica: esta importacion trae dependencias externas o modulos internos que este archivo necesita para funcionar sin duplicar codigo. */
import router from "./routes";
/* Importa el Toaster de Sileo; se monta una sola vez en la raiz para que cualquier pantalla pueda disparar notificaciones con sileo.success/error/etc. */
import { Toaster } from "sileo";
/* Explicacion pedagogica: esta exportacion por defecto entrega la pieza principal del archivo, normalmente una pagina, componente, servicio o configuracion. */
export default
/* Explicacion pedagogica: esta funcion concentra una responsabilidad del archivo; puede renderizar interfaz, proteger rutas, llamar servicios o transformar datos. */
function App() {
  /* Explicacion pedagogica: este return devuelve el resultado de la funcion; en componentes React suele devolver la interfaz JSX que vera el usuario. */
  return (
    <>
      <Toaster position="top-right" />
      <RouterProvider router={router} />
    </>
  );
}

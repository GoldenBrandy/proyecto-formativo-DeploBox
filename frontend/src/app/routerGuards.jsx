/* Explicacion pedagogica: esta importacion trae dependencias externas o modulos internos que este archivo necesita para funcionar sin duplicar codigo. */
import { Navigate, useLocation } from "react-router-dom";
/* Explicacion pedagogica: esta importacion trae dependencias externas o modulos internos que este archivo necesita para funcionar sin duplicar codigo. */
import { Login } from "@/features/auth";
/* Explicacion pedagogica: esta exportacion nombrada publica una pieza concreta del modulo para que otras partes del frontend puedan reutilizarla. */
export
/* Explicacion pedagogica: esta funcion concentra una responsabilidad del archivo; puede renderizar interfaz, proteger rutas, llamar servicios o transformar datos. */
function RequireAuth({
  children
}) {
  /* Explicacion pedagogica: esta declaracion crea una constante, estado, configuracion o helper que sera usado por la logica del archivo. */
  const location = useLocation();
  /* Explicacion pedagogica: esta declaracion crea una constante, estado, configuracion o helper que sera usado por la logica del archivo. */
  const token = sessionStorage.getItem("token");
  /* Explicacion pedagogica: esta condicion decide que camino seguir segun datos, errores, permisos, autenticacion o estado de la interfaz. */
  if (!token) {
    /* Explicacion pedagogica: este return devuelve el resultado de la funcion; en componentes React suele devolver la interfaz JSX que vera el usuario. */
    return <Navigate to="/auth" replace state={{
      from: location.pathname
    }} />;
  }
  /* Explicacion pedagogica: este return devuelve el resultado de la funcion; en componentes React suele devolver la interfaz JSX que vera el usuario. */
  return children;
}
/* Explicacion pedagogica: esta exportacion nombrada publica una pieza concreta del modulo para que otras partes del frontend puedan reutilizarla. */
export
/* Explicacion pedagogica: esta funcion concentra una responsabilidad del archivo; puede renderizar interfaz, proteger rutas, llamar servicios o transformar datos. */
function LoginRoute({
  cancelTo = "/auth"
}) {
  /* Explicacion pedagogica: esta declaracion crea una constante, estado, configuracion o helper que sera usado por la logica del archivo. */
  const location = useLocation();
  /* Explicacion pedagogica: esta declaracion crea una constante, estado, configuracion o helper que sera usado por la logica del archivo. */
  const nextTo = location.state?.from ?? "/dashboard";
  /* Explicacion pedagogica: este return devuelve el resultado de la funcion; en componentes React suele devolver la interfaz JSX que vera el usuario. */
  return <Login nextTo={nextTo} cancelTo={cancelTo} />;
}
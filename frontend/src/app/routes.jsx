/* Explicacion pedagogica: esta importacion trae dependencias externas o modulos internos que este archivo necesita para funcionar sin duplicar codigo. */
import { createBrowserRouter, Navigate } from "react-router-dom";
/* Explicacion pedagogica: esta importacion trae dependencias externas o modulos internos que este archivo necesita para funcionar sin duplicar codigo. */
import { AuthLayout, DashboardLayout } from "@/shared";
/* Explicacion pedagogica: esta importacion trae dependencias externas o modulos internos que este archivo necesita para funcionar sin duplicar codigo. */
import { Login } from "@/features/auth";
/* Explicacion pedagogica: esta importacion trae dependencias externas o modulos internos que este archivo necesita para funcionar sin duplicar codigo. */
import { CreateUserPage, ListUserPage, EditUserPage } from "@/features/users";
/* Explicacion pedagogica: esta importacion trae dependencias externas o modulos internos que este archivo necesita para funcionar sin duplicar codigo. */
import { AccessPage } from "@/features/access";
/* Explicacion pedagogica: esta importacion trae dependencias externas o modulos internos que este archivo necesita para funcionar sin duplicar codigo. */
import { ListMaterialPage, CreateMaterialPage, EditMaterialPage } from "@/features/materiales";
/* Explicacion pedagogica: esta importacion trae dependencias externas o modulos internos que este archivo necesita para funcionar sin duplicar codigo. */
import { CreateGrupoPage } from "@/features/grupos";
/* Explicacion pedagogica: esta importacion trae dependencias externas o modulos internos que este archivo necesita para funcionar sin duplicar codigo. */
import { CreateProductoPage } from "@/features/productos";
/* Explicacion pedagogica: esta importacion trae dependencias externas o modulos internos que este archivo necesita para funcionar sin duplicar codigo. */
import { ListReportesPage } from "@/features/reportes";
/* Explicacion pedagogica: esta importacion trae dependencias externas o modulos internos que este archivo necesita para funcionar sin duplicar codigo. */
import { LoginRoute, RequireAuth } from "./routerGuards";
/* Explicacion pedagogica: esta declaracion crea una constante, estado, configuracion o helper que sera usado por la logica del archivo. */
const router = createBrowserRouter([{
  path: "/",
  element: <Navigate to="/auth" replace />
}, {
  path: "/auth",
  element: <AuthLayout />,
  children: [{
    index: true,
    element: <LoginRoute />
  }]
}, {
  path: "/dashboard-layout",
  element: <RequireAuth>
                 <DashboardLayout />
            </RequireAuth>,
  children: [{
    index: true,
    element: <h1></h1>
  }, {
    path: "contacto",
    element: <h1> Contacto</h1>
  }, {
    path: "productos",
    element: <h1> Productos</h1>
  }, {
    path: "permisos",
    element: <AccessPage />
  }]
}, {
  path: "/dashboard",
  element: <RequireAuth>
                 <DashboardLayout />
            </RequireAuth>,
  children: [{
    index: true,
    element: <CreateUserPage />
  }, {
    path: "userList",
    element: <ListUserPage />
  }, {
    path: "users",
    element: <ListUserPage />
  }, {
    path: "users/:id/edit",
    element: <EditUserPage />
  }, {
    path: "permisos",
    element: <AccessPage />
  }, {
    path: "materiales",
    element: <ListMaterialPage />
  }, {
    path: "materiales/crear",
    element: <CreateMaterialPage />
  }, {
    path: "materiales/:id/edit",
    element: <EditMaterialPage />
  }, {
    path: "grupos",
    element: <CreateGrupoPage />
  }, {
    path: "productos",
    element: <CreateProductoPage />
  }, {
    path: "reportes",
    element: <ListReportesPage />
  }]
}]);
/* Explicacion pedagogica: esta exportacion por defecto entrega la pieza principal del archivo, normalmente una pagina, componente, servicio o configuracion. */
export default router;
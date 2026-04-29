import { createBrowserRouter, Navigate  } from "react-router-dom";
import { AuthLayout, DashboardLayout, Dashboard } from "@/shared";

const router = createBrowserRouter([

    {
        path: "/",
        element: <Navigate to="/auth" replace />,
    },
    {
        path: "/auth",
        element: <AuthLayout/>,
        children:[{index: true, element: <h1> Inicio Auth</h1>}],
    },
    {
        path:"/dashboard-layout",
        element: <DashboardLayout />,
        children: [
            { index: true,element: <h1> Inicio Dashboard Layout</h1>},
            { path: "contacto" ,element: <h1> Contacto</h1>},
            { path: "usuarios",element: <h1> Usuarios</h1>},
            { path: "productos",element: <h1> Productos</h1>},
            
        ],
    },
    {
        path:"/dashboard",
        element: <Dashboard />,
    },
  
]);

export default router;
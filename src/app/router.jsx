import { createBrowserRouter, Navigate  } from "react-router-dom";
import { AuthLayout, DashboardLayout, Dashboard } from "@/shared";
import { Login } from "@/features/auth/components";
import { CreateUserPage } from "@/features/users";

const router = createBrowserRouter([

    {
        path: "/",
        element: <Navigate to="/auth" replace />,
    },
    {
        path: "/auth",
        element: <AuthLayout/>,
        children:[{index: true, element: <Login nextTo="/dashboard" />}],
    },
    {
        path:"/dashboard-layout",
        element: <DashboardLayout />,
        children: [
            { index: true,element: <h1></h1>},
            { path: "contacto" ,element: <h1> Contacto</h1>},
            { path: "usuarios",element: <h1> Usuarios</h1>},
            { path: "productos",element: <h1> Productos</h1>},
            
        ],
    },
    {
        path:"/dashboard",
        element: <Dashboard />,
        children: [
            { index: true, element: <CreateUserPage /> },
            {
                path: "auth",
                element: (
                    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-6">
                        <Login nextTo="/dashboard" cancelTo="/dashboard" />
                    </div>
                ),
            },
        ],
    },
  
]);

export default router;

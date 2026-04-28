import { createBrowserRouter } from "react-router-dom";
import { CreateUserPage } from "@/features/users";
import {
    AuthLayout,
    CallToActionLayout,
    DashboardLayout,
} from "@/shared";

const router = createBrowserRouter([
    {
        element: <CallToActionLayout />,
        children: [
            {
                path: "/",
                element: <CreateUserPage />,
            },
            {
                path: "cursos",
                element: <h1 className="p-4 text-h2">Cursos</h1>,
            },
            {
                path: "recursos",
                element: <h1 className="p-4 text-h2">Recursos</h1>,
            },
            {
                path: "contacto",
                element: <h1 className="p-4 text-h2">Contacto</h1>,
            },
        ],
    },
    {
        path: "auth",
        element: <AuthLayout />,
        children: [
            {
                index: true,
                element: <CreateUserPage />,
            },
        ],
    },
    {
        path: "dashboard",
        element: <DashboardLayout />,
        children: [
            {
                index: true,
                element: <CreateUserPage />,
            },
        ],
    },
]);

export default router;

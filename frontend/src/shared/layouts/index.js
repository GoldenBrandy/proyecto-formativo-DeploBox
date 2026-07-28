// Reexporta AuthLayout para que las rutas de autenticacion lo usen desde "@/shared".
export { default as AuthLayout } from "./AuthLayout";
// Reexporta DashboardLayout como layout principal del area autenticada.
export { default as DashboardLayout } from "./DashboardLayout";
// Reexporta MainLayout como contenedor principal simple.
export { default as MainLayout } from "./MainLayout";
// Reexporta Navbar para usar la navegacion compartida desde cualquier feature.
export { default as Navbar } from "./Navbar";
// Reexporta Footer para que el pie de pagina tenga un contrato publico.
export { default as Footer } from "./Footer";
// Reexporta CallToActionLayout para que tambien este disponible desde "@/shared".
export { default as CallToActionLayout } from "./CallToActionLayout";

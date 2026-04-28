import { Link, Outlet } from "react-router-dom";

export default function CallToActionLayout() {
    return (
        <div className="flex min-h-screen flex-col bg-background text-text-primary">
            <header className="border-b border-border bg-surface">
                <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                    <Link to="/" className="text-h3 font-heading text-brand">
                        Proyecto Formativo
                    </Link>

                    <div className="flex items-center gap-4 text-small">
                        <Link className="hover:text-brand" to="/">
                            Inicio
                        </Link>
                        <Link className="hover:text-brand" to="/cursos">
                            Cursos
                        </Link>
                        <Link className="hover:text-brand" to="/recursos">
                            Recursos
                        </Link>
                        <Link className="hover:text-brand" to="/contacto">
                            Contacto
                        </Link>
                    </div>
                </nav>
            </header>

            <main className="flex flex-1">
                <Outlet />
            </main>
        </div>
    );
}

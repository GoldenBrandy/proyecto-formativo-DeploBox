import { Link, Outlet } from "react-router-dom";

export default function DashboardLayout() {
    return (
        <div className="min-h-screen bg-background text-text-primary">
            <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-border bg-surface p-6 md:block">
                <Link to="/" className="text-h3 font-heading text-brand">
                    Dashboard
                </Link>
            </aside>

            <main className="min-h-screen px-6 py-8 md:ml-64">
                <Outlet />
            </main>
        </div>
    );
}

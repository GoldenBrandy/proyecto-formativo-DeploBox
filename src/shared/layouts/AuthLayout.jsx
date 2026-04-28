import { Outlet } from "react-router-dom";

export default function AuthLayout() {
    return (
        <main className="min-h-screen bg-background px-6 py-10 text-text-primary">
            <Outlet />
        </main>
    );
}

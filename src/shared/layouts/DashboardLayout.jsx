import dashboardBackground from "@/assets/images/bg-4.jpg";
import { CreateUserPage } from "@/features/users";
import { Navbar } from "@/shared";

export default function DashboardLayout() {
    return (
        <main className="min-h-screen">
            <CreateUserPage
                backgroundImage={dashboardBackground}
                cancelTo="/auth"
                nextTo="/dashboard"
            />
            <Navbar />
        </main>
    );
}

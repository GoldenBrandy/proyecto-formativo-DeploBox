import dashboardBackground from "@/assets/images/bg-2.jpg";
import { CreateUserPage } from "@/features/users";

export default function DashboardLayout() {
    return (
        <main className="min-h-screen">
            <CreateUserPage
                backgroundImage={dashboardBackground}
                cancelTo="/auth"
                nextTo="/dashboard"
            />
        </main>
    );
}

import dashboardBackground from "@/assets/images/bg-1.jpg";
import { useNavigate } from "react-router-dom";
import { MoveLeft } from "lucide-react";
import { IconButton } from "@/shared";

export default function Dashboard() {
    const navigate = useNavigate();

    return (
        <main
            className="relative min-h-screen w-full bg-cover bg-center p-6"
            style={{ backgroundImage: `url(${dashboardBackground})` }}
        >
            <IconButton
                ariaLabel="Volver"
                variant="ghost"
                onClick={() => navigate("/dashboard-layout")}
                className="text-black"
            >
                <MoveLeft />
            </IconButton>
        </main>
    );
}

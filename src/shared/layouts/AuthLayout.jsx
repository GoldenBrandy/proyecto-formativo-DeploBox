import { Outlet } from "react-router-dom";
import heroBg from "@/assets/images/bg-4.jpg";

export default function AuthLayout(){
    return(
        <div className="relative min-h-screen text-text-primary">

            <div
                className="absolute inset-0 -z-10 bg-cover bg-center"
                style={{ backgroundImage: `url(${heroBg})` }}
            />

            <main className="relative flex min-h-screen items-center justify-center p-6">
                <Outlet />
            </main>

        </div>
    );
}

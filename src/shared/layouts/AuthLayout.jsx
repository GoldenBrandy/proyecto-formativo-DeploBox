import { Outlet } from "react-router-dom"
import heroBg from "@/assets/images/bg-4.jpg";
import { CreateUserPage } from "@/features/users"

export default function MainLayout(){
    return(
        <div className="relative min-h-screen text-text-primary ">

        <div
             className="absolute inset-0 -z-10 bg-cover bg-center"
             style = {{backgroundImage: `url(${heroBg})`}}
             />
             <CreateUserPage nextTo="/dashboard-layout" />
             </div>
    );
}
import UserRegisterForm from "../components/UserRegisterForm";

export default function EditUserPage(props){

    return(
        <div className="w-full flex justify-center">

            <UserRegisterForm {...props} showBackButton={true} backTo="/dashboard" nextTo="/dashboard" />

        </div>

    )

}

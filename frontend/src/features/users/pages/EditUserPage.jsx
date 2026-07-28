/* Importamos UserRegisterForm desde "../components/UserRegisterForm". Esto permite usar esa pieza en este archivo sin volver a escribir su logica. */
import UserRegisterForm from "../components/UserRegisterForm";
/* Importamos useParams para leer el id del usuario desde la URL. */
import { useParams } from "react-router-dom";
/* Exportamos como valor principal de este archivo la funcion, pagina o configuracion que representa este modulo. */
export default
/* Esta funcion EditUserPage construye una pantalla completa. Aqui se preparan datos, eventos y componentes que vera el usuario. */
function EditUserPage(props) {
  /* Lee el id del usuario a editar desde los parametros de la ruta (/dashboard/users/:id/edit). */
  const { id } = useParams();
  /* Devolvemos la interfaz JSX que React pintara en pantalla. Aqui se conectan los datos y eventos con los componentes visuales. */
  return <div className="w-full flex justify-center">

             <UserRegisterForm {...props} userId={id} showBackButton={true} backTo="/dashboard" nextTo="/dashboard" />

        </div>;
}

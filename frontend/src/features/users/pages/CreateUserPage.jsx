/* Importamos UserRegisterForm desde "../components/UserRegisterForm". Esto permite usar esa pieza en este archivo sin volver a escribir su logica. */
import UserRegisterForm from "../components/UserRegisterForm";
/* Exportamos como valor principal de este archivo la funcion, pagina o configuracion que representa este modulo. */
export default
/* Esta funcion CreateUserPage construye una pantalla completa. Aqui se preparan datos, eventos y componentes que vera el usuario. */
function CreateUserPage(props) {
  /* Devolvemos la interfaz JSX que React pintara en pantalla. Aqui se conectan los datos y eventos con los componentes visuales. */
  return <div className="w-full flex justify-center">

             <UserRegisterForm {...props} />

        </div>;
}
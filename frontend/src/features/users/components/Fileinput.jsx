/* Exportamos como valor principal de este archivo la funcion, pagina o configuracion que representa este modulo. */
export default
/* Esta funcion UserFeatureFileinput agrupa la logica de esta parte del proyecto. Recibe datos, los procesa y devuelve el resultado necesario. */
function UserFeatureFileinput(props) {
  /* Devolvemos la interfaz JSX que React pintara en pantalla. Aqui se conectan los datos y eventos con los componentes visuales. */
  return <input type="file" {...props} />;
}
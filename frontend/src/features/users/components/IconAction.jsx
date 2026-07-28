/* Exportamos como valor principal de este archivo la funcion, pagina o configuracion que representa este modulo. */
export default
/* Esta funcion UserFeatureIconAction agrupa la logica de esta parte del proyecto. Recibe datos, los procesa y devuelve el resultado necesario. */
function UserFeatureIconAction({
  children,
  type = "button",
  ...props
}) {
  /* Devolvemos la interfaz JSX que React pintara en pantalla. Aqui se conectan los datos y eventos con los componentes visuales. */
  return <button type={type} {...props}>{children}</button>;
}
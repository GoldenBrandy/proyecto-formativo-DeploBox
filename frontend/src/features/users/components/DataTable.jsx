/* Exportamos como valor principal de este archivo la funcion, pagina o configuracion que representa este modulo. */
export default
/* Esta funcion UserFeatureDataTable agrupa la logica de esta parte del proyecto. Recibe datos, los procesa y devuelve el resultado necesario. */
function UserFeatureDataTable({
  rows = []
}) {
  /* Devolvemos la interfaz JSX que React pintara en pantalla. Aqui se conectan los datos y eventos con los componentes visuales. */
  return <table>
            {}
            <tbody>
                {}
                {rows.map((row, index) => <tr key={index}>
                        {}
                        <td>{JSON.stringify(row)}</td>
                    {}
                    </tr>)}
            {}
            </tbody>
        {}
        </table>;
}
import datosJSON from "../assets/datosATC.json";
import "./ChatComponent.css";

const datos = JSON.parse(JSON.stringify(datosJSON), (key, value) => {
  if (key === "pregunta" || key ==="respuesta") return value.toUpperCase();
  return value;
});

function Chat() {
  return (
    <div className="pagina">
      <h2 className="titulo">Fisofi</h2>
      {datos.map((m, index) => (
        <div key={index}>
          <div className="fila izquierda">
            <div className="burbuja usuario">
              <span className="etiqueta">Usuario</span>
              {m.pregunta}
            </div>
          </div>
          <div className="fila derecha">
            <div className="burbuja asistente">
              <span className="etiqueta">Asistente</span>
              {m.respuesta}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Chat;

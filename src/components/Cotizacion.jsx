import { useState } from "react";

function Cotizacion() {
  var [asistentes, setAsistentes] = useState("1");
  var [paquete, setPaquete] = useState("1200");
  var [transporte, setTransporte] = useState(false);
  var [alimentacion, setAlimentacion] = useState(false);
  var [equipo, setEquipo] = useState(false);

  var cantidad = parseInt(asistentes);
  var precio = parseFloat(paquete);
  var extra = 0;

  if (transporte) extra += 250;
  if (alimentacion) extra += 320;
  if (equipo) extra += 200;

  var total = cantidad > 0 ? cantidad * (precio + extra) : 0;
  var resultado =
    cantidad > 0
      ? "Total estimado: Q" +
        total.toLocaleString("es-GT", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }) +
        " para " +
        cantidad +
        " persona(s)."
      : "Ingresa un numero valido de asistentes.";

  return (
    <section id="cotizacion">
      <h2>Cotizacion</h2>
      <form id="form-cotizacion">
        <label>
          Numero de asistentes
          <input
            type="number"
            id="asistentes"
            min="1"
            value={asistentes}
            onChange={function (e) {
              setAsistentes(e.target.value);
            }}
          />
        </label>
        <label>
          Tipo de paquete
          <select
            id="paquete"
            value={paquete}
            onChange={function (e) {
              setPaquete(e.target.value);
            }}
          >
            <option value="1200">Basico — Q1,200 por persona</option>
            <option value="2000">Estandar — Q2,000 por persona</option>
            <option value="3200">Premium — Q3,200 por persona</option>
          </select>
        </label>
        <p className="servicios-titulo">Servicios adicionales:</p>
        <label className="check">
          <input
            type="checkbox"
            id="transporte"
            checked={transporte}
            onChange={function (e) {
              setTransporte(e.target.checked);
            }}
          />{" "}
          Transporte incluido (+Q250 por persona)
        </label>
        <label className="check">
          <input
            type="checkbox"
            id="alimentacion"
            checked={alimentacion}
            onChange={function (e) {
              setAlimentacion(e.target.checked);
            }}
          />{" "}
          Alimentacion (+Q320 por persona)
        </label>
        <label className="check">
          <input
            type="checkbox"
            id="equipo"
            checked={equipo}
            onChange={function (e) {
              setEquipo(e.target.checked);
            }}
          />{" "}
          Equipo de aventura (+Q200 por persona)
        </label>

        <p id="resultado-cotizacion">{resultado}</p>
      </form>
    </section>
  );
}

export default Cotizacion;

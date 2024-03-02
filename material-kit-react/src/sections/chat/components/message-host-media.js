import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import { Card, Grid, Typography, SvgIcon } from "@mui/material";

export const MessageHostMedia = (props) => {
  const formatTimestamp = (timestamp) => {
    const fecha = new Date(timestamp * 1000);

    const año = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const dia = String(fecha.getDate()).padStart(2, "0");
    const horas = String(fecha.getHours()).padStart(2, "0");
    const minutos = String(fecha.getMinutes()).padStart(2, "0");
    const segundos = String(fecha.getSeconds()).padStart(2, "0");

    return `${año}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;
  };

  return (
    <div style={{ display: "flex", width: "100%", justifyContent: "end" }}>
      <div
        style={{
          backgroundColor: "yellowgreen",
          padding: 10,
          borderRadius: 15,
          maxWidth: "70%",
          marginBottom: 10,
        }}
      >
        <div>
          <img width={60} style={{ borderRadius: 20, marginRight: 10 }} src="../favicon.ico" />
          <Typography style={{ position: "relative", top: -13 }} variant="small">
            TuZumitos {formatTimestamp(props.sms.timestamp)}
          </Typography>
        </div>
        <div>
          <p>Enviaste un mensaje no compatible con el chatBot TuZumitos.</p>
          <img
            style={{ width: 20, position: "relative", left: "95%", bottom: "80%" }}
            src="https://piramideinvertidani.files.wordpress.com/2018/09/twitter-incopora-doble-check-azul-810x501.png"
          />
        </div>
      </div>
    </div>
  );
};

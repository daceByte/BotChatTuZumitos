import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import { Card, Grid, Typography, SvgIcon } from "@mui/material";

export const MessageUserMedia = (props) => {
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
    <div
      style={{
        backgroundColor: "orange",
        padding: 10,
        borderRadius: 15,
        maxWidth: "70%",
        marginBottom: 10,
      }}
    >
      <div>
        <img
          width={40}
          height={40}
          style={{ borderRadius: 20, marginRight: 10 }}
          src={
            props.imgUser != null
              ? props.imgUser
              : "https://is2-ssl.mzstatic.com/image/thumb/Purple114/v4/78/ca/3b/78ca3b54-3aac-a766-ce9c-26232ae1c66f/source/512x512bb.jpg"
          }
        />
        <Typography style={{ position: "relative", top: -13 }} variant="small">
          {props.nameUser} {formatTimestamp(props.sms.timestamp)}
        </Typography>
      </div>
      <div>El mensaje no es compatible con el chatBot TuZumitos.</div>
    </div>
  );
};

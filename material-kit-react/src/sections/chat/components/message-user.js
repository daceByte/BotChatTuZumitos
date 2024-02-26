import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import { Card, Grid, Typography, SvgIcon } from "@mui/material";

export const MessageUser = (props) => {
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
        backgroundColor: "yellowgreen",
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
          src={`assets/avatars/${Math.floor(Math.random() * 17) + 1}.png`}
        />
        <Typography style={{ position: "relative", top: -13 }} variant="small">
          Usuario {formatTimestamp(props.sms.timestamp)}
        </Typography>
      </div>
      <div>
        <p>{props.sms.body}</p>
      </div>
    </div>
  );
};

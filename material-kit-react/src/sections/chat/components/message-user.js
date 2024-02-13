import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import { Card, Grid, Typography, SvgIcon } from "@mui/material";

export const MessageUser = () => (
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
        src="./assets/avatars/avatar-anika-visser.png"
      />
      <Typography style={{ position: "relative", top: -13 }} variant="small">
        Usuario {new Date().toISOString().slice(0, 19).replace("T", " ")}
      </Typography>
    </div>
    <div>
      <p>
        En este ejemplo, Typography es el componente principal de Material-UI para manejar texto y
        tipografía, y variant="h6" indica que se trata de un encabezado de nivel 6.
      </p>
    </div>
  </div>
);

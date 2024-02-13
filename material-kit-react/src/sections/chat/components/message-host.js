import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import { Card, Grid, Typography, SvgIcon } from "@mui/material";

export const MessageHost = () => (
  <div style={{ display: "flex", width: "100%", justifyContent: "end" }}>
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
          src="https://illustoon.com/photo/7824.png"
        />
        <Typography style={{ position: "relative", top: -13 }} variant="small">
          TuZumitos {new Date().toISOString().slice(0, 19).replace("T", " ")}
        </Typography>
      </div>
      <div>
        <p>
          En este ejemplo, Typography es el componente principal de Material-UI para manejar texto y
          tipografía, y variant="h6" indica que se trata de un encabezado de nivel 6.
        </p>
        <img
          style={{ width: 20, position: "relative", left: "95%", bottom: '80%' }}
          src="assets/sendCharge.gif"
        />
      </div>
    </div>
  </div>
);

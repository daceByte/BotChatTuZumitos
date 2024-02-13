import { Grid, Typography } from "@mui/material";

export const ReadQrCode = (props) => {
  const { company } = props;

  return (
    <Grid style={{ marginTop: 60 }} container spacing={2}>
      <Grid className="MessageLeft80" item md={6}>
        <Typography variant="h6">Usa WhatsApp en tu computadora</Typography>
        <ul style={{ listStyle: "decimal" }}>
          <li>Abre WhatsApp en tu teléfono.</li>
          <li>Toca Menú en android o Ajustes en iPhone.</li>
          <li>Toca Dispositvos vinculados y, luego, Vincular un dispositivo</li>
          <li>Apunta tu teléfono hacia esta pantalla para escanear el código QR.</li>
        </ul>
      </Grid>
      <Grid style={{ display: "flex", justifyContent: "center" }} item md={6}>
        <img width={264} height={274} src="../qr.png" />
      </Grid>
    </Grid>
  );
};

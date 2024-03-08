import { Grid, Typography } from "@mui/material";
import QRCode from "qrcode.react";
import { useEffect, useState } from "react";

export const ReadQrCode = (props) => {
  const { qr, session } = props;

  const [qrString, setQrString] = useState(null);

  useEffect(() => {
    console.log(qr);
    setQrString(qr);
  }, [qr, session]);

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
        {qrString ? (
          <QRCode size={264} value={qrString} />
        ) : (
          <img
            width={264}
            height={274}
            src={"https://cdn.dribbble.com/users/1046956/screenshots/4468756/qrscananimation.gif"}
          />
        )}
      </Grid>
    </Grid>
  );
};

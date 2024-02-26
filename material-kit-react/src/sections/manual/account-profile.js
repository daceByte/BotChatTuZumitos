import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";

export const AccountProfile = () => (
  <Card>
    <CardContent>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Avatar
          src={"https://cpcejujuy.org.ar/wp-content/uploads/2021/08/icono-pdf.png"}
          sx={{
            height: 80,
            mb: 2,
            width: 80,
          }}
        />
        <Typography gutterBottom variant="h5">
          TuZumitos Chat
        </Typography>
        <Typography color="text.secondary" variant="body2">
          Tamaño del archivo 40 MB
        </Typography>
      </Box>
    </CardContent>
    <Divider />
    <CardActions>
      <Button fullWidth variant="text">
        Descargar
      </Button>
    </CardActions>
  </Card>
);

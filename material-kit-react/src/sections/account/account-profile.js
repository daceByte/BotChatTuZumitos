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
          src={"https://cdn-icons-png.flaticon.com/512/1728/1728765.png"}
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
          Almacenamiento: 843 MB
        </Typography>
      </Box>
    </CardContent>
    <Divider />
    <CardActions>
      <Button fullWidth variant="text">
        Exportación
      </Button>

      <Button fullWidth color="error" variant="text">
        Forzar cierre total
      </Button>
    </CardActions>
  </Card>
);

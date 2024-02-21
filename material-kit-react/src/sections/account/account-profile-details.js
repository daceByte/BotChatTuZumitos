import { useCallback, useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { toast } from "react-toastify";
import { getAllBranchs } from "src/api/apiBranch";

const states = [
  {
    value: "alabama",
    label: "Alabama",
  },
  {
    value: "new-york",
    label: "New York",
  },
  {
    value: "san-francisco",
    label: "San Francisco",
  },
  {
    value: "los-angeles",
    label: "Los Angeles",
  },
];

export const AccountProfileDetails = () => {
  const [values, setValues] = useState({
    firstName: "Anika",
    lastName: "Visser",
    email: "demo@devias.io",
    phone: "",
    state: "los-angeles",
    country: "USA",
  });

  const handleChange = useCallback((event) => {
    setValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }, []);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
  }, []);

  const fetchBranch = async () => {
    try {
      const response = await getAllBranchs();
      if (!response.success) {
        toast.error("Ocurrio un error interno.");
      } else {
        console.log(response.body);
        setBranch(response.body);
      }
    } catch (error) {
      console.log(error);
      toast.error("Ocurrio un error interno.");
    }
  };

  const [branch, setBranch] = useState([]);

  useEffect(() => {
    console.log(branch);
    if (branch.length == 0) {
      fetchBranch();
    }
  }, []);

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit}>
      <Card>
        <CardHeader subheader="Configuracion global del ChatBot." title="Configuracion" />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <Select
                  labelId="select-label-2"
                  id="select"
                  value={0}
                  label="Seleccionar opción"
                  fullWidth
                  margin="normal"
                >
                  <MenuItem value={0}>Seleciona una sucursal</MenuItem>
                  {branch.map((bra) => (
                    <MenuItem key={bra.bra_id} value={bra.bra_id}>
                      {bra.bra_name}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid xs={12} md={6}>
                <Button variant="text" color="error">
                  Cerrar sesion
                </Button>
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Registrar sucursal"
                  name="text"
                  onChange={handleChange}
                  required
                  value={values.email}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <Button variant="text" color="success">
                  Registrar
                </Button>
              </Grid>
              <Grid xs={12} md={6}>
                <Button variant="contained" color="error">
                  REINICIAR SERVIDOR
                </Button>
              </Grid>
              <Grid xs={12} md={6}>
                <small style={{ color: "red" }}>
                  *Recuerda que cada reinicio se recomienda esperar 5 Min para que tenga un efecto
                  positivo en el sistema.
                </small>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
      </Card>
    </form>
  );
};

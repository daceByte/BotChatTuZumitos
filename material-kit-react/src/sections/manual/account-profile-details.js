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
        //console.log(response.body);
        setBranch(response.body);
      }
    } catch (error) {
      console.log(error);
      toast.error("Ocurrio un error interno.");
    }
  };

  const [branch, setBranch] = useState([]);

  useEffect(() => {
    //console.log(branch);
    if (branch.length == 0) {
      fetchBranch();
    }
  }, []);

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit}>
      <Card>
        <CardHeader subheader="Descripcion del manual" title="Descripcion" />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container style={{ padding: 25 }} spacing={3}>
              <p>
                Esta sección está destinada a la descarga del manual, el cual contiene información
                exhaustiva sobre el funcionamiento del sistema del chatbot Tuzumitos. En dicho
                documento, encontrará detalles completos y relevantes para maximizar la comprensión
                y aprovechamiento de la plataforma.
              </p>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
      </Card>
    </form>
  );
};

import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Switch,
} from "@mui/material";
import { createLocation, deleteLocation, getLocation, updateLocation } from "src/api/apiLocation";
import { toast } from "react-toastify";

const LocationModal = ({ open, handleClose, locationData, cliId, fetchClient }) => {
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "loc_default" ? (checked ? 1 : 0) : value,
    }));
  };

  const fetchLocation = async () => {
    try {
      const response = await getLocation(locationData);
      //console.log(response);
      if (response.success) {
        setFormData(response.body);
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (locationData != 0 && locationData != "0") {
      fetchLocation();
    } else {
      setFormData([]);
    }
  }, [locationData]);

  const handleSaveClick = async () => {
    if (locationData == 0 || locationData == "0") {
      try {
        const response = await createLocation({ ...formData, fk_loc_cli_id: cliId });
        if (response.success) {
          toast.success("Datos de la ubicacion actualizados.");
        } else {
          toast.error("No se pudo actualizar los datos de ubicacion.");
        }
      } catch (error) {
        toast.error("Ocurrio un error interno en el servidor.");
      }
    } else {
      try {
        const response = await updateLocation({ ...formData, fk_loc_cli_id: cliId });
        if (response.success) {
          toast.success("Datos de la ubicacion actualizados.");
        } else {
          toast.error(response.body);
        }
      } catch (error) {
        toast.error("Ocurrio un error interno en el servidor.");
      }
    }
    await fetchClient();
    handleClose();
  };

  const handleDelete = async () => {
    if (locationData != 0 && locationData != "0") {
      try {
        const response = await deleteLocation(locationData);
        if (response.success) {
          toast.success("Ubicacion eliminada.");
          await fetchClient();
        } else {
          toast.error(response.body);
        }
      } catch (error) {
        toast.error("Ocurrio un error interno en el servidor.");
      }
    }
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{locationData != 0 ? "Editar" : "Agregar"} ubicacion</DialogTitle>
      <DialogContent>
        <TextField
          label="Dirección"
          required
          name="loc_address"
          value={formData.loc_address}
          onChange={handleChange}
          fullWidth
          style={{ marginBottom: 10 }}
        />
        <TextField
          label="Zona"
          name="loc_zone"
          required
          value={formData.loc_zone}
          onChange={handleChange}
          style={{ marginBottom: 10 }}
          fullWidth
        />
        <TextField
          label="Enlace"
          name="loc_link"
          value={formData.loc_link}
          onChange={handleChange}
          style={{ marginBottom: 10 }}
          fullWidth
        />
        <div>
          <label>Por defecto:</label>
          <Switch name="loc_default" checked={formData.loc_default === 1} onChange={handleChange} />
          <br></br>
          <small style={{ color: "red" }}>
            *Ten presente que si estableces como predeterminada una ubicación, la anterior será
            desmarcada.
          </small>
        </div>
      </DialogContent>
      <DialogActions>
        <Button disabled={loading} variant="contained" color={"error"} onClick={handleClose}>
          Cancelar
        </Button>
        {locationData != 0 ? (
          <Button disabled={loading} variant="contained" color={"warning"} onClick={handleDelete}>
            Borrar
          </Button>
        ) : null}
        <Button disabled={loading} onClick={handleSaveClick}>
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LocationModal;

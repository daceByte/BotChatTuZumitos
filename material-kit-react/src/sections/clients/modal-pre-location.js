import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Switch,
  MenuItem,
  InputLabel,
  Select,
} from "@mui/material";
import { getClient } from "src/api/apiClients";
import { toast } from "react-toastify";
import LocationModal from "./modal-location";

const LocationModalPre = ({ open, handleClose, cliId }) => {
  const [locationData, setLocationData] = useState(0);

  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setLocationData(event.target.value);
  };

  const fetchClient = async () => {
    setLoading(true);
    try {
      const response = await getClient(cliId);
      if (response.success) {
        //console.log(response.body.locations);
        setSelectValues(response.body.locations);
      } else {
        toast.error("No se pudo cargar las ubicaciones asociadas con este cliente.");
      }
    } catch (error) {
      toast.error("Ocurrió un error interno en el servidor.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchClient();
    setLocationData(0);
  }, [cliId]);

  const [selectValues, setSelectValues] = useState([]);

  const handleSaveClick = () => {
    //handleClose();
    handleOpenModal();
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <LocationModal
        open={isModalOpen}
        cliId={cliId}
        fetchClient={fetchClient}
        handleClose={handleCloseModal}
        locationData={locationData}
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Administrar ubicaciones</DialogTitle>
        <DialogContent>
          <InputLabel id="select-label">Seleccionar un ubicacion</InputLabel>
          <Select
            labelId="select-label"
            id="select"
            value={locationData}
            label="Seleccionar opción"
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value={0}>Agregar una ubicación</MenuItem>
            {selectValues.length != 0
              ? selectValues.map((option) => (
                  <MenuItem key={option.loc_id} value={option.loc_id}>
                    {option.loc_address}
                  </MenuItem>
                ))
              : null}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button disabled={loading} variant="text" color={"error"} onClick={handleClose}>
            Cancelar
          </Button>
          <Button disabled={loading} onClick={handleSaveClick}>
            Abrir
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LocationModalPre;

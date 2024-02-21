import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  Select,
  CircularProgress,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { updateClient } from "src/api/apiClients";
import { toast } from "react-toastify";
import LocationModalPre from "./modal-pre-location";

const UpdateClientModal = (props) => {
  const [updatedClient, setUpdatedClient] = useState({
    cli_id: props.client.cli_id,
    cli_fullname: props.client.cli_fullname,
    cli_phone: props.client.cli_phone,
    cli_method: props.client.cli_method,
    cli_payment: props.client.cli_payment,
    cli_note: props.client.cli_note,
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedClient((prevClient) => ({ ...prevClient, [name]: value }));
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const response = await updateClient(updatedClient);
      if (response.success) {
        toast.success("Cliente se ha actualizado.");
        await props.fetchClients();
        props.onClose();
      } else {
        toast.error("Cliente se ha actualizado.");
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
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
      <LocationModalPre
        open={isModalOpen}
        handleClose={handleCloseModal}
        cliId={props.client.cli_id}
      />
      <Modal
        style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        open={props.open}
        onClose={props.onClose}
      >
        <Box sx={{ width: 400, p: 3, bgcolor: "background.paper", borderRadius: 2 }}>
          <Typography variant="h6">Actualizar Cliente</Typography>
          <TextField
            label="Nombre Completo"
            name="cli_fullname"
            value={updatedClient.cli_fullname}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Teléfono"
            name="cli_phone"
            value={updatedClient.cli_phone}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <InputLabel id="select-label">Método de envió favorito</InputLabel>
          <Select
            labelId="select-label"
            id="select"
            name="cli_method"
            value={updatedClient.cli_method}
            label="Seleccionar opción"
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          >
            <MenuItem value={1}>Domicilio</MenuItem>
            <MenuItem value={2}>Pickup</MenuItem>
          </Select>
          <InputLabel id="select-label-2">Método de pago favorito</InputLabel>
          <Select
            labelId="select-label-2"
            id="select"
            name="cli_payment"
            value={updatedClient.cli_payment}
            label="Seleccionar opción"
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          >
            <MenuItem value={1}>Efectivo</MenuItem>
            <MenuItem value={2}>Tarjeta</MenuItem>
            <MenuItem value={3}>Transferencia</MenuItem>
          </Select>
          <TextField
            label="Sucursal"
            value={props.client.tbl_branch.bra_name}
            fullWidth
            disabled
            margin="normal"
          />
          <TextField
            label="Nota adicional"
            name="cli_note"
            value={updatedClient.cli_note}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <Button
            style={{ marginTop: 10 }}
            variant="contained"
            disabled={loading}
            color="success"
            onClick={handleUpdate}
          >
            {loading ? (
              <CircularProgress
                color="secondary"
                style={{ width: 20, height: 20, marginRight: 10 }}
              />
            ) : null}
            Actualizar
          </Button>
          <Button
            style={{ marginTop: 10, marginLeft: 10 }}
            variant="contained"
            disabled={loading}
            color="primary"
            onClick={handleOpenModal}
          >
            {loading ? (
              <CircularProgress
                color="secondary"
                style={{ width: 20, height: 20, marginRight: 10 }}
              />
            ) : null}
            Administrar ubicaciones
          </Button>
          <Button
            style={{ marginTop: 10 }}
            variant="contained"
            disabled={loading}
            color="error"
            onClick={props.onClose}
          >
            {loading ? (
              <CircularProgress
                color="secondary"
                style={{ width: 20, height: 20, marginRight: 10 }}
              />
            ) : null}
            Cancelar
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default UpdateClientModal;

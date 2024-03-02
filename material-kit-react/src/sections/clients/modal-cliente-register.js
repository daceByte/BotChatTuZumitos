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
import { createClientApi } from "src/api/apiClients";
import { toast } from "react-toastify";
import LocationModalPre from "./modal-pre-location";

const CreateClientModal = (props) => {
  const [createClient, setCreateClient] = useState({
    cli_fullname: "",
    cli_phone: props.chatActive,
    cli_method: "",
    cli_payment: "",
    cli_note: "",
    fk_cli_bra_id: props.session + 1,
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCreateClient((prevClient) => ({
      ...prevClient,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      console.log(createClient);
      const response = await createClientApi(createClient);
      if (response.success) {
        toast.success("Cliente se ha registrado.");
        await props.fetchClients();
        props.onClose();
      } else {
        toast.error("Cliente no se ha registrado.");
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        open={props.open}
        onClose={props.onClose}
      >
        <Box sx={{ width: 400, p: 3, bgcolor: "background.paper", borderRadius: 2 }}>
          <Typography variant="h6">Registrar Cliente</Typography>
          <TextField
            label="Nombre Completo"
            name="cli_fullname"
            value={createClient.cli_fullname}
            onChange={handleInputChange}
            fullWidth
            maxLength={30}
            margin="normal"
          />
          <TextField
            label="Teléfono"
            name="cli_phone"
            value={createClient.cli_phone}
            disabled
            fullWidth
            margin="normal"
          />
          <InputLabel id="select-label">Método de envió favorito</InputLabel>
          <Select
            labelId="select-label"
            id="select"
            name="cli_method"
            value={createClient.cli_method}
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
            value={createClient.cli_payment}
            label="Seleccionar opción"
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          >
            <MenuItem value={1}>Efectivo</MenuItem>
            <MenuItem value={2}>Tarjeta</MenuItem>
            <MenuItem value={3}>Transferencia</MenuItem>
          </Select>
          <TextField label="Sucursal" value={"Avion"} fullWidth disabled margin="normal" />
          <TextField
            label="Nota adicional"
            name="cli_note"
            value={createClient.cli_note}
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
            Registrar
          </Button>
          <Button
            style={{ marginLeft: 10, marginTop: 10 }}
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

export default CreateClientModal;

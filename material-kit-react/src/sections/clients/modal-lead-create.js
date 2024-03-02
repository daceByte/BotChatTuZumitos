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
import { createLeadApi } from "src/api/apiLeads";
import { toast } from "react-toastify";

const CreateLeadModal = (props) => {
  const [createLead, setcreateLead] = useState({
    lea_type: "1",
    lea_phone: props.chatActive,
    lea_nickname: props.nameUser,
    fk_lea_bra_id: props.session + 1,
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setcreateLead((prevClient) => ({ ...prevClient, [name]: value }));
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const response = await createLeadApi(createLead);
      if (response.success) {
        toast.success("Lead se ha registrado.");
        await props.fetchClients();
        props.onClose();
      } else {
        toast.error("Lead no se ha registrado.");
        props.onClose();
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <>
      <Modal
        style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        open={props.open}
        onClose={props.onClose}
      >
        <Box sx={{ width: 400, p: 3, bgcolor: "background.paper", borderRadius: 2 }}>
          <InputLabel id="select-label">Tipo de lead</InputLabel>
          <Select
            labelId="select-label"
            id="select"
            name="lea_type"
            value={createLead.lea_type}
            label="Seleccionar opción"
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          >
            <MenuItem value={1}>Spam</MenuItem>
            <MenuItem value={2}>Contenido</MenuItem>
            <MenuItem value={3}>Misceláneo</MenuItem>
          </Select>
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

export default CreateLeadModal;

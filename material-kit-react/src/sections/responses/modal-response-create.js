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
import { toast } from "react-toastify";
import { createResponse } from "../../api/apiResponses";

const CreateModalResponse = (props) => {
  const [updateResponse, setUpdateResponse] = useState({
    res_title: "",
    res_message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateResponse((prevClient) => ({ ...prevClient, [name]: value }));
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const response = await createResponse(updateResponse);
      if (response.success) {
        toast.success("Respuesta se ha registrado.");
        await props.fetchResponses();
        props.onClose();
      } else {
        toast.error("Respuesta no se ha registrado.");
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
      <Modal
        style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        open={props.open}
        onClose={props.onClose}
      >
        <Box sx={{ width: 400, p: 3, bgcolor: "background.paper", borderRadius: 2 }}>
          <Typography variant="h6">Registrar respuesta rapida</Typography>
          <TextField
            label="Titulo"
            name="res_title"
            value={updateResponse.res_title}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Mensaje"
            name="res_message"
            value={updateResponse.res_message}
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
            style={{ marginTop: 10 }}
            variant="contained"
            disabled={loading}
            color="error"
            onClick={props.onClose}
          >
            {loading ? (
              <CircularProgress
                color="secondary"
                style={{ width: 20, height: 20, marginLeft: 10 }}
              />
            ) : null}
            Cancelar
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default CreateModalResponse;

import React, { useState, useEffect } from "react";
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
import { getAllBranchs } from "src/api/apiBranch";
import { updateDealer } from "src/api/apiDealers";

const ModalDealer = (props) => {
  const [updatedClient, setUpdatedClient] = useState({
    del_id: props.delivery.del_id,
    del_fullname: props.delivery.del_fullname,
    del_phone: props.delivery.del_phone,
    del_status: props.delivery.del_status,
    fk_del_bra_id: props.delivery.fk_del_bra_id,
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedClient((prevClient) => ({ ...prevClient, [name]: value }));
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const response = await updateDealer(updatedClient);
      if (response.success) {
        toast.success("Repartidor se ha actualizado.");
        await props.fetchDeliveries();
        props.onClose();
      } else {
        toast.error("Repartidor no se ha actualizado.");
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

  const fetchBranch = async () => {
    setLoading(true);
    try {
      const response = await getAllBranchs();
      if (!response.success) {
        props.onClose();
        toast.error("Ocurrio un error interno.");
      } else {
        console.log(response.body);
        setBranch(response.body);
      }
    } catch (error) {
      console.log(error);
      toast.error("Ocurrio un error interno.");
      props.onClose();
    }
    setLoading(false);
  };

  const [branch, setBranch] = useState([]);

  useEffect(() => {
    console.log(branch);
    if (branch.length == 0) {
      fetchBranch();
    }
  }, []);

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
          <Typography variant="h6">Actualizar repartidor</Typography>
          <TextField
            label="Nombre Completo"
            name="del_fullname"
            value={updatedClient.del_fullname}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Teléfono"
            name="del_phone"
            value={updatedClient.del_phone}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <InputLabel id="select-label">Estado del repartidor</InputLabel>
          <Select
            labelId="select-label"
            id="select"
            name="del_status"
            value={updatedClient.del_status}
            label="Seleccionar opción"
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          >
            <MenuItem value={1}>🟢Activo</MenuItem>
            <MenuItem value={0}>🔴Inactivo</MenuItem>
          </Select>
          <InputLabel id="select-label-2">Sucursal del repartidor</InputLabel>
          <Select
            labelId="select-label-2"
            id="select"
            name="fk_del_bra_id"
            value={updatedClient.fk_del_bra_id}
            label="Seleccionar opción"
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          >
            {branch.map((bra) => (
              <MenuItem key={bra.bra_id} value={bra.bra_id}>
                {bra.bra_name}
              </MenuItem>
            ))}
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
            Actualizar
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

export default ModalDealer;

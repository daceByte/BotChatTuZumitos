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

const SeeNoteModal = (props) => {
  return (
    <>
      <Modal
        style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        open={props.open}
        onClose={props.onClose}
      >
        <Box sx={{ width: 400, p: 3, bgcolor: "background.paper", borderRadius: 2 }}>
          <Typography variant="h6">Nota sobre cliente</Typography>
          <p>{props.note}</p>
          <Button
            style={{ marginLeft: 10, marginTop: 10 }}
            variant="contained"
            color="error"
            onClick={props.onClose}
          >
            Cerrar
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default SeeNoteModal;

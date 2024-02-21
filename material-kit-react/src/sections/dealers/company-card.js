import React, { useState } from "react";
import PropTypes from "prop-types";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ClockIcon from "@heroicons/react/24/solid/ClockIcon";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Stack,
  SvgIcon,
  Typography,
  Button,
} from "@mui/material";
import ModalDealer from "./modal-dealer";

export const CompanyCard = (props) => {
  const { delivery } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <ModalDealer
        fetchDeliveries={props.fetchDeliveries}
        open={isModalOpen}
        onClose={handleCloseModal}
        delivery={delivery}
      />
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              pb: 3,
            }}
          >
            <Avatar
              src={"https://cdn-icons-png.flaticon.com/512/3503/3503994.png"}
              variant="square"
            />
          </Box>
          <Typography align="center" gutterBottom variant="h5">
            {delivery.del_fullname}
          </Typography>
          <Typography align="center" variant="body1">
            {"Sucursal: " + delivery.tbl_branch.bra_name}
            <br></br>
            {"Estado: " + (delivery.del_status == 1 ? "🟢Activo" : "🔴Inactivo")}
          </Typography>
        </CardContent>
        <Box sx={{ flexGrow: 1 }} />
        <Divider />
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={2}
          sx={{ p: 2 }}
        >
          <Stack alignItems="center" direction="row" spacing={1}>
            <Button onClick={handleOpenModal} variant="contained">Actualizar</Button>
          </Stack>
          <Stack alignItems="center" direction="row" spacing={1}>
            <Typography color="text.secondary" display="inline" variant="body2">
              {"# " + delivery.del_id} ID
            </Typography>
          </Stack>
        </Stack>
      </Card>
    </>
  );
};

CompanyCard.propTypes = {
  delivery: PropTypes.object.isRequired,
};

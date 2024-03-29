import React, { useState, useEffect } from "react";
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
import UpdateClientModal from "./modal-client";

export const CompanyCard = (props) => {
  const { company } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <UpdateClientModal
        fetchClients={props.fetchClients}
        open={isModalOpen}
        onClose={handleCloseModal}
        client={company}
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
              src={
                "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1200px-User_icon_2.svg.png"
              }
              variant="square"
            />
          </Box>
          <Typography align="center" gutterBottom variant="h5">
            {company.cli_fullname}
          </Typography>
          <Typography align="center" variant="body1">
            {company.cli_phone}
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
            <Button onClick={handleOpenModal} variant="contained">
              Actualizar
            </Button>
          </Stack>
          <Stack alignItems="center" direction="row" spacing={1}>
            <SvgIcon color="action" fontSize="small">
              <ArrowDownOnSquareIcon />
            </SvgIcon>
            <Typography color="text.secondary" display="inline" variant="body2">
              {company.cli_id} ID
            </Typography>
          </Stack>
        </Stack>
      </Card>
    </>
  );
};

CompanyCard.propTypes = {
  company: PropTypes.object.isRequired,
};

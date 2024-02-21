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
import UpdateModalResponse from "./modal-response";

export const CompanyCard = (props) => {
  const { response } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <UpdateModalResponse
        fetchResponses={props.fetchResponses}
        open={isModalOpen}
        onClose={handleCloseModal}
        response={response}
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
              src={"https://cdn-icons-png.flaticon.com/512/5824/5824260.png"}
              variant="square"
            />
          </Box>
          <Typography align="center" gutterBottom variant="h5">
            {response.res_title}
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
              {response.res_id} ID
            </Typography>
          </Stack>
        </Stack>
      </Card>
    </>
  );
};

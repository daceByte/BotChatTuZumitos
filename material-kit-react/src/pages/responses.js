import React, { useState, useEffect } from "react";
import Head from "next/head";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Box, Button, Container, Stack, SvgIcon, Typography, Grid } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { CompaniesSearch } from "src/sections/responses/customers-search";
import { CompanyCard } from "src/sections/responses/company-card.js";
import { getAllResponses } from "src/api/apiResponses";
import CreateModalResponse from "src/sections/responses/modal-response-create";

const Page = () => {
  const [responses, setResponses] = useState([]);
  const [search, setSearch] = useState("");

  // Función para cargar la lista de respuestas desde tu API
  const fetchResponses = async () => {
    const response = await getAllResponses(search);
    if (response.success) {
      setResponses(response.body);
    }
  };

  useEffect(() => {
    fetchResponses();
  }, [search]);

  const handleInputChange = (event) => {
    setSearch(event.target.value);
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
      <CreateModalResponse
        fetchResponses={fetchResponses}
        open={isModalOpen}
        onClose={handleCloseModal}
      />
      <Head>
        <title>Respuestas rápidas</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Respuestas rápidas</Typography>
              </Stack>
              <div>
                <Button
                  onClick={handleOpenModal}
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                >
                  Registrar
                </Button>
              </div>
            </Stack>
            <div>
              <small style={{ color: "red" }}>
                *Recuerda que para establecer los datos usar, las llaves [] e indicar que tipo de
                dato deseas imprimir, recuerda consultar los datos disponibles, en caso de error de
                sintaxis se imprime un error al registrar la respuesta, para evitar envíos
                corruptos.
              </small>
            </div>
            <Grid container spacing={3}>
              {responses.map((response) => (
                <Grid xs={12} md={6} lg={4} key={response.res_id}>
                  <CompanyCard fetchResponses={fetchResponses} response={response} />
                </Grid>
              ))}
            </Grid>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

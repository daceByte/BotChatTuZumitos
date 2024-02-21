import React, { useState, useEffect } from "react";
import Head from "next/head";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import {
  Box,
  Button,
  Container,
  Pagination,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { CompanyCard } from "src/sections/clients/company-card";
import { CompaniesSearch } from "src/sections/clients/companies-search";
import { getAllClients } from "src/api/apiClients";

const Page = () => {
  const [clients, setClients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;

  const [search, setSearch] = useState(".");

  // Función para cargar la lista de clientes desde tu API
  const fetchClients = async () => {
    const response = await getAllClients(currentPage, search, search);
    if (response.success) {
      setClients(response.body.clients);
      setTotalPages(response.body.totalPages);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    fetchClients();
  }, [currentPage, search]);

  const handleInputChange = (event) => {
    console.log(event);
    setSearch(event.target.value);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentClients = clients.slice(startIndex, endIndex);

  return (
    <>
      <Head>
        <title>Clientes</title>
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
                <Typography variant="h4">Clientes</Typography>
              </Stack>
            </Stack>
            <CompaniesSearch handleInputChange={handleInputChange} search={search} />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div>
                <Button
                  variant="contained"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Anterior
                </Button>
                <span
                  style={{ marginLeft: 10, marginRight: 10 }}
                >{`Página ${currentPage} de ${totalPages}`}</span>
                <Button
                  variant="contained"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Siguiente
                </Button>
              </div>
            </div>
            <Grid container spacing={3}>
              {clients != null
                ? clients.map((client) => (
                    <Grid xs={12} md={6} lg={4} key={client.cli_id}>
                      <CompanyCard fetchClients={fetchClients} company={client} />
                    </Grid>
                  ))
                : null}
            </Grid>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            ></Box>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

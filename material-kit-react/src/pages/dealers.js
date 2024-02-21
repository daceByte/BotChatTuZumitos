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
import { CompanyCard } from "src/sections/dealers/company-card";
import { CompaniesSearch } from "src/sections/dealers/companies-search";
import { getAllDealers } from "src/api/apiDealers";
import ModalDealer from "src/sections/dealers/modal-dealer-create";

const Page = () => {
  const [Deliveries, setDeliveries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;

  const [search, setSearch] = useState("");

  // Función para cargar la lista de clientes desde tu API
  const fetchDeliveries = async () => {
    const response = await getAllDealers(currentPage, search, search);
    if (response.success) {
      setDeliveries(response.body.deliveries);
      setTotalPages(response.body.totalPages);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    fetchDeliveries();
  }, [currentPage, search]);

  const handleInputChange = (event) => {
    console.log(event);
    setSearch(event.target.value);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentDeliveries = Deliveries.slice(startIndex, endIndex);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Head>
        <title>Repartidores</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <ModalDealer
          fetchDeliveries={fetchDeliveries}
          open={isModalOpen}
          onClose={handleCloseModal}
        />
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Repartidores</Typography>
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
            <CompaniesSearch handleInputChange={handleInputChange} search={search} />
            <Grid container spacing={3}>
              {Deliveries.map((delivery) => (
                <Grid xs={12} md={6} lg={4} key={delivery.del_id}>
                  <CompanyCard fetchDeliveries={fetchDeliveries} delivery={delivery} />
                </Grid>
              ))}
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

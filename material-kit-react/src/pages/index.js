import Head from "next/head";
import { subDays, subHours } from "date-fns";
import { Box, Container, Unstable_Grid2 as Grid } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { OverviewBudget } from "src/sections/overview/overview-budget";
import { OverviewLatestOrders } from "src/sections/overview/overview-latest-orders";
import { OverviewLatestProducts } from "src/sections/overview/overview-latest-products";
import { OverviewSales } from "src/sections/overview/overview-sales";
import { OverviewTasksProgress } from "src/sections/overview/overview-tasks-progress";
import { OverviewTotalCustomers } from "src/sections/overview/overview-total-customers";
import { OverviewTotalProfit } from "src/sections/overview/overview-total-profit";
import { OverviewTraffic } from "src/sections/overview/overview-traffic";
import { ReadQrCode } from "src/sections/chat/qr-code";
import { ButtonSession } from "src/sections/chat/sesion-chat";
import { ChatBox } from "src/sections/chat/chat-box";
import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const now = new Date();

const Page = (props) => {
  const { session, active, setActive, handleSession, chatActive } = props;
  const [qr, setQr] = useState(null);
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io("https://apizumitosv2.codevalcanos.com/");

    socketRef.current.on("info", (data) => {
      //console.log(data);
      if (data.type == "qrcode" && data.idSession == session) {
        console.log("Estableciendo QR");
        setQr(data.content);
      }
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [qr, session]);

  return (
    <>
      <Head>
        <title>Chat Empresarial</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <ButtonSession
            setQr={setQr}
            setActive={setActive}
            session={session}
            setSession={handleSession}
          />
          {session != -1 && active ? (
            <ChatBox
              setActive={setActive}
              active={active}
              session={session}
              chatActive={chatActive}
            />
          ) : (
            <ReadQrCode session={session} qr={qr} />
          )}
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

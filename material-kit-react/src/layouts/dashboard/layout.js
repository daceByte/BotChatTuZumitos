import React, { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { styled } from "@mui/material/styles";
import { withAuthGuard } from "src/hocs/with-auth-guard";
import { SideNav } from "./side-nav";
import { TopNav } from "./top-nav";
import io from "socket.io-client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SIDE_NAV_WIDTH = 280;

const LayoutRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
  [theme.breakpoints.up("lg")]: {
    paddingLeft: SIDE_NAV_WIDTH,
  },
}));

const LayoutContainer = styled("div")(({ active }) => ({
  display: "flex",
  flex: "1 1 auto",
  flexDirection: "column",
  width: "100%",
}));

export const Layout = withAuthGuard((props) => {
  const { children } = props;
  const pathname = usePathname();
  const [openNav, setOpenNav] = useState(false);
  const [chatActive, setChatActive] = useState("");

  const [contact, setContact] = useState(false);

  const [session, setSession] = useState(-1);
  const [active, setActive] = useState(false);

  const handleSession = (index) => {
    setSession(index);
  };

  const handlePathnameChange = useCallback(() => {
    if (openNav) {
      setOpenNav(false);
    }
  }, [openNav]);

  useEffect(() => {
    handlePathnameChange();
  }, [pathname]);

  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io("http://localhost:3003/");

    socketRef.current.on("msg", (data) => {
      console.log(data);
      if (data != null) {
        if (data.idSession == session) {
          toast.info(
            data.name +
              ":" +
              (data.message.type == "chat"
                ? data.message.body.slice(0, 25)
                : "Te envio un recurso.")
          );
        }
      }
    });

    socketRef.current.on("info", (data) => {
      //console.log(data);
      if (data.type == "info" && data.idSession == session) {
        toast.info(data.content, {
          position: "bottom-right",
        });
      }
    });

    socketRef.current.on("info", (data) => {
      //console.log(data);
      if (data.type == "disconnected") {
        window.location.href = "/";
      }
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [session]);

  return (
    <>
      <ToastContainer />
      <TopNav
        setContact={setContact}
        contact={contact}
        active={active}
        session={session}
        onNavOpen={() => setOpenNav(true)}
      />
      <SideNav
        contact={contact}
        active={active}
        setChatActive={setChatActive}
        setActive={setActive}
        session={session}
        onClose={() => setOpenNav(false)}
        open={openNav}
      />
      <LayoutRoot>
        <LayoutContainer>
          {React.cloneElement(children, { setActive, active, session, handleSession, chatActive })}
        </LayoutContainer>
      </LayoutRoot>
    </>
  );
});

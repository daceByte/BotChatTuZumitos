import NextLink from "next/link";
import io from "socket.io-client";
import { usePathname } from "next/navigation";
import PropTypes from "prop-types";
import ArrowTopRightOnSquareIcon from "@heroicons/react/24/solid/ArrowTopRightOnSquareIcon";
import ChevronUpDownIcon from "@heroicons/react/24/solid/ChevronUpDownIcon";
import {
  Badge,
  Box,
  Button,
  Card,
  Divider,
  Drawer,
  Grid,
  InputAdornment,
  OutlinedInput,
  Stack,
  SvgIcon,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Logo } from "src/components/logo";
import { Scrollbar } from "src/components/scrollbar";
import { items } from "./config";
import { SideNavItem } from "./side-nav-item";
import { useEffect, useRef, useState } from "react";
import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";

export const SideNav = (props) => {
  const { open, onClose, contact, setActive, active, setChatActive, session } = props;
  const pathname = usePathname();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const socketRef = useRef(null);

  const [search, setSearch] = useState("");
  const [chats, setChats] = useState([]);

  const handleInputSearch = (event) => {
    setSearch(event.target.value);
  };

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenChat = (chatId) => {
    setChatActive(chatId);
  };

  useEffect(() => {
    if (!active) {
      setChats([]);
    }
  }, [active]);

  useEffect(() => {
    setChatActive("");
  }, [session]);

  useEffect(() => {
    socketRef.current = io("http://localhost:3003/");

    socketRef.current.on("chats", (data) => {
      //console.log(data);
      //console.log(data.idSession + " " + session);
      if (active == false && data.idSession == session) {
        setActive(true);
      }

      if (data.idSession == session) {
        setChats(data.chats);
      }
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [session, chats]);

  const ChatCard = ({ chat }) => {
    // Lógica para renderizar los datos de cada chat en una tarjeta
    return (
      <div
        onClick={() => {
          handleOpenChat(chat.id.user);
        }}
        style={{
          cursor: "pointer",
          padding: 10,
          backgroundColor: "#3B7225",
          marginBottom: 10,
          borderRadius: 20,
          maxHeight: 60,
        }}
        id={"chat" + chat.id.user}
        className="chat-card"
      >
        <div style={{ display: "flex" }}>
          <Badge badgeContent={chat.unreadCount} color="info">
            <img
              height={40}
              style={{ borderRadius: 20 }}
              src={`https://t4.ftcdn.net/jpg/03/42/99/71/360_F_342997143_wz7x1yR7KWhmhSKF9OHwuQ2W4W7IUDvH.jpg`}
            />
          </Badge>
          <p style={{ fontSize: 16, position: "relative", top: -20, left: 10 }}>{chat.name}</p>
        </div>
        <p
          style={{
            fontSize: 12,
            position: "relative",
            top: -35,
            left: 50,
            margin: 0,
            padding: 0,
            width: 190,
          }}
        >
          {chat.lastMessage.type == "ptt"
            ? "Te envió un audio"
            : chat.lastMessage.type == "image"
            ? "Te envió una foto"
            : chat.lastMessage.type == "chat"
            ? chat.lastMessage.body.slice(0, 25) + (chat.lastMessage.body.length > 25 ? "..." : "")
            : "Te envio un mensaje no compatible.".slice(0, 23) + "..."}
        </p>
      </div>
    );
  };

  const content = (
    <>
      {contact ? (
        <Scrollbar>
          <Grid container style={{ padding: 20 }}>
            <OutlinedInput
              value={search}
              onChange={handleInputSearch}
              fullWidth
              style={{ color: "#fff" }}
              placeholder="Busca un chat..."
              startAdornment={
                <InputAdornment position="start">
                  <SvgIcon color="action" fontSize="small">
                    <MagnifyingGlassIcon />
                  </SvgIcon>
                </InputAdornment>
              }
              sx={{ maxWidth: 500 }}
            />
          </Grid>

          {filteredChats.map((chat, index) => (
            <ChatCard key={index} chat={chat} />
          ))}
        </Scrollbar>
      ) : (
        <Scrollbar
          sx={{
            height: "100%",
            "& .simplebar-content": {
              height: "100%",
            },
            "& .simplebar-scrollbar:before": {
              background: "neutral.400",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <Box sx={{ p: 3 }}>
              <Box
                component={NextLink}
                href="/"
                sx={{
                  display: "inline-flex",
                  height: 32,
                  width: 32,
                }}
              >
                <Logo />
              </Box>
              <Box
                sx={{
                  alignItems: "center",
                  backgroundColor: "rgba(255, 255, 255, 0.04)",
                  borderRadius: 1,
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  mt: 2,
                  p: "12px",
                }}
              >
                <div>
                  <Typography color="inherit" variant="subtitle1">
                    TuZumitos
                  </Typography>
                  <Typography color="neutral.400" variant="body2">
                    Chat Empresarial
                  </Typography>
                </div>
                <SvgIcon fontSize="small" sx={{ color: "neutral.500" }}>
                  <ChevronUpDownIcon />
                </SvgIcon>
              </Box>
            </Box>
            <Divider sx={{ borderColor: "neutral.700" }} />
            <Box
              component="nav"
              sx={{
                flexGrow: 1,
                px: 2,
                py: 3,
              }}
            >
              <Stack
                component="ul"
                spacing={0.5}
                sx={{
                  listStyle: "none",
                  p: 0,
                  m: 0,
                }}
              >
                {items.map((item) => {
                  const active = item.path ? pathname === item.path : false;

                  return (
                    <SideNavItem
                      active={active}
                      disabled={item.disabled}
                      external={item.external}
                      icon={item.icon}
                      key={item.title}
                      path={item.path}
                      title={item.title}
                    />
                  );
                })}
              </Stack>
            </Box>
            <Divider sx={{ borderColor: "neutral.700" }} />
            <Box
              sx={{
                px: 2,
                py: 3,
              }}
            >
              <Typography color="neutral.100" variant="subtitle2">
                Estado
              </Typography>
              <Typography color="neutral.500" variant="body2">
                Sin conexion.
              </Typography>
              <Button
                className="bg-orange"
                component="a"
                endIcon={
                  <SvgIcon fontSize="small">
                    <ArrowTopRightOnSquareIcon />
                  </SvgIcon>
                }
                fullWidth
                href="/manual"
                sx={{ mt: 2 }}
                variant="contained"
              >
                Manual
              </Button>
            </Box>
          </Box>
        </Scrollbar>
      )}
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "neutral.800",
            color: "common.white",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.800",
          color: "common.white",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

SideNav.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};

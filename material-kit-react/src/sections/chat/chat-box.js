import { useEffect, useState, useRef } from "react";
import ArrowRightIcon from "@heroicons/react/24/solid/ArrowRightIcon";
import ClipboardIcon from "@heroicons/react/24/solid/ClipboardIcon";
import FaceSmileIcon from "@heroicons/react/24/solid/FaceSmileIcon";
import { Card, Grid, InputAdornment, OutlinedInput, SvgIcon, Button } from "@mui/material";
import Bars3Icon from "@heroicons/react/24/solid/Bars3Icon";
import { MessageUser } from "./components/message-user";
import { MessageHost } from "./components/message-host";
import { ChatData } from "./components/chat-data";

export const ChatBox = () => {
  const [visibleArea, setVisibleArea] = useState(true);
  const containerRef = useRef(null);

  const scrollToBottom = () => {
    const container = containerRef.current;
    container.scrollTop = container.scrollHeight;
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  useEffect(() => {
    if (visibleArea) {
      const element = document.querySelector(".areaRead");
      element.style.display = "none";
    } else {
      const element = document.querySelector(".areaRead");
      element.style.display = "block";
    }
  }, [visibleArea]);

  return (
    <Grid style={{ display: "flex" }} spacing={2}>
      <Card style={{ marginTop: 10, maxWidth: "100%" }} sx={{ p: 2 }}>
        <Grid style={{ marginBottom: 20 }} container spacing={2}>
          <Grid style={{ display: "flex" }} item xs={6}>
            <img
              width={40}
              height={40}
              style={{ borderRadius: 20, marginRight: 10 }}
              src="./assets/avatars/avatar-anika-visser.png"
            />
            <p style={{ marginTop: 10 }}>Usuario</p>
          </Grid>
          <Grid style={{ display: "flex", justifyContent: "end" }} item xs={6}>
            <p
              onClick={() => {
                setVisibleArea(!visibleArea);
              }}
              style={{ marginTop: 10, cursor: "pointer" }}
            >
              <SvgIcon color="action" fontSize="small">
                <Bars3Icon />
              </SvgIcon>
            </p>
          </Grid>
        </Grid>
        <Grid style={{ height: "70vh" }} container spacing={2}>
          <Grid
            ref={containerRef}
            container
            style={{ height: "90%", paddingTop: 40, overflowY: "auto" }}
            spacing={2}
          >
            {/* Mensajes */}
            <div style={{ paddingLeft: 30 }}>
              <MessageUser />
              <MessageHost />
              <MessageUser />
              <MessageHost />
              <MessageUser />
              <MessageHost />
              <MessageUser />
              <MessageHost />
              <MessageUser />
              <MessageHost />
              <MessageUser />
              <MessageHost />
              <MessageUser />
              <MessageHost />
              <MessageUser />
              <MessageHost />
              <MessageUser />
              <MessageUser />
            </div>
            {/* End Mensajes */}
          </Grid>
          <OutlinedInput
            defaultValue=""
            fullWidth
            style={{ marginLeft: 20 }}
            placeholder="Escribe un mensaje"
            endAdornment={
              <InputAdornment style={{ cursor: "pointer" }} position="end">
                <SvgIcon color="action" fontSize="small">
                  <ArrowRightIcon />
                </SvgIcon>
              </InputAdornment>
            }
            sx={{
              maxWidth: "49%",
              height: 50,
              "@media (min-width: 600px)": {
                maxWidth: "77%",
                height: 50,
              },
            }}
          />
          <Button style={{ height: 50, marginLeft: 10 }} variant="contained" className="bg-orange">
            <ClipboardIcon />
          </Button>
          <Button style={{ height: 50, marginLeft: 10 }} variant="contained" className="bg-orange">
            <FaceSmileIcon />
          </Button>
        </Grid>
      </Card>
      <Card className="areaRead" container spacing={2}>
        <ChatData visibleArea={visibleArea} setVisibleArea={setVisibleArea} />
      </Card>
    </Grid>
  );
};

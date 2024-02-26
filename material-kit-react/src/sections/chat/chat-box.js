import { useEffect, useState, useRef } from "react";
import ArrowRightIcon from "@heroicons/react/24/solid/ArrowRightIcon";
import io from "socket.io-client";
import ClipboardIcon from "@heroicons/react/24/solid/ClipboardIcon";
import FaceSmileIcon from "@heroicons/react/24/solid/FaceSmileIcon";
import { Card, Grid, InputAdornment, OutlinedInput, SvgIcon, Button } from "@mui/material";
import Bars3Icon from "@heroicons/react/24/solid/Bars3Icon";
import { MessageUser } from "./components/message-user";
import { MessageHost } from "./components/message-host";
import { ChatData } from "./components/chat-data";

export const ChatBox = (props) => {
  const { chatActive, active, setActive, session } = props;
  const socketRef = useRef(null);

  const [visibleArea, setVisibleArea] = useState(true);
  const containerRef = useRef(null);

  const scrollToBottom = () => {
    const container = containerRef.current;
    container.scrollTop = container.scrollHeight;
  };

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socketRef.current = io("https://apituzumitos.codevalcanos.com/");

    socketRef.current.on("chat", (data) => {
      console.log(data);
      console.log(chatActive + " " + data.content[0].id.remote.replace("@c.us", ""));
      if (
        data.idSession == session &&
        chatActive == data.content[0].id.remote.replace("@c.us", "")
      ) {
        setMessages(data.content);
      }
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [messages, chatActive]);

  useEffect(() => {
    console.log(chatActive);
    if (chatActive != "") {
      socketRef.current.emit("chat", { chatId: chatActive + "@c.us", session: session });
    }
  }, [chatActive]);

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
      <Card style={{ marginTop: 10, maxWidth: "100%", width: "100%" }} sx={{ p: 2 }}>
        <Grid style={{ marginBottom: 20 }} container spacing={2}>
          <Grid style={{ display: "flex" }} item xs={6}>
            {chatActive != "" ? (
              <img
                width={40}
                id="chatImgUser"
                height={40}
                style={{ borderRadius: 20, marginRight: 10 }}
                src="https://cdn-icons-png.flaticon.com/512/5331/5331819.png"
              />
            ) : null}
            <p id="chatLabelUser" style={{ marginTop: 10 }}>
              Selecciona un usuario para abrir chat
            </p>
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
            <div style={{ width: "100%", paddingLeft: 30 }}>
              {chatActive != "" ? (
                <>
                  {messages
                    .reverse()
                    .map((sms, index) =>
                      !sms.hasMedia ? (
                        sms.id.fromMe ? (
                          <MessageHost sms={sms} key={index} />
                        ) : (
                          <MessageUser sms={sms} key={index} />
                        )
                      ) : null
                    )}
                </>
              ) : null}
            </div>
            {/* End Mensajes */}
          </Grid>
          {chatActive != "" ? (
            <>
              <OutlinedInput
                defaultValue=""
                fullWidth
                style={{ marginLeft: 20, marginBottom: 10 }}
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
              <Button
                style={{ height: 50, marginLeft: 10 }}
                variant="contained"
                className="bg-orange"
              >
                <ClipboardIcon />
              </Button>
              <Button
                style={{ height: 50, marginLeft: 10 }}
                variant="contained"
                className="bg-orange"
              >
                <FaceSmileIcon />
              </Button>
            </>
          ) : null}
        </Grid>
      </Card>
      <Card className="areaRead" container spacing={2}>
        <ChatData visibleArea={visibleArea} setVisibleArea={setVisibleArea} />
      </Card>
    </Grid>
  );
};

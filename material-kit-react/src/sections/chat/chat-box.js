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
import { MessageUserMedia } from "./components/message-user-media";
import { MessageHostMedia } from "./components/message-host-media";

export const ChatBox = (props) => {
  const { chatActive, active, setActive, session } = props;
  const socketRef = useRef(null);

  const [visibleArea, setVisibleArea] = useState(true);
  const containerRef = useRef(null);

  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };

  const [messages, setMessages] = useState([]);
  const [imgUser, setImgUser] = useState(null);
  const [nameUser, setNameUser] = useState(null);

  useEffect(() => {
    socketRef.current = io("http://localhost:3003/");

    socketRef.current.on("chat", (data) => {
      //console.log(data);
      if (
        data.idSession == session &&
        chatActive == data.content[0].id.remote.replace("@c.us", "")
      ) {
        console.log(data.content);
        setImgUser(data.picture);
        setNameUser(data.name);
        setMessages(data.content);
      }
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [messages, chatActive]);

  useEffect(() => {
    //console.log(chatActive);
    if (chatActive != "") {
      socketRef.current.emit("chat", { chatId: chatActive + "@c.us", session: session });
    }
  }, [chatActive]);

  useEffect(() => {
    setTimeout(() => {
      scrollToBottom();
    }, 0);
  }, [messages]);

  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    if (visibleArea) {
      const element = document.querySelector(".areaRead");
      element.style.display = "none";
    } else {
      const element = document.querySelector(".areaRead");
      element.style.display = "block";
    }
  }, [visibleArea]);

  const handleEnterPress = (event) => {
    if (event.key === "Enter" && inputValue != "") {
      // Ejecutar tu función aquí
      const msg = {
        session: session,
        type: "chat",
        hasMedia: false,
        body: inputValue,
        from: chatActive + "@c.us",
      };

      const addMsg = {
        id: {
          fromMe: true,
        },
        viewed: false,
        name: "",
        body: inputValue,
        type: "chat",
        timestamp: 1709409350,
        hasMedia: false,
      };

      const newMessages = messages;

      newMessages.push(addMsg);

      setMessages(newMessages);

      socketRef.current.emit("msg", msg);
      setInputValue("");
      scrollToBottom();
    }
  };

  return (
    <Grid style={{ display: "flex" }}>
      <Card style={{ marginTop: 10, maxWidth: "100%", width: "100%" }} sx={{ p: 2 }}>
        <Grid style={{ marginBottom: 20, height: 30 }}>
          <Grid style={{ display: "flex", paddingBottom: 10, position: "relative", left: 0 }}>
            {chatActive != "" ? (
              <img
                width={40}
                id="chatImgUser"
                height={40}
                style={{ borderRadius: 20, marginRight: 10 }}
                src={
                  imgUser != null
                    ? imgUser
                    : "https://is2-ssl.mzstatic.com/image/thumb/Purple114/v4/78/ca/3b/78ca3b54-3aac-a766-ce9c-26232ae1c66f/source/512x512bb.jpg"
                }
              />
            ) : null}
            <p id="chatLabelUser" style={{ marginTop: 10 }}>
              {nameUser != null ? nameUser : "Usuario"}
            </p>
          </Grid>
          <Grid style={{ display: "flex", justifyContent: "end", position: "relative", top: -55 }}>
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

        <Grid style={{ height: "70vh" }}>
          <Grid
            ref={containerRef}
            id="chatsMessagesScroll"
            style={{ height: "90%", paddingTop: 40, overflowY: "auto" }}
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
                          <MessageUser
                            imgUser={imgUser}
                            nameUser={nameUser}
                            sms={sms}
                            key={index}
                          />
                        )
                      ) : sms.id.fromMe ? (
                        <MessageHostMedia sms={sms} key={index} />
                      ) : (
                        <MessageUserMedia
                          imgUser={imgUser}
                          nameUser={nameUser}
                          sms={sms}
                          key={index}
                        />
                      )
                    )}
                </>
              ) : null}
            </div>
            {/* End Mensajes */}
          </Grid>
          {chatActive != "" ? (
            <>
              <OutlinedInput
                fullWidth
                value={inputValue}
                onChange={handleInputChange}
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
                onKeyDown={handleEnterPress}
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
      <Card className="areaRead">
        {nameUser != null ? (
          <ChatData
            imgUser={imgUser}
            nameUser={nameUser}
            session={session}
            chatActive={chatActive}
            visibleArea={visibleArea}
            setVisibleArea={setVisibleArea}
          />
        ) : null}
      </Card>
    </Grid>
  );
};

async function formatSms(message, index) {
  const user = await message.getChat();

  if (message.type == "poll_creation" || message.type == "sticker") {
    message["body"] =
      "Este mensaje es incompatible con el chatbot empresarial de tuzumitos, este puede ser un sticker o una encuesta.";
  }

  if (message.type == "vcard") {
    message["body"] = {
      number: message.body.split("\n").replace("N:;", "").replace(";;;", ""),
    };
  }

  if (message.type == "location") {
    message["body"] = { lat: message.lat, lng: message.lng };
  }

  const msg = {
    id: message.id,
    unread: user.unreadCount + 1,
    viewed: message._data.viewed,
    body: message.body,
    type: message["type"],
    timestamp: message["timestamp"],
    from: message["from"],
    to: message["to"],
    hasMedia: message["hasMedia"],
  };

  return {
    session: "session-client-" + index,
    idSession: index,
    level: "data",
    ping: new Date().getTime() / 1000,
    type: "chat",
    message: msg,
  };
}

/*async function formatSms(message, index) {
  const user = await message.getChat();
  const contact = await message.getContact();
  let pp = null;
  
  try {
    pp = await contact.getProfilePicUrl();
  } catch (error) {
    pp = null;
  }

  if (message.type == "poll_creation" || message.type == "sticker") {
    message["body"] =
      "Este mensaje es incompatible con el chatbot empresarial de tuzumitos, este puede ser un sticker o una encuesta.";
  }

  if (message.type == "vcard") {
    message["body"] = {
      number: message.body.split("\n").replace("N:;", "").replace(";;;", ""),
    };
  }

  if (message.type == "location") {
    message["body"] = { lat: message.lat, lng: message.lng };
  }

  const msg = {
    id: message.id,
    unread: user.unreadCount + 1,
    name: user.name,
    viewed: message._data.viewed,
    body: message.body,
    type: message["type"],
    timestamp: message["timestamp"],
    from: message["from"],
    to: message["to"],
    hasMedia: message["hasMedia"],
  };

  return {
    session: "session-client-" + index,
    idSession: index,
    level: "data",
    ping: new Date().getTime() / 1000,
    type: "chat",
    message: msg,
  };
}*/

async function formatSmsSingle(sms, user, index) {
  const chat = sms.map((message) => {
    if (message.type == "poll_creation" || message.type == "sticker") {
      message["body"] =
        "Este mensaje es incompatible con el chatbot empresarial de tuzumitos, este puede ser un sticker o una encuesta.";
    }

    if (message.type == "vcard") {
      message["body"] = {
        number: message.body.split("\n").replace("N:;", "").replace(";;;", ""),
      };
    }

    if (message.type == "location") {
      message["body"] = { lat: message.lat, lng: message.lng };
    }

    return {
      id: message.id,
      viewed: message._data.viewed,
      name: user.name,
      body: message.body,
      type: message.type,
      timestamp: message.timestamp,
      from: message.from,
      to: message.to,
      hasMedia: message.hasMedia,
    };
  });

  return {
    session: "session-client-" + index,
    idSession: index,
    id: user.id,
    name: user.name,
    level: "data",
    ping: new Date().getTime() / 1000,
    type: "chat-single",
    content: chat,
  };
}

async function formatSmsMedia(message, index) {
  try {
    const user = await message.getChat();
    const base64 = await message.downloadMedia();
    const msg = {
      id: message.id,
      unread: user.unreadCount + 1,
      viewed: message._data.viewed,
      body: base64,
      type: message["type"],
      timestamp: message["timestamp"],
      from: message["from"],
      to: message["to"],
      hasMedia: message["hasMedia"],
    };

    return {
      session: "session-client-" + index,
      idSession: index,
      level: "data",
      ping: new Date().getTime() / 1000,
      type: "chat",
      message: msg,
    };
  } catch (error) {
    return null;
  }
}

function formatInfo(info, index) {
  return {
    session: "session-client-" + index,
    idSession: index,
    type: info["type"],
    level: info["level"],
    content: info["content"],
    ping: new Date().getTime() / 1000,
  };
}

function formatChats(chats, index) {
  // Inicializa una matriz vacía para almacenar la nueva matriz
  const reducedChats = [];

  // Iterar a través de la matriz original
  chats.forEach((chat) => {
    //Solo chats que sean usuarios.
    if (!chat.isGroup && chat.lastMessage) {
      // Extrae los campos deseados del objeto original
      const {
        name,
        id,
        unreadCount,
        timestamp,
        lastMessage: { body, type, hasMedia, from, to },
      } = chat;

      // Crea un nuevo objeto con el conjunto reducido de campos
      const reducedChat = {
        name,
        id,
        unreadCount,
        timestamp,
        lastMessage: {
          body,
          type,
          hasMedia,
          from,
          to,
        },
      };

      // Agrega el nuevo objeto a la matriz reducida
      reducedChats.push(reducedChat);
    }
  });

  return {
    session: "session-client-" + index,
    idSession: index,
    level: "data",
    type: "chats",
    chats: reducedChats,
    ping: new Date().getTime() / 1000,
  };
}

module.exports = {
  formatSms,
  formatInfo,
  formatSmsMedia,
  formatChats,
  formatSmsSingle,
};

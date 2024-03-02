const { Client, LocalAuth } = require("whatsapp-web.js");
const {
  formatSms,
  formatInfo,
  formatSmsMedia,
  formatSmsSingle,
  formatChats,
} = require("./formatter");
const core = require("./core/index");

let users = [];
let session = [];
let status = [];
let ready = [];

const bot = {};

// Establece el socket.io del bot.
bot.index = async (io) => {
  io.on("connection", async (socket) => {
    //Ingreso del nuevo cliente.
    console.log("Nuevo cliente conectado: ", socket.id);

    //Agrega un usuario al arreglo.
    users.push(socket.id);

    //Evento para eliminar el cliente.
    socket.on("disconnect", async () => {
      console.log("Cliente desconectado: ", socket.id);
      // Elimina el usuario del arreglo users.
      users.splice(users.indexOf(socket.id), 1);
    });

    // Manejar eventos de inicio de sesion
    socket.on("session", async (data) => {
      try {
        // Guardar sesion en variable
        const index = data.session;
        console.log(`Cliente solicito conexion con sesion ${index}`);

        //Verifica el index de sesion para establecer el index anterior.
        const reIndex = index == 0 ? 0 : index - 1;
        console.log(session[index]);
        console.log(status[reIndex]);

        // Verifica que la sesion no halla una y que la sesion anterior este establecida primero.
        if (
          (session[index] == undefined && status[reIndex]) ||
          (session[index] == undefined && index == 0)
        ) {
          // Inicia la sesion.
          await bot.start(index, io);
        } else {
          /* Inicio de emision de datos */
          const content =
            "La sesión se encuentra activa o en proceso de activación, espere a recibir el código QR o en su defecto los chats.";
          const data = { type: "session", level: "info", content };
          io.emit("info", formatInfo(data, index));
          /* Fin de emision de datos */

          //Verifica que la sesion sea real y este totalmente operativa.
          if (ready[index]) {
            // Obtiene los chats de la sesion.
            const chats = await session[index].getChats();

            //Emite los datos a todos los clientes.
            io.emit("chats", formatChats(chats, index));
          }
        }
      } catch (error) {
        console.log("Ocurrio un error al manejar la sesion: " + error);
      }
    });

    //Manejar eventos de cerrado de sesion
    socket.on("logout", async (data) => {
      try {
        // Guardar sesion en variable
        const index = data.session;
        console.log(`Cliente solicito desconexion con sesion ${index}`);
        // Verifica que la sesion exista y que su estado se encuentre declarado.
        if (session[index] && status[index]) {
          // Eliminar todos los oyentes
          session[index].removeAllListeners();
          // Destruir la sesion.
          await session[index].destroy();
          // Vacia el estado del cliente en cuestion.
          status[index] = undefined;
          // Vaciar la sesion.
          session[index] = undefined;
          //Vaciar la bandera de completado del cliente.
          ready[index] = undefined;

          const content =
            "La sesión ha sido cerrada desde el servidor, por favor inicie de nuevo la sesión.";
          const data = { type: "disconnected", level: "warn", content };
          io.emit("info", formatInfo(data, index));
        }
      } catch (error) {
        console.log(
          "Ocurrio un error al manejar logout de instancia: " + error
        );
      }
    });

    //Manejar eventos sobre el enviado de archivos
    socket.on("msg", async (data) => {
      try {
        const index = data.session;
        console.log(`Cliente envio un mensaje a la sesion ${index}`);
        // Verifica que la sesion exista y que su estado se encuentre declarado.
        if (session[index] && status[index]) {
          //Envia al core(controlador) para que procese el mensaje entrante.
          await core.index(session[index], data);
          // Obtiene los chats de la sesion.
          const chats = await session[index].getChats();

          //Emite los datos a todos los clientes.
          io.emit("chats", formatChats(chats, index));
        }
      } catch (error) {
        console.log(
          "Ocurrio un error al manejar mensajes enviados desde el cliente al servidor: " +
            error
        );
      }
    });

    //Manejar informacion y chat
    socket.on("chat", async (data) => {
      try {
        const index = data.session;
        console.log(
          `Cliente solicito informacion de un chat de la sesion ${index}`
        );
        // Verifica que la sesion exista y que su estado se encuentre declarado.
        if (session[index] && status[index]) {
          const chat = await session[index].getChatById(data.chatId);
          let messages = await chat.fetchMessages({
            limit: 20,
          });
          io.emit("chat", await formatSmsSingle(messages, chat, index));
        }
      } catch (error) {
        console.log("Ocurrio un error al enviar chats al cliente: " + error);
      }
    });
  });
};

bot.start = async (index, io) => {
  try {
    // Inicia el cliente de whatsapp-js
    session[index] = new Client({
      puppeteer: {
        headless: "new",
      },
      authStrategy: new LocalAuth({ clientId: "client-" + index }),
    });
    // Fin de proceso de inicio del cliente whats-js

    // Llama y establece el oyente.
    await bot.bootstrap(session[index], index, io);

    // Inicializa el client en cuestion del chatbot.
    session[index].initialize();
  } catch (error) {
    console.log("Error al iniciar el cliente: " + error);
  }
};

//Establece el bootstrap y verifica si esta activo o no el bootstrap
bot.bootstrap = async (client, index, io) => {
  client.on("qr", (qr) => {
    try {
      /* Inicio de emision de datos */
      const data = { type: "qrcode", level: "info", content: qr };
      io.emit("info", formatInfo(data, index));
      /* Fin de emision de datos */

      // Establece estado registrado en la interfaz.
      status[index] = true;
      console.log("QR RECEIVED", qr);
    } catch (error) {
      console.log("Ocurrio un error al manejar el QR: " + error);
    }
  });

  client.on("message_edit", (message) => {
    console.log("SMS EDITED", message);
  });

  client.on("ready", async () => {
    try {
      const content =
        "La sesión ha cargado, por favor, espere a que reciba los chats. Si esta petición se demora recargue la página y conéctese a la sesión ya activa.";
      const data = { type: "ready", level: "success", content };
      io.emit("info", formatInfo(data, index));
      try {
        // Obtiene los chats de la sesion.
        const chats = await client.getChats();

        //Emite los datos a todos los clientes.
        io.emit("chats", formatChats(chats, index));

        //Indica que el cliente tiene una sesion real y activa para operar.
        ready[index] = true;
        status[index] = true;
      } catch (error) {
        console.log("Error al obtener chats.", error);
      }

      console.log("Client is ready!");
    } catch (error) {
      console.log("Ocurrio un error al manejar la instancia creada: " + error);
    }
  });

  client.on("disconnected", (reason) => {
    try {
      // Manejar la desconexión
      console.log(reason);
      // Vacia el estado del cliente en cuestion.
      status[index] = undefined;
      // Vaciar la sesion.
      session[index] = undefined;
      //Vaciar la bandera de completado del cliente.
      ready[index] = undefined;

      const content =
        "La sesión ha sido cerrada desde el dispositivo, por favor inicie de nuevo la sesión.";
      const data = { type: "disconnected", level: "warn", content };
      io.emit("info", formatInfo(data, index));
    } catch (error) {
      console.log(
        "Ocurrio un error al manejar la desconexion de un cliente: " + error
      );
    }
  });

  client.on("message", async (message) => {
    try {
      //Emite el mensaje a todos los clientes conectados al socket.
      io.emit("msg", await formatSms(message, index));

      const chat = await session[index].getChatById(message.from);
      let messages = await chat.fetchMessages();
      io.emit("chat", await formatSmsSingle(messages, chat, index));

      //Verifica que la sesion sea real y este totalmente operativa.
      if (ready[index]) {
        // Obtiene los chats de la sesion.
        const chats = await session[index].getChats();

        //Emite los datos a todos los clientes.
        io.emit("chats", formatChats(chats, index));
      }
      //Verifica el tipo de mensaje para descargar la (media)
      if (
        message.type == "document" ||
        message.type == "ppt" ||
        message.type == "video"
      ) {
        //Emite el mensaje pero con la media descargada en 100%.
        io.emit("msg", await formatSmsMedia(message, index));
      }
    } catch (error) {
      console.log(
        "Ocurrio un error al enviar mensaje escuchado al cliente web: " + error
      );
    }
  });
};

module.exports = bot;

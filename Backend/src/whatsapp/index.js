const { Client, LocalAuth } = require("whatsapp-web.js");
const {
  formatSms,
  formatInfo,
  formatSmsMedia,
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
      // Guardar sesion en variable
      const index = data.session;
      console.log(`Cliente solicito conexion con sesion ${index}`);

      //Verifica el index de sesion para establecer el index anterior.
      const reIndex = index == 0 ? 0 : index - 1;

      // Verifica que la sesion no halla una y que la sesion anterior este establecida primero.
      if (
        (!session[index] && status[reIndex]) ||
        (!session[index] && index == 0)
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
    });

    //Manejar eventos de cerrado de sesion
    socket.on("logout", async (data) => {
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
    });

    //Manejar eventos sobre el enviado de archivos
    socket.on("msg", async (data) => {
      console.log(`Cliente envio un mensaje a la sesion ${index}`);
      // Verifica que la sesion exista y que su estado se encuentre declarado.
      if (session[index] && status[index]) {
        //Envia al core(controlador) para que procese el mensaje entrante.
        await core.index(session[index], data);
      }
    });
  });
};

bot.start = async (index, io) => {
  try {
    // Inicia el cliente de whatsapp-js
    session[index] = new Client({
      puppeteer: {
        headless: false,
      },
      authStrategy: new LocalAuth({ clientId: "client-" + index }),
    });
    // Fin de proceso de inicio del cliente whats-js

    // Llama y establece el oyente.
    await bot.bootstrap(session[index], index, io);

    // Inicializa el client en cuestion del chatbot.
    session[index].initialize();
  } catch (error) {
    console.log("Error start: " + error);
  }
};

//Establece el bootstrap y verifica si esta activo o no el bootstrap
bot.bootstrap = async (client, index, io) => {
  client.on("qr", (qr) => {
    /* Inicio de emision de datos */
    const data = { type: "qrcode", level: "info", content: qr };
    io.emit("info", formatInfo(data, index));
    /* Fin de emision de datos */

    // Establece estado registrado en la interfaz.
    status[index] = true;
    console.log("QR RECEIVED", qr);
  });

  client.on("message_edit", (message) => {
    console.log("SMS EDITED", message);
  });

  client.on("ready", async () => {
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
    } catch (error) {
      console.log("Error al obtener chats.", error);
    }

    console.log("Client is ready!");
  });

  client.on("disconnected", (reason) => {
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
  });

  client.on("message", async (message) => {
    //Emite el mensaje a todos los clientes conectados al socket.
    io.emit("msg", await formatSms(message, index));
    //Verifica el tipo de mensaje para descargar la (media)
    if (
      message.type == "document" ||
      message.type == "ppt" ||
      message.type == "video"
    ) {
      //Emite el mensaje pero con la media descargada en 100%.
      io.emit("msg", await formatSmsMedia(message, index));
    }
  });
};

module.exports = bot;

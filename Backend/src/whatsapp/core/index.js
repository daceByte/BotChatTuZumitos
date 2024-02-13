const {
  formatSms,
  formatInfo,
  formatSmsMedia,
  formatChats,
} = require("../formatter");

const core = {};

//Procesa la entrada del cliente para enviar por la sesion del chatbot.
core.index = async (client, msg) => {
  //Verifica si el mensaje contiene un archivo multimedia.
  if (msg.hasMedia && !msg.locationMedia) {
    //Crea un objeto messageMedia apartir de un base64, para construir un mensaje con media(archivo multimedia).
    const media = new MessageMedia(msg.typeMedia, base64Image);
    //Envia el mensaje, en este caso el objeto messagemMedia base64.
    await client.sendMessage(msg.from, media);
  } else if (msg.hasMedia && msg.locationMedia) {
    //Crea un objeto messageMedia apartir de un archivo local, para construir un mensaje con media(archivo multimedia).
    const media = MessageMedia.fromFilePath(msg.body);
    //Envia el mensaje, en este caso el objeto messagemMedia archivo local.
    await client.sendMessage(msg.from, media);
  } else {
    //Envia el mensaje que es enviado desde algun cliente del chatbot.
    await client.sendMessage(msg.from, msg.body);
  }
};

module.exports = core;

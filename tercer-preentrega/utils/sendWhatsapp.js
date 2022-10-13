const twilio = require("twilio");

// const ACCOUNT_SID = "ACe87fed0ac4660dd435107afba7ea4ee6";
// const AUTH_TOKEN = "c2c7e6d6265de9cd96730445c5ec446b";
// const PHONE_NUMBER = "whatsapp:+12184132907"; 14155238886
const ACCOUNT_SID = "ACb81319c28fcecad693735793d292c679";
const AUTH_TOKEN = "31b65377badf796f3162a77e6f57fd79";
const PHONE_NUMBER = "whatsapp:+12184132907 ";

const client = twilio(ACCOUNT_SID, AUTH_TOKEN);

const sendWhatsapp = async (body) => {
  try {
    const message = await client.messages.create({
      body,
      from: PHONE_NUMBER,
      to: "whatsapp:+541130317884",
      //mediaUrl: ['foto.png']
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports = sendWhatsapp;

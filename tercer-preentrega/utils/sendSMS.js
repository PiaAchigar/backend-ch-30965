const twilio = require("twilio");

const ACCOUNT_SID = "ACb81319c28fcecad693735793d292c679";
const AUTH_TOKEN = "29eccccd57e20002612841171a4ab3cc";
const PHONE_NUMBER = "+12184132907";

const client = twilio(ACCOUNT_SID, AUTH_TOKEN);

const sendSMS = async (body) => {
  try {
    const message = await client.messages.create({
      body,
      from: PHONE_NUMBER,
      to: "+541130317884",
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports = sendSMS;

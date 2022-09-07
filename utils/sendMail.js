const { createTransport } = require("nodemailer");
//forma que tiene notmailer de configurar por donde quiere que salga nuestros correos electrónicos

const sendMail = async (to, subject, content) => {
  const transporter = createTransport({
    //esta fn indica desde donde enviamos el correo electronico
    //el servidor tiene que ser de tipo smtp
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: process.env.ADMIN_EMAIL,
      pass: process.env.ADMIN_PASSWORD,
    },
  });

  const mailOptions = {
    //indica que es lo que vamos a mandar y a quién
    from: `e-commerce farmacia <${process.env.ADMIN_EMAIL}>`,
    to: to ?? process.env.ADMIN_EMAIL,
    subject: subject,
    html: content,
    //html: `<h1 style="color:blue;"> Contenido de prueba desde <span style="color:green;"> Node.js con Nodemailer</span> </h1>`
  };

  try {
    const response = await transporter.sendMail(mailOptions);
    console.log(response);
  } catch (e) {
    console.log(e);
  }
};

module.exports = sendMail;

const nodemailer = require("nodemailer");
require("dotenv").config();

// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: false,
//   auth: {
//     user: "lovicharm365@gmail.com",
//     pass: "LoviCh@rm901",
//   },
// });

//Create a transporter object using SMTP transport
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  ignoreTLS: true,
  secureConnection: false,
  secure: false,
  tls: {
    rejectUnauthorized: false,
    //    ciphers: "SSLv3"
  },
  auth: {
    user: "lovicharm365@gmail.com",
    pass: "LoviCh@rm901",
  },
});

export async function activeAccount(email, username, active_link) {
  const message = `
    <html>
      <head>
        <meta charset="utf-8">
      </head>
      <body>
        <p>Hi ${username},</p>
        <br>
        <p>Thank you for your registration on LoviConnect.</p>
        <p>Please click the link below to active your account: </p>
        <a href="http://localhost:3000/user/active/${active_link}">Click Me</a>
      </body>
    </html>
    `;

  await transporter.sendMail(
    {
      from: "lovicharm365@gmail.com",
      to: email,
      subject: "Welcome to LoviConnect",
      html: message,
      contentType: "text/html",
    },
    (err, info) => {
      if (err) console.log(err);
      console.log("transEmail", err);
      // console.log("Message sent: %s", info.messageId);
      // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    },
  );
}

export async function resetpwd(email, username, resetpwd_link) {
  //   const transporter = nodemailer.createTransport({
  //     host: 'smtp.ethereal.email',
  //     port: 587,
  //     secure: false,
  //     auth: {
  //         user: 'armando.towne@ethereal.email',
  //         pass: 'JfCrTrZsXVVeG88nbZ'
  //     }
  // });

  const message = `
  <html>
    <head>
      <meta charset="utf-8">
    </head>
    <body>
      <p>Hi ${username},</p>
      <br>
      <p>We received your request of reseting your passward on LoviConnect.</p>
      <p>Please click the link below: </p>
      <a href="http:localhost:3000/resetpwd/${resetpwd_link}">Click Me</a>
    </body>
  </html>
  `;

  await transporter.sendMail(
    {
      from: "noreply@matcha.42.fr",
      to: email,
      subject: "Reset your password on Matcha",
      html: message,
      contentType: "text/html",
    },
    (err, info) => {
      if (err) console.log(err);
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    },
  );
}

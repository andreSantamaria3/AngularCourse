const nodemailer = require("nodemailer");

module.exports= class Transport{

    
 transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'asistencia12usuarios@gmail.com', // generated ethereal user
      pass: 'Ivondy1504@Cor', // generated ethereal password
    },
  });

//   transporter.verify().then(()=>{
//       console.log("Puedo enviar correos");
//   });



}

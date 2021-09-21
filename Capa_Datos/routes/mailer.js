const express = require("express");
const router = express.Router();
//const Transporter = require('../../models/mail');

//para correo
const nodemailer = require("nodemailer");

// let transporter=Transporter;
//  // create reusable transporter object using the default SMTP transport
   let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'asistencia12usuarios@gmail.com', // generated ethereal user
      pass: 'trecgmoukexwlsmt', // generated ethereal password
    },
  });

transporter.verify().then(()=>{
      console.log("Puedo enviar correos");
  });




  // correo crear usuario 
  router.post("/correocrear",async (req,res,next)=>{

    //const post= req.body;

    console.log("CORREO AL CREAR");

    let NombreUser=req.body.NombreUser;
    let PassUser=req.body.PassUser;

    console.log("Req es: "+req.body);

    
    console.log(String(NombreUser));
    console.log(String(PassUser));  

    await transporter.sendMail({
        from: '"Notificacion" <asistencia12usuarios@gmail.com>', // sender address
        to: NombreUser, // list of receivers
        subject: "Notificacion de Usuario creado", // Subject line
        text: ("Sus credenciales para la aplicacion son: Username: "+NombreUser+" Password: "+PassUser), // plain text body
       
      });

    res.status(201).json({
        NombreUser
    });

});




  // correo pedir permiso 
  router.post("/correopedir",async (req,res,next)=>{
    //const post= req.body;

    console.log("CORREO AL PEDIR PERMISO");

    let CorreoGerente=req.body.CorreoGerente;
    let NombreUser=req.body.NombreUser;
    let ApellidoUser=req.body.ApellidoUser;
    let TipoPermiso=req.body.TipoPermiso;
    let FechaPermiso=req.body.FechaPermiso;
    
    console.log("Req es: "+req.body);

    
    console.log(String(NombreUser));
    console.log(String(ApellidoUser));  

    await transporter.sendMail({
        from: '"Notificacion" <asistencia12usuarios@gmail.com>', // sender address
        to: CorreoGerente, // list of receivers
        subject: "Notificacion de Permiso Pedido", // Subject line
        text: ("Los datos del permiso pedido son: Empleado: "+NombreUser+"  "+
        ApellidoUser+" pide un permiso de: "+TipoPermiso+" para la fecha: "+ FechaPermiso), // plain text body
       
      });


    res.status(201).json({
        NombreUser
    });

});



  // correo aprobar/negar permiso 
  router.post("/correoaprob",async (req,res,next)=>{
    //const post= req.body;
    
    console.log("CORREO AL Verificar PERMISO");

    let CorreoEmpleado=req.body.CorreoEmpleado;
    let TipoPermiso=req.body.TipoPermiso;
    let FechaPermiso=req.body.FechaPermiso;
    let Verificado=req.body.Verificado;
    
    console.log("Req es: "+req.body);

    
    console.log(String(CorreoEmpleado));
    console.log(String(Verificado));  

    await transporter.sendMail({
        from: '"Notificacion" <asistencia12usuarios@gmail.com>', // sender address
        to: CorreoEmpleado, // list of receivers
        subject: "Notificacion de Permiso ", // Subject line
        text: ("Estimad@.  Su permiso de: "+TipoPermiso+" para la fecha: "+ FechaPermiso+
        " ha sido:  "+Verificado), // plain text body
       
      });


    res.status(201).json({
        Verificado
    });

});

module.exports= router;
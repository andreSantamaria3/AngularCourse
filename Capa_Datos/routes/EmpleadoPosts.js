const express = require("express");
const router = express.Router();
const Empleado = require('../models/empleado');
const Post= require("../models/empleado");
router.post("",async (req,res,next)=>{
    //const post= req.body;
    console.log("Req es: "+req.body.Nombre_Empleado);
    const post= new Empleado({
        Departamento_idDepartamento:req.body.Departamento_idDepartamento.Id_Departamento,
        Nombre_Empleado:req.body.Nombre_Empleado,
        Apellido_Empleado:req.body.Apellido_Empleado,
        Cedula: req.body.Cedula,
        Telefono: req.body.Telefono,
        Direccion: req.body.Direccion,
        Correo: req.body.Correo
    }
    );
    console.log("correo: "+post.Correo_Empleado);  
    await Empleado.post(String(req.body.Departamento_idDepartamento.Id_Departamento),
     String(req.body.Nombre_Empleado),
     String(req.body.Apellido_Empleado),
     String(req.body.Cedula),
     String(req.body.Telefono),
     String(req.body.Direccion),
     String(req.body.Correo));
    res.status(201).json({
        post
    });

});

router.put("",async (req,res,next)=>{
    console.log("empleado REQ: "+req.body.Nombre_Empleado);
     const post= new Empleado({
         id_Empleado:req.body.id_Empleado,
         Departamento_idDepartamento:req.body.Departamento_idDepartamento.Id_Departamento,
         Nombre_Empleado:req.body.Nombre_Empleado,
         Apellido_Empleado:req.body.Apellido_Empleado,
         Cedula: req.body.Cedula,
         Telefono: req.body.Telefono,
         Direccion: req.body.Direccion,
         Correo: req.body.Correo}
    );
    console.log("Id es:");
     console.log(req.body.id_Empleado);  
    await Empleado.update(req.body.id_Empleado,
      String(req.body.Departamento_idDepartamento.Id_Departamento),
      String(req.body.Nombre_Empleado),
      String(req.body.Apellido_Empleado),
      String(req.body.Cedula),
      String(req.body.Telefono),
      String(req.body.Direccion),
      String(req.body.Correo));
     res.status(201).json({
         post
     });
});



router.get("",async (req,res,next)=>{
    const [posts]= await Empleado.fetchAll();
    res.status(200).json({message:'Empleados'
    , posts:posts});
});



router.get("/one/:cedEmpleado",async (req,res,next)=>{
    console.log("found: "+req.body);
    //  const post= new Empleado({
    //      id_Empleado:req.body.id_Empleado,
    //      Departamento_idDepartamento:req.body.Departamento_idDepartamento.Id_Departamento,
    //      Nombre_Empleado:req.body.Nombre_Empleado,
    //      Apellido_Empleado:req.body.Apellido_Empleado,
    //      Cedula: req.body.Cedula,
    //      Telefono: req.body.Telefono,
    //      Direccion: req.body.Direccion,
    //      Correo: req.body.Correo}
    // );
    const idSearch=String(req.params.cedEmpleado);
    const idSearchNew=idSearch.substring(1);
   console.log(idSearchNew);
    console.log("Cedula es: ",idSearchNew); 
    const [posts]=await Empleado.fetchOne(idSearchNew);
    res.status(200).json({message:'Empleado Encontrado'
    , posts:posts});
});



router.delete('/:id_Empleado',async (req,res,next)=>{
     console.log("para borrar: "+req.params.id_Empleado);
   const idDel=String(req.params.id_Empleado);
   const iDelNew=idDel.substring(1);
   console.log(iDelNew);
  await Empleado.delete(iDelNew);

    res.status(200).json({message:'Eliminado '+req.params.id_Empleado});
});


module.exports= router;
const express = require("express");
const Asistencia = require("../models/asistencia");
const router = express.Router();
const Empleado = require('../models/asistencia');

const Post= require("../models/asistencia");
const CheckAuth=require("../middleware/check-auth");

//router.get();

router.post("",async (req,res,next)=>{
    //const post= req.body;
    console.log("Req es: "+req.body);
    const post= new Asistencia({
       
    

        Empleado_idEmpleado:req.body.Empleado_idEmpleado,
        Fecha_Asistencia:req.body.Fecha_Asistencia,
        Hora_Inicio_Dia:req.body.Hora_Inicio_Dia,
        Hora_Almuerzo_Inicio_Dia: req.body.Hora_Almuerzo_Inicio_Dia,
        Hora_Almuerzo_Fin_Dia: req.body.Hora_Almuerzo_Fin_Dia,
        Hora_Fin: req.body.Hora_Fin,
        Movilidad_Dia: req.body.Movilidad_Dia
    }

    );
    
    console.log(String(post.Correo_Empleado));  

     await Asistencia.post(String(post.Empleado_idEmpleado),
     String(post.Fecha_Asistencia),
     String(post.Hora_Inicio_Dia),
     String(post.Hora_Almuerzo_Inicio_Dia),
     String(post.Hora_Almuerzo_Fin_Dia),
     String(post.Hora_Fin),
     String(post.Movilidad_Dia));

    res.status(201).json({
        post
    });

});

router.put("",async (req,res,next)=>{
    //const post= req.body;

    console.log("REQ: "+req.body);
     const post= new Asistencia({
         id_Asistencia:req.body.id_Asistencia,
         
        Empleado_idEmpleado:req.body.Empleado_idEmpleado,
        Fecha_Asistencia:req.body.Fecha_Asistencia,
        Hora_Inicio_Dia:req.body.Hora_Inicio_Dia,
        Hora_Almuerzo_Inicio_Dia: req.body.Hora_Almuerzo_Inicio_Dia,
        Hora_Almuerzo_Fin_Dia: req.body.Hora_Almuerzo_Fin_Dia,
        Hora_Fin: req.body.Hora_Fin,
        Movilidad_Dia: req.body.Movilidad_Dia}

    );
    console.log("Id es:");
     console.log(String(post.id_Empleado));  

    await Asistencia.updateAsistencia(String(post.Empleado_idEmpleado),
    String(post.Fecha_Asistencia),
    String(post.Hora_Inicio_Dia),
    String(post.Hora_Almuerzo_Inicio_Dia),
    String(post.Hora_Almuerzo_Fin_Dia),
    String(post.Hora_Fin),
    String(post.Movilidad_Dia));

     res.status(201).json({
         post
     });

});



router.get("",async (req,res,next)=>{
    const [posts]= await Asistencia.fetchAllAsist();
    res.status(200).json({message:'Empleados'
    , posts:posts});
});



router.get("/one/:cedEmpleado",async (req,res,next)=>{

    console.log("found: "+req.body);
     const post= new Asistencia({
        id_Asistencia:req.body.id_Asistencia,
        Empleado_idEmpleado:req.body.Empleado_idEmpleado,
        Fecha_Asistencia:req.body.Fecha_Asistencia,
        Hora_Inicio_Dia:req.body.Hora_Inicio_Dia,
        Hora_Almuerzo_Inicio_Dia: req.body.Hora_Almuerzo_Inicio_Dia,
        Hora_Almuerzo_Fin_Dia: req.body.Hora_Almuerzo_Fin_Dia,
        Hora_Fin: req.body.Hora_Fin,
        Movilidad_Dia: req.body.Movilidad_Dia
}

    );

    const idSearch=String(req.params.cedEmpleado);
    const idSearchNew=idSearch.substring(1);
   console.log(idSearchNew);
 
    console.log("Cedula es: ",idSearchNew); 

    
    const [posts]=await Asistencia.fetchOne(idSearchNew);

    res.status(200).json({message:'Empleado Encontrado'
    , posts:posts});

    
});



router.delete('/:idEmpleado',async (req,res,next)=>{

      const post= new Asistencia({
        id_Asistencia:req.body.id_Asistencia,
          idEmpleado:req.body.id_Empleado,
          Empleado_idEmpleado:req.body.Empleado_idEmpleado,
          Fecha_Asistencia:req.body.Fecha_Asistencia,
          Hora_Inicio_Dia:req.body.Hora_Inicio_Dia,
          Hora_Almuerzo_Inicio_Dia: req.body.Hora_Almuerzo_Inicio_Dia,
          Hora_Almuerzo_Fin_Dia: req.body.Hora_Almuerzo_Fin_Dia,
          Hora_Fin: req.body.Hora_Fin,
          Movilidad_Dia: req.body.Movilidad_Dia}
  

     );

   const idDel=String(req.params.id_Empleado);
   const iDelNew=idDel.substring(1);
   console.log(iDelNew);
  await Asistencia.delete(iDelNew);

    res.status(200).json({message:'Eliminado',post});
});

// get para las vistas

//Vistas para las fechas de los atrasos

router.get("/fechaatraso",async (req,res,next)=>{
    const [posts]= await Asistencia.ViewFechaAtraso();
    res.status(200).json({message:'Empleados'
    , posts:posts});
});


//Total de atrasos

router.get("/totatraso",async (req,res,next)=>{
    const [posts]= await Asistencia.ViewTotalAtraso();
    res.status(200).json({message:'Empleados'
    , posts:posts});
});

//Vista de fechas de faltas

router.get("/fechafalta",async (req,res,next)=>{
    const [posts]= await Asistencia.ViewFechaFalta();
    res.status(200).json({message:'Empleados'
    , posts:posts});
});

//vista total de faltas

router.get("/totalfalta",async (req,res,next)=>{
    const [posts]= await Asistencia.ViewTotalFalta();
    res.status(200).json({message:'Asistencia'
    , posts:posts});
});

//vista de fechas de horas extra

router.get("/fechahextra",async (req,res,next)=>{
    const [posts]= await Asistencia.ViewFechaHoraExtra();
    res.status(200).json({message:'Empleados'
    , posts:posts});
});

//vista total de horas extra

router.get("/totalhextra",async (req,res,next)=>{
    const [posts]= await Asistencia.ViewTotalHoraExtra();
    res.status(200).json({message:'Empleados'
    , posts:posts});
});

//fechas de movilidad extra

router.get("/femovextra",async (req,res,next)=>{
    const [posts]= await Asistencia.ViewFechasMovilidadExtra();
    res.status(200).json({message:'Empleados'
    , posts:posts});
});

//vista de total de dias con movilidad extra

router.get("/tomovextra",async (req,res,next)=>{
    const [posts]= await Asistencia.ViewTotalDiasMovilidadExe();
    res.status(200).json({message:'Empleados'
    , posts:posts});
});



//get One para cada consulta de fechas y totales 

//fechas de atraso
router.get("/oneFA/:cedEmpleado",async (req,res,next)=>{

    console.log("found: "+req.body);
     

    const idSearch=String(req.params.cedEmpleado);
    const idSearchNew=idSearch.substring(1);
   console.log(idSearchNew);
 
    console.log("Cedula es: ",idSearchNew); 

    
    const [posts]=await Asistencia.fetchOneFechatraso(idSearchNew);

    res.status(200).json({message:'Empleado Encontrado'
    , posts:posts});

    
});

//total de atrasos
router.get("/oneTA/:cedEmpleado",async (req,res,next)=>{

    console.log("found: "+req.body);
     

    const idSearch=String(req.params.cedEmpleado);
    const idSearchNew=idSearch.substring(1);
   console.log(idSearchNew);
 
    console.log("Cedula es: ",idSearchNew); 

    
    const [posts]=await Asistencia.fetchOneTotatraso(idSearchNew);

    res.status(200).json({message:'Empleado Encontrado'
    , posts:posts});

    
});

//fechas de faltas
router.get("/oneFF/:cedEmpleado",async (req,res,next)=>{

    console.log("found: "+req.body);
     

    const idSearch=String(req.params.cedEmpleado);
    const idSearchNew=idSearch.substring(1);
   console.log(idSearchNew);
 
    console.log("Cedula es: ",idSearchNew); 

    
    const [posts]=await Asistencia.fetchOneFechaFalta(idSearchNew);

    res.status(200).json({message:'Empleado Encontrado'
    , posts:posts});

    
});


//total de faltas
router.get("/oneTF/:cedEmpleado",async (req,res,next)=>{

    console.log("found: "+req.body);
     

    const idSearch=String(req.params.cedEmpleado);
    const idSearchNew=idSearch.substring(1);
   console.log(idSearchNew);
 
    console.log("Cedula es: ",idSearchNew); 

    
    const [posts]=await Asistencia.fetchOneTotalFalta(idSearchNew);

    res.status(200).json({message:'Empleado Encontrado'
    , posts:posts});

    
});

//fechas de horas extra
router.get("/oneFHE/:cedEmpleado",async (req,res,next)=>{

    console.log("found: "+req.body);
     

    const idSearch=String(req.params.cedEmpleado);
    const idSearchNew=idSearch.substring(1);
   console.log(idSearchNew);
 
    console.log("Cedula es: ",idSearchNew); 

    
    const [posts]=await Asistencia.fetchOneFHE(idSearchNew);

    res.status(200).json({message:'Empleado Encontrado'
    , posts:posts});

    
});



//total de horas extra
router.get("/oneTHE/:cedEmpleado",async (req,res,next)=>{

    console.log("found: "+req.body);
     

    const idSearch=String(req.params.cedEmpleado);
    const idSearchNew=idSearch.substring(1);
   console.log(idSearchNew);
 
    console.log("Cedula es: ",idSearchNew); 

    
    const [posts]=await Asistencia.fetchOneTHE(idSearchNew);

    res.status(200).json({message:'Empleado Encontrado'
    , posts:posts});

    
});



//fechas de movilidad extra
router.get("/oneFME/:cedEmpleado",async (req,res,next)=>{

    console.log("found: "+req.body);
     

    const idSearch=String(req.params.cedEmpleado);
    const idSearchNew=idSearch.substring(1);
   console.log(idSearchNew);
 
    console.log("Cedula es: ",idSearchNew); 

    
    const [posts]=await Asistencia.fetchOneFechasFME(idSearchNew);

    res.status(200).json({message:'Empleado Encontrado'
    , posts:posts});

    
});



//total de movilidad extra
router.get("/oneTME/:cedEmpleado",async (req,res,next)=>{

    console.log("found: "+req.body);
     

    const idSearch=String(req.params.cedEmpleado);
    const idSearchNew=idSearch.substring(1);
   console.log(idSearchNew);
 
    console.log("Cedula es: ",idSearchNew); 

    
    const [posts]=await Asistencia.fetchOneTotalFME(idSearchNew);

    res.status(200).json({message:'Empleado Encontrado'
    , posts:posts});

    
});




//asistencias por empleado
router.get("/oneAsists/:cedEmpleado",async (req,res,next)=>{

    console.log("found: "+req.body);
     

    const idSearch=String(req.params.cedEmpleado);
    const idSearchNew=idSearch.substring(1);
   console.log(idSearchNew);
 
    console.log("Cedula es: ",idSearchNew); 

    
    const [posts]=await Asistencia.fetchOneAsists(idSearchNew);

    res.status(200).json({message:'Empleado Encontrado'
    , posts:posts});

    
});




module.exports= router;
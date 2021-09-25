const express = require("express");
const router = express.Router();
const Departamento = require('../models/departamento');

const Post= require("../models/empleado");

//router.get();

router.post("",async (req,res,next)=>{
    //const post= req.body;
    const post= new Departamento({
       
        Nombre_Departamento:req.body.Nombre_Departamento,
        Descripcion:req.body.Descripcion,
        Latitud1: req.body.Latitud1,
        Latitud2: req.body.Latitud2,
        Longitud1: req.body.Longitud1,
        Longitud2: req.body.Longitud2
    }

    );
    
    console.log(String(post.Nombre_Departamento));  

     await Departamento.post(
     String(post.Nombre_Departamento),
     String(post.Descripcion),
     String(post.Latitud1),
     String(post.Latitud2),
     String(post.Longitud1),
     String(post.Longitud2));

    res.status(201).json({
        post
    });

});

router.put("",async (req,res,next)=>{
    //const post= req.body;

    console.log(req.body);
    // const post= new Departamento({
       
    //     id_Departamento:req.body.id_Departamento,
    //     Nombre_Departamento:req.body.Nombre_Departamento,
    //     Descripcion:req.body.Descripcion,
    //     Latitud1: req.body.Latitud1,
    //     Latitud2: req.body.Latitud2,
    //     Longitud1: req.body.Longitud1,
    //     Longitud2: req.body.Longitud2
    // }
    // );
    console.log("Id es:");
     console.log(String(" Id: "+req.body.Id_Departamento+" DEscripcion: "+req.body.Descripcion));  

    await Departamento.update(req.body.Id_Departamento,
    String(req.body.Nombre_Departamento),
    String(req.body.Descripcion),
    String(req.body.Latitud_Dep1),
    String(req.body.Longitud_Dep1),
    String(req.body.x_Dep),
    String(req.body.y_Dep));

     res.status(201).json({
       //  post
     });

});



router.get("",async (req,res,next)=>{
    const [posts]= await Departamento.fetchAllDep();
    res.status(200).json({message:'Departamentos'
    , posts:posts});
});



router.get("/one/:cedDepartamento",async (req,res,next)=>{

    
    console.log("req: "+req.body);
     const post= new Departamento({
    
        
        id_Departamento:req.body.id_Departamento,
        Nombre_Departamento:req.body.Nombre_Departamento,
        Descripcion:req.body.Descripcion,
        Latitud1: req.body.Latitud1,
        Latitud2: req.body.Latitud2,
        Longitud1: req.body.Longitud1,
        Longitud2: req.body.Longitud2
        
    }

    );

    const idSearch=String(req.params.id_Depar);
    const idSearchNew=idSearch.substring(1);
   console.log(idSearchNew);
 
    console.log("Id es es: ",idSearchNew); 

    
    const [posts]=await Departamento.fetchOneName(idSearchNew);

    res.status(200).json({message:'Departamento Encontrado'
    , posts:posts});

    
});



router.delete('/:idDepartamento',async (req,res,next)=>{

      const post= new Departamento({
          
        id_Departamento:req.body.id_Departamento,
        Nombre_Departamento:req.body.Nombre_Departamento,
        Descripcion:req.body.Descripcion,
        Latitud1: req.body.Latitud1,
        Latitud2: req.body.Latitud2,
        Longitud1: req.body.Longitud1,
        Longitud2: req.body.Longitud2
        }

     );

   const idDel=String(req.params.id_Depar);
   const iDelNew=idDel.substring(1);
   console.log(iDelNew);
  await Departamento.delete(iDelNew);

    res.status(200).json({message:'Eliminado',post});
});





//vista de departamentos y empleados
router.get("deparemple",async (req,res,next)=>{
    const [posts]= await Departamento.ViewEmpleadoDepartamento();
    res.status(200).json({message:'Departamentos'
    , posts:posts});
});





//****************VER Departamento */

router.get("/Departamento",async (req,res,next)=>{
    const [posts]= await Departamento.ViewEmpleadoDepartamento();
    res.status(200).json({message:'Contratos'
    , posts:posts});
});



//buscar 
router.get("/oneDepartamento/:idDepto",async (req,res,next)=>{

    
    console.log("contrato req: "+req.body);
    //  const post= new Contrato({
    
        
        
    //     Id_Contrato:req.body.Id_Contrato,
    //     Empleado_idEmpleado:req.body.Empleado_idEmpleado.id_Empleado,
    //     Fecha_Inicio:req.body.Fecha_Inicio,
    //     Salario: req.body.Salario,
    //     Cargo: req.body.Cargo,
    //     Movilidad: req.body.Movilidad,
    //     Hora_Inicio_Contrato: req.body.Hora_Inicio_Contrato,
    //     Hora_Almuerzo_Inicio_Contrato: req.body.Hora_Almuerzo_Inicio_Contrato,
    //     Hora_Almuerzo_Final_Contrato: req.body.Hora_Almuerzo_Final_Contrato,
    //     Hora_Fin_Contrato: req.body.Hora_Fin_Contrato
        
    // }

    //);

    const idSearch=String(req.params.Empleado_idEmpleado.Cedula);
    const idSearchNew=idSearch.substring(1);
   console.log(idSearchNew);
 
    console.log("Cedula es: ",idSearchNew); 

    
    const [posts]=await Departamento.OneEmpleadoDepartamento(idSearchNew);

    res.status(200).json({message:'Contrato Encontrado'
    , posts:posts});

    
});


















module.exports= router;
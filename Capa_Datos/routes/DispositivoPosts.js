const express = require("express");
const router = express.Router();
const Dispositivo = require('../../models/dispositivo');



//router.get();

router.post("",async (req,res,next)=>{
    //const post= req.body;
    const post= new Dispositivo({
       
     

        Empleado_idEmpleado:req.body.Empleado_idEmpleado.id_Empleado,
        Mac_Add:req.body.Mac_Add,
        IP: req.body.IPdis,
        Nombre_SO: req.body.Nombre_SO,
        Activo: req.body.Activo
    }

    );
    
    console.log(String(post.Nombre_Departamento));  

     await Dispositivo.post(
     String(req.body.Empleado_idEmpleado.id_Empleado),
     String(req.body.Mac_Add),
     String(req.body.IPdis),
     String(req.body.Nombre_SO),
     String(req.body.Activo));

    res.status(201).json({
        post
    });

});

router.put("",async (req,res,next)=>{
    //const post= req.body;

    console.log(req.body);
    const post= new Dispositivo({
       
        Id_Dispositivo:req.body.Id_Dispositivo,
        Empleado_idEmpleado:req.body.Empleado_idEmpleado,
        Mac_Add:req.body.Mac_Add,
        IP: req.body.IPdis,
        Nombre_SO: req.body.Nombre_SO,
        Activo: req.body.Activo
    }
    );
    console.log("emple Id es:");
     console.log(Number(req.body.Id_Dispositivo));  
     console.log("dispo Id es:");
     console.log(req.body.Id_Dispositivo);
     console.log("dispo activo es:");
     console.log(req.body.Activo);  
  

    await Dispositivo.update(Number(req.body.Id_Dispositivo),
    Number(req.body.Empleado_idEmpleado),
        String(req.body.Mac_Add),
        String(req.body.IPdis),
        String(req.body.Nombre_SO),
        Number(req.body.Activo));

     res.status(201).json({
         post
     });

});


//

router.get("",async (req,res,next)=>{
    const [posts]= await Dispositivo.fetchAllDisp();//revisar fetchall esta mal
    res.status(200).json({message:'Dispositivos'
    , posts:posts});
});



router.get("/one/:idDispositivo",async (req,res,next)=>{

    
    console.log("req: "+req.body);
     const post= new Dispositivo({
    
        
        
        Id_Dispositivo:req.body.Id_Dispositivo,
        Empleado_idEmpleado:req.body.Empleado_idEmpleado.id_Empleado,
        Mac_Add:req.body.Mac_Add,
        IP: req.body.IPdis,
        Nombre_SO: req.body.Nombre_SO,
        Activo: req.body.Activo
        
    }

    );

    const idSearch=String(req.params.Empleado_idEmpleado.id_Empleado);
    const idSearchNew=idSearch.substring(1);
   console.log(idSearchNew);
 
    console.log("Id es es: ",idSearchNew); 

    
    const [posts]=await Dispositivo.fetchOne(idSearchNew);

    res.status(200).json({message:'Dispositivo Encontrado'
    , posts:posts});

    
});



router.delete('/:idDispositivo',async (req,res,next)=>{

      const post= new Dispositivo({
          
         
        Id_Dispositivo:req.body.Id_Dispositivo,
        Empleado_idEmpleado:req.body.Empleado_idEmpleado.id_Empleado,
        Mac_Add:req.body.Mac_Add,
        IP: req.body.IPdis,
        Nombre_SO: req.body.Nombre_SO,
        Activo: req.body.Activo
        }

     );

   const idDel=String(req.params.Id_Dispositivo);
   const iDelNew=idDel.substring(1);
   console.log(iDelNew);
  await Dispositivo.delete(iDelNew);

    res.status(200).json({message:'Eliminado',post});
});





//****************VER DISPOSITIVO */

router.get("/Dispositivo",async (req,res,next)=>{
    const [posts]= await Dispositivo.fetchDispEmple();
    res.status(200).json({message:'Contratos'
    , posts:posts});
});

//update
router.put("/OneDispositivo",async (req,res,next)=>{
    //const post= req.body;

    console.log(req.body);
    // const post= new Contrato({
       
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
    // );
    console.log("Id es:");
     console.log(req.body.Empleado_idEmpleado);  

    await Dispositivo.updateDispo( 
        String(req.body.Mac_Add),
        String(req.body.Empleado_idEmpleado.Cedula)
        );

     res.status(201).json({
         post
     });

});





//one dispositivo

router.get("/oneDisp/:IdEmpleado",async (req,res,next)=>{

    
    console.log("dispositivo req: "+req.params.IdEmpleado);
   
    const idSearch=String(req.params.IdEmpleado);
    const idSearchNew=idSearch.substring(1);
   console.log(idSearchNew);
 
    console.log("Id  es: ",idSearchNew); 

    
    const [posts]=await Dispositivo.fetchOneDisp(idSearchNew);

    res.status(200).json({message:'Dispositivo Encontrado',posts
    });

    
});









module.exports= router;
const express = require("express");
const router = express.Router();
const Contrato = require('../models/contrato');

const Post= require("../models/empleado");

//router.get();

router.post("",async (req,res,next)=>{
    //const post= req.body;

    console.log("Cargo: "+req.body.Cargo+" id empleado "+req.body.Empleado_idEmpleado);
    const post= new Contrato({
       
      


        Empleado_idEmpleado:req.body.Empleado_idEmpleado.id_Empleado,
        Fecha_Inicio:req.body.Fecha_Inicio,
        Salario: req.body.Salario,
        Cargo: req.body.Cargo,
        Movilidad: req.body.Movilidad,
        Hora_Inicio_Contrato: req.body.Hora_Inicio_Contrato,
        Hora_Almuerzo_Inicio_Contrato: req.body.Hora_Almuerzo_Inicio_Contrato,
        Hora_Almuerzo_Final_Contrato: req.body.Hora_Almuerzo_Final_Contrato,
        Hora_Fin_Contrato: req.body.Hora_Fin_Contrato
    }

    );
    
    console.log("Empleado id es: "+post.Empleado_idEmpleado);  

     await Contrato.post(
     String(req.body.Empleado_idEmpleado.id_Empleado),
     String(req.body.Fecha_Inicio),
     String(req.body.Salario),
     String(req.body.Cargo),
     String(req.body.Movilidad),
     String(req.body.Hora_Inicio_Contrato),
     String(req.body.Hora_Almuerzo_Inicio_Contrato),
     String(req.body.Hora_Almuerzo_Final_Contrato),
     String(req.body.Hora_Fin_Contrato));

    res.status(201).json({
        post
    });

});

router.put("",async (req,res,next)=>{
    //const post= req.body;

    console.log(req.body);
    const post= new Contrato({
       
        Id_Contrato:req.body.Id_Contrato,
        Empleado_idEmpleado:req.body.Empleado_idEmpleado.id_Empleado,
        Fecha_Inicio:req.body.Fecha_Inicio,
        Salario: req.body.Salario,
        Cargo: req.body.Cargo,
        Movilidad: req.body.Movilidad,
        Hora_Inicio_Contrato: req.body.Hora_Inicio_Contrato,
        Hora_Almuerzo_Inicio_Contrato: req.body.Hora_Almuerzo_Inicio_Contrato,
        Hora_Almuerzo_Final_Contrato: req.body.Hora_Almuerzo_Final_Contrato,
        Hora_Fin_Contrato: req.body.Hora_Fin_Contrato
    }
    );
    console.log("Id es:");
     console.log(req.body.Empleado_idEmpleado);  

    await Contrato.update(req.body.Id_Contrato,
        String(req.body.Empleado_idEmpleado),
        String(req.body. Fecha_Inicio),
        String(req.body.Salario),
        String(req.body.Cargo),
        String(req.body.Movilidad),
        String(req.body.Hora_Inicio_Contrato),
        String(req.body.Hora_Almuerzo_Inicio_Contrato),
        String(req.body.Hora_Almuerzo_Final_Contrato),
        String(req.body.Hora_Fin_Contrato));

     res.status(201).json({
         post
     });

});



router.get("",async (req,res,next)=>{
    const [posts]= await Contrato.fetchAllDep();
    res.status(200).json({message:'Contratos'
    , posts:posts});
});



router.get("/one/:idContrato",async (req,res,next)=>{

    
    console.log("contrato req: "+req.body);
     const post= new Contrato({
    
        
        
        Id_Contrato:req.body.Id_Contrato,
        Empleado_idEmpleado:req.body.Empleado_idEmpleado.id_Empleado,
        Fecha_Inicio:req.body.Fecha_Inicio,
        Salario: req.body.Salario,
        Cargo: req.body.Cargo,
        Movilidad: req.body.Movilidad,
        Hora_Inicio_Contrato: req.body.Hora_Inicio_Contrato,
        Hora_Almuerzo_Inicio_Contrato: req.body.Hora_Almuerzo_Inicio_Contrato,
        Hora_Almuerzo_Final_Contrato: req.body.Hora_Almuerzo_Final_Contrato,
        Hora_Fin_Contrato: req.body.Hora_Fin_Contrato
        
    }

    );

    const idSearch=String(req.params.Empleado_idEmpleado.id_Empleado);
    const idSearchNew=idSearch.substring(1);
   console.log(idSearchNew);
 
    console.log("Id es es: ",idSearchNew); 

    
    const [posts]=await Contrato.fetchOne(idSearchNew);

    res.status(200).json({message:'Contrato Encontrado'
    , posts:posts});

    
});



router.delete('/:idContrato',async (req,res,next)=>{

    const post= new Contrato({
    
        
        
        Id_Contrato:req.body.Id_Contrato,
        Empleado_idEmpleado:req.body.Empleado_idEmpleado.id_Empleado,
        Fecha_Inicio:req.body.Fecha_Inicio,
        Salario: req.body.Salario,
        Cargo: req.body.Cargo,
        Movilidad: req.body.Movilidad,
        Hora_Inicio_Contrato: req.body.Hora_Inicio_Contrato,
        Hora_Almuerzo_Inicio_Contrato: req.body.Hora_Almuerzo_Inicio_Contrato,
        Hora_Almuerzo_Final_Contrato: req.body.Hora_Almuerzo_Final_Contrato,
        Hora_Fin_Contrato: req.body.Hora_Fin_Contrato
        
    }

    );
   const idDel=String(req.params.Id_Contrato);
   const iDelNew=idDel.substring(1);
   console.log(iDelNew);
  await Departamento.delete(iDelNew);

    res.status(200).json({message:'Eliminado',post});
});





// vista para contrato

router.get("/ContratEmpleado",async (req,res,next)=>{
    const [posts]= await Contrato.fetchContratoEmpleado();
    res.status(200).json({message:'Contratos'
    , posts:posts});
});

//buscar uno
router.get("/oneContratoEmple/:Cedula",async (req,res,next)=>{

    
    console.log("contrato req: "+req.params.Cedula);
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

   // );

    const idSearch=String(req.params.Cedula);
    const idSearchNew=idSearch.substring(1);
   console.log(idSearchNew);
 
    console.log("Cedula es: ",idSearchNew); 

    
    const [posts]=await Contrato.fetchOneContrato(idSearchNew);

    res.status(200).json({message:'Contrato Encontrado',posts
    });

    
});


//one contrato

router.get("/oneContrat/:IdEmpleado",async (req,res,next)=>{

    
    console.log("contrato req: "+req.params.IdEmpleado);
   
    const idSearch=String(req.params.IdEmpleado);
    const idSearchNew=idSearch.substring(1);
   console.log(idSearchNew);
 
    console.log("Id  es: ",idSearchNew); 

    
    const [posts]=await Contrato.fetchOneContrat(idSearchNew);

    res.status(200).json({message:'Contrato Encontrado',posts
    });

    
});









//update
router.put("/OneContrato",async (req,res,next)=>{
    //const post= req.body;

    console.log(req.body);
    const post= new Contrato({
       
        Id_Contrato:req.body.Id_Contrato,
        Empleado_idEmpleado:req.body.Empleado_idEmpleado.id_Empleado,
        Fecha_Inicio:req.body.Fecha_Inicio,
        Salario: req.body.Salario,
        Cargo: req.body.Cargo,
        Movilidad: req.body.Movilidad,
        Hora_Inicio_Contrato: req.body.Hora_Inicio_Contrato,
        Hora_Almuerzo_Inicio_Contrato: req.body.Hora_Almuerzo_Inicio_Contrato,
        Hora_Almuerzo_Final_Contrato: req.body.Hora_Almuerzo_Final_Contrato,
        Hora_Fin_Contrato: req.body.Hora_Fin_Contrato
    }
    );
    console.log("Id es:");
     console.log(req.body.Empleado_idEmpleado);  

    await Contrato.updateContrato( String(req.body.Movilidad),
        String(req.body. Fecha_Inicio),
        String(req.body.Salario),
        String(req.body.Cargo),
        String(req.body.Empleado_idEmpleado.Cedula));

     res.status(201).json({
         post
     });

});




//****************VER HORARIOS */

router.get("/Horarios",async (req,res,next)=>{
    const [posts]= await Contrato.fetchHorario();
    res.status(200).json({message:'Contratos'
    , posts:posts});
});

//buscar uno
router.get("/oneHorario/:idContrato",async (req,res,next)=>{

    
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

    
    const [posts]=await Contrato.fetchOneHorario(idSearchNew);

    res.status(200).json({message:'Contrato Encontrado'
    , posts});

    
});


//****************VER Movilidad */

router.get("/Movilidad",async (req,res,next)=>{
    const [posts]= await Contrato.fetchMovilidad();
    res.status(200).json({message:'Contratos'
    , posts:posts});
});

//buscar 
router.get("/oneMovilidad/:Cedula",async (req,res,next)=>{

    
    console.log("contrato req: "+req.params.Cedula);
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

    const idSearch=String(req.params.Cedula);
    const idSearchNew=idSearch.substring(1);
   console.log(idSearchNew);
 
    console.log("Cedula es: ",idSearchNew); 

    
    const [posts]=await Contrato.fetchOneMovilidad(idSearchNew);

    res.status(200).json({message:'Contrato Encontrado'
    , posts:posts});

    
});

//update
router.put("/OneMovilidad",async (req,res,next)=>{
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
     console.log(req.body.Id_Contrato);  

    await Contrato.updateMovilidad( String(req.body.Id_Contrato),
        String(req.body.MovilidadDia)
        );

     res.status(201).json({
        
     });

});

//ver gerente

router.post("/ger",async(req,res,next)=>{

    console.log("Ver gerente de id:");
    const idSearchUser=String(req.body.Empleado_idEmpleado);
    console.log(idSearchUser);
    await Contrato.fetchOneGerente(String(idSearchUser)).then(posts=>{
        console.log("Respuesta ");
        let ContratoT= JSON.parse(JSON.stringify(posts[0]))[0];
        console.log(ContratoT);

        if(ContratoT!=undefined){ 
            res.status(200).json({
                token:"OK",
                idEm: ContratoT.Empleado_idEmpleado,
                Cargo:ContratoT.Cargo
            });


         }
        else{
            res.status(200).json({
                token:"ERROR"

            });     
        }

    });

})








module.exports= router;
const express = require("express");
const router = express.Router();
const Permiso = require('../../models/permiso');


//router.get();

router.post("",async (req,res,next)=>{
    //const post= req.body;

    let entero=0;


    console.log("El Empleado: "+String(req.body.Empleado_idEmpleado.Nombre_Empleado));
    console.log("El Empleado id: "+String(req.body.Empleado_idEmpleado.id_Empleado)); 
    entero=String(req.body.Empleado_idEmpleado.id_Empleado);
    console.log("se tiene el id: "+ entero);
    console.log(entero);

    console.log("tipo: "+String(req.body.Tipo)); 
    console.log("descripcion: "+String(req.body.Descripcion)); 
    let post= new Permiso(  100,
        entero,
        req.body.Tipo,
         req.body.Descripcion,
         req.body.Estado_Permiso,
         req.body.Fecha,
        req.body.tiempo
    

    ); 
    
    console.log(post);  
console.log("entero: "+entero);
     await Permiso.postt(
        
        String(req.body.Tipo),
        parseInt(entero,10),
        String(req.body.Descripcion),
        String(req.body.Estado_Permiso),
        String(req.body.Fecha),
        String(req.body.tiempo));

    res.status(201).json({
        post
    });

});

router.put("",async (req,res,next)=>{
    //const post= req.body;

    console.log("permiso REQ: "+req.body.Tipo);
    console.log(req.body);
    const post= new Permiso({
       
        id_Permiso:req.body.id_Permiso,
         Empleado_idEmpleado:req.body.Empleado_idEmpleado.id_Empleado,
        Tipo:req.body.Tipo,
        Descripcion: req.body.Descripcion,
        Estado_Permiso: req.body.Estado_Permiso,
        Fecha: req.body.Fecha,
        tiempo: req.body.tiempo
    }
    );
    console.log("Id es:");

     console.log(String(req.body.Empleado_idEmpleado));  

    await Permiso.update(req.body.id_Permiso,
        String(req.body.Empleado_idEmpleado),
        String(req.body.Tipo),
        String(req.body.Descripcion),
        String(req.body.Estado_Permiso),
        String(req.body.Fecha),
        String(req.body.tiempo));

     res.status(201).json({
         post
     });

});



router.get("",async (req,res,next)=>{
    const [posts]= await Permiso.fetchAllAsis();
    res.status(200).json({message:'Permiso'
    , posts:posts});
});







/*********PERMISOS PRESENTADOS UN MES**********/ 
router.get("/permipresmes",async (req,res,next)=>{
    const [posts]= await Permiso.PermiPresenOneMes();
    res.status(200).json({message:'Permiso'
    , posts:posts});
});
/*********PERMISOS PRESENTADOS OCHO DIAS**********/ 
router.get("/permipresocho",async (req,res,next)=>{
    const [posts]= await Permiso.PermiPresenEightDay();
    res.status(200).json({message:'Permiso'
    , posts:posts});
});
/*********PERMISOS AcepTADOS UN MES**********/ 
router.get("/permiacepmes",async (req,res,next)=>{
    const [posts]= await Permiso.PermiAcepOneMes();
    res.status(200).json({message:'Permiso'
    , posts:posts});
});
/*********PERMISOS Negados UN MES**********/ 
router.get("/perminegmes",async (req,res,next)=>{
    const [posts]= await Permiso.PermiNegaOneMes();
    res.status(200).json({message:'Permiso'
    , posts:posts});
});












/**todos los Permisos de empleado **/
router.get("/onepermiEmp/:Cedula",async (req,res,next)=>{

    
    console.log("req: "+req.body);
     const post= new Permiso({       
        id_Permiso:req.body.id_Permiso,
        Cedula:req.body.Cedula,
        Tipo:req.body.Tipo,
        Descripcion: req.body.Descripcion,
        Estado_Permiso: req.body.Estado_Permiso,
        Fecha: req.body.Fecha,
        tiempo: req.body.tiempo      
    }
    );
    const idSearch=String(req.params.Cedula);
    const idSearchNew=idSearch.substring(1);
   console.log(idSearchNew);
    console.log("Cedula es: ",idSearchNew);   
    const [posts]=await Permiso.PermiEmpleOne(idSearchNew);
    res.status(200).json({message:'Permiso Encontrado'
    , posts:posts});

    
});


/********************** */










/*TODOS LOS PERMISOS DE UN EMPLEADO */ 


router.get("/one/:Cedula",async (req,res,next)=>{

    
    console.log("req: "+req.body);
     const post= new Permiso({
    
        
        id_Permiso:req.body.id_Permiso,
        Cedula:req.body.Cedula,
        Tipo:req.body.Tipo,
        Descripcion: req.body.Descripcion,
        Estado_Permiso: req.body.Estado_Permiso,
        Fecha: req.body.Fecha,
        tiempo: req.body.tiempo
        
    }

    );

    const idSearch=String(req.params.Cedula);
    const idSearchNew=idSearch.substring(1);
   console.log(idSearchNew);
 
    console.log("Cedula es: ",idSearchNew); 

    
    const [posts]=await Permiso.fetchOneAsis(idSearchNew);

    res.status(200).json({message:'Permiso Encontrado'
    , posts:posts});

    
});



router.delete('/:idPermiso',async (req,res,next)=>{

      const post= new Permiso({
          
        id_Permiso:req.body.id_Permiso,
        Cedula:req.body.Cedula,
        Tipo:req.body.Tipo,
        Descripcion: req.body.Descripcion,
        Estado_Permiso: req.body.Estado_Permiso,
        Fecha: req.body.Fecha,
        tiempo: req.body.tiempo
        }

     );

   const idDel=String(req.params.id_Permiso);
   const iDelNew=idDel.substring(1);
   console.log(iDelNew);
  await Permiso.delete(iDelNew);

    res.status(200).json({message:'Eliminado',post});
});



//Consutas de vistas para Permisos

//Vista de permisos de faltas aceptados

router.get("/acepfalta",async (req,res,next)=>{
    const [posts]= await Permiso.ViewPermisoAcepFalta();
    res.status(200).json({message:'Permiso'
    , posts:posts});
});

// vista de permisos de faltas negados

router.get("/negfalta",async (req,res,next)=>{
    const [posts]= await Permiso.ViewPermisoNegFalta();
    res.status(200).json({message:'Permiso'
    , posts:posts});
});
// vista de permisos presentados de faltas

router.get("/presenfalta",async (req,res,next)=>{
    const [posts]= await Permiso.ViewPermisoPresFalta();
    res.status(200).json({message:'Permiso'
    , posts:posts});
});
// vistas de permisos de faltas

router.get("/presentotfalta",async (req,res,next)=>{
    const [posts]= await Permiso.ViewTotPermisoFalta();
    res.status(200).json({message:'Permiso'
    , posts:posts});
});
// vista de permisos aceptados de horas extra

router.get("/acepextra",async (req,res,next)=>{
    const [posts]= await Permiso.ViewPermAceptHoraExtra();
    res.status(200).json({message:'Permiso'
    , posts:posts});
});
//vista de permiss negados de horas extra

router.get("/negaextra",async (req,res,next)=>{
    const [posts]= await Permiso.ViewPermNegaHoraExtra();
    res.status(200).json({message:'Permiso'
    , posts:posts});
});
//vista de permisos presentados de horas extra

router.get("/presenextra",async (req,res,next)=>{
    const [posts]= await Permiso.ViewPermPresenHoraExtra();
    res.status(200).json({message:'Permiso'
    , posts:posts});
});

// vistas de permisos de Hora Extra

router.get("/presentothoextra",async (req,res,next)=>{
    const [posts]= await Permiso.ViewTotPermisoHoraExtra();
    res.status(200).json({message:'Permiso'
    , posts:posts});
});


// vista de permisos aceptados de atraso

router.get("/acepeatraso",async (req,res,next)=>{
    const [posts]= await Permiso.ViewPermAceptAtraso();
    res.status(200).json({message:'Permiso'
    , posts:posts});
});
//vista de permiss negados de atraso

router.get("/negaatraso",async (req,res,next)=>{
    const [posts]= await Permiso.ViewPermNegaAtraso();
    res.status(200).json({message:'Permiso'
    , posts:posts});
});
//vista de permisos presentados de atraso

router.get("/presenatraso",async (req,res,next)=>{
    const [posts]= await Permiso.ViewPermPresenAtraso();
    res.status(200).json({message:'Permiso'
    , posts:posts});
});


//vista total de permisos presentados de atraso

router.get("/permtotatraso",async (req,res,next)=>{
    const [posts]= await Permiso.ViewTotPermisoAtraso();
    res.status(200).json({message:'Permiso'
    , posts:posts});
});







/////////////////////// consultas por empleado

/******Aceptados*******/ 

/******permisos aceptados de atraso de un empleado******/
router.get("/perAcepAtraONE/:Cedula",async (req,res,next)=>{
    console.log("req: "+req.body);
    
   const idSearch=String(req.params.Cedula);
   const idSearchNew=idSearch.substring(1);
  console.log(idSearchNew);

   console.log("Cedula es: ",idSearchNew); 

   
   const [posts]=await Permiso.PermiAcepAtraso(idSearchNew);

   res.status(200).json({message:'Permiso Encontrado'
   , posts:posts});

  
});


/******permisos aceptados de hora extra de un empleado******/
router.get("/perAcepHextraONE/:Cedula",async (req,res,next)=>{
    console.log("req: "+req.body);
    
   const idSearch=String(req.params.Cedula);
   const idSearchNew=idSearch.substring(1);
  console.log(idSearchNew);

   console.log("Cedula es: ",idSearchNew); 

   
   const [posts]=await Permiso.PermiAcepHoExtra(idSearchNew);

   res.status(200).json({message:'Permiso Encontrado'
   , posts:posts});

  
});



/******permisos aceptados de falta de un empleado******/
router.get("/perAcepFaltaONE/:Cedula",async (req,res,next)=>{
    console.log("req: "+req.body);
    
   const idSearch=String(req.params.Cedula);
   const idSearchNew=idSearch.substring(1);
  console.log(idSearchNew);

   console.log("Cedula es: ",idSearchNew); 

   
   const [posts]=await Permiso.PermiAcepFalta(idSearchNew);

   res.status(200).json({message:'Permiso Encontrado'
   , posts:posts});

  
});

/******Negados*******/ 
/******permisos negados de atraso de un empleado******/
router.get("/perNegAtrasONE/:Cedula",async (req,res,next)=>{
    console.log("req: "+req.body);
    
   const idSearch=String(req.params.Cedula);
   const idSearchNew=idSearch.substring(1);
  console.log(idSearchNew);

   console.log("Cedula es: ",idSearchNew); 

   
   const [posts]=await Permiso.PermiNegaAtraso(idSearchNew);

   res.status(200).json({message:'Permiso Encontrado'
   , posts:posts});

  
});


/******permisos negados de hora extra de un empleado******/
router.get("/perNegaHorExtrONE/:Cedula",async (req,res,next)=>{
    console.log("req: "+req.body);    
   const idSearch=String(req.params.Cedula);
   const idSearchNew=idSearch.substring(1);
  console.log(idSearchNew);
   console.log("Cedula es: ",idSearchNew); 
   const [posts]=await Permiso.PermiNegaHoraExtra(idSearchNew);
   res.status(200).json({message:'Permiso Encontrado'
   , posts:posts});
});


/******permisos negados de falta de un empleado******/
router.get("/perNegaFaltONE/:Cedula",async (req,res,next)=>{
    console.log("req: "+req.body);    
   const idSearch=String(req.params.Cedula);
   const idSearchNew=idSearch.substring(1);
  console.log(idSearchNew);
   console.log("Cedula es: ",idSearchNew); 
   const [posts]=await Permiso.PermiNegaFalta(idSearchNew);
   res.status(200).json({message:'Permiso Encontrado'
   , posts:posts});
});


/************Presentados******** */

/****** permisos presentados de atraso de un empleado******/
router.get("/perPresAtrasONE/:Cedula",async (req,res,next)=>{
    console.log("req: "+req.body);
   const idSearch=String(req.params.Cedula);
   const idSearchNew=idSearch.substring(1);
  console.log(idSearchNew);
   console.log("Cedula es: ",idSearchNew); 
   const [posts]=await Permiso.PermiPresenAtraso(idSearchNew);
   res.status(200).json({message:'Permiso Encontrado'
   , posts:posts}); 
});

/****** permisos presentados de hora extra de un empleado******/
router.get("/perPresHorExtrONE/:Cedula",async (req,res,next)=>{
    console.log("req: "+req.body);
   const idSearch=String(req.params.Cedula);
   const idSearchNew=idSearch.substring(1);
  console.log(idSearchNew);
   console.log("Cedula es: ",idSearchNew); 
   const [posts]=await Permiso.PermiPresenHoraExtra(idSearchNew);
   res.status(200).json({message:'Permiso Encontrado'
   , posts:posts}); 
});

/****** permisos presentados de falta de un empleado******/
router.get("/perPresFaltaONE/:Cedula",async (req,res,next)=>{
    console.log("req: "+req.body);
   const idSearch=String(req.params.Cedula);
   const idSearchNew=idSearch.substring(1);
  console.log(idSearchNew);
   console.log("Cedula es: ",idSearchNew); 
   const [posts]=await Permiso.PermiPresenFalta(idSearchNew);
   res.status(200).json({message:'Permiso Encontrado'
   , posts:posts}); 
});

/********** MOVILIDAD ***********/
/****Fechas de exceso de ovilidad *****/
router.get("/totExcessMovONE/:Cedula",async (req,res,next)=>{
    console.log("req: "+req.body);
   const idSearch=String(req.params.Cedula);
   const idSearchNew=idSearch.substring(1);
  console.log(idSearchNew);
   console.log("Cedula es: ",idSearchNew); 
   const [posts]=await Permiso.TotalExcesMovEmpleado(idSearchNew);
   res.status(200).json({message:'Permiso Encontrado'
   , posts:posts}); 
});

/****Total de exceso de ovilidad *****/
router.get("/fechaExcessMovONE/:Cedula",async (req,res,next)=>{
    console.log("req: "+req.body);
   const idSearch=String(req.params.Cedula);
   const idSearchNew=idSearch.substring(1);
  console.log(idSearchNew);
   console.log("Cedula es: ",idSearchNew); 
   const [posts]=await Permiso.FechasMoviEmpleado(idSearchNew);
   res.status(200).json({message:'Permiso Encontrado'
   , posts:posts}); 
});







/******Total de atraso de un empleado******/
router.get("/totalAtrasoONE/:Cedula",async (req,res,next)=>{
    console.log("req: "+req.body);
    
   const idSearch=String(req.params.Cedula);
   const idSearchNew=idSearch.substring(1);
  console.log(idSearchNew);

   console.log("Cedula es: ",idSearchNew); 

   
   const [posts]=await Permiso.TotalAtrasoEmpleado(idSearchNew);

   res.status(200).json({message:'Permiso Encontrado'
   , posts:posts});

  
});



/******Total de hora extra de un empleado******/
router.get("/totalHorExtraONE/:Cedula",async (req,res,next)=>{
    console.log("req: "+req.body);
    
   const idSearch=String(req.params.Cedula);
   const idSearchNew=idSearch.substring(1);
  console.log(idSearchNew);

   console.log("Cedula es: ",idSearchNew); 

   
   const [posts]=await Permiso.TotalHorExtraEmpleado(idSearchNew);

   res.status(200).json({message:'Permiso Encontrado'
   , posts:posts});

  
});


/******total de faltas de un empleado******/
router.get("/totalFaltaONE/:Cedula",async (req,res,next)=>{
    console.log("req: "+req.body);
    
   const idSearch=String(req.params.Cedula);
   const idSearchNew=idSearch.substring(1);
  console.log(idSearchNew);

   console.log("Cedula es: ",idSearchNew); 

   
   const [posts]=await Permiso.TotalFaltaEmpleado(idSearchNew);

   res.status(200).json({message:'Permiso Encontrado'
   , posts:posts});

  
});



/******Total Fechas Exceso Movilidad Empleado******/
router.get("/FechaExcesoMoviONE/:Cedula",async (req,res,next)=>{
    console.log("req: "+req.body);
    
   const idSearch=String(req.params.Cedula);
   const idSearchNew=idSearch.substring(1);
  console.log(idSearchNew);

   console.log("Cedula es: ",idSearchNew); 

   
   const [posts]=await Permiso.TotalExcesMovEmpleado(idSearchNew);

   res.status(200).json({message:'Permiso Encontrado'
   , posts:posts});

  
});

/******Vista  total de Exceso Movilidad Empleado******/
router.get("/TotaExcesoMoviONE/:Cedula",async (req,res,next)=>{
    console.log("req: "+req.body);
    
   const idSearch=String(req.params.Cedula);
   const idSearchNew=idSearch.substring(1);
  console.log(idSearchNew);

   console.log("Cedula es: ",idSearchNew); 

   
   const [posts]=await Permiso.FechasFaltaEmpleado(idSearchNew);

   res.status(200).json({message:'Permiso Encontrado'
   , posts:posts});

  
});
















/******Vista  total PERMISOS ACEPTADOS Empleado******/
router.get("/ToPermisEmpleAceptONE/:Cedula",async (req,res,next)=>{
    console.log("req: "+req.body);

   const idSearch=String(req.params.Cedula);
   const idSearchNew=idSearch.substring(1);
  console.log(idSearchNew);

   console.log("Cedula es: ",idSearchNew); 

   
   const [posts]=await Permiso.TodosPermisosUnEmpleadoAceptado(idSearchNew);

   res.status(200).json({message:'Permiso Encontrado'
   , posts:posts});

  
});


/******Vista  total PERMISOS PRESENTADOS 30 días Empleado******/
router.get("/ToPermisEmplePrese30ONE/:Cedula",async (req,res,next)=>{
    console.log("req: "+req.body);
    
   const idSearch=String(req.params.Cedula);
   const idSearchNew=idSearch.substring(1);
  console.log(idSearchNew);

   console.log("Cedula es: ",idSearchNew); 

   
   const [posts]=await Permiso.TodosPermisosUnEmpleadoPresentado30(idSearchNew);

   res.status(200).json({message:'Permiso Encontrado'
   , posts:posts});

  
});


/******Vista  total PERMISOS PRESENTADOS 8 días Empleado******/
router.get("/ToPermisEmplePrese8ONE/:Cedula",async (req,res,next)=>{
    console.log("req: "+req.params);
    
   const idSearch=String(req.params.Cedula);
   const idSearchNew=idSearch.substring(1);
  console.log(idSearchNew);

   console.log("Cedula es: ",idSearchNew); 

   
   const [posts]=await Permiso.TodosPermisosUnEmpleadoPresentado8(idSearchNew);

   res.status(200).json({message:'Permiso Encontrado'
   , posts:posts});

  
});

/******Vista  total PERMISOS NEGADOS Empleado******/
router.get("/ToPermisEmpleNegaONE/:Cedula",async (req,res,next)=>{
    console.log("req: "+req.body);
    
   const idSearch=String(req.params.Cedula);
   const idSearchNew=idSearch.substring(1);
  console.log(idSearchNew);

   console.log("Cedula es: ",idSearchNew); 

   
   const [posts]=await Permiso.TodosPermisosUnEmpleadoNEgado(idSearchNew);

   res.status(200).json({message:'Permiso Encontrado'
   , posts:posts});

  
});


/******Vista  total PERMISOS  Empleado******/
router.get("/TodosPermisosUnEmpleadoONE/:Cedula",async (req,res,next)=>{
    console.log("req: "+req.body);
    
   const idSearch=String(req.params.Cedula);
   const idSearchNew=idSearch.substring(1);
  console.log(idSearchNew);

   console.log("Cedula es: ",idSearchNew); 

   
   const [posts]=await Permiso.TodosPermisosUnEmpleado(idSearchNew);

   res.status(200).json({message:'Permiso Encontrado'
   , posts:posts});

  
});



//vista total de permisos negados

router.get("/vistanega30Tot",async (req,res,next)=>{
    const [posts]= await Permiso.VistaPermisosNegados30Total();
    res.status(200).json({message:'Permiso'
    , posts:posts});
});

//vista total de permisos aceptados

router.get("/vistaacep30Tot",async (req,res,next)=>{
    const [posts]= await Permiso.VistaPermisosAceptados30Total();
    res.status(200).json({message:'Permiso'
    , posts:posts});
});
//vista total de permisos presentados 30

router.get("/vistapresen30Tot",async (req,res,next)=>{
    const [posts]= await Permiso.VistaPermisosPresentados30Total();
    res.status(200).json({message:'Permiso'
    , posts:posts});
});
//vista total de permisos presentados 8

router.get("/vistapresen8Tot",async (req,res,next)=>{
    const [posts]= await Permiso.VistaPermisosPresentados8Total();
    res.status(200).json({message:'Permiso'
    , posts:posts});
});


//vista total de permisos 

router.get("/vista30Tot",async (req,res,next)=>{
    const [posts]= await Permiso.VistaPermisosTotal();
    res.status(200).json({message:'Permiso'
    , posts:posts});
});




module.exports= router;
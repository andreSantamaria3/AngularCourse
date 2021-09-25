const express = require("express");
const router = express.Router();
const bcrypt= require("bcryptjs");
const jwt= require("jsonwebtoken");
const Usuario = require('../models/usuario');
const CheckAuth=require("../middleware/check-auth");

router.post("",async (req,res,next)=>{
    //const post= req.body;
    let UsuarioCrear;
    console.log("Req es: "+req.body.User_Name);
    console.log("Req pass: "+req.body.Password);
    let idSearchPass= String(req.body.Password);
    bcrypt.hash(String(req.body.Password), 10 ).then(hash=>{

        idSearchPass=hash;
        const user= new Usuario({
            Empleado_idEmpleado:req.body.Empleado_idEmpleado,
            User_Name:req.body.Nombre_Empleado,
            Password:hash
        });

        UsuarioCrear=user;

        idSearchPass=hash;

        console.log("user empleado: "+idSearchPass);  
       
        Usuario.post(String(req.body.Empleado_idEmpleado),
        String(req.body.User_Name),
        idSearchPass);



    }
         
    );
    // await Usuario.post(String(req.body.Empleado_idEmpleado),
    // String(req.body.User_Name),
    // idSearchPass);
   res.status(201).json({
       
   });
   

});


//para login
router.post("/llogin",CheckAuth,async (req,res,next)=>{
    
    //Primero hacer una busqueda de uno en la base

    //const token;
    console.log("to find: "+req.body.User_Name);
   
    const idSearchUser=String(req.body.User_Name);
    const idSearchNew=idSearchUser;
   console.log(idSearchNew);
    console.log("Nombre es: ",idSearchNew);
    console.log("Pass es: ",req.body.Password);
    const idSearchPass= String(req.body.Password);
    let idSearchNewPass=idSearchPass;
    bcrypt.hash(idSearchPass,10).then(hash=>{

        console.log(idSearchNewPass);
        idSearchNewPass=hash;
        console.log(idSearchNewPass);
        console.log("Pass ha es: ",idSearchNewPass);


        //buscar

        let valor;
        console.log("Nombre a buscar es: ",idSearchNew);
        console.log("Pass a buscar es: ",idSearchNewPass);

       

        buscar(idSearchNew,idSearchNewPass).then( posts=>{

           
            console.log("despues de then "+posts);

            let UsPass= new Usuario({Empleado_idEmpleado:999,User_Name:idSearchNew,Password:idSearchNewPass});


            const token=jwt.sign({
                User_Name_Token: UsPass.User_Name,
                
            }, 'token_secreto_para_validar',
            {
                expiresIn:"1h"
            });
            console.log("token es: "+token);



           console.log("valor para regresar es: "+posts);

    

           res.status(200).json({
            User_Name:UsPass.Empleado_idEmpleado.User_Name,
            Password:UsPass.Empleado_idEmpleado.Password,
            Empleado_idEmpleado:UsPass.Empleado_idEmpleado.Empleado_idEmpleado,
            token:token
             });



        }
            
        );
        
       

       

    });

    // console.log("a buscar "+idSearchNew);
    // const [posts]= await  Usuario.fetchOne(String(idSearchNew),idSearchNewPass)//.then(posts=>{

    //     res.status(200).json({
    //    posts:posts});




    
});

async function buscar(idSearchNew,idSearchNewPass){

   

        console.log("a buscar "+idSearchNew);
        //const [posts]= 
        await Usuario.fetchOne(String(idSearchNew),idSearchNewPass).then(posts=>{
   
        let jsonposts=posts;
        console.log("Respuesta "+posts);
        //console.log(jsonposts);
        //console.log(JSON.stringify(jsonposts))
        return posts;

   });
    //console.log("result es: "+await Usuario.fetchOne(idSearchNew,idSearchNewPass));
    
}

function BuscarDeQuery(posts){

    console.log(posts);
    let regreso;


    const token=jwt.sign({
        User_Name_Token: posts[0].User_Name,
        UserId:posts[0].Empleado_idEmpleado
    }, 'token_secreto_para_validar',
    {
        expiresIn:"1h"
    });
    console.log("token es: "+token);
    regreso=token;



return regreso;

}



// para ver todos los empleados
router.get("/usuarios", async(req,res,next)=>{
    const [posts]= await Usuario.fetchCargo();
    res.status(200).json({message:'Usuarios'
    , posts:posts});

   });






/////// Prueba 2  de login


router.post("/login",async (req,res,next)=>{
    
    //Primero hacer una busqueda de uno en la base

    let SonIguales;
    const idSearchUser=String(req.body.User_Name);
    const idSearchPass= String(req.body.Password);
    console.log(idSearchPass);
    const idSearchNew=idSearchUser;
    console.log(idSearchNew);
    await Usuario.fetchOne(String(idSearchNew)).then(posts=>{
   
       
        console.log("Respuesta ");
        let UserT= JSON.parse(JSON.stringify(posts[0]))[0];
        
        console.log(UserT);

        if(UserT!=undefined){

            bcrypt.compare(idSearchPass,UserT.Password).then((tag)=>{

                SonIguales=tag;
                console.log("son iguales? ");
                console.log(tag);
    
                if(SonIguales==true){
                    const token=jwt.sign({
                        User_Name_Token: UserT.User_Name,
                        Id_Empleado_Token:UserT.Empleado_idEmpleado
                        
                    }, 'token_secreto_para_validar',
                    {
                        expiresIn:"1h"
                    });
    
                    res.status(200).json({
                        token:token,
                        UsEm: UserT.Empleado_idEmpleado,
                        Usid: UserT.id_Usuario,
                        UsNam: UserT.User_Name,
                        UsPass: UserT.Password
                    });
    
                }
                else{
                    res.status(200).json({
                        token:"ERROR"
                        
                    });
    
                }
            
    
            });


        }
        else{
            res.status(200).json({
                token:"ERROR"

            });     
        }

        
        
        

   });


        




    
});




/////////////

















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



 router.get("", async(req,res,next)=>{
    const [posts]= await Usuario.fetchAll();
    res.status(200).json({message:'Usuarios'
    , posts:posts});
});



router.get("/one/:Usuario",async (req,res,next)=>{
    console.log("found: "+req.body);
   
    const idSearchUser=String(req.params.User_Name);
    const idSearchNew=idSearchUser.substring(1);
   console.log(idSearchNew);
    console.log("Nombre es: ",idSearchNew);
    
    const idSearchPass=String(req.params.Password);
    const idSearchNewPass=idSearchPass.substring(1);
   console.log(idSearchNewPass);
    console.log("Pass es: ",idSearchNewPass);
    
    const [posts]=await Usuario.fetchOne(idSearchNew,idSearchNewPass);
    res.status(200).json({message:'Usuario Encontrado'
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





// {
//     "host":"13.59.5.250",
//     "user":"root",
//     "password":"root",
//     "port":3000,
//     "database": "GestionEmpleadosII"
// }
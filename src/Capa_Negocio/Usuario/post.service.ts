import { Injectable } from '@angular/core';
import {User} from './post.model';
import {Usertwo,Userthree} from './post.model';
import {Subject,BehaviorSubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { ParsedEvent } from '@angular/compiler';

import {Router} from "@angular/router";
import { environment } from "../../environments/environment";

@Injectable({providedIn: 'root'})
export class PostService{
    
    //rutaPort= "http:://gestionempleadosii.c66hcpj11ocn.us-east-2.rds.amazonaws.com:3000/api/users";
    rute= environment.apiUrl ;
    rutaPort=this.rute+"/users";
  private  posts:User[]=[];

   private postOne:User[]=[];

// usuario para tipos
   postTipes:Userthree[]=[];

   postCorreo:User[]=[];

   private postUpdated = new Subject<User[]>();

   private postUpdatedTipes = new Subject<Userthree[]>();

   postEdit:User;

   idQuery:Number;
   //user para ver tipo de empleado
   TipoUser:User;

   private tokenRegreso:string;
   postsLog:User[]=[];
   postLog:User;

   postToEdit:User;

   postInitial:User;

   postSearch:Usertwo;

   Us_Name:String;
   PassW:String;
   token:String;

   private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

// para ver que todo despues de logear

//private authStatusListener=new Subject<boolean>();
private authStatusListener=new BehaviorSubject<boolean>(false);

getGerenteListener(){
    return this.authStatusListener.asObservable();
}

falseGerenteListener(){
    this.authStatusListener.next(false);
    return this.authStatusListener.asObservable();
}

trueGerenteListener(){
    this.authStatusListener.next(true);
    return this.authStatusListener.asObservable();
}



// para diferenciar entre empleado y los demas

private empleStatusListener=new BehaviorSubject<boolean>(false);

getEmpleadoListener(){
    return this.empleStatusListener.asObservable();
}

falseEmpleListener(){
    this.empleStatusListener.next(false);
    return this.empleStatusListener.asObservable();
}

trueEmpleListener(){
    this.empleStatusListener.next(true);
    return this.empleStatusListener.asObservable();
}




   Token:Boolean;


   CedulaInitwo:Usertwo={User_Name:"",Password: ""};


   constructor(private http: HttpClient, private router:Router){
    
   }

   getToken(){
       console.log("TOKEN");
       console.log(this.tokenRegreso);
       return this.tokenRegreso;
   }

   getPosts(){

    try{

        this.http.get<{message: string, posts:User[]}>(this.rutaPort)
    .subscribe((postData)=>{
        this.posts=postData.posts;
        this.postUpdated.next([...this.posts]);

    });


    }
    catch(error)
    {
        console.log(error.name)

    }
    
      // return this.posts;
   }


   // Get de tipos de empleados
   getTipos(){
    try{
        this.http.get<{message: string, posts:Userthree[]}>(this.rutaPort+"/usuarios")
    .subscribe((postData)=>{
        this.postTipes=postData.posts;
        this.postUpdatedTipes.next([...this.postTipes]);
    });
    }
    catch(error)
    {
        console.log(error.name)
    }
   }
















   get isLoggedIn() {
    return this.loggedIn.asObservable();
  }



  logtrue(){

    this.loggedIn.next(true);
  }

  logfalse(){

    this.loggedIn.next(false);
  }



   //Buscar un solo elemento
   getOnePost(){

    console.log("Servicio para uno");
    console.log(this.postSearch.User_Name);
    
    try{
        this.http.get<{message: string, posts:User[]}>(this.rutaPort+'/one/:'+this.postSearch)
    .subscribe((postData)=>{
        this.postOne=postData.posts;
        this.postUpdated.next([...this.postOne]);


        console.log("Luego de query: "+this.postOne);
    });

    }
    catch(error)
    {
        console.log(error.name)

    }

    
      // return this.posts;
   }



   getPostUpdateListener(){
       return this.postUpdated.asObservable();
   }

  async  addPost(id_Usuario:Number,Empleado_idEmpleado:Number,
    User_Name:string,Password:string){
    console.log("Crear post: "+User_Name);
    try{
        const post: User={id_Usuario:id_Usuario,Empleado_idEmpleado:Empleado_idEmpleado,
            User_Name:User_Name,Password:Password};
        console.log("Enviar post: "+post.User_Name);
        this.http.post<{message:string}>(this.rutaPort,post).subscribe
        ((responseData)=>{
            console.log(responseData.message);
            this.posts.push(post);
            this.postUpdated.next([...this.posts]); 
            this.getPostUpdateListener();
           // this.router.navigate(["/"]);
       });
    }
    catch(error)
    {
        console.log(error.name)

    }
}

login(User_Name:string,Password:string){

    return new Promise((resolve,reject)=>{

        console.log("Crear post: "+User_Name);
        
        let regresoValor;
            let Hasheado=Password;//this.encriptarPass(Password);
            const post: Usertwo={User_Name:User_Name,Password:String(Hasheado)};
            console.log("Enviar post: "+post.User_Name+" pass: "+post.Password+" a:" );
            console.log(this.rutaPort);
            console.log("el post: ");
            console.log(post);


            this.http.post<{ }>(this.rutaPort+'/login',post).subscribe
            ((responseData)=>{

             

                console.log("La respuesta es: ");
                console.log(responseData);
                regresoValor=responseData;
              
                this.tokenRegreso=regresoValor.token;
              
                

        console.log("valor a token: "+this.tokenRegreso);
           console.log("valor a regresar: "+regresoValor.token);
           if(regresoValor.token=="ERROR"){
            console.log("La respuesta es: ERROR");  

          }
          else {

            console.log("La respuesta es: Correcta");
            this.idQuery=regresoValor.UsEm;
            console.log("El id es: "+this.idQuery);
            let UserRes:User={id_Usuario:regresoValor.Usid,Empleado_idEmpleado:regresoValor.UsEm,User_Name:regresoValor.UsNam,Password:regresoValor.UsPass}
            console.log("Usuario");
            console.log(UserRes);
            this.TipoUser=UserRes;
            this.authStatusListener.next(true);
            this.logtrue();

          }
           resolve(regresoValor.token);
           

           });
       




    })


}




Crear(idEmpleado:Number,User_Name:string,Password:string){

    
    console.log("CREAR USUARIO");
    return new Promise((resolve,reject)=>{

        console.log("Crear post: "+User_Name+" id "+idEmpleado);
   
        const post: User={id_Usuario:100,Empleado_idEmpleado:idEmpleado,User_Name:User_Name,Password:Password};
        console.log("Enviar post: "+post.User_Name+" id "+post.Empleado_idEmpleado);
        console.log("rute"+this.rutaPort);
        this.http.post<{message:string}>(this.rutaPort,post).subscribe
        ((responseData)=>{
            console.log("La respuesta es: "+responseData.message);
            
            this.posts.push(post);
             this.postUpdated.next([...this.posts]); 
            // this.getPostUpdateListener();
            // this.router.navigate(["/"]);
       });
    
       resolve("Ingresado");
    
   


    })



    
}


// postingEmpleado(post:PostThree){

//     try{

//         return new Promise ((resolve,reject)=>{
//             console.log("Enviar post: "+post.Departamento_idDepartamento);
//         this.http.post<{message:string}>(this.rutaPort,post).subscribe
//         ((responseData)=>{
//             console.log(responseData.message);
//             this.posts.push(post);
//             this.postUpdated.next([...this.posts]);
            
           
           
//         });
     
//         resolve();
    
//         }
    
//         );
    

//     }
//     catch(error)
//     {
//         console.log(error.name)

//     }
    
// }



 


// deletePost(){
//     console.log("Empleado a eliminar: "+this.postEdit.id_Empleado);
    
//     try{
//         this.http.delete(this.rutaPort+"/:"+this.postEdit.id_Empleado).
//     subscribe(()=>{
//         console.log("Eliminado con Exito");
//         const updatedPosts=this.posts.filter(post=> post.id_Empleado!==this.postEdit.id_Empleado);
//         this.posts=updatedPosts;
//         this.postUpdated.next([...this.posts]);
//     });
//     }
//     catch(error)
//     {
//         console.log(error.name)

//     }

    
// }

// updatePost(id_Empleado:Number,Departamento_idDepartamento:Departamento,Nombre_Empleado:string,Apellido_Empleado:string,Cedula:string,Direccion:string,Telefono:string,Correo:string){
//     console.log(id_Empleado,Departamento_idDepartamento,Nombre_Empleado,Apellido_Empleado,Cedula,Direccion,Telefono,Correo)
    
//     try{
//         const post: PostThree={id_Empleado:id_Empleado,Departamento_idDepartamento:Departamento_idDepartamento,Nombre_Empleado:Nombre_Empleado,Apellido_Empleado: Apellido_Empleado,Cedula:Cedula,Direccion:Direccion,Telefono:Telefono,Correo:Correo};
//     console.log("Servicio");
//     console.log(post);
//     this.http.put<{message:string}>(this.rutaPort,post).subscribe
//     (()=>{
//         console.log("Editado con Exito");
//         //this.getPosts();

//         //this.router.navigate(["/"]);

//     });
//     }
//     catch(error)
//     {
//         console.log(error.name)

//     }
    
// }

 llenarEspacios(seleccion:User){
     
     this.postEdit=seleccion;
     console.log("el seleccionado es: "+this.postEdit.User_Name+" "+this.postEdit.id_Usuario);
 }

 elementoBusqueda(cedula:Usertwo){

 
    try{
        this.CedulaInitwo=cedula;

    console.log("init two "+this.CedulaInitwo.User_Name);
 

    
    this.postSearch=cedula;
    console.log("init two "+this.CedulaInitwo.Password);

    }
    catch(error)
    {
        console.log(error.name)

    }

    

 }

 iniciarElementos(){
    //const CedulaInit:Postwo={Cedula: "0"};
     this.postSearch=this.CedulaInitwo;
     console.log("iniciar : "+this.postSearch.User_Name);
 }

 getPost(id:string,pass:string){
     return {...this.posts.find(p=> (p.User_Name === id && p.Password === pass))};
 }









 getPostUpdateListenerTipes(){
    return this.postUpdatedTipes.asObservable();
}


}
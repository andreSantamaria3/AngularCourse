import { Injectable } from '@angular/core';
import {Contrato} from './post.model';
import {Contratotwo, Contratothree} from './post.model';
import {Contratofour, Contratofive,Contratosix,ContratoSeven} from './post.model';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { ParsedEvent } from '@angular/compiler';
import {Router} from "@angular/router";
import { Time } from '@angular/common';
import { resolve } from 'node_modules/@angular/compiler-cli/src/ngtsc/file_system';
import { Post, PostThree, Postwo } from "../../Capa_Negocio/Empleado/post.model";
import { User } from "../../Capa_Negocio/Usuario/post.model";
import { PostService } from "../../Capa_Negocio/Usuario/post.service";


@Injectable({providedIn: 'root'})
export class PostServiceContrato{
    rutaport="http://localhost:3000/api/contrats";
    
   private posts:Contrato[]=[];
   private Oneposts:Contrato[]=[];



   TipoEmpleado:string;

  ContratosforEdit:Contrato[]=[];
  ContratoforEdit:Contrato;

   private postsmovis:Contratothree[]=[];

   private postsmovisF:Contratofour[]=[];

   private postsmovisFi:Contratofive[]=[];

   
   ContratoEditar:Contrato;

   ContratosSearch:Contrato[]=[];

   private postOne:Contratotwo[]=[];
   private postThree:Contratothree[]=[];
   private postFour:Contratofour[]=[];
   private postFive:Contratofive[]=[];

   private postUpdatedOne = new Subject<Contrato[]>();


   private postUpdated = new Subject<Contratotwo[]>();

   private postUpdatedthree = new Subject<Contratothree[]>();


   private postUpdatedfour = new Subject<Contratofour[]>();

   private postUpdatedfive = new Subject<Contratofive[]>();


   MovilidadEdit:Contratothree;

   postEdit:Contrato;

   postSend:Contrato;

   postToEdit:Contrato;

   postInitial:Contrato;

   EmpleadoBase:PostThree;

   postSearch:Contratotwo;


   //postSearch:Contratotwo={Id_Contrato:0, Empleado_idEmpleado:null};


   ContratoPasar:Contrato;

   Token:Boolean;
   editComesC:Boolean;

   Contratotwo:Contratotwo;


   constructor(private http: HttpClient, private router:Router ){
    this.CrearEmpleadoVacio();
   this.postSearch ={Id_Contrato:0, Empleado_idEmpleado:this.EmpleadoBase};
   this.Contratotwo={Id_Contrato: 0,Empleado_idEmpleado:this.EmpleadoBase};

   }

   CrearEmpleadoVacio(){
    let post: PostThree={id_Empleado:333,Departamento_idDepartamento:null,
        Nombre_Empleado:"Nombre_Empleado",Apellido_Empleado: "Apellido_Empleado",
        Cedula:"0",Direccion:"Direccion",Telefono:"",Correo:""};

        this.EmpleadoBase=post;
   }


   getPostsContrats(){

    try{

        return new Promise ((resolve,reject)=>{

            this.http.get<{message: string, posts:Contrato[]}>(this.rutaport)
            .subscribe((postData)=>{
                this.posts=postData.posts;
                this.postUpdated.next([...this.posts]);

            });

            resolve("ok");
        }
        

        );

        

    }
    catch(error)
    {
        console.log(error.name)

    }
    
      // return this.posts;
   }


   //Buscar un solo elemento
   getOnePostContrat(){

    console.log("Servicio para uno");

    try{
        console.log(this.postSearch.Id_Contrato+" "+this.postSearch.Empleado_idEmpleado);
    

    this.http.get<{message: string, posts:Contratotwo[]}>(this.rutaport+'/one/:'+this.postSearch.Empleado_idEmpleado)
    .subscribe((postData)=>{
        this.postOne=postData.posts;
        console.log("El encontrado: "+this.postOne);
        this.postUpdated.next([...this.postOne]);

    });

    }
    catch(error)
    {
        console.log(error.name)

    }
    
    
      // return this.posts;
   }


   getPostUpdateListenerOne(){
    return this.postUpdatedOne.asObservable();
}



   getPostUpdateListener(){
       return this.postUpdated.asObservable();
   }


   getPostUpdateListenerthree(){
    return this.postUpdatedthree.asObservable();
}
   

getPostUpdateListenerFour(){
    return this.postUpdatedfour.asObservable();
}



getPostUpdateListenerFive(){
    return this.postUpdatedfive.asObservable();
}





   addPost(Id_Contrato:Number, Empleado_idEmpleado:PostThree,Fecha_Inicio: string,Salario: number,Cargo: string,
    Movilidad: number,Hora_Inicio_Contrato:string,Hora_Almuerzo_Inicio_Contrato: string,Hora_Almuerzo_Final_Contrato:string,Hora_Fin_Contrato: string){
    
    try{
        const post: Contrato={Id_Contrato:Id_Contrato,Empleado_idEmpleado:Empleado_idEmpleado,Fecha_Inicio:Fecha_Inicio,Salario:Salario,
            Cargo:Cargo,Movilidad:Movilidad,Hora_Inicio_Contrato:Hora_Inicio_Contrato,Hora_Almuerzo_Inicio_Contrato:Hora_Almuerzo_Inicio_Contrato,
            Hora_Almuerzo_Final_Contrato:Hora_Almuerzo_Final_Contrato,Hora_Fin_Contrato:Hora_Fin_Contrato};

            console.log("Contrato idempleado es: "+post.Empleado_idEmpleado+" "+post.Cargo);
        this.http.post<{message:string}>(this.rutaport,post).subscribe
        ((responseData)=>{
            console.log(responseData.message);
            this.posts.push(post);
            this.postUpdated.next([...this.posts]);
    
           // this.router.navigate(["/"]);
        });
     

    }
    catch(error)
    {
        console.log(error.name)

    }
       

}

deletePost(){
    console.log(this.postEdit.Id_Contrato);
    try{
        this.http.delete(this.rutaport+"/:"+this.postEdit.Id_Contrato).
    subscribe(()=>{
        console.log("Eliminado con Exito");
        const updatedPosts=this.posts.filter(post=> post.Id_Contrato!==this.postEdit.Id_Contrato);
        this.posts=updatedPosts;
        this.postUpdated.next([...this.posts]);
    });
    }
    catch(error)
    {
        console.log(error.name)

    }

    
    
}

updatePost(Id_Contrato:Number, Empleado_idEmpleado:PostThree,Fecha_Inicio: string,Salario: number,Cargo: string,
    Movilidad: number,Hora_Inicio_Contrato:string,Hora_Almuerzo_Inicio_Contrato: string,Hora_Almuerzo_Final_Contrato:string,Hora_Fin_Contrato: string){
    console.log(Id_Contrato,Empleado_idEmpleado,Fecha_Inicio,Salario,Cargo,Movilidad,Hora_Inicio_Contrato,
        Hora_Almuerzo_Inicio_Contrato,Hora_Almuerzo_Final_Contrato,Hora_Fin_Contrato);
    try{
        const post: Contrato={Id_Contrato:Id_Contrato,Empleado_idEmpleado:Empleado_idEmpleado,Fecha_Inicio:Fecha_Inicio,Salario:Salario,
            Cargo:Cargo,Movilidad:Movilidad,Hora_Inicio_Contrato:Hora_Inicio_Contrato,Hora_Almuerzo_Inicio_Contrato:Hora_Almuerzo_Inicio_Contrato,Hora_Almuerzo_Final_Contrato:Hora_Almuerzo_Final_Contrato,Hora_Fin_Contrato:Hora_Fin_Contrato};
        console.log("Servicio");
        console.log(post);
        this.http.put<{message:string}>(this.rutaport,post).subscribe
        (()=>{
            console.log("Editado con Exito");
            this.getPostsContrats();
    
            //this.router.navigate(["/"]);
    
        });

    }
    catch(error)
    {
        console.log(error.name)

    }



  
}

 llenarEspacios(selecContrat:Contrato){
     
     this.postEdit=selecContrat;
     console.log(this.postEdit);
 }

 elementoBusqueda(selecContrat:Contratotwo){

    try{

        this.Contratotwo=selecContrat;

        console.log("init two"+this.Contratotwo);
     
    
        
        this.postSearch=selecContrat;
        console.log("init two"+this.Contratotwo);
    

    }
    catch(error)
    {
        console.log(error.name)

    }


 


 }

 iniciarElementos(){
    //const CedulaInit:Postwo={Cedula: "0"};
     this.postSearch=this.Contratotwo;
     console.log("iniciar : "+this.postSearch.Id_Contrato);
 }

  getPost(id:string){
     this.getPostsContrats();
     return {...this.posts.find(p=> p.Empleado_idEmpleado.id_Empleado=== parseInt(id))};
 }



//para ver movilidad




   
   //Buscar un solo elemento de horario
   getOnePosHorario(){

    console.log("Servicio para uno");

    try{
        console.log(this.postSearch.Id_Contrato+" "+this.postSearch.Empleado_idEmpleado.Nombre_Empleado);
    

    this.http.get<{message: string, posts:Contratofour[]}>(this.rutaport+'/oneHorario/:'+this.postSearch.Empleado_idEmpleado.Cedula)
    .subscribe((postData)=>{
        this.postFour=postData.posts;
        console.log("El encontrado: "+this.postFour);
        this.postUpdatedfour.next([...this.postFour]);

    });

    }
    catch(error)
    {
        console.log(error.name)

    }
    
    
      // return this.posts;
   }


   //para ver horario

 getPostsHorario(){

    try{
        return new Promise ((resolve,reject)=>{
            this.http.get<{message: string, posts:Contratofour[]}>(this.rutaport+'/Horarios')
            .subscribe((postData)=>{
                this.postsmovisF=postData.posts;
                this.postUpdatedfour.next([...this.postsmovisF]);
            });
            resolve("ok");
        }
        );
    }
    catch(error)
    {
        console.log(error.name)

    }
      // return this.posts;
   }




   


   
   //Buscar un solo elemento de Movilidad
   getOnePosMovilidad(){

    console.log("Servicio para uno");

    try{
        console.log(this.postSearch.Empleado_idEmpleado.Cedula+" "+this.postSearch.Empleado_idEmpleado.Nombre_Empleado);
    
        let Cedula=this.postSearch.Empleado_idEmpleado.Cedula;

    this.http.get<{message: string, posts:Contratothree[]}>(this.rutaport+'/oneMovilidad/:'+Cedula)
    .subscribe((postData)=>{
        this.postThree=postData.posts;
        console.log("El encontrado: "+this.postThree);
        this.postUpdatedthree.next([...this.postThree]);

    });

    }
    catch(error)
    {
        console.log(error.name)

    }
    
    
      // return this.posts;
   }


   //para ver movilidad nomina

 getPostsMovilidad(){

    try{
        return new Promise ((resolve,reject)=>{
            this.http.get<{message: string, posts:Contratothree[]}>(this.rutaport+'/Movilidad')
            .subscribe((postData)=>{
                this.postThree=postData.posts;
                this.postUpdatedthree.next([...this.postThree]);
            });
            resolve("ok");
        }
        );
    }
    catch(error)
    {
        console.log(error.name)

    }
      // return this.posts;
   }

   //para editar movilidad
   updateMov( Empleado_idEmpleado:PostThree
    ){

        console.log("a Editar: "+Empleado_idEmpleado);
    console.log(this.MovilidadEdit);
    try{
        const post: Contratothree={Id_Contrato:this.MovilidadEdit.Id_Contrato,Nombre_Empleado:Empleado_idEmpleado.Nombre_Empleado,
            Apellido_Empleado:Empleado_idEmpleado.Apellido_Empleado,
            MovilidadDia:this.MovilidadEdit.MovilidadDia};
        console.log("Servicio");
        console.log(post);
        this.http.put<{message:string}>(this.rutaport+"/OneMovilidad",post).subscribe
        (()=>{
            console.log("Editado con Exito");
            this.getPostsContrats();
    
            //this.router.navigate(["/"]);
    
        });

    }
    catch(error)
    {
        console.log(error.name)

    }



  
     } 



   
   //Buscar un solo elemento de Contrato
   getOnePosContrato(){
    console.log("Servicio para uno");
    try{
        let Cedula=this.postSearch.Empleado_idEmpleado.Cedula
       
        console.log(this.postSearch.Id_Contrato+" "+this.postSearch.Empleado_idEmpleado.Nombre_Empleado+" "+this.postSearch.Empleado_idEmpleado.Cedula);
    this.http.get<{message: string, posts:Contratofive[]}>(this.rutaport+'/oneContratoEmple/:'+Cedula)
    .subscribe((postData)=>{
        this.postFive=postData.posts;
        console.log("El encontrado: "+this.postFive);
        this.postUpdatedfive.next([...this.postFive]);
    });
    }
    catch(error)
    {
        console.log(error.name)
    }
   }


   //para ver movilidad nomina

 getPostsContrato(){

    try{
        return new Promise ((resolve,reject)=>{
            this.http.get<{message: string, posts:Contratofive[]}>(this.rutaport+'/ContratEmpleado')
            .subscribe((postData)=>{
                this.postsmovisFi=postData.posts;
                this.postUpdatedfive.next([...this.postsmovisFi]);
            });
            resolve("ok");
        }
        );
    }
    catch(error)
    {
        console.log(error.name)
    }
   }

   //para editar contrato
   updateContrat( Id_Contrato:Number, Empleado_idEmpleado:PostThree,Fecha_Inicio: string,
    Salario: number,Cargo: string,Movilidad: number
    ){

    console.log(Id_Contrato,Empleado_idEmpleado,Fecha_Inicio,Salario,Cargo,Movilidad);
    try{
        const post: Contratosix={Id_Contrato:Id_Contrato,Nombre_Empleado:Empleado_idEmpleado.Nombre_Empleado,
            Apellido_Empleado:Empleado_idEmpleado.Apellido_Empleado,Fecha_Inicio:Fecha_Inicio,Salario:Salario,
            Cargo:Cargo,Movilidad:Movilidad};
        console.log("Servicio");
        console.log(post);
        this.http.put<{message:string}>(this.rutaport+"/OneContrato",post).subscribe
        (()=>{
            console.log("Editado con Exito");
            this.getPostsContrats();
    
            //this.router.navigate(["/"]);
    
        });

    }
    catch(error)
    {
        console.log(error.name)

    }


  
     } 



     getPostMov(id:string){
        return {...this.postThree.find(p=> p.Id_Contrato=== parseInt(id))};
    }





       //Buscar un solo elemento de Contrato
   getOneContrat(IdEmpleado){
    console.log("Servicio para uno");
    try{
        //let IdEmpleado=this.postSearch.Empleado_idEmpleado.id_Empleado;
       console.log("Id es: "+IdEmpleado);
       // console.log(this.postSearch.Id_Contrato+" "+this.postSearch.Empleado_idEmpleado.Nombre_Empleado+" "+this.postSearch.Empleado_idEmpleado.Cedula);
    this.http.get<{message: string, posts:Contrato[]}>(this.rutaport+'/oneContrat/:'+IdEmpleado)
    .subscribe((postData)=>{
        this.Oneposts=postData.posts;
        console.log("El contrato encontrado: "+this.Oneposts[0]);
        this.postUpdatedOne.next([...this.Oneposts]);
    });
    }
    catch(error)
    {
        console.log(error.name)
    }
   }



   //buscar si es o no gerente, Admin o RRHH

   Ger(UsuarioBuscar:User){

    return new Promise((resolve,reject)=>{

        console.log("Crear post: "+UsuarioBuscar.User_Name);
        let regresoValor;
        this.http.post<{ }>(this.rutaport+'/ger',UsuarioBuscar).subscribe
        ((responseData)=>{

            console.log("La respuesta es: ");
            console.log(responseData);
            regresoValor=responseData;
            if(regresoValor.token=="ERROR"){
                console.log("La respuesta es: ERROR");  
    
              }
              else {
                  this.TipoEmpleado=regresoValor.Cargo;

                  console.log("El empleado es: ");
                  console.log(this.TipoEmpleado);

              }

              resolve(regresoValor.token);


        });

    })

   }






}
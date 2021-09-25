import { Injectable } from '@angular/core';
import {Dispositivo} from './post.model';
import {Dispositivotwo,Dispositivothree} from './post.model';
import { PostThree, Postwo } from "../Empleado/post.model";
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { ParsedEvent } from '@angular/compiler';
import {Router} from "@angular/router";
import { environment } from "../../environments/environment";

@Injectable({providedIn: 'root'})
export class PostServiceDisp{

    rute= environment.apiUrl ;
    rutaport=this.rute+"/dispos";
    private posts:Dispositivo[]=[];
    private Oneposts:Dispositivo[]=[];

    private poststhree:Dispositivothree[]=[];

   DisposSearch:Dispositivo[]=[];
   EmpleSearch:PostThree[]=[];
   

   postPasarEmple:PostThree;   


   
  DisposforEdit:Dispositivo[]=[];
  DispoforEdit:Dispositivo;

   private postOne:Dispositivotwo[]=[];

   private postUpdatedOne = new Subject<Dispositivo[]>();


   private postUpdated = new Subject<Dispositivotwo[]>();

   private postUpdatedthree = new Subject<Dispositivothree[]>();

   postEdit:Dispositivo;

   postSend:Dispositivo;

   postToEdit:Dispositivo;

   postInitial:Dispositivo;
   EmpleadoBase:PostThree;

   postSearch:Dispositivotwo;

   editComesD:Boolean;
   Token:Boolean;


   Dispositivotwo:Dispositivotwo;


   constructor(private http: HttpClient, private router:Router){
    this.postSearch={Id_Dispositivo:0,Empleado_idEmpleado: this.EmpleadoBase};
    this.Dispositivotwo={Id_Dispositivo: 0,Empleado_idEmpleado: this.EmpleadoBase};
    
   }
   getPostsDisp(){

    try{
        this.http.get<{message: string, posts:Dispositivo[]}>(this.rutaport)
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


   //Buscar un solo elemento
   getOnePostDisp(){

    console.log("Servicio para uno");
    console.log(this.postSearch);
    
    try{
        this.http.get<{message: string, posts:Dispositivotwo[]}>(this.rutaport+'/one/:'+this.postSearch.Id_Dispositivo)
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


   getPostUpdateListenerThree(){
    return this.postUpdatedthree.asObservable();
}




   addPost(  Id_Dispositivo:Number,
    Empleado_idEmpleado: PostThree,Mac_Add: string, IPdis: string, Nombre_SO: string, Activo:string){
    const post: Dispositivo={Id_Dispositivo:Id_Dispositivo,Empleado_idEmpleado:Empleado_idEmpleado,Mac_Add:Mac_Add,IPdis:IPdis,Nombre_SO:Nombre_SO
        ,Activo:Activo};
    
        try{
            this.http.post<{message:string}>(this.rutaport,post).subscribe
            ((responseData)=>{
                console.log(responseData.message);
                this.posts.push(post);
                this.postUpdated.next([...this.posts]);
        
                //direccion de home de dispositivos
                //this.router.navigate(["/"]);
            });
         
        }
        catch(error)
        {
            console.log(error.name)
    
        }
 


 

}

deletePost(){
    console.log(this.postEdit.Id_Dispositivo);
    try{
        this.http.delete(this.rutaport+"/:"+this.postEdit.Id_Dispositivo).
    subscribe(()=>{
        console.log("Eliminado con Exito");
        const updatedPosts=this.posts.filter(post=> post.Id_Dispositivo!==this.postEdit.Id_Dispositivo);
        this.posts=updatedPosts;
        this.postUpdated.next([...this.posts]);
    });
    }
    catch(error)
    {
        console.log(error.name)

    }


    
}

updatePost(Id_Dispositivo:Number,
    Empleado_idEmpleado: PostThree,Mac_Add: string, IPdis: string, Nombre_SO: string, Activo:string){
    console.log(Id_Dispositivo,Empleado_idEmpleado,Mac_Add,IPdis,Nombre_SO
        ,Activo)
    
        try{
            const post: Dispositivo={Id_Dispositivo:Id_Dispositivo,Empleado_idEmpleado:Empleado_idEmpleado,Mac_Add:Mac_Add,IPdis:IPdis,Nombre_SO:Nombre_SO
                ,Activo:Activo};
            console.log("Servicio");
            console.log(post);
            this.http.put<{message:string}>(this.rutaport,post).subscribe
            (()=>{
                console.log("Editado con Exito");
               // this.getPostsDisp();
        
                //direccion del home de dispositivos
                //this.router.navigate(["/"]);
        
            });
        }
        catch(error)
    {
        console.log(error.name)

    }

      
}

 llenarEspacios(seleccion:Dispositivo){
     
     this.postEdit=seleccion;
     console.log(this.postEdit);
 }

 elementoBusqueda(Disposea:Dispositivotwo){

    try{
        this.Dispositivotwo=Disposea;

    console.log("init two"+this.Dispositivotwo);
 

    
    this.postSearch=Disposea;
    console.log("init two"+this.postSearch);


    }
    catch(error)
    {
        console.log(error.name)

    }
 
    
 }

 iniciarElementos(){
    //const CedulaInit:Postwo={Cedula: "0"};
     this.postSearch=this.Dispositivotwo;
     console.log("iniciar : "+this.postSearch.Id_Dispositivo);
 }

 getPost(id:string){
     return {...this.posts.find(p=> p.Id_Dispositivo=== parseInt(id))};
 }






 getOnePostsDispEmple(){

    try{
        this.http.get<{message: string, posts:Dispositivothree[]}>(this.rutaport+"/oneDispositivo"+this.postSearch.Empleado_idEmpleado.Cedula)
    .subscribe((postData)=>{
        this.poststhree=postData.posts;
        this.postUpdatedthree.next([...this.poststhree]);

    });

    }
    catch(error)
        {
            console.log(error.name)
    
        }
 
    
      // return this.posts;
   }


   getPostsDispEmple(){

    try{
        this.http.get<{message: string, posts:Dispositivothree[]}>(this.rutaport)
    .subscribe((postData)=>{
        this.poststhree=postData.posts;
        this.postUpdatedthree.next([...this.poststhree]);

    });

    }
    catch(error)
        {
            console.log(error.name)
    
        }
 
    
      // return this.posts;
   }







   updateDispo(Id_Dispositivo:Number,
    Empleado_idEmpleado: PostThree,Mac_Add: string, IPdis: string){
    console.log(Id_Dispositivo,Empleado_idEmpleado,Mac_Add,IPdis
        )
    
        try{
            const post: Dispositivothree={Id_Dispositivo:Id_Dispositivo,Nombre_Empleado:Empleado_idEmpleado.Nombre_Empleado,Apellido_Empleado:Empleado_idEmpleado.Apellido_Empleado,Mac_Add:Mac_Add,IPdis:IPdis
                };
            console.log("Servicio");
            console.log(post);
            this.http.put<{message:string}>(this.rutaport+"/OneDispositivo",post).subscribe
            (()=>{
                console.log("Editado con Exito");
               // this.getPostsDisp();
        
                //direccion del home de dispositivos
                //this.router.navigate(["/"]);
        
            });
        }
        catch(error)
    {
        console.log(error.name)

    }

      
}




       //Buscar un solo elemento de Dispositivo
       getOneDisp(IdEmpleado){
        console.log("Servicio para uno");
        try{
            //let IdEmpleado=this.postSearch.Empleado_idEmpleado.id_Empleado;
           console.log("Id es: "+IdEmpleado);
           // console.log(this.postSearch.Id_Dispositivo+" "+this.postSearch.Empleado_idEmpleado.Nombre_Empleado+" "+this.postSearch.Empleado_idEmpleado.Cedula);
        this.http.get<{message: string, posts:Dispositivo[]}>(this.rutaport+'/oneDisp/:'+IdEmpleado)
        .subscribe((postData)=>{
            this.Oneposts=postData.posts;
            console.log("El encontrado: "+this.Oneposts);
            this.postUpdatedOne.next([...this.Oneposts]);
        });
        }
        catch(error)
        {
            console.log(error.name)
        }
       }









getPostDis(id:string){
    return {...this.poststhree.find(p=> p.Id_Dispositivo=== parseInt(id))};
}






}
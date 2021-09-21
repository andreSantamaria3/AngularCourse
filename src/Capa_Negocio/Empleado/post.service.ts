import { Injectable } from '@angular/core';
import {PostThree} from './post.model';
import {Postwo} from './post.model';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { ParsedEvent } from '@angular/compiler';
import {Router} from "@angular/router";
import { Departamento } from "../../Capa_Negocio/Departamento/post.model";


@Injectable({providedIn: 'root'})
export class PostService{
    rutaPort= "http://localhost:3000/api/posts";
  private  posts:PostThree[]=[];

   private postOne:PostThree[]=[];

   private postUpdated = new Subject<PostThree[]>();

   postEdit:PostThree;

   postToEdit:PostThree;

   postInitial:PostThree;

   postCorreo:PostThree;

   postSearch:Postwo;


   postPasar:PostThree;
   
   EmpleInn:PostThree;
   Token:Boolean;


   CedulaInitwo:Postwo={Cedula: "0"};


   constructor(private http: HttpClient, private router:Router){
    
   }
   getPosts(){

    try{

        this.http.get<{message: string, posts:PostThree[]}>(this.rutaPort)
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
   getOnePost(){

    console.log("Servicio para uno");
    console.log(this.postSearch.Cedula);
    
    try{
        this.http.get<{message: string, posts:PostThree[]}>(this.rutaPort+'/one/:'+this.postSearch.Cedula)
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



   PromgetOnePost(){

    return new Promise((resolve,reject)=>{
    console.log("Servicio para uno");
    console.log(this.postSearch.Cedula);
    
        this.http.get<{message: string, posts:PostThree[]}>(this.rutaPort+'/one/:'+this.postSearch.Cedula)
    .subscribe((postData)=>{
        this.postOne=postData.posts;
        this.postUpdated.next([...this.postOne]);


        console.log("Luego de query: "+this.postOne);
    });

    

    resolve("encontrado ONE servicio");


        });
   }








   getPostUpdateListener(){
       return this.postUpdated.asObservable();
   }

  async  addPost(IdEmpleado:Number,Departamento_idDepartamento:Departamento,
    Nombre_Empleado:string,Apellido_Empleado:string,Cedula:string,
    Direccion:string,Telefono:string,Correo:string){
    console.log("Crear post: "+Departamento_idDepartamento);
    
    try{

        const post: PostThree={id_Empleado:IdEmpleado,Departamento_idDepartamento:Departamento_idDepartamento,
            Nombre_Empleado:Nombre_Empleado,Apellido_Empleado: Apellido_Empleado,
            Cedula:Cedula,Direccion:Direccion,Telefono:Telefono,Correo:Correo};
        // console.log("Enviar post: "+post.Departamento_idDepartamento);
        // this.http.post<{message:string}>('http://localhost:3000/api/posts',post).subscribe
        // ((responseData)=>{
        //     console.log(responseData.message);
        //     this.posts.push(post);
        //     this.postUpdated.next([...this.posts]);
    
           
        //     this.getPostUpdateListener();
           
           // // this.router.navigate(["/"]);
       // });
     
    
        await this.postingEmpleado(post);
       
           
            this.getPostUpdateListener();
    

    }
    catch(error)
    {
        console.log(error.name)

    }

    

}


postingEmpleado(post:PostThree){

    try{

        return new Promise ((resolve,reject)=>{
            console.log("Enviar post: "+post.Departamento_idDepartamento);
        this.http.post<{message:string}>(this.rutaPort,post).subscribe
        ((responseData)=>{
            console.log(responseData.message);
            this.posts.push(post);
            this.postUpdated.next([...this.posts]);
            
           
           
        });
     
        resolve();
    
        }
    
        );
    

    }
    catch(error)
    {
        console.log(error.name)

    }
    
}



 addPostNSearch(IdEmpleado:Number,Departamento_idDepartamento:Departamento,
    Nombre_Empleado:string,Apellido_Empleado:string,Cedula:string,
    Direccion:string,Telefono:string,Correo:string){
    console.log("Crear post: "+Departamento_idDepartamento);
   try{
    const post: PostThree={id_Empleado:IdEmpleado,Departamento_idDepartamento:Departamento_idDepartamento,
        Nombre_Empleado:Nombre_Empleado,Apellido_Empleado: Apellido_Empleado,
        Cedula:Cedula,Direccion:Direccion,Telefono:Telefono,Correo:Correo};
    console.log("Enviar post: "+post.Departamento_idDepartamento);
     this.http.post<{message:string}>(this.rutaPort,post).subscribe
    ((responseData)=>{
        console.log(responseData.message);
        this.posts.push(post);
        this.postUpdated.next([...this.posts]);

       
        console.log("Valores despues de guardar ");
        this.getPostUpdateListener();
       
        this.getPosts();
        const CedulaInit:Postwo={Cedula: Cedula};
        this.elementoBusqueda(CedulaInit);
        this.getOnePost();
        this.getPostUpdateListener();

    });
 
   }
   catch(error)
    {
        console.log(error.name)

    }

    

}




deletePost(){
    console.log("Empleado a eliminar: "+this.postEdit.id_Empleado);
    
    try{
        this.http.delete(this.rutaPort+"/:"+this.postEdit.id_Empleado).
    subscribe(()=>{
        console.log("Eliminado con Exito");
        const updatedPosts=this.posts.filter(post=> post.id_Empleado!==this.postEdit.id_Empleado);
        this.posts=updatedPosts;
        this.postUpdated.next([...this.posts]);
    });
    }
    catch(error)
    {
        console.log(error.name)

    }

    
}

updatePost(id_Empleado:Number,Departamento_idDepartamento:Departamento,Nombre_Empleado:string,Apellido_Empleado:string,Cedula:string,Direccion:string,Telefono:string,Correo:string){
    console.log(id_Empleado,Departamento_idDepartamento,Nombre_Empleado,Apellido_Empleado,Cedula,Direccion,Telefono,Correo)
    
    try{
        const post: PostThree={id_Empleado:id_Empleado,Departamento_idDepartamento:Departamento_idDepartamento,Nombre_Empleado:Nombre_Empleado,Apellido_Empleado: Apellido_Empleado,Cedula:Cedula,Direccion:Direccion,Telefono:Telefono,Correo:Correo};
    console.log("Servicio");
    console.log(post);
    this.http.put<{message:string}>(this.rutaPort,post).subscribe
    (()=>{
        console.log("Editado con Exito");
        //this.getPosts();

        //this.router.navigate(["/"]);

    });
    }
    catch(error)
    {
        console.log(error.name)

    }
    
}

 llenarEspacios(seleccion:PostThree){
     
     this.postEdit=seleccion;
     console.log("el seleccionado es: "+this.postEdit.Nombre_Empleado+" "+this.postEdit.id_Empleado);
 }

 elementoBusqueda(cedula:Postwo){

 
    try{
        this.CedulaInitwo=cedula;

    console.log("init two "+this.CedulaInitwo.Cedula);
 

    
    this.postSearch=cedula;
    console.log("init two "+this.CedulaInitwo.Cedula);

    }
    catch(error)
    {
        console.log(error.name)

    }

    

 }

 iniciarElementos(){
    //const CedulaInit:Postwo={Cedula: "0"};
     this.postSearch=this.CedulaInitwo;
     console.log("iniciar : "+this.postSearch.Cedula);
 }

 getPost(id:string){
     return {...this.posts.find(p=> p.id_Empleado=== parseInt(id))};
 }


}
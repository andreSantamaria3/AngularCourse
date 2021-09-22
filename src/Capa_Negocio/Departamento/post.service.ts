import { Injectable } from '@angular/core';
import {Departamento} from './post.model';
import {Departamentotwo,DepartamentoFour,DepartamentoFive} from './post.model';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { ParsedEvent } from '@angular/compiler';
import {Router} from "@angular/router";

@Injectable({providedIn: 'root'})
export class PostServiceDept{
    rutaPort= "http://localhost:3000/api/depts";
   private posts:Departamento[]=[];

   private postsfour:DepartamentoFour[]=[];

   DeptsSearch:Departamento[]=[];

   private postOne:Departamentotwo[]=[];

   private postFour:DepartamentoFour[]=[];

   private postUpdated = new Subject<Departamentotwo[]>();

   private postUpdatedfour = new Subject<DepartamentoFour[]>();

   postEdit:Departamento;

   postSend:Departamento;

   postToEdit:Departamento;

   postInitial:Departamento;

   postSearch:Departamentotwo={Id_Departamento:0};

   postSearchFour:DepartamentoFive={Cedula:""};



   Departamentotwo:Departamentotwo={Id_Departamento: 0};


   constructor(private http: HttpClient, private router:Router){
    
   }
   getPostsDep(){

    try{
        this.http.get<{message: string, posts:Departamento[]}>(this.rutaPort)
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
   getOnePostDept(){

    console.log("Servicio para uno");
    console.log(this.postSearch);
    
    try{
        this.http.get<{message: string, posts:Departamentotwo[]}>(this.rutaPort+'/one/:'+this.postSearch.Id_Departamento)
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





   getPostUpdateListener(){
       return this.postUpdated.asObservable();
   }

   


   addPost(Id_Departamento:Number,Nombre_Departamento: string, Descripcion: string, Latitud_Dep1: number,
    Longitud_Dep1:number, x_Dep: number, y_Dep: number){
    
        try{
            const post: Departamento={Id_Departamento:Id_Departamento,Nombre_Departamento:Nombre_Departamento,Descripcion:Descripcion,
                Latitud_Dep1:Latitud_Dep1,Longitud_Dep1:Longitud_Dep1,x_Dep:x_Dep,y_Dep:y_Dep};
            this.http.post<{message:string}>(this.rutaPort,post).subscribe
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
    console.log(this.postEdit.Id_Departamento);
    try{
        this.http.delete(this.rutaPort+"/:"+this.postEdit.Id_Departamento).
    subscribe(()=>{
        console.log("Eliminado con Exito");
        const updatedPosts=this.posts.filter(post=> post.Id_Departamento!==this.postEdit.Id_Departamento);
        this.posts=updatedPosts;
        this.postUpdated.next([...this.posts]);
    });
    }
    catch(error)
    {
        console.log(error.name)

    }



    
}

updatePost(Id_Departamento:Number,Nombre_Departamento: string, Descripcion: string, Latitud_Dep1: number,
    Longitud_Dep1:number, x_Dep: number, y_Dep: number){
    console.log(Id_Departamento,Nombre_Departamento,Descripcion,
        Latitud_Dep1,Longitud_Dep1,x_Dep,y_Dep);
  
        try{

            const post: Departamento={Id_Departamento:Id_Departamento,Nombre_Departamento:Nombre_Departamento,Descripcion:Descripcion,
                Latitud_Dep1:Latitud_Dep1,Longitud_Dep1:Longitud_Dep1,x_Dep:x_Dep,y_Dep:y_Dep};
            console.log("Servicio");
            console.log(post);
            this.http.put<{message:string}>(this.rutaPort,post).subscribe
            (()=>{
                console.log("Editado con Exito");
               // this.getPostsDep();
        
                //this.router.navigate(["/"]);
        
            });

        }
        catch(error)
        {
            console.log(error.name)
    
        }
    

  
}

 llenarEspacios(seleccion:Departamento){
     
     this.postEdit=seleccion;
     console.log(this.postEdit);
 }

 elementoBusqueda(Departamentobus:Departamentotwo){

    try{
        this.Departamentotwo=Departamentobus;

    console.log("init two"+this.Departamentotwo);
 

    
    this.postSearch=Departamentobus;
    console.log("init two"+this.Departamentotwo);

    }
    catch(error)
        {
            console.log(error.name)
    
        }
 

    

 }

 iniciarElementos(){
    //const CedulaInit:Postwo={Cedula: "0"};
     this.postSearch=this.Departamentotwo;
     console.log("iniciar : "+this.postSearch.Id_Departamento);
 }

 getPost(id:string){
     return {...this.posts.find(p=> p.Id_Departamento=== parseInt(id))};
 }




 getPostsDepEmple(){

    try{
        this.http.get<{message: string, posts:DepartamentoFour[]}>(this.rutaPort+"/Departamento")
    .subscribe((postData)=>{
        this.postsfour=postData.posts;
        this.postUpdatedfour.next([...this.postsfour]);

    });
    }
    catch(error)
    {
        console.log(error.name)

    }
    

      // return this.posts;
   }


   
   //Buscar un solo elemento
   getOnePostDeptEmple(){

    console.log("Servicio para uno");
    console.log(this.postSearchFour);
    
    try{
        this.http.get<{message: string, posts:DepartamentoFour[]}>(this.rutaPort+'/oneDepartamento/:'+this.postSearchFour.Cedula)
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








}
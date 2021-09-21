import { Injectable } from '@angular/core';
import {Permiso} from './post.model';
import {Permisotwo,PermisoCed} from './post.model'; 
import {PermisoThree,PermisoFour,PermisoFive,PermisoSix,PermisoSeven} from './post.model';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { ParsedEvent } from '@angular/compiler';
import {Router} from "@angular/router";
import { Post, PostThree, Postwo } from "../../Capa_Negocio/Empleado/post.model";


@Injectable({providedIn: 'root'})
export class PostServicePerm{
    rutaPort= "http://localhost:3000/api/permisos";

   private posts:PermisoThree[]=[];
   private postsOne:Permiso[]=[];

   PermisoSearch:Permiso[]=[];

   private postOne:PermisoThree[]=[];

   private postUpdated = new Subject<PermisoThree[]>();

   private postUpdatedUno = new Subject<Permiso[]>();

   PermisosPasar:PermisoThree[]=[];


//para vistas con los permisos aceptados, presentados,negados de atraso,faltas,extra
   private poststhree:PermisoThree[]=[];
   //para vista total de permisos de atrasos, faltas,  horas extra
   private postsfour:PermisoFour[]=[];
   //vista movilidad
   private postsfive:PermisoFive[]=[];
   //total movilidad
   private postssix:PermisoSix[]=[];
//   private postsseven:AsistenciaSeven[]=[];

private postsseven:PermisoSeven[]=[];



//updated


private postUpdatedOne = new Subject<Permisotwo[]>();
private postUpdatedthree = new Subject<PermisoThree[]>();
private postUpdatedfour = new Subject<PermisoFour[]>();
private postUpdatedfive = new Subject<PermisoFive[]>();
private postUpdatedsix = new Subject<PermisoSix[]>();
private postUpdatedseven = new Subject<PermisoSeven[]>();



   postEdit:Permiso;

   postEditThree:PermisoThree;

   postSend:Permiso;

   postToEdit:Permiso;

   postInitial:Permiso;

   postSearch:PermisoCed={ Cedula:"0"};

   Token:Boolean;

   postPasar:PermisoThree;

   Permisotwo:PermisoCed={ Cedula:"0"};

   SeleccionPermiso:Number=0;

   // false es sin cedula
   SeleccionCedula:Boolean=false;

   constructor(private http: HttpClient, private router:Router){
    
   }
   getPostsPerm(){

    try{
        this.http.get<{message: string, posts:Permiso[]}>(this.rutaPort+'')
        .subscribe((postData)=>{
            this.postsOne=postData.posts;
            this.postUpdatedUno.next([...this.postsOne]);
    
        });
    
    }
    catch(error)
    {
        console.log(error.name)

    }


   
      // return this.posts;
   }


   //Buscar un solo elemento
   getOnePostPerm(){

    console.log("Servicio para uno");
    console.log(this.postSearch);

    try{
        this.http.get<{message: string, posts:PermisoThree[]}>(this.rutaPort+'/one/:'+this.postSearch.Cedula)
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



  


   /***** Para un empleado ****/




/********** MOVILIDAD ***********/
/****Fechas de exceso de ovilidad *****/
getOneFechasExcesoMovilidad(){
    console.log("Servicio para uno");
    console.log(this.postSearch);
    try{
        this.http.get<{message: string, posts:PermisoFive[]}>(this.rutaPort+'/totExcessMovONE/:'+this.postSearch.Cedula)
    .subscribe((postData)=>{
        this.postsfive=postData.posts;
        console.log("El encontrado: "+ this.poststhree);
        this.postUpdatedthree.next([...this.poststhree]);
    });
    }
    catch(error)
    {
        console.log(error.name)
    }
}

/****Total de exceso de ovilidad *****/
getOneTotalExcesoMovilidad(){
    console.log("Servicio para uno");
    console.log(this.postSearch);
    try{
        this.http.get<{message: string, posts:PermisoSix[]}>(this.rutaPort+'/fechaExcessMovONE/:'+this.postSearch.Cedula)
    .subscribe((postData)=>{
        this.postssix=postData.posts;
        console.log("El encontrado: "+ this.poststhree);
        this.postUpdatedthree.next([...this.poststhree]);
    });
    }
    catch(error)
    {
        console.log(error.name)
    }
}









/***************************************************************** */
/******permisos aceptados un mes****** */
getPermisAceptOneMes(){
    try{
        console.log("Aceptados");
        this.http.get<{message: string, posts:PermisoThree[]}>(this.rutaPort+'/permiacepmes')
        .subscribe((postData)=>{
            this.posts=postData.posts;
            this.postUpdatedthree.next([...this.posts]);
    
        });
    
    }
    catch(error)
    {
        console.log(error.name)

    }

}


/******permisos aceptados un mes****** */
getPermisPresOneMes(){
    try{
        console.log("Presentados");
        this.http.get<{message: string, posts:PermisoThree[]}>(this.rutaPort+'/permipresmes')
        .subscribe((postData)=>{
            this.posts=postData.posts;
            this.postUpdatedthree.next([...this.posts]);
    
        });
    
    }
    catch(error)
    {
        console.log(error.name)

    }

}


/******permisos presentados ocho días****** */
getPermisPresEightDay(){
    try{
        console.log("Presentados 8 days");
        this.http.get<{message: string, posts:PermisoThree[]}>(this.rutaPort+'/permipresocho')
        .subscribe((postData)=>{
            this.posts=postData.posts;
            this.postUpdatedthree.next([...this.posts]);
    
        });
    
    }
    catch(error)
    {
        console.log(error.name)

    }

}


/******permisos aceptados un mes****** */
getPermisNegaOneMes(){
    try{
        console.log("NEgados");
        this.http.get<{message: string, posts:PermisoThree[]}>(this.rutaPort+'/perminegmes')
        .subscribe((postData)=>{
            this.posts=postData.posts;
            this.postUpdatedthree.next([...this.posts]);
    
        });
    
    }
    catch(error)
    {
        console.log(error.name)

    }

}


 /****************TODOS LOS PERMISOS DE UN EMPLEADO****************/  
   getOnePermisEmple(){
    console.log("Servicio para uno");
    console.log(this.postSearch);
    try{
        this.http.get<{message: string, posts:PermisoThree[]}>(this.rutaPort+'/onepermiEmp/:'+this.postSearch.Cedula)
    .subscribe((postData)=>{
        this.poststhree=postData.posts;
        console.log("El encontrado: "+ this.poststhree);
        this.postUpdatedthree.next([...this.poststhree]);
    });
    }
    catch(error)
    {
        console.log(error.name)
    }
}

/****************TODOS LOS PERMISOS Aceptados DE UN EMPLEADO****************/  
getOnePermisAcepEmple(){
    console.log("Servicio para uno");
    console.log(this.postSearch);
    try{
        this.http.get<{message: string, posts:PermisoThree[]}>(this.rutaPort+'/ToPermisEmpleAceptONE/:'+this.postSearch.Cedula)
    .subscribe((postData)=>{
        this.poststhree=postData.posts;
        console.log("El encontrado: "+ this.poststhree);
        this.postUpdatedthree.next([...this.poststhree]);
    });
    }
    catch(error)
    {
        console.log(error.name)
    }
}

/****************TODOS LOS PERMISOS Negados DE UN EMPLEADO****************/  
getOnePermisNegEmple(){
    console.log("Servicio para uno");
    console.log(this.postSearch);
    try{
        this.http.get<{message: string, posts:PermisoThree[]}>(this.rutaPort+'/ToPermisEmpleNegaONE/:'+this.postSearch.Cedula)
    .subscribe((postData)=>{
        this.poststhree=postData.posts;
        console.log("El encontrado: "+ this.poststhree);
        this.postUpdatedthree.next([...this.poststhree]);
    });
    }
    catch(error)
    {
        console.log(error.name)
    }
}

/****************TODOS LOS PERMISOS Presentados DE UN EMPLEADO****************/  
getOnePermisPresenEmple(){
    console.log("Servicio para uno");
    console.log(this.postSearch);
    try{
        this.http.get<{message: string, posts:PermisoThree[]}>(this.rutaPort+'/ToPermisEmplePrese30ONE/:'+this.postSearch.Cedula)
    .subscribe((postData)=>{
        this.poststhree=postData.posts;
        console.log("El encontrado: "+ this.poststhree);
        this.postUpdatedthree.next([...this.poststhree]);
    });
    }
    catch(error)
    {
        console.log(error.name)
    }
}

/****************TODOS LOS PERMISOS Presentados DE UN EMPLEADO ocho días****************/  
getOnePermisPresenEmple8(){
    console.log("Servicio para uno");
    console.log(this.postSearch);
    try{
        this.http.get<{message: string, posts:PermisoThree[]}>(this.rutaPort+'/ToPermisEmplePrese8ONE/:'+this.postSearch.Cedula)
    .subscribe((postData)=>{
        this.poststhree=postData.posts;
        console.log("El encontrado: "+ this.poststhree);
        this.postUpdatedthree.next([...this.poststhree]);
    });
    }
    catch(error)
    {
        console.log(error.name)
    }
}






   getPostUpdateListener(){
       return this.postUpdatedUno.asObservable();
   }
   
   getPostUpdateListenertwo(){
    return this.postUpdatedOne.asObservable();
}
getPostUpdateListenerthree(){
    console.log("as observable");
    return this.postUpdatedthree.asObservable();
}
getPostUpdateListenerfour(){
    return this.postUpdatedfour.asObservable();
}
getPostUpdateListenerfive(){
    return this.postUpdatedfive.asObservable();
}

getPostUpdateListenersix(){
    return this.postUpdatedsix.asObservable();
}

getPostUpdateListenerseven(){
    return this.postUpdatedseven.asObservable();
}










    addPost(id_Permiso:Number,Empleado_idEmpleado:PostThree,Tipo:string,
        Descripcion:string,Estado_Permiso:string,Fecha:Date,tiempo:number){
     
        try{
            const post: Permiso={id_Permiso:id_Permiso,Empleado_idEmpleado:Empleado_idEmpleado,
                Tipo:Tipo,Descripcion: Descripcion,Estado_Permiso:Estado_Permiso,Fecha:Fecha,tiempo:tiempo};
            console.log("el id del empleado es: "+post.Empleado_idEmpleado.id_Empleado);

                this.http.post<{message:string}>(this.rutaPort,post).subscribe
           ((responseData)=>{
               console.log(responseData.message);
               this.postsOne.push(post);
               this.postUpdated.next([...this.posts]);
      
               console.log("el nombre del empleado es: "+post.Empleado_idEmpleado.Nombre_Empleado);
               //this.router.navigate(["/"]);
           });
      
        }
        catch(error)
        {
            console.log(error.name)
    
        }
    

 

 }

 deletePost(){
     console.log(this.postEdit.id_Permiso);
    try{
        this.http.delete(this.rutaPort+"/:"+this.postEdit.id_Permiso).
        subscribe(()=>{
            console.log("Eliminado con Exito");
            const updatedPosts=this.posts.filter(post=> post.id_Permiso!==this.postEdit.id_Permiso);
            this.posts=updatedPosts;
            this.postUpdated.next([...this.posts]);
        });
    }
    catch(error)
    {
        console.log(error.name)

    }


    
   
 }

updatePost(id_Permiso:Number,Empleado_idEmpleado:PostThree,Tipo:string,Descripcion:string,Estado_Permiso:string,Fecha:Date,tiempo:number){
    console.log(id_Permiso,Empleado_idEmpleado,Tipo,Descripcion,Estado_Permiso,Fecha,tiempo)
   
    try{
        const post: Permiso={id_Permiso:id_Permiso,Empleado_idEmpleado:Empleado_idEmpleado,Tipo:Tipo,Descripcion: Descripcion,Estado_Permiso:Estado_Permiso,Fecha:Fecha,tiempo:tiempo};
        console.log("Servicio");
        console.log(post);
        this.http.put<{message:string}>(this.rutaPort,post).subscribe
        (()=>{
            console.log("Editado con Exito");
            this.getPostsPerm();
    
            //this.router.navigate(["/"]);
    
        });
    }
    catch(error)
    {
        console.log(error.name)

    }

  
}

 llenarEspacios(seleccion:PermisoThree){
     
     this.postEditThree=seleccion;
     console.log("El permiso seleccionado: "+this.postEditThree);
 }

 elementoBusqueda(PermisoSear:PermisoCed){

    try{
        this.Permisotwo=PermisoSear;

        console.log("init two"+this.Permisotwo);
     
    
        
        this.postSearch=PermisoSear;
        console.log("init two"+this.Permisotwo.Cedula);
    
    
    }
    catch(error)
    {
        console.log(error.name)

    }

 
   
 }

 iniciarElementos(){
    //const CedulaInit:Postwo={Cedula: "0"};
     this.postSearch=this.Permisotwo;
     console.log("iniciar : "+this.postSearch.Cedula);
 }

 getPost(id:string){
     return {...this.postsOne.find(p=> p.id_Permiso=== parseInt(id))};
 }



 /********************************para buscar horarios */

 getHorarios(){
    console.log("Servicio para uno");
    console.log(this.postSearch);
    try{
        this.http.get<{message: string, posts:PermisoSeven[]}>(this.rutaPort+'/totExcessMovONE/:'+this.postSearch.Cedula)
    .subscribe((postData)=>{
        this.postsseven=postData.posts;
        console.log("El encontrado: "+ this.postsseven);
        this.postUpdatedseven.next([...this.postsseven]);
    });
    }
    catch(error)
    {
        console.log(error.name)
    }
}











}
import { Injectable } from '@angular/core';
import {Asistencia, AsistenciaThree} from './post.model';
import {Asistenciatwo,AsistenciaFour,AsistenciaFive,AsistenciaSix,AsistenciaSeven} from './post.model';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { ParsedEvent } from '@angular/compiler';
import {Router} from "@angular/router";
import { Time } from '@angular/common';
import { Post, PostThree, Postwo } from "../../Capa_Negocio/Empleado/post.model";
import { environment } from "../../environments/environment";

@Injectable({providedIn: 'root'})
export class PostServiceAsist{
    rute= environment.apiUrl ;
    rutaport=this.rute+"/asists";
    
    private posts:Asistencia[]=[];

   private poststwo:Asistenciatwo[]=[];
   private poststhree:AsistenciaThree[]=[];
   private postsfour:AsistenciaFour[]=[];
   private postsfive:AsistenciaFive[]=[];
   private postssix:AsistenciaSix[]=[];
   private postsseven:AsistenciaSeven[]=[];

   DeptsSearch:Asistencia[]=[];

   private postOne:Asistenciatwo[]=[];

   private postUpdated = new Subject<Asistencia[]>();
   private postUpdatedOne = new Subject<Asistenciatwo[]>();
   private postUpdatedthree = new Subject<AsistenciaThree[]>();
   private postUpdatedfour = new Subject<AsistenciaFour[]>();
   private postUpdatedfive = new Subject<AsistenciaFive[]>();
   private postUpdatedsix = new Subject<AsistenciaSix[]>();
   private postUpdatedseven = new Subject<AsistenciaSeven[]>();


   PostMode:Number;

   postEdit:Asistencia;

   postSend:Asistencia;

   postToEdit:Asistencia;

   postInitial:Asistencia;

   postSearch:Asistenciatwo={ Cedula:"0"};


   allmode:Boolean;


   Asistenciatwo:Asistenciatwo={ Cedula:"0"};


   constructor(private http: HttpClient, private router:Router){
    
   }
   getPostsAsists(){

    try{
        this.http.get<{message: string, posts:Asistencia[]}>(this.rutaport+'')
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


   getPostsFechasAtraso(){

    try{

        this.http.get<{message: string, posts:AsistenciaThree[]}>(this.rutaport+'/fechaatraso')
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



   getPostsTotalAtraso(){

    try{
        this.http.get<{message: string, posts:AsistenciaFour[]}>(this.rutaport+'/totatraso')
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



   getPostsFechaFaltas(){

    try{

        this.http.get<{message: string, posts:AsistenciaThree[]}>(this.rutaport+'/fechafalta')
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

   
   getPostsTotaFaltas(){

    try{
        this.http.get<{message: string, posts:AsistenciaFour[]}>(this.rutaport+'/totalfalta')
    .subscribe((postData)=>{
        this.postsfour=postData.posts;
        this.postUpdatedfour.next([...this.postsfour]);

    });
    }
    catch(error)
    {
        console.log(error.name)

    }
    

      // return this.posts;elemr
   }

   
   getPostsFechaHoraExtra(){

    try{
        this.http.get<{message: string, posts:AsistenciaFive[]}>(this.rutaport+'/fechahextra')
    .subscribe((postData)=>{
        this.postsfive=postData.posts;
        this.postUpdatedfive.next([...this.postsfive]);

    });

    }
    catch(error)
    {
        console.log(error.name)

    }
    
      // return this.posts;
   }

   
   getPostsTotalHExtra(){

    try{
        this.http.get<{message: string, posts:AsistenciaFour[]}>(this.rutaport+'/totalhextra')
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

   
   getPostsMovilidadExtra(){

    try{
        this.http.get<{message: string, posts:AsistenciaSeven[]}>(this.rutaport+'/femovextra')
    .subscribe((postData)=>{
        this.postsseven=postData.posts;
        this.postUpdatedseven.next([...this.postsseven]);

    });
    }
    catch(error)
    {
        console.log(error.name)

    }
    

      // return this.posts;
   }

   
   getPostsTotalMovExtra(){

    try{
        this.http.get<{message: string, posts:AsistenciaSix[]}>(this.rutaport+'/tomovextra')
    .subscribe((postData)=>{
        this.postssix=postData.posts;
        this.postUpdatedsix.next([...this.postssix]);

    });

    }
    catch(error)
    {
        console.log(error.name)

    }

    
      // return this.posts;
   }

   



   //Buscar un solo elemento de departamentos
   getOnePostDept(){

    console.log("Servicio para uno");
    console.log(this.postSearch);
    
    try{

        this.http.get<{message: string, posts:Asistenciatwo[]}>(this.rutaport+'/one/:'+this.postSearch.Cedula)
    .subscribe((postData)=>{
        this.postOne=postData.posts;
        console.log("El encontrado: "+this.postOne);
        this.postUpdatedOne.next([...this.postOne]);

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

   getPostUpdateListenertwo(){
    return this.postUpdatedOne.asObservable();
}
getPostUpdateListenerthree(){
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


   addPost(id_Asistencia:Number,Empleado_idEmpleado: PostThree,Fecha_Asistencia: Date,Hora_Inicio_Dia: Time,
    Hora_Almuerzo_Inicio_Dia: Time,Hora_Almuerzo_Fin_Dia:Time,Hora_Fin: Time, Movilidad_Dia: number){
    
        try{
            const post: Asistencia={id_Asistencia:id_Asistencia,Empleado_idEmpleado:Empleado_idEmpleado,Fecha_Asistencia:Fecha_Asistencia,Hora_Inicio_Dia:Hora_Inicio_Dia,
                Hora_Almuerzo_Inicio_Dia:Hora_Almuerzo_Inicio_Dia,Hora_Almuerzo_Fin_Dia:Hora_Almuerzo_Fin_Dia,Hora_Fin:Hora_Fin,Movilidad_Dia:Movilidad_Dia};
            this.http.post<{message:string}>(this.rutaport,post).subscribe
            ((responseData)=>{
                console.log(responseData.message);
                this.posts.push(post);
                this.postUpdated.next([...this.posts]);
        
                //direccionar a home de asistencia
                ///this.router.navigate(["/"]);
            });
        }
        catch(error)
    {
        console.log(error.name)

    }



       
 

}

deletePost(){
    console.log(this.postEdit.id_Asistencia);
    try{
        this.http.delete(this.rutaport+"/:"+this.postEdit.id_Asistencia).
    subscribe(()=>{
        console.log("Eliminado con Exito");
        const updatedPosts=this.posts.filter(post=> post.id_Asistencia!==this.postEdit.id_Asistencia);
        this.posts=updatedPosts;
        this.postUpdated.next([...this.posts]);
    });
    }
    catch(error)
    {
        console.log(error.name)

    }

    
}

updatePost(id_Asistencia:Number,Empleado_idEmpleado: PostThree,Fecha_Asistencia: Date,Hora_Inicio_Dia: Time,
    Hora_Almuerzo_Inicio_Dia: Time,Hora_Almuerzo_Fin_Dia:Time,Hora_Fin: Time, Movilidad_Dia: number){
    console.log(id_Asistencia,Empleado_idEmpleado,Fecha_Asistencia,Hora_Inicio_Dia,
        Hora_Almuerzo_Inicio_Dia,Hora_Almuerzo_Fin_Dia,Hora_Fin,Movilidad_Dia);
    
        try{
            const post: Asistencia={id_Asistencia:id_Asistencia,Empleado_idEmpleado:Empleado_idEmpleado,Fecha_Asistencia:Fecha_Asistencia,Hora_Inicio_Dia:Hora_Inicio_Dia,
                Hora_Almuerzo_Inicio_Dia:Hora_Almuerzo_Inicio_Dia,Hora_Almuerzo_Fin_Dia:Hora_Almuerzo_Fin_Dia,Hora_Fin:Hora_Fin,Movilidad_Dia:Movilidad_Dia};
            console.log("Servicio");
            console.log(post);
            this.http.put<{message:string}>(this.rutaport,post).subscribe
            (()=>{
                console.log("Editado con Exito");
                this.getPostsAsists();
        
                this.router.navigate(["/"]);
        
            });
        }
        catch(error)
    {
        console.log(error.name)

    }

     
}

 llenarEspacios(selecasis:Asistencia){
     
     this.postEdit=selecasis;
     console.log(this.postEdit);
 }

 elementoBusqueda(selecasis:Asistenciatwo){

    try{
        this.Asistenciatwo=selecasis;

    console.log("init two"+this.Asistenciatwo);
 

    
    this.postSearch=selecasis;
    console.log("init two"+this.Asistenciatwo);

    }
    catch(error)
    {
        console.log(error.name)

    }
 
    

 }

 iniciarElementos(){
    //const CedulaInit:Postwo={Cedula: "0"};
     this.postSearch=this.Asistenciatwo;
     console.log("iniciar : "+this.postSearch.Cedula);
 }

 getPost(id:string){
     return {...this.posts.find(p=> p.id_Asistencia=== parseInt(id))};
 }



 // PARA BUSQUEDAS POR EMPLEADO


 //Buscar un solo elemento de fechas atrasos
 getOneFechaatraso(){

    console.log("Servicio para uno");
    console.log(this.postSearch);
    
    try{

        this.http.get<{message: string, posts:AsistenciaThree[]}>(this.rutaport+'/oneFA/:'+this.postSearch.Cedula)
    .subscribe((postData)=>{
        this.poststhree=postData.posts;
        console.log("El encontrado: "+this.poststhree);
        this.postUpdatedthree.next([...this.poststhree]);

    });

    }
    catch(error)
    {
        console.log(error.name)

    }

    

      // return this.posts;
   }


   
 //Buscar un solo elemento total de atrasos
 getOneTotalatraso(){

    console.log("Servicio para uno");
    console.log(this.postSearch);
    
    try{

        this.http.get<{message: string, posts:AsistenciaFour[]}>(this.rutaport+'/oneTA/:'+this.postSearch.Cedula)
    .subscribe((postData)=>{
        this.postsfour=postData.posts;
        console.log("El encontrado: "+this.postsfour);
        this.postUpdatedfour.next([...this.postsfour]);

    });

    }
    catch(error)
    {
        console.log(error.name)

    }

    

      // return this.posts;
   }
 

   
 //Buscar un solo elemento fechas de faltas
 getOneFechafaltas(){

    console.log("Servicio para uno");
    console.log(this.postSearch);
    
    try{

        this.http.get<{message: string, posts:AsistenciaThree[]}>(this.rutaport+'/oneFF/:'+this.postSearch.Cedula)
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

    

      // return this.posts;
   }


   
 //Buscar un solo elemento total de faltas
 getOneTotalFaltas(){

    console.log("Servicio para uno");
    console.log(this.postSearch);
    
    try{

        this.http.get<{message: string, posts:AsistenciaFour[]}>(this.rutaport+'/oneTF/:'+this.postSearch.Cedula)
    .subscribe((postData)=>{
        this.postsfour=postData.posts;
        console.log("El encontrado: "+ this.postsfour);
        this.postUpdatedfour.next([...this.postsfour]);

    });

    }
    catch(error)
    {
        console.log(error.name)

    }

    

      // return this.posts;
   }


   
 //Buscar un solo elemento fechas de horas extra
 getOneFechaHE(){

    console.log("Servicio para uno");
    console.log(this.postSearch);
    
    try{

        this.http.get<{message: string,posts:AsistenciaFive[]}>(this.rutaport+'/oneFHE/:'+this.postSearch.Cedula)
    .subscribe((postData)=>{
        this.postsfive=postData.posts;
        console.log("El encontrado: "+this.postOne);
        this.postUpdatedfive.next([...this.postsfive]);
    });

    }
    catch(error)
    {
        console.log(error.name)

    }

    

      // return this.posts;
   }


   
 //Buscar un solo elemento total de horas extra
 getOneTotalHE(){

    console.log("Servicio para uno");
    console.log(this.postSearch);
    
    try{

        this.http.get<{message: string, posts:AsistenciaFour[]}>(this.rutaport+'/oneTHE/:'+this.postSearch.Cedula)
    .subscribe((postData)=>{
        this.postsfour=postData.posts;
        console.log("El encontrado: "+this.postOne);
        this.postUpdatedfour.next([...this.postsfour]);

    });

    }
    catch(error)
    {
        console.log(error.name)

    }

    

      // return this.posts;
   }



   
 //Buscar un solo elemento fechas de movilidad extra
 getOneTotalFME(){

    console.log("Servicio para uno");
    console.log(this.postSearch);
    
    try{

        this.http.get<{message: string,  posts:AsistenciaSeven[]}>(this.rutaport+'/oneFME/:'+this.postSearch.Cedula)
    .subscribe((postData)=>{
        this.postsseven=postData.posts;
        console.log("El encontrado: "+this.postsseven);
        this.postUpdatedseven.next([...this.postsseven]);

    });

    }
    catch(error)
    {
        console.log(error.name)

    }

    

      // return this.posts;
   }


   
 //Buscar un solo elemento total de movilidad extra
 getOneFME(){

    console.log("Servicio para uno");
    console.log(this.postSearch);
    
    try{

        this.http.get<{message: string, posts:AsistenciaSix[]}>(this.rutaport+'/oneTME/:'+this.postSearch.Cedula)
    .subscribe((postData)=>{
        this.postssix=postData.posts;
        console.log("El encontrado: "+this.postssix);
        this.postUpdatedsix.next([...this.postssix]);

    });

    }
    catch(error)
    {
        console.log(error.name)

    }

    

      // return this.posts;
   }



   
 //Buscar asistencias de un empleado
 getOneAsists(){

    console.log("Servicio para uno");
    console.log(this.postSearch);
    
    try{

        this.http.get<{message: string, posts:Asistencia[]}>(this.rutaport+'/oneAsists/:'+this.postSearch.Cedula)
    .subscribe((postData)=>{
        this.posts=postData.posts;
        console.log("El encontrado: "+this.posts);
        this.postUpdated.next([...this.posts]);

    });

    }
    catch(error)
    {
        console.log(error.name)

    }

    

      // return this.posts;
   }


   reloadComponent() {
    let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
    }






}





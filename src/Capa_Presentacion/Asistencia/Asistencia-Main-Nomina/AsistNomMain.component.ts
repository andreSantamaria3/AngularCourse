

import{Component, Input, OnInit} from "@angular/core";
import {NgForm} from "@angular/forms";
import {PostServiceAsist} from '../../../Capa_Negocio/Asistencia/post.service';
import {ActivatedRoute, ParamMap,Router} from "@angular/router";



@Component({
    selector:'app-AsistMainNomina',
    templateUrl:'./AsistNomMain.component.html',
    styleUrls:['./AsistNomMain.component.css']
})
export class AsisNomMainComponent implements OnInit {

    enteredTitle='';

    enteredContent='';
    NombreInp='';
    ApellidoInp='';
    CedulaInp='';
    DireccionInp='';
    TelefonoInp='';
    CorreoInp='';
    private mode='create';
    private postId:string;
   
     isLoading= false;
    CedulaInicio="3";
    CedulaBorrado="0";
   

constructor (public route:ActivatedRoute,public postsService: PostServiceAsist,public router:Router){};

ngOnInit(){

            this.mode='create';
            this.postId=null;
           

}

Asistencias(){
    this.postsService.PostMode=1;
    console.log("cambio de modo: "+this.postsService.PostMode);
    this.redirectTo("asistencia/asisoption/asislist");
    //routerLink="asislist"
}


Fechatraso(){

    this.postsService.PostMode=2;
    console.log("cambio de modo: "+this.postsService.PostMode);
    this.redirectTo("asistencia/asisoption/asislistfechas");
    //this.router.navigateByUrl("asistencia/asisoption/asislistfechas");
    //[routerLink]="['asislistfechas']"
}


Totatraso(){
 
    this.postsService.PostMode=3;
    console.log("cambio de modo: "+this.postsService.PostMode);
    this.redirectTo("asistencia/asisoption/asislisttotal");
    //routerLink="asislisttotal"
}


FechaFalta(){
    this.postsService.PostMode=4;
    console.log("cambio de modo: "+this.postsService.PostMode);
    this.redirectTo("asistencia/asisoption/asislistfechas");
    //routerLink="asislistfechas"
}


Totafalta(){
   
    this.postsService.PostMode=5;
    console.log("cambio de modo: "+this.postsService.PostMode);
    this.redirectTo("asistencia/asisoption/asislisttotal");
    //[routerLink]="['asislisttotal']"
}


Fechaextra(){
    this.postsService.PostMode=6;
    console.log("cambio de modo: "+this.postsService.PostMode);
    this.redirectTo("asistencia/asisoption/asislistfhe");
    //routerLink="asislistfhe
}

Totaextra(){
    this.postsService.PostMode=7;
    console.log("cambio de modo: "+this.postsService.PostMode);
    this.redirectTo("asistencia/asisoption/asislisttotal");
    //[routerLink]="['asislisttotal']"
}

Fechamovsup(){
    this.postsService.PostMode=8;
    console.log("cambio de modo: "+this.postsService.PostMode);
    this.redirectTo("asistencia/asisoption/asislistfme");
    //routerLink="asislistfme"
}

Totmovsup(){
    this.postsService.PostMode=9;
    console.log("cambio de modo: "+this.postsService.PostMode);
    this.redirectTo("asistencia/asisoption/asislisttme");
    //[routerLink]="['asislisttme']"
}

 

    
fillerNav = ['Busqueda de Empleado', 'Nómina', 'Ingreso de Empleado'];


redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
 }



}
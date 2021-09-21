

import{Component, Input, OnInit} from "@angular/core";
import {NgForm} from "@angular/forms";
import {Permiso,Permisotwo,PermisoThree,PermisoFour,PermisoFive,PermisoSix} from '../../../Capa_Negocio/Permiso/post.model';
import {PostServicePerm} from '../../../Capa_Negocio/Permiso/post.service';
import {ActivatedRoute, ParamMap,Router} from "@angular/router";



@Component({
    selector:'app-permisoSelecMain',
    templateUrl:'./permisoSelecMain.component.html',
    styleUrls:['./permisoSelecMain.component.css']
})
export class PermisoSelecMainComponent implements OnInit {

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
   

constructor (public route:ActivatedRoute,public router:Router){};

ngOnInit(){

            this.mode='create';
            this.postId=null;
           

}



 

RevisarEstado(){
    this.redirectTo("permisos/permaprobarmain/revisaestadopermiso");
    // routerLink="revisaestadopermiso"
}

 

    
fillerNav = ['Busqueda de Empleado', 'Nómina', 'Ingreso de Empleado'];


redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
 }





}
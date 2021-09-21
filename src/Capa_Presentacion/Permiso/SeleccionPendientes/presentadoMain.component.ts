

import{Component, Input, OnInit} from "@angular/core";
import {NgForm} from "@angular/forms";
import {Permiso,Permisotwo,PermisoThree,PermisoFour,PermisoFive,PermisoSix} from '../../../Capa_Negocio/Permiso/post.model';
import {PostServicePerm} from '../../../Capa_Negocio/Permiso/post.service';
import {ActivatedRoute, ParamMap,Router} from "@angular/router";



@Component({
    selector:'app-ppresentadoMain',
    templateUrl:'./presentadoMain.component.html',
    styleUrls:['./presentadoMain.component.css']
})
export class PermisoPresenMainComponent implements OnInit {

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
   

constructor (public postService: PostServicePerm,public route:ActivatedRoute,public router:Router){};

ngOnInit(){

            this.mode='create';
            this.postId=null;
           

}



 

//cambiar estado para permisos presentados
onPresentados(){

    this.postService.SeleccionPermiso=1;
    console.log("cambio de modo: "+this.postService.SeleccionPermiso);
    this.redirectTo("permisos/permrevisarmain/seleccionrevisar/revisapermiso");
    // routerLink="revisapermiso"
}

//cambiar estado para permisos aceptados
onAceptados(){
    this.postService.SeleccionPermiso=2;
    console.log("cambio de modo: "+this.postService.SeleccionPermiso);
    this.redirectTo("permisos/permrevisarmain/seleccionrevisar/revisapermiso");    
    // [routerLink]="['revisapermiso']"
}

//cambiar estado para permisos negados
onNegados(){
    this.postService.SeleccionPermiso=3;
    console.log("cambio de modo: "+this.postService.SeleccionPermiso);
    this.redirectTo("permisos/permrevisarmain/seleccionrevisar/revisapermiso");
    //[routerLink]="['revisapermiso']"
}




redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
 }



    
fillerNav = ['Busqueda de Empleado', 'Nómina', 'Ingreso de Empleado'];






}
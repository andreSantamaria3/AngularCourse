

import{Component, Input, OnInit,OnDestroy} from "@angular/core";
import {NgForm} from "@angular/forms";
import {Permiso,Permisotwo,PermisoThree,PermisoFour,PermisoFive,PermisoSix} from '../../../Capa_Negocio/Permiso/post.model';
import {PostServicePerm} from '../../../Capa_Negocio/Permiso/post.service';
import {ActivatedRoute, ParamMap,Router} from "@angular/router";
import {PostService} from '../../../Capa_Negocio/Usuario/post.service';
import { Observable,Subscription } from 'rxjs';


@Component({
    selector:'app-permisoEstadoMain',
    templateUrl:'./permisoEstadoMain.component.html',
    styleUrls:['./permisoEstadoMain.component.css']
})
export class PermisoEstadoMainComponent implements OnInit, OnDestroy {

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
   
    private empleListenerSubs:Subscription;
    UsuarioEmpleAdmin=false;

constructor (public route:ActivatedRoute,public router:Router,public UserService:PostService,public postsService: PostServicePerm){};

ngOnInit(){

            this.mode='create';
            this.postId=null;
            this.empleListenerSubs=this.UserService.getEmpleadoListener().subscribe(isAuthenticated=>{

                this.UsuarioEmpleAdmin=isAuthenticated;
    
            });




}

ngOnDestroy(){
    this.empleListenerSubs.unsubscribe();
}

SeleccionRevisar(){

    this.postsService.SeleccionCedula= false;
    this.redirectTo("permisos/permrevisarmain/seleccionrevisar");
    //[routerLink]="['seleccionrevisar']"
}
 



 

    
fillerNav = ['Busqueda de Empleado', 'Nómina', 'Ingreso de Empleado'];

redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
 }




}
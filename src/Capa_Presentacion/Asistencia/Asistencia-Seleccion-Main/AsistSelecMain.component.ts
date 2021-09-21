

import{Component, Input, OnInit,OnDestroy} from "@angular/core";
import {NgForm} from "@angular/forms";
import {PostServiceAsist} from '../../../Capa_Negocio/Asistencia/post.service';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {PostService} from '../../../Capa_Negocio/Usuario/post.service';
import { Observable,Subscription } from 'rxjs';



@Component({
    selector:'app-AsistSelectMain',
    templateUrl:'./AsistSelecMain.component.html',
    styleUrls:['./AsistSelecMain.component.css']
})
export class AsisSelectMainComponent implements OnInit, OnDestroy {

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

constructor (public route:ActivatedRoute,public postsService: PostServiceAsist,public UserService:PostService){};

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

Nomina(){
    this.postsService.allmode=true;
}


Empleado(){
    this.postsService.allmode=false;
}


 

    
fillerNav = ['Busqueda de Empleado', 'Nómina', 'Ingreso de Empleado'];






}
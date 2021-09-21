

import{Component, Input, OnInit} from "@angular/core";
import {NgForm} from "@angular/forms";
import {Permiso,Permisotwo,PermisoThree,PermisoFour,PermisoFive,PermisoSix} from '../../../Capa_Negocio/Permiso/post.model';
import {PostServicePerm} from '../../../Capa_Negocio/Permiso/post.service';
import {ActivatedRoute, ParamMap} from "@angular/router";

import { Subscription } from "rxjs";
import {PostService as UserService} from '../../../Capa_Negocio/Usuario/post.service';
import { Observable } from 'rxjs';



@Component({
    selector:'app-permisoMain',
    templateUrl:'./permisoMain.component.html',
    styleUrls:['./permisoMain.component.css']
})
export class PermisoMainComponent implements OnInit {

    
    private mode='create';
    private postId:string;

    private empleListenerSubs:Subscription;
     UsuarioEmpleAdmin=false;
     
   

constructor (public UserService:UserService,public route:ActivatedRoute){};

ngOnInit(){

            this.mode='create';
            this.postId=null;
           
              //listener de gerente
       this.empleListenerSubs=this.UserService.getEmpleadoListener().subscribe(isAuthenticated=>{

        this.UsuarioEmpleAdmin=isAuthenticated;

    });

}



 



 

    
fillerNav = ['Solicitar Permiso', 'Estado de Permiso', 'Revisar Permiso'];






}
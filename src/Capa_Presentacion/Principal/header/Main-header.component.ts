import {NgForm,FormControl, Validators} from "@angular/forms";
import {OnDestroy, OnInit} from "@angular/core";
import { Observable,Subscription } from 'rxjs';
import {Component} from '@angular/core';
import {PostServiceContrato} from '../../../Capa_Negocio/Contrato/post.service';
import {PostServiceDisp} from '../../../Capa_Negocio/Dispositivo/post.service';
import { PostService as EmpleadoServicio } from "../../../Capa_Negocio/Empleado/post.service";

import {ActivatedRoute, ParamMap,Router} from "@angular/router";
import {PostService} from '../../../Capa_Negocio/Usuario/post.service';

@Component({
    selector:'main-app-header',
    templateUrl:'./Main-header.component.html',
    styleUrls:['./Main-header.component.css']
})


export class MainHeaderComponent implements OnInit, OnDestroy{
    private authListenerSubs:Subscription;

    



    UsuarioGerente=false;

    //isLoggedIn$: Observable<boolean>;
  
    constructor (public UserService:PostService,public router:Router,public route:ActivatedRoute,public ContratoService:PostServiceContrato,public empleadoService: EmpleadoServicio,public dispoService: PostServiceDisp){
     
    };
    
    //<mat-toolbar color="primary"  *ngIf="isLoggedIn$ | async as isLoggedIn">
    ngOnInit(){

        this.authListenerSubs=this.UserService.getGerenteListener().subscribe(isAuthenticated=>{

            this.UsuarioGerente=isAuthenticated;

        });

        




        console.log("token de contrato: "+ this.ContratoService.Token);
        console.log("token de dispo: "+ this.dispoService.Token);
        console.log("token de empleado: "+ this.empleadoService.Token);
       

        //this.isLoggedIn$ = this.UserService.isLoggedIn;

    }


    ngOnDestroy(){
        this.authListenerSubs.unsubscribe();
    }

    goHome(){

        console.log("HOME");
        if(this.ContratoService.Token==true&& this.dispoService.Token==true&& this.empleadoService.Token==true){

           
            this.router.navigateByUrl("/");

        }

    }

    goEmpleados(){
        console.log("Empleado");
        console.log("token de contrato: "+ this.ContratoService.Token);
        console.log("token de dispo: "+ this.dispoService.Token);
        console.log("token de empleado: "+ this.empleadoService.Token);
        console.log(this.ContratoService.Token==true&& this.dispoService.Token==true&& this.empleadoService.Token==true);
        if(this.ContratoService.Token==true&& this.dispoService.Token==true&& this.empleadoService.Token==true){

            console.log("rutear Empleado");
            this.router.navigateByUrl("empleado");

        }
    }

    goPermisos(){
        console.log("PERMISOS");
        console.log("token de contrato: "+ this.ContratoService.Token);
        console.log("token de dispo: "+ this.dispoService.Token);
        console.log("token de empleado: "+ this.empleadoService.Token);
        console.log(this.ContratoService.Token==true&& this.dispoService.Token==true&& this.empleadoService.Token==true);
        if(this.ContratoService.Token==true&& this.dispoService.Token==true&& this.empleadoService.Token==true){

           
            this.router.navigateByUrl("permisos");

        }
    }

    goMovilidad(){
        console.log("MOVILIDAD");
        console.log("token de contrato: "+ this.ContratoService.Token);
        console.log("token de dispo: "+ this.dispoService.Token);
        console.log("token de empleado: "+ this.empleadoService.Token);
        console.log(this.ContratoService.Token==true&& this.dispoService.Token==true&& this.empleadoService.Token==true);
        if(this.ContratoService.Token==true&& this.dispoService.Token==true&& this.empleadoService.Token==true){

           
            this.router.navigateByUrl("/movilidadmain");

        }
    }

    goReportes(){
        console.log("ASISTENCIA");
        console.log("token de contrato: "+ this.ContratoService.Token);
        console.log("token de dispo: "+ this.dispoService.Token);
        console.log("token de empleado: "+ this.empleadoService.Token);
        console.log(this.ContratoService.Token==true&& this.dispoService.Token==true&& this.empleadoService.Token==true);
        if(this.ContratoService.Token==true&& this.dispoService.Token==true&& this.empleadoService.Token==true){

           
            this.router.navigateByUrl("asistencia");

        }
    }


    goUsuario(){
        console.log("USUARIO");
        console.log("token de contrato: "+ this.ContratoService.Token);
        console.log("token de dispo: "+ this.dispoService.Token);
        console.log("token de empleado: "+ this.empleadoService.Token);
        if(this.ContratoService.Token==true&& this.dispoService.Token==true&& this.empleadoService.Token==true){

          
            this.router.navigateByUrl("creausuario");

        }
    }


    onLogout() {
        console.log("LOGOUT");
        this.UserService.logfalse();
        this.UserService.falseGerenteListener();
        this.UserService.falseEmpleListener();

        this.router.navigateByUrl("/login");
      }


}


import {transporter} from '../../Capa_Datos/mailer'
//import {transporter} from '../../Capa_Datos/app.js'
import {Router} from "@angular/router";
import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {CorreoCrear,CorreoAprobar,CorreoPedir} from './correo.model'; 
import { Message } from 'node_modules/@angular/compiler/src/i18n/i18n_ast';

import { environment } from "../environments/environment";



@Injectable({providedIn: 'root'})
export class MailService{

    rute= environment.apiUrl ;
    rutaport=this.rute+"/correo";

    constructor(private http: HttpClient, private router:Router){
    
    }


    
    CorreoCrearUsuario(NombreUser:string, PassUser:string){
        let valor:CorreoCrear={
            NombreUser:NombreUser,PassUser:PassUser
        }

        this.http.post(this.rutaport+"/correocrear",valor).subscribe((responseData)=>{
            console.log(responseData);


        })
    }


       
    CorreoPedirUsuario(CorreoGerente:string, NombreUser:string,ApellidoUser:string,
        TipoPermiso:string,FechaPermiso:string){
        let valor:CorreoPedir={
            CorreoGerente:CorreoGerente ,NombreUser:NombreUser,ApellidoUser:ApellidoUser,
            TipoPermiso:TipoPermiso,FechaPermiso:FechaPermiso
        }

        this.http.post(this.rutaport+"/correopedir",valor).subscribe((responseData)=>{
            console.log(responseData);


        })
    }


       
    CorreoAprobarUsuario(CorreoEmpleado:string, TipoPermiso:string,FechaPermiso:string,Verificado:string){
        let valor:CorreoAprobar={
            CorreoEmpleado:CorreoEmpleado,TipoPermiso:TipoPermiso,FechaPermiso:FechaPermiso,Verificado:Verificado
        }

        this.http.post(this.rutaport+"/correoaprob",valor).subscribe((responseData)=>{
            console.log(responseData);


        })
    }





//    // async CorreoCrearUsuario(NombreUser:String, PassUser:String){
//         console.log("Correo Crear Usuario");

//         await transporter.sendMail({
//             from: '"Notificacion" <asistencia12usuarios@gmail.com>', // sender address
//             to: NombreUser, // list of receivers
//             subject: "Notificacion de Usuario creado", // Subject line
//             text: ("Sus credenciales para la aplicacion son: Username: "+NombreUser+" Password: "+PassUser), // plain text body
           
//           });


//     }

// //correo para pedir permiso
// async  CorreoPedirPermiso(CorreoGerente:String,NombreUser:String,ApellidoUser:String, TipoPermiso:String, FechaPermiso:String){

//     console.log("Correo Pedir permiso");
//         await transporter.sendMail({
//             from: '"Notificacion" <asistencia12usuarios@gmail.com>', // sender address
//             to: CorreoGerente, // list of receivers
//             subject: "Notificacion de Permiso Pedido", // Subject line
//             text: ("Los datos del permiso pedido son: Empleado: "+NombreUser+"  "+
//             ApellidoUser+" pide un permiso de: "+TipoPermiso+" para la fecha: "+ FechaPermiso), // plain text body
           
//           });


//     }

//     //correo para aprobar/negar permiso
//     async   CorreoverificarPermiso(CorreoEmpleado:String, TipoPermiso:String, FechaPermiso:String,Verificado:String){

//         console.log("Correo aprobar/negar permiso");
//         await transporter.sendMail({
//             from: '"Notificacion" <asistencia12usuarios@gmail.com>', // sender address
//             to: CorreoEmpleado, // list of receivers
//             subject: "Notificacion de Permiso ", // Subject line
//             text: ("Estimad@.  Su permiso de: "+TipoPermiso+" para la fecha: "+ FechaPermiso+
//             " ha sido:  "+Verificado), // plain text body
           
//           });


//     }








}

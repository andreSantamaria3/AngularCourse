import{Component, Input, OnInit} from "@angular/core";

import { Subscription } from "rxjs";
import {PostServiceContrato} from '../../Capa_Negocio/Contrato/post.service';
import {PostServiceDisp} from '../../Capa_Negocio/Dispositivo/post.service';
import { PostService } from "../../Capa_Negocio/Empleado/post.service";
import {Router,NavigationStart} from "@angular/router";


import {NgForm} from "@angular/forms";

import {ActivatedRoute, ParamMap} from "@angular/router";

export interface Tile {
  imageName: string;
    color: string;
    cols: number;
    rows: number;
    text: string;
    link: string;
  }
@Component({
    selector:'app-home',
    
    templateUrl:'./home.component.html',
    styleUrls:['./home.component.css']
})
export class HomeComponent implements OnInit {

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
   

    // tiles: Tile[] = [
    //     {text: 'Gestion de Empleados', cols: 3, rows: 1, color: 'lightgray'},
    //     {text: 'Gestion de Horarios', cols: 1, rows: 2, color: 'lightgray'},
    //     {text: 'Gestion de Permisos', cols: 1, rows: 1, color: 'lightgray'},
    //     {text: 'Reportes', cols: 2, rows: 1, color: 'lightgray'},
    //   ];

    tiles: Tile[] = [
      {imageName:"../assets/Img/edimem1.jpg", text: 'Gestion de Empleados', cols: 3, rows: 1, color: 'lightgray',link:"empleado"},
      {imageName:"../assets/Img/edimho1.jpg",text: 'Gestion de Horarios y Permisos', cols: 1, rows: 2, color: 'lightgray',link:"permisos"},
      {imageName:"../assets/Img/edimmo1.jpg",text: 'Gestion de Movilidad', cols: 1, rows: 1, color: 'lightgray',link:"movilidadmain"},
      {imageName:"../assets/Img/edimrep1.jpg",text: 'Reportes', cols: 2, rows: 1, color: 'lightgray',link:"asistencia"},
    ];


    showHead: boolean = false;

constructor (public route:ActivatedRoute,public router:Router,public ContratoService:PostServiceContrato,public empleadoService: PostService,public dispoService: PostServiceDisp){
  this.ContratoService.Token=true;
  this.dispoService.Token=true; 
  this.empleadoService.Token=true;

  //


  router.events.forEach((event) => {
    if (event instanceof NavigationStart) {
      if (event['url'] == '/login') {// /login
        this.showHead = false;
      } else {
        // console.log("NU")
        this.showHead = true;
      }
    }
  });







};

ngOnInit(){

  

  console.log("token contrato es: "+this.ContratoService.Token);
  console.log("token dispositivo es: "+this.dispoService.Token);
  console.log("token empleado es: "+ this.empleadoService.Token);

            this.mode='create';
            this.postId=null;
           

}



getImage(imageName: string) {
  console.log(imageName );
  
  
}







    
fillerNav = ['Busqueda de Empleado', 'Nómina', 'Ingreso de Empleado'];






}
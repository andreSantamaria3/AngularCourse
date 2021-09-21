import {NgForm} from "@angular/forms";
import {PostServiceAsist} from '../../../Capa_Negocio/Asistencia/post.service';
import { PostService } from "../../../Capa_Negocio/Empleado/post.service";
import { Post,Postwo,PostThree } from "../../../Capa_Negocio/Empleado/post.model";
import {Component,OnInit} from "@angular/core"
import {Asistencia} from '../../../Capa_Negocio/Asistencia/post.model';
import {Asistenciatwo} from '../../../Capa_Negocio/Asistencia/post.model';
import Swal from 'sweetalert2';
import { Subscription } from "rxjs";

import {ActivatedRoute, ParamMap,Router} from "@angular/router";
import { format } from "mysql2";

@Component({
    selector:'app-asist-search',
    templateUrl:'./post-asistsearch.component.html',
    styleUrls:['./post-asistsearch.component.css']
})
export class PostAsistSearchComponent implements OnInit {

    enteredTitle='';

    private PostsSub: Subscription;
    enteredContent='';
    NombreInp='';
    ApellidoInp='';
    CedulaInp='';
    DireccionInp='';
    TelefonoInp='';
    CorreoInp='';
    private mode='create';
    private postId:string;
     //post:Post;
     isLoading= false;
    CedulaInicio="3";
    CedulaBorrado="0";


    
    PasarCedu:Postwo={Cedula: "0"};
    EmpleadoPasar:PostThree;
    posts :PostThree[]=[

    ];

//    CedulaInitwo:Postwo={Cedula: "0"};

constructor (public router:Router,public postService: PostServiceAsist,public route:ActivatedRoute,public postServiceE: PostService){

    
    this.postServiceE.getPosts();

  this.empleadoSuscribir();

};

ngOnInit(){

            this.mode='create';
            this.postId=null;
            this.postService.postSearch.Cedula=this.CedulaInicio;
            console.log(this.postService.postSearch.Cedula);

}



    onSearchPost(form: NgForm){


        if(form.invalid){
            return;
            //form.resetForm();
            
        } 
        else {


            this.postService.allmode=false;

        const CedulaInit:Asistenciatwo={Cedula: form.value.Cedula};

        console.log("La cedula es: "+CedulaInit.Cedula);

        this.ResultadoBusqueda(CedulaInit);

        //this.postService.elementoBusqueda(CedulaInit);

        console.log(this.postService.postSearch);
        
       // form.resetForm();
    }

    }



    onCancel(){
        this.postService.postSearch.Cedula=this.CedulaBorrado;
        console.log("buscado borrado= "+this.postService.postSearch.Cedula);
        
      }
  

 

    
fillerNav = ['Busqueda de Empleado', 'Nómina', 'Ingreso de Empleado'];



empleadoSuscribir(){
      
    return new Promise((resolve,reject)=>{

      console.log("a suscribir ");
      var CedulaBus;
      this.PostsSub= this.postServiceE.getPostUpdateListener().subscribe
      ((posts:PostThree[])=>{
          this.posts=posts;
          this.isLoading=false;
          
          console.log("length is: ",posts.length);
         
          
           
              // console.log("encontrado: "+posts[0].id_Empleado+" "+posts[0].Nombre_Empleado);
              // this.EmpleadoPasar=posts[0];
              // this.CedulaParaPasar.Cedula=posts[0].Cedula;
              //  CedulaBus=posts[0].Cedula;
            
          
      });
      console.log("despues de suscribir: "+this.EmpleadoPasar.Cedula);
      resolve(this.posts.length);
    });
  }



  ResultadoBusqueda(CedulaInit:Asistenciatwo){


      // this.postService.elementoBusqueda(CedulaInit);

     
      


        console.log("se debe buscar");
        
        this.EmpleadoPasar=this.posts.find(p=> p.Cedula=== CedulaInit.Cedula);

       

        if(this.EmpleadoPasar!=undefined){

          console.log("empleado Encontrado: "+this.EmpleadoPasar.Nombre_Empleado+" "+this.EmpleadoPasar.Apellido_Empleado);

          console.log("Cedula de empleado es: "+this.EmpleadoPasar.Cedula );

          this.PasarCedu.Cedula=this.EmpleadoPasar.Cedula

          //this.postService.elementoBusqueda(CedulaInit);
          this.postServiceE.postSearch=this.PasarCedu;
          this.postService.elementoBusqueda(CedulaInit);

          console.log("cedula pasada: "+this.postServiceE.postSearch.Cedula);
          //[routerLink]="['/asistencia/asisoption']"
          this.router.navigateByUrl('/asistencia/asisoption');

    
      
        }
        else{
          console.log("NO SE ENCUENTRA EMPLEADO");
          console.log("router a crearpermisos");

          Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: 'No se tiene registros!'
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
  
              this.router.navigateByUrl("/asistencia");
              this.onCancel();
            
              //Swal.fire('Saved!', '', 'success')
            }
          })
        }
      
      
      
      
      
      
       

       
    }









}
import {Component,OnInit} from "@angular/core";
import {NgForm} from "@angular/forms";
import {PostService} from '../../../Capa_Negocio/Usuario/post.service';
import {User,Usertwo} from '../../../Capa_Negocio/Usuario/post.model';
import {ActivatedRoute,Router, ParamMap} from "@angular/router";
import { format } from "mysql2";
import Swal from 'sweetalert2';
import { Subscription } from "rxjs";


import { ViewEncapsulation } from '@angular/core';

@Component({
    selector:'app-user-create',
    templateUrl:'./user-create.component.html',
    styleUrls:['./user-create.component.css'],
    encapsulation: ViewEncapsulation.None
})


export class UserCreateComponent implements OnInit {

    isLoading= false;
    private PostsSub: Subscription;
    posts :User[]=[    ];

    postsMostrar :User[]=[    ];

    UserPasar:User;


    constructor (public router:Router,public postService: PostService, public route:ActivatedRoute){
       
      
      };





      ngOnInit(){}


      onSavePost(form: NgForm){

        if(form.invalid){
            console.log("Invalid");
              return;
              //form.resetForm();
              
          } 
          else {

            let UserInit:User={id_Usuario:1000,
                Empleado_idEmpleado:form.value.Cedula,
                User_Name: form.value.User_Name,
                Password:form.value.Password};     
                
                this.postService.addPost(UserInit.id_Usuario,UserInit.Empleado_idEmpleado
                    ,UserInit.User_Name,UserInit.Password);
                    
                    
                

        }

          
      }



      onSearchPost(form: NgForm){

        if(form.invalid){
            console.log("Invalid");
              return;
              //form.resetForm();
              
          } 
          else {    

            let UserInit:Usertwo={User_Name: form.value.User_Name,Password:form.value.Password};
            // this.postEmpleado.elementoBusqueda(CedulaInit);
     
     
            console.log("USer para ver es: "+UserInit.User_Name);

            this.ResultadoBusqueda(UserInit);

            this.BusquedaReal();

            this.suscribirReal();


          }

      }


    



      ResultadoBusqueda(CedulaInit:Usertwo){

          console.log("se debe buscar");
          
          this.UserPasar=this.posts.find(p=>( p.User_Name=== CedulaInit.User_Name && p.Password=== CedulaInit.Password));
  
          
  
          if(this.UserPasar!=undefined){
            console.log("usuario Encontrado: "+this.UserPasar.User_Name+" "+this.UserPasar.id_Usuario);
  
  
            console.log("id de empleado es: "+this.UserPasar.Empleado_idEmpleado );
  
            this.postService.postSearch=this.UserPasar;
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
    
                this.onCancel();
                this.router.navigateByUrl("empleado");
                //Swal.fire('Saved!', '', 'success')
              }
            }) 
          }  
      }




      onCancel(){
          
              //console.log("router a main");
            //this.router.navigateByUrl("/");

      }




      
    usuarioSuscribir(){
        return new Promise((resolve,reject)=>{
          console.log("a suscribir ");
          this.PostsSub= this.postService.getPostUpdateListener().subscribe
          ((posts:User[])=>{
              this.posts=posts;
              this.isLoading=false;
              console.log("length is: ",posts.length); 
          });
          resolve(this.posts.length);
        });
      }

      
      buscarSuscribir(){
        return new Promise((resolve,reject)=>{
          console.log("a suscribir ");
          this.PostsSub= this.postService.getPostUpdateListener().subscribe
          ((posts:User[])=>{
              this.postsMostrar=posts;
              this.isLoading=false;
              console.log("length is: ",posts.length); 
          });
          resolve(this.postsMostrar.length);
        });
      }


      BusquedaReal(){
        this.postService.getOnePost();
      }

      async suscribirReal(){

        let longitud= await this.buscarSuscribir();
        if(longitud!=0){
            console.log("Exito");

            console.log("router a main");
            this.router.navigateByUrl("/home");


        }
        else{

            console.log("Error");
              console.log("router a main");
            this.router.navigateByUrl("/");

        }

      }






}
import {Component,OnInit} from "@angular/core";
import {NgForm} from "@angular/forms";
import {PostService} from '../../Capa_Negocio/Usuario/post.service';
import {User,Usertwo} from '../../Capa_Negocio/Usuario/post.model';
import {ActivatedRoute,Router, ParamMap,NavigationStart} from "@angular/router";
import { format } from "mysql2";
import Swal from 'sweetalert2';
import { Subscription } from "rxjs";
import { isFlowPredicate } from "node_modules/@babel/types/lib/index-legacy";

import {PostServiceContrato} from '../../Capa_Negocio/Contrato/post.service';
import {PostServiceDisp} from '../../Capa_Negocio/Dispositivo/post.service';
import { PostService as EmpleadoServicio } from "../../Capa_Negocio/Empleado/post.service";
import { CANCELLED } from "dns";




@Component({
    templateUrl:'./login.component.html',
    styleUrls:['./login.component.css'],
    
})

export class LoginComponent implements OnInit{

    isLoading= false;
    private PostsSub: Subscription;
    posts :User[]=[    ];

    postsMostrar :User[]=[    ];

    UserPasar:User;
    UserLog:User;
    showHead: boolean = false;


    constructor (public router:Router,public postService: PostService, public route:ActivatedRoute,public ContratoService:PostServiceContrato,public empleadoService: EmpleadoServicio,public dispoService: PostServiceDisp){
        console.log("llenar Usuarios");
        this.postService.getPosts();
      
        this.usuarioSuscribir();

       this.ContratoService.Token=true;
       this.dispoService.Token=true; 
       this.empleadoService.Token=true;



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
      
      ngOnInit(){}


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

      CrearGerente(){
        let verValor:User;

        verValor=this.posts.find(p=>( p.User_Name=== "cnolan3321@gmail.com" && p.Empleado_idEmpleado ===67));

        if(verValor==undefined){

          console.log("no hay, se crea");
          this.postService.Crear(33,"cnolan3321@gmail.com","batman123");

        }
       else{
         console.log("Hay gerente: "+verValor.User_Name);
       }

        
      }




  async onLog(form: NgForm){
        if(form.invalid){
          console.log("Invalid");
            return;

            //form.resetForm();
            
        } 
        else {  
         this.CrearGerente();
          console.log("se creo bien");
          let UserInit:Usertwo={User_Name: form.value.User_Name,Password:form.value.Password};

          console.log("creado: "+UserInit.User_Name);

          if(await this.postService.login(UserInit.User_Name,UserInit.Password)=="ERROR")
            {
              
          Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: 'Datos Incorrectos!'
          }).then((result) => {
            
            if (result.isConfirmed) {
  
              this.onCancel(form);
              
              
            }
          })



            }
        
            else{
              console.log("INGRESO OK");
              //ver tipo de empleado
              if(await this.ContratoService.Ger(this.postService.TipoUser)!="ERROR")
              {


                let BoolTipoEmpleado=this.revisarTipo(this.ContratoService.TipoEmpleado);
                console.log("Es de tipo superior: "+BoolTipoEmpleado);

                if(BoolTipoEmpleado==true){
                  console.log("No es solo un empleado");
                  this.postService.trueEmpleListener();
                  console.log("se logea? ");
                  console.log(this.postService.getGerenteListener());
                  this.postService.trueGerenteListener();
                  console.log("gerente? ");
                  console.log(this.postService.getEmpleadoListener());

                }
                else{
                  console.log("Es solo un empleado");
                 
                  
                  this.postService.trueGerenteListener();
                  this.postService.getGerenteListener();
                  console.log("se logea? ");
                  console.log(this.postService.getGerenteListener());

                }



                this.router.navigateByUrl("/");



              }
              else{
                this.onCancel(form);
              }




             


            }

        }

      }

      revisarTipo(Cargo:string){
        if(Cargo=="Gerente"|| Cargo=="RRHH"||Cargo=="Admin"){
          this.postService.trueEmpleListener();

          return true;
        }else{
          this.postService.falseGerenteListener();
          return false;
        }

      }


      ResultadoBusqueda(CedulaInit:Usertwo){

          console.log("se debe buscar");
          
          this.UserPasar=this.posts.find(p=>( p.User_Name=== CedulaInit.User_Name && p.Password=== CedulaInit.Password));
  
          
  
          if(this.UserPasar!=undefined){
            console.log("usuario Encontrado: "+this.UserPasar.User_Name+" "+this.UserPasar.id_Usuario);
  
  
            console.log("id de empleado es: "+this.UserPasar.Empleado_idEmpleado );
  
            this.postService.postSearch=this.UserPasar;
            
            //console.log("router a main");
            //this.router.navigateByUrl("/");
  
      
        
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
    
                
                this.router.navigateByUrl("empleado");
                //Swal.fire('Saved!', '', 'success')
              }
            }) 
          }  
      }




      onCancel(form: NgForm){
          
        form.resetForm();
              //console.log("router a main");
            this.router.navigateByUrl("/login");

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
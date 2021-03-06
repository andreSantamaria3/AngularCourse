import {NgForm} from "@angular/forms";
import {Component,OnInit} from "@angular/core"
import { PostThree, Postwo } from "../../../../Capa_Negocio/Empleado/post.model";
import {PermisoCed} from '../../../../Capa_Negocio/Permiso/post.model';
import {Asistenciatwo} from '../../../../Capa_Negocio/Asistencia/post.model';
import {Dispositivo,Dispositivotwo,Dispositivothree,Dispositivofour} from '../../../../Capa_Negocio/Dispositivo/post.model';
import {PostServiceDisp} from '../../../../Capa_Negocio/Dispositivo/post.service';
import {ActivatedRoute,Router, ParamMap} from "@angular/router";
import { format } from "mysql2";
import Swal from 'sweetalert2';
import { Subscription } from "rxjs";
import { Post } from "../../../../Capa_Negocio/Empleado/post.model";
import { PostService } from "../../../../Capa_Negocio/Empleado/post.service";
@Component({
    selector:'app-perm-search',
    templateUrl:'./post-permsearch.component.html',
    styleUrls:['./post-permsearch.component.css']
})
export class PostPermisoSearchComponent implements OnInit {


    private PostsSub: Subscription;

    posts :PostThree[]=[

    ];
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
     //post:Post;
     isLoading= false;
    CedulaInicio="3";
    CedulaBorrado="0";
    CedulaParaPasar:PermisoCed={Cedula: "0"};
    EmpleadoPasar:PostThree;
    CedulaInitwo:Postwo={Cedula: "0"};

constructor (public router:Router,public postService: PostService, public postDispoServ: PostServiceDisp, public route:ActivatedRoute){
  console.log("llenar empleados");
  this.postService.getPosts();

  this.empleadoSuscribir();

};

ngOnInit(){

            this.mode='create';
            this.postId=null;
          //  this.postService.postSearch.Cedula=this.CedulaInicio;
           // console.log(this.postService.postSearch.Cedula);

            //llenar datos de empleados
            this.isLoading=true;
            console.log("llenar empleados");
            this.postService.getPosts();

            this.empleadoSuscribir();
            

}



   async onSearchPost(form: NgForm){


        if(form.invalid){
          console.log("Invalid");
            return;
            //form.resetForm();
            
        } 
        else {           

        //let CedulaInit:PermisoCed={Cedula: form.value.Cedula};
        let CedulaInit:Dispositivofour={Cedula: form.value.Cedula};
       // this.postEmpleado.elementoBusqueda(CedulaInit);


       console.log("La cedula es: "+CedulaInit.Cedula);
       this.ResultadoBusqueda(CedulaInit);


        console.log("Objeto: "+this.postService.postSearch);
        
       // form.resetForm();
       }

    }


     ResultadoBusqueda(CedulaInit:Dispositivofour){

        console.log("se debe buscar");
        
        this.EmpleadoPasar=this.posts.find(p=> p.Cedula=== CedulaInit.Cedula);

        console.log("empleado Encontrado: "+this.EmpleadoPasar.Nombre_Empleado+" "+this.EmpleadoPasar.Apellido_Empleado);


        if(this.EmpleadoPasar!=undefined){

          console.log("Cedula de empleado es: "+this.EmpleadoPasar.Cedula );

          this.postDispoServ.postPasarEmple=this.EmpleadoPasar;
          console.log("router a ver Dispositivo");

          //ruta a list Dispositivo
          this.router.navigateByUrl("/permisos/creapermiso");

    
      
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
    

    


    empleadoSuscribir(){
      
      return new Promise((resolve,reject)=>{

        console.log("a suscribir ");
        var CedulaBus;
        this.PostsSub= this.postService.getPostUpdateListener().subscribe
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




    onCancel(){
        this.postService.postSearch.Cedula=this.CedulaBorrado;
        console.log("buscado borrado= "+this.postService.postSearch.Cedula);
        
      }
  

 

    
fillerNav = ['Busqueda de Permiso', 'N??mina', 'Ingreso de Empleado'];






}
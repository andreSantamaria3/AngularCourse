import {NgForm} from "@angular/forms";
import {PostServiceAsist} from '../../../Capa_Negocio/Asistencia/post.service';
import {Component,OnInit} from "@angular/core"
import {PermisoCed} from '../../../Capa_Negocio/Permiso/post.model';
import {Asistenciatwo} from '../../../Capa_Negocio/Asistencia/post.model';
import {Permiso,Permisotwo,PermisoThree,PermisoFour,PermisoFive,PermisoSix} from '../../../Capa_Negocio/Permiso/post.model';
import {PostServicePerm} from '../../../Capa_Negocio/Permiso/post.service';
import {ActivatedRoute, ParamMap,Router} from "@angular/router";
import { Post,Postwo } from "../../../Capa_Negocio/Empleado/post.model";
import { PostService } from "../../../Capa_Negocio/Empleado/post.service";
import { format } from "mysql2";
import Swal from 'sweetalert2';
import { PostThree} from "../../../Capa_Negocio/Empleado/post.model";
import { Subscription } from "rxjs";

@Component({
    selector:'app-perm-search',
    templateUrl:'./post-permsearch.component.html',
    styleUrls:['./post-permsearch.component.css']
})
export class PostPermisoRevComponent implements OnInit {

    enteredTitle='';

    private PostsSub: Subscription;
    posts :PostThree[]=[

    ];
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
    EmpleadoPasar:PostThree;
   CedulaInitwo:Postwo={Cedula: "0"};

constructor (public router:Router,public permisoService: PostServicePerm,public postService: PostService,public route:ActivatedRoute){

    console.log("llenar empleados");
    this.postService.getPosts();
  
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


        let CedulaInit:Postwo={Cedula: form.value.Cedula};
        this.permisoService.elementoBusqueda(CedulaInit);

        this.permisoService.SeleccionCedula=true;


        this.buscarEmpleado( CedulaInit);
        console.log(this.permisoService.postSearch);
        
       // form.resetForm();
    }

    }



    onCancel(){
        this.postService.postSearch.Cedula=this.CedulaBorrado;
        console.log("buscado borrado= "+this.postService.postSearch.Cedula);
        
      }
  

 

    
fillerNav = ['Busqueda de Empleado', 'Nómina', 'Ingreso de Empleado'];


buscarEmpleado( CedulaInit:Postwo){

    
    console.log("se debe buscar");
        
    this.EmpleadoPasar=this.posts.find(p=> p.Cedula=== CedulaInit.Cedula);

   

    if(this.EmpleadoPasar!=undefined){

      console.log("empleado Encontrado: "+this.EmpleadoPasar.Nombre_Empleado+" "+this.EmpleadoPasar.Apellido_Empleado);

      console.log("Cedula de empleado es: "+this.EmpleadoPasar.Cedula );

      this.postService.postPasar=this.EmpleadoPasar;
    //  console.log("router a crearpermisos");
     // this.router.navigateByUrl("/permisos/creapermiso");


  
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

          
          this.router.navigateByUrl("permisos");
          this.onCancel();
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




}
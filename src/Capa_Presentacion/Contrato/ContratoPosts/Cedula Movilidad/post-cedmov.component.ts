import {NgForm} from "@angular/forms";
import {Component,OnInit} from "@angular/core"
import { Contrato,Contratotwo,Contratothree,Contratofive,Contratosix,ContratoSeven } from "../../../../Capa_Negocio/Contrato/post.model";
import {PostThree} from "../../../../Capa_Negocio/Empleado/post.model";
import {PostService} from "../../../../Capa_Negocio/Empleado/post.service"; 
import { PostServiceContrato } from "../../../../Capa_Negocio/Contrato/post.service";
import {ActivatedRoute,Router, ParamMap} from "@angular/router";
import { format } from "mysql2";
import Swal from 'sweetalert2';
import { Subscription } from "rxjs";

@Component({
    selector:'app-cedmov-search',
    templateUrl:'./post-cedmov.component.html',
    styleUrls:['./post-cedmov.component.css']
})
export class PostCedulaMovilidadComponent implements OnInit {


    private PostsSub: Subscription;

    posts :PostThree[]=[];
    
    EmpleadoPasar:PostThree;

    CedulaInp='';
    
    private mode='create';
    private postId:string;
     //post:Post;
     isLoading= false;
    CedulaInicio="3";
    CedulaBorrado="0";
    CedulaParaPasar:ContratoSeven={Cedula: "0"};
    ContratoPasar:Contratothree;
    CedulaInitwo:ContratoSeven={Cedula: "0"};

constructor (public router:Router,public postService: PostServiceContrato, public postServiceEmpleado:PostService ,public route:ActivatedRoute){
  console.log("llenar empleados");
  this.postServiceEmpleado.getPosts();

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
          //  this.postServiceEmpleado.getPosts();

         //   this.empleadoSuscribir();
            

}



   async onSearchPost(form: NgForm){


        if(form.invalid){
          console.log("Invalid");
            return;
            //form.resetForm();
            
        } 
        else {           

        //let CedulaInit:PermisoCed={Cedula: form.value.Cedula};
        let CedulaInit:ContratoSeven={Cedula: form.value.Cedula};
       // this.postEmpleado.elementoBusqueda(CedulaInit);


       console.log("La cedula es: "+CedulaInit.Cedula);
       this.ResultadoBusqueda(CedulaInit);


        console.log("Objeto: "+this.postService.postSearch);
        
       // form.resetForm();
    }

  }


     ResultadoBusqueda(CedulaInit:ContratoSeven){


        console.log("se debe buscar");
        
        this.EmpleadoPasar=this.posts.find(p=> p.Cedula=== CedulaInit.Cedula);

      

        if(this.EmpleadoPasar!=undefined){

          console.log("empleado Encontrado: "+this.EmpleadoPasar.Nombre_Empleado+" "+this.EmpleadoPasar.Apellido_Empleado);

          console.log("Cedula de empleado es: "+this.EmpleadoPasar.Cedula );

          this.postService.postSearch.Empleado_idEmpleado=this.EmpleadoPasar;
          console.log("router a movilidadList");
          //ruta movilidad
          this.router.navigateByUrl("movilidadmain/listamovilidad");

    
      
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
              this.router.navigateByUrl("movilidadmain");
              //Swal.fire('Saved!', '', 'success')
            }
          })

        }
       
    }
    

    


    empleadoSuscribir(){
      
      return new Promise((resolve,reject)=>{

        console.log("a suscribir ");
        var CedulaBus;
        this.PostsSub= this.postServiceEmpleado.getPostUpdateListener().subscribe
        ((posts:PostThree[])=>{
            this.posts=posts;
            this.isLoading=false;
            
            console.log("length is: ",posts.length);
           
            
             
                // console.log("encontrado: "+posts[0].id_Empleado+" "+posts[0].Nombre_Empleado);
                // this.EmpleadoPasar=posts[0];
                // this.CedulaParaPasar.Cedula=posts[0].Cedula;
                //  CedulaBus=posts[0].Cedula;
              
            
        });
        //console.log("despues de suscribir: "+this.EmpleadoPasar.Cedula);
        resolve(this.posts.length);
      });
    }




    onCancel(){
        this.postService.postSearch.Empleado_idEmpleado.Cedula=this.CedulaBorrado;
        console.log("buscado borrado= "+this.postService.postSearch.Empleado_idEmpleado.Cedula);
        
      }
  

 

    
fillerNav = ['Busqueda de Permiso', 'Nómina', 'Ingreso de Empleado'];






}
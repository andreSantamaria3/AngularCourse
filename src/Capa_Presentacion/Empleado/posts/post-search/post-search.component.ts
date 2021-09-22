import {NgForm} from "@angular/forms";
import { PostService } from "../../../../Capa_Negocio/Empleado/post.service";
import {Component,OnInit} from "@angular/core"
import { Post,Postwo,PostThree } from "../../../../Capa_Negocio/Empleado/post.model";
import {ActivatedRoute, ParamMap,Router} from "@angular/router";
import { format } from "mysql2";
import { Subscription } from "rxjs";
import Swal from 'sweetalert2';

@Component({
    selector:'app-post-search',
    templateUrl:'./post-search.component.html',
    styleUrls:['./post-search.component.css']
})
export class PostSearchComponent implements OnInit {

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
     post:Post;
     isLoading= false;
    CedulaInicio="3";
    CedulaBorrado="0";
    CedulaInitwo:Postwo={Cedula: "0"};

    PasarCedu:Postwo={Cedula: "0"};
    EmpleadoPasar:PostThree;
    posts :PostThree[]=[

    ];

constructor (public router:Router,public postService: PostService,public route:ActivatedRoute){

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



        const CedulaInit:Postwo={Cedula: form.value.Cedula};

        console.log("La cedula es: "+CedulaInit.Cedula);

        this.ResultadoBusqueda(CedulaInit);

        //this.postService.elementoBusqueda(CedulaInit);

        //console.log(this.postService.postSearch);
        
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



    ResultadoBusqueda(CedulaInit:Postwo){


        // this.postService.elementoBusqueda(CedulaInit);
  
       
        
  
  
          console.log("se debe buscar");
          
          this.EmpleadoPasar=this.posts.find(p=> p.Cedula=== CedulaInit.Cedula);
  
         
  
          if(this.EmpleadoPasar!=undefined){
  
            console.log("empleado Encontrado: "+this.EmpleadoPasar.Nombre_Empleado+" "+this.EmpleadoPasar.Apellido_Empleado);
  
            console.log("Cedula de empleado es: "+this.EmpleadoPasar.Cedula );
  
            this.PasarCedu.Cedula=this.EmpleadoPasar.Cedula

            this.postService.postSearch=this.PasarCedu;
            this.postService.elementoBusqueda(CedulaInit);

            console.log("cedula pasada: "+this.postService.postSearch.Cedula);
            //[routerLink]="['/empleado/list']"
            this.router.navigateByUrl('/empleado/list');
  
      
        
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
    
                this.router.navigateByUrl("/empleado");
                this.onCancel();
              
                //Swal.fire('Saved!', '', 'success')
              }
            })
          }
        
        
        
        
        
        
         
  
         
      }






}
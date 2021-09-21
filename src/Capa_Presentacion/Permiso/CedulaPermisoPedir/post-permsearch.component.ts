import {NgForm} from "@angular/forms";
import {PostServiceAsist} from '../../../Capa_Negocio/Asistencia/post.service';
import {Component,OnInit} from "@angular/core"
import {PermisoCed} from '../../../Capa_Negocio/Permiso/post.model';
import {Asistenciatwo} from '../../../Capa_Negocio/Asistencia/post.model';
import {Permiso,Permisotwo,PermisoThree,PermisoFour,PermisoFive,PermisoSix} from '../../../Capa_Negocio/Permiso/post.model';
import {PostServicePerm} from '../../../Capa_Negocio/Permiso/post.service';
import {ActivatedRoute, ParamMap} from "@angular/router";
import { Post,Postwo } from "../../../Capa_Negocio/Empleado/post.model";
import { PostService } from "../../../Capa_Negocio/Empleado/post.service";
import { format } from "mysql2";

@Component({
    selector:'app-perm-search',
    templateUrl:'./post-permsearch.component.html',
    styleUrls:['./post-permsearch.component.css']
})
export class PostPermisoAskComponent implements OnInit {

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
    CedulaInitwo:Postwo={Cedula: "0"};

constructor (public permisoService: PostServicePerm,public postService: PostService,public route:ActivatedRoute){};

ngOnInit(){

            this.mode='create';
            this.postId=null;
         //   this.postService.postSearch.Cedula=this.CedulaInicio;
           // console.log(this.postService.postSearch.Cedula);

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

        console.log(this.permisoService.postSearch);
        

       // form.resetForm();
    }

    }



    onCancel(){
        
        this.permisoService.SeleccionCedula=false;
      }
  

 

    
fillerNav = ['Busqueda de Empleado', 'Nómina', 'Ingreso de Empleado'];






}
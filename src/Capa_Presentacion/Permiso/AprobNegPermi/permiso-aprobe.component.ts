import {NgForm,FormControl, Validators} from "@angular/forms";
import {Component,OnInit} from "@angular/core";
import {PostServiceDisp} from '../../../Capa_Negocio/Dispositivo/post.service';
import { Dispositivo,Dispositivotwo } from "../../../Capa_Negocio/Dispositivo/post.model";
import { PostThree, Postwo } from "../../../Capa_Negocio/Empleado/post.model";
import { PostService } from "../../../Capa_Negocio/Empleado/post.service";
import {PostServiceContrato} from '../../../Capa_Negocio/Contrato/post.service';
import { Contrato, Contratotwo } from "../../../Capa_Negocio/Contrato/post.model";
import {Permiso,Permisotwo,PermisoThree,PermisoFour,PermisoFive,PermisoSix} from '../../../Capa_Negocio/Permiso/post.model';
import {PostServicePerm} from '../../../Capa_Negocio/Permiso/post.service';
import {ActivatedRoute, ParamMap,Router} from "@angular/router";
import { Subscription } from "rxjs";
import { format } from "mysql2";
import Swal from 'sweetalert2';
import { ViewEncapsulation } from '@angular/core';

import {MailService} from '../../../Capa_Negocio/correo.service';
import {PostService as UserService} from '../../../Capa_Negocio/Usuario/post.service';
import {User,Userthree,Usertwo} from '../../../Capa_Negocio/Usuario/post.model';



interface Opcion {
    value: string;

  }


@Component({
    selector:'app-permiso-aprobe',
    templateUrl:'./permiso-aprobe.component.html',
    styleUrls:['./permiso-aprobe.component.css'],
    encapsulation: ViewEncapsulation.None
})

export class PermisoAprobeComponent implements OnInit {

 

  private PostsSub: Subscription;

    enteredContent='';
    CedulaInitwo:Postwo={Cedula: "0"};
    EmpleadoCreadoEncontrado:PostThree;
    FechaInp='';
    //ContratoInp;
    ContratId:Dispositivo;
    DispositivoInp;
    EmpleadoInp;
    CedulaInp='';

    NombreInp='';
    ApellidoInp='';
    TipoInp='';



    private mode='create';
    DispBorrado=0;
    private postId:string;
    post:Permiso;
    postThree:PermisoThree;
     isLoading= false;
     CedulaInit:Dispositivotwo={Id_Dispositivo:0,
        Empleado_idEmpleado:null};

        // empleado que se va a pasar
        postEmpleado:PostThree;

        //empleado que encontramos
        postEncontrado:PostThree;

     //dept
     private ContratSub: Subscription;
     private empleadoSub:Subscription;
     private TiposSub: Subscription;

     UserTipes:User[]=[];


    Dispos: Dispositivo[] = [];

    OneDispo: Dispositivo[] = [];
     selectedValue: string;

     DispoActivo: string;
     activo: string[] = ['Aceptado', 'Negado'];



    
    opciones: Opcion[] = [
        {value:"Aceptado"},
        {value: "Negado"}
      ];
    

      posts :PermisoThree[]=[

    ];

    postsPermiso :Permiso[]=[

    ];


    nomina :PostThree[]=[

    ];


    
constructor (public UserService:UserService,public MailService:MailService ,public route:ActivatedRoute,public PostServicePerm:PostServicePerm,public empleadoService: PostService,public contratoService:PostServiceContrato,public router:Router){
  
  this.PostServicePerm.getPostsPerm();
  this.ListaPermisos();
  
};
//this.postsService.PermisosPasar




llenarTipos(){
  this.UserService.getPosts();

  this.TiposSub=this.UserService.getPostUpdateListener().subscribe
  ((posts:User[])=>{
    this.UserTipes=posts;
    this.isLoading=false;
    
    
   console.log("length de depts is: ",posts.length);


    this.UserService.postCorreo=posts;
    console.log("length del service is: ",posts.length);
   // this.OneDept=this.Depts;


});
}


CorreosGerentesRespuesta(tipoPermiso:string,fechaPermiso:string,Verificacion:string){
  console.log("longitud de gerentes: "+this.UserTipes.length);

  console.log("para el empleado: "+this.empleadoService.postCorreo.Correo);

  let CorreoEmple=this.empleadoService.postCorreo.Correo;
      console.log("se envia a: "+this.empleadoService.postCorreo.Correo);
      this.MailService.CorreoAprobarUsuario(CorreoEmple,
        tipoPermiso,fechaPermiso,Verificacion);

    


  

}







async ngOnInit(){

  let valor= await this.llenarValores();
  console.log("valor obtenido "+valor);

  
  if(valor=="completado"){

    // this.ListaPermisos();
  this.route.paramMap.subscribe((paraMap:ParamMap)=>{
    if(paraMap.has('id_Permiso')){

        this.mode='edit';
        this.postId=paraMap.get('id_Permiso');
        console.log("id pasado: "+this.postId);

        this.isLoading=true;

        console.log("tamaño de posts: "+ this.postsPermiso.length);
     

        
       
        this.isLoading=false;


        this.postThree=this.BuscarPermiso(this.postId);

        console.log("Encontrado");
        console.log(this.postThree);
        //this.getOneDept(this.post);



        //llenar valores desde el sevicio

            var elementoEdit=this.post;

       // console.log("Elemento encontrado: "+elementoEdit.id_Permiso+' '+elementoEdit.Empleado_idEmpleado.Cedula+' '+elementoEdit.Empleado_idEmpleado.Apellido_Empleado);
      
    

           // this.CedulaInp=elementoEdit.Empleado_idEmpleado.Cedula;

            this.NombreInp=this.postThree.Nombre_Empleado;
            this.ApellidoInp=this.postThree.Apellido_Empleado;
            this.TipoInp= this.postThree.Tipo;
           
            this.FechaInp=this.MostrarFecha( this.postThree.Fecha);
             
    
        



    } else{
       console.log("ERROR: no se ingresa id de permiso");
 


    }

});


  }
  else{

    console.log("ERROR");
  }




 


}



MostrarFecha(fecha:Date){
  const date1 = new Date(fecha);
// Sun Dec 17 1995 03:24:00 GMT...

var dd = String(date1.getDate()).padStart(2, '0');
var mm = String(date1.getMonth() + 1).padStart(2, '0'); //Ja
let year= date1.getFullYear();

let today = year + '/' + mm + '/' +dd ;


console.log(date1 );
// expected output: false;

console.log(year);
console.log(mm);
console.log(dd);
console.log(today);


return today;
}


ListaPermisos(){



  this.PostsSub= this.PostServicePerm.getPostUpdateListener().subscribe
        ((posts:Permiso[])=>{
           
            this.isLoading=false;

            console.log("length para aprobar is: ",posts.length);
            if(posts.length==0){

              Swal.fire({
                icon: 'error',
                title: 'ERROR',
                text: 'No se tiene empleados con dicha cedula!'
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
      
                  this.onCancel();
                  //Swal.fire('Saved!', '', 'success')
                }
              })


            }
            this.postsPermiso=posts;
            console.log("length de llegado is: ",this.postsPermiso.length);
            
        });




}

//this.postsService.PermisosPasar
//buscar en permisos no en permiso resumen
BuscarPermiso(id:string){
  
  return {...this.PostServicePerm.PermisosPasar.find(p=> p.id_Permiso=== parseInt(id))};
  //return {...this.postsPermiso.find(p=> p.id_Permiso=== parseInt(id))};

}

BuscarPermisotwo(id:string){
  return {...this.postsPermiso.find(p=> p.id_Permiso=== parseInt(id))};
}



  async  onSavePost(form: NgForm, Aprobar:string){




        if(form.invalid){
            return;
        } 

        //encontrar permiso
        this.post=this.BuscarPermisotwo(this.postId);
        console.log("permiso encontrado: "+this.post.Descripcion);


        console.log("aprobado? "+Aprobar );

             //Editar Permiso
             console.log("Valores Edit");

             this.PostServicePerm.postToEdit=this.post;
             
            //  this.PostServicePerm.postToEdit.Empleado_idEmpleado= this.post.Empleado_idEmpleado;
            //  this.PostServicePerm.postToEdit.Tipo=this.post.Tipo;
            //  this.PostServicePerm.postToEdit.Descripcion=this.post.Descripcion;
            //  this.PostServicePerm.postToEdit.Fecha=this.post.Fecha;
            //  this.PostServicePerm.postToEdit.tiempo=this.post.tiempo;
            //  //para el Estado de permiso se debe poner el de la seleccion
              this.PostServicePerm.postToEdit.Estado_Permiso=Aprobar;
             // this.PostServicePerm.postToEdit.Fecha=this.FechaInp;





                  //cambios guardados

                  
                    this.PostServicePerm.updatePost(
                      this.PostServicePerm.postToEdit.id_Permiso,
                      this.PostServicePerm.postToEdit.Empleado_idEmpleado,
                      this.PostServicePerm.postToEdit.Tipo, 
                      this.PostServicePerm.postToEdit.Descripcion,
                      this.PostServicePerm.postToEdit.Estado_Permiso,
                      this.PostServicePerm.postToEdit.Fecha,
                      this.PostServicePerm.postToEdit.tiempo
                     );



                        //correo para todos los usuarios gerente y RRHH

                        this.CorreosGerentesRespuesta(this.PostServicePerm.postToEdit.Tipo,String(this.PostServicePerm.postToEdit.Fecha),this.PostServicePerm.postToEdit.Estado_Permiso);



                     Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Editado',
                        showConfirmButton: false,
                        timer: 1500
                      })




                      //[routerLink]="['/permisos']"
           
                      console.log("router a crearpermisos");
                      this.router.navigateByUrl("/permisos");




        

        // acaba la edicion

        form.resetForm();
    }





    llenarValores(){

      return new Promise((resolve,reject)=>{


     
        this.ListaPermisos();

        resolve("completado");

      });


    }



    

    


    
    onCancel(){
       // this.PostServiceDisp.postSearch.Id_Dispositivo=this.DispBorrado;
        console.log("saliedno ");
        
      }










      editarEmpleado(){


        try{

             //editar el empleado al final
             this.empleadoService.updatePost(
              this.empleadoService.postToEdit.id_Empleado,
              this.empleadoService.postToEdit.Departamento_idDepartamento,
              this.empleadoService.postToEdit.Nombre_Empleado, 
              this.empleadoService.postToEdit.Apellido_Empleado,
              this.empleadoService.postToEdit.Cedula,    
          
              this.empleadoService.postToEdit.Direccion,
              this.empleadoService.postToEdit.Telefono,
               this.empleadoService.postToEdit.Correo
           );

        }
        catch(error)
        {
            console.log(error.name)
      
        }

          
      }



    
        





    
fillerNav = ['Busqueda de Empleado', 'Nómina', 'Ingreso de Empleado'];






}
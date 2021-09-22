import {NgForm,FormControl, Validators} from "@angular/forms";
import {Component,OnInit} from "@angular/core";
import {PostServiceDisp} from '../../../../Capa_Negocio/Dispositivo/post.service';
import { Dispositivo,Dispositivothree,Dispositivotwo } from "../../../../Capa_Negocio/Dispositivo/post.model";
import { PostThree, Postwo } from "../../../../Capa_Negocio/Empleado/post.model";
import { PostService } from "../../../../Capa_Negocio/Empleado/post.service";
import {PostServiceContrato} from '../../../../Capa_Negocio/Contrato/post.service';
import { Contrato, Contratotwo } from "../../../../Capa_Negocio/Contrato/post.model";
import {ActivatedRoute, ParamMap,Router} from "@angular/router";
import { Subscription } from "rxjs";
import { format } from "mysql2";
import Swal from 'sweetalert2';
import { ViewEncapsulation } from '@angular/core';
interface Opcion {
    value: string;

  }


@Component({
    selector:'dispo-post-create',
    templateUrl:'./dispo-create.component.html',
    styleUrls:['./dispo-create.component.css'],
    encapsulation: ViewEncapsulation.None
})

export class DispoCreateComponent implements OnInit {

 

    enteredContent='';
    CedulaInitwo:Postwo={Cedula: "0"};
    EmpleadoCreadoEncontrado:PostThree;
    FechaInp=new Date();
    //ContratoInp;
    ContratId:Dispositivo;
    DispositivoInp;
    CedulaInp='';
    MacInp='';
    IpInp='10.10.10.10';
    SoInp='';
    ActivInp='';
    private mode='create';
    DispBorrado=0;
    private postId:string;
    post:Dispositivo;
     isLoading= false;
     CedulaInit:Dispositivotwo={Id_Dispositivo:0,
        Empleado_idEmpleado:null};

        // empleado que se va a pasar
        postEmpleado:PostThree;

        //empleado que encontramos
        postEncontrado:PostThree;

        PostEditar:Dispositivothree;
     //dept
     private ContratSub: Subscription;
     private empleadoSub:Subscription;
    Dispos: Dispositivo[] = [];

    OneDispo: Dispositivo[] = [];
     selectedValue: string;

     DispoActivo: string;
    activo: string[] = ['Si', 'No'];



    
    opciones: Opcion[] = [
        {value:"SI"},
        {value: "NO"}
      ];
    

      posts :PostThree[]=[

    ];


    nomina :PostThree[]=[

    ];


    
constructor (public route:ActivatedRoute,public PostServiceDisp:PostServiceDisp,public router:Router,public empleadoService: PostService,public contratoService:PostServiceContrato){
    
  
};




ngOnInit(){


  this.route.paramMap.subscribe((paraMap:ParamMap)=>{

    if(paraMap.has('Id_Dispositivo')){

        this.postId=paraMap.get('Id_Dispositivo');
        this.isLoading=true;

        this.PostEditar=this.PostServiceDisp.getPostDis(this.postId);
        this.isLoading=false;

        console.log("Encontrado");
        console.log(this.PostEditar);


    }
    else{

        console.log("Error al Enviar");


    }
});


this.LlenarValoresFijos(this.PostEditar);

this.MacInp=this.PostEditar.Mac_Add;
this.CedulaInp=this.PostServiceDisp.postPasarEmple.Cedula;


}



LlenarValoresFijos(Encontrado:Dispositivothree){


    this.CedulaInp=this.PostServiceDisp.postSearch.Empleado_idEmpleado.Cedula;
    this.MacInp=Encontrado.Mac_Add;


}




//this.EmpleadoPasar
  async  onSavePost(form: NgForm){

        if(form.invalid){
            return;
        } 

        else {


                      //Editar Empleado
                      console.log("Valores Edit");
                      console.log( "id "+
                         this.PostEditar.Id_Dispositivo+ " Nombre "+
                         this.PostEditar.Nombre_Empleado+ " Apellido "+
                         this.PostEditar.Apellido_Empleado+ " Mac "+
                         this.PostEditar.Mac_Add+ " IP "+
                         this.PostEditar.IPdis+ " Cambio "+
                         form.value.Mac_Add
                          );
                             
                             //   //cambios guardados
         
                             //ESTA MAL EL EDITAR
                           
                            //  this.PostServiceDisp.updatePostEmple( this.PostEditar.Id_Dispositivo,
                            //   this.PostServiceDisp.postPasarEmple, form.value.Mac_Add,
                            //   this.PostEditar.IPdis
                            //  );
         
         
         
         
                             //  Swal.fire({
                             //     position: 'top-end',
                             //     icon: 'success',
                             //     title: 'Editado',
                             //     showConfirmButton: false,
                             //     timer: 1500
                             //   })
         
         
                             // regresar
                               this.router.navigateByUrl("/dispositivo");
         
         



                    Swal.fire({
                       position: 'top-end',
                       icon: 'success',
                       title: 'Editado',
                       showConfirmButton: false,
                       timer: 1500
                     })




          


        }
           


        form.resetForm();
    }

    onDelete(){

        //sweet alert

        Swal.fire({
            title: 'Esta seguro que desea Eliminar?',
            text: "No se puede regresar despues de este paso!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, deliminar!'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )

              
                 this.PostServiceDisp.deletePost();

            }
          })







    }

    onShow(form: NgForm){

        console.log("valores: "+ form.value.Mac_Add, 
        form.value.Ipdis,
        form.value.Nombre_SO,
        form.value.Activo
   );

    }



    onEdit(form: NgForm, Dept : Dispositivo){
    console.log("Valores Edit");

    try{

      console.log(this.PostServiceDisp.postEdit.Id_Dispositivo,
        //id empleado
        this.PostServiceDisp.postToEdit.Empleado_idEmpleado,
                form.value.Mac_Add, 
                form.value.Ipdis,
                form.value.Nombre_SO,
                form.value.Activo
               );

        const postforEdit: Dispositivo={Id_Dispositivo: this.PostServiceDisp.postToEdit.Id_Dispositivo ,Empleado_idEmpleado: this.PostServiceDisp.postToEdit.Empleado_idEmpleado,
            Mac_Add: form.value.Mac_Add,IPdis:form.value.Ipdis,Nombre_SO:form.value.Nombre_SO,Activo:form.value.Activo}
      
        this.PostServiceDisp.postToEdit= postforEdit;


        console.log("Valores a Editar");
        console.log(this.PostServiceDisp.postToEdit);


      





      this.PostServiceDisp.updatePost(
        this.PostServiceDisp.postToEdit.Id_Dispositivo,
        this.PostServiceDisp.postToEdit.Empleado_idEmpleado,
        this.PostServiceDisp.postToEdit.Mac_Add, 
        this.PostServiceDisp.postToEdit.IPdis,
        this.PostServiceDisp.postToEdit.Nombre_SO,
        this.PostServiceDisp.postToEdit.Activo
          );
      form.resetForm();
        


    }
    catch(error)
    {
        console.log(error.name)
  
    }
   


 
    }








    
    onCancel(){
        this.PostServiceDisp.postSearch.Id_Dispositivo=this.DispBorrado;
        console.log("buscado borrado= "+this.PostServiceDisp.postSearch.Id_Dispositivo);
        
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


      GuardarContrato(){
          console.log("Guardando contrato para: "+this.postEncontrado.id_Empleado);
              //codigo de guardar
              
              try{

                this.contratoService.addPost(
                  1000,
                  //Se necesita crear funcion para buscar al empleado ingresado con la cedula ingresada y ese id se guarda
                  this.postEncontrado,// no este id
                  this.contratoService.ContratoPasar.Fecha_Inicio, 
                  this.contratoService.ContratoPasar.Salario,
                  this.contratoService.ContratoPasar.Cargo,
                  this.contratoService.ContratoPasar.Movilidad,
                  this.contratoService.ContratoPasar.Hora_Inicio_Contrato,
                  this.contratoService.ContratoPasar.Hora_Almuerzo_Inicio_Contrato,
                  this.contratoService.ContratoPasar.Hora_Almuerzo_Final_Contrato,
                  this.contratoService.ContratoPasar.Hora_Fin_Contrato
                  );

              }
              catch(error)
        {
            console.log(error.name)
      
        }

              
          
      }


      editarContrato(){

        try{
          this.contratoService.updatePost(
            this.contratoService.postToEdit.Id_Contrato,
            this.postEncontrado,
            this.contratoService.postToEdit.Fecha_Inicio, 
            this.contratoService.postToEdit.Salario,
            this.contratoService.postToEdit.Cargo,
            this.contratoService.postToEdit.Movilidad,
            this.contratoService.postToEdit.Hora_Inicio_Contrato,
            this.contratoService.postToEdit.Hora_Almuerzo_Inicio_Contrato,
            this.contratoService.postToEdit.Hora_Almuerzo_Final_Contrato,    
            this.contratoService.postToEdit.Hora_Fin_Contrato
         );

        }
        catch(error)
        {
            console.log(error.name)
      
        }

        

       
      }


    
        





    
fillerNav = ['Busqueda de Empleado', 'Nómina', 'Ingreso de Empleado'];






}
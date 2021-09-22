import {NgForm,FormControl, Validators} from "@angular/forms";
import {Component,OnInit} from "@angular/core";
import {PostServiceContrato} from '../../../../Capa_Negocio/Contrato/post.service';
import { Contrato, Contratotwo,Contratothree,Contratofive,Contratosix,ContratoSeven } from "../../../../Capa_Negocio/Contrato/post.model";
import { PostThree, Postwo } from "../../../../Capa_Negocio/Empleado/post.model";
import { PostService } from "../../../../Capa_Negocio/Empleado/post.service";
import {PostServiceDisp} from '../../../../Capa_Negocio/Dispositivo/post.service';
import { Dispositivo,Dispositivotwo } from "../../../../Capa_Negocio/Dispositivo/post.model";
import {ActivatedRoute, ParamMap,Router} from "@angular/router";
import { Subscription } from "rxjs";
import { format } from "mysql2";
import Swal from 'sweetalert2';
import { ViewEncapsulation } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";

@Component({
    selector:'Movilidad-edit-post',
    templateUrl:'./Movilidad-edit.component.html',
    styleUrls:['./Movilidad-edit.component.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [DatePipe]
})
export class MovilidadEditComponent implements OnInit {

    enteredTitle='';

    enteredContent='';
    FechaInp;
    //Fecha max
    Fechamax;
    //ContratoInp;
    ContratId:Contrato;
    ContratoInp;
    EmpleadoInp;
    //inicio salario
    SalarioInp;
    CargoInp='';
    //inicio movilidad
    MovilidadInp;
    NombreInp="";
    ApellidoInp="";
    CedulaInp="";
    HoraFinInp="17:30";
    private mode='create';
    CedulaBorrado=0;
    private postId:string;
    postEmpleado:PostThree;
    post:Contrato;
    postEditar:Contratothree;
     isLoading= false;
     CedulaInit:Contratotwo={Id_Contrato:0,
        Empleado_idEmpleado:null};

        startDate = new Date(1990, 0, 1);
        myDate = new Date();

        HoraInicheck;
        HoraAlmIcheck;
        HoraAlmFcheck;
        HoraFincheck;
    




     //dept
     private ContratSub: Subscription;
    Contrats: Contrato[] = [];
    Contratwo: Contrato[] = [];

    OneContrat: Contrato[] = [];
     selectedValue: string;
    
constructor (public route:ActivatedRoute,public router:Router,public ContratoService:PostServiceContrato,private datePipe: DatePipe,public empleadoService: PostService,public dispoService: PostServiceDisp){
    
   

};


 ngOnInit(){


    this.route.paramMap.subscribe((paraMap:ParamMap)=>{

        if(paraMap.has('Id_Contrato')){

            this.postId=paraMap.get('Id_Contrato');
            this.isLoading=true;

            this.postEditar=this.ContratoService.getPostMov(this.postId);
            this.isLoading=false;

            console.log("Encontrado");
            console.log(this.postEditar);


        }
        else{

            console.log("Error al Enviar");


        }
    });


    this.LlenarValoresFijos(this.postEditar);



}







 



LlenarValoresFijos(Encontrado:Contratothree){
    this.NombreInp=Encontrado.Nombre_Empleado;
    this.ApellidoInp=Encontrado.Apellido_Empleado;
    this.CedulaInp=this.ContratoService.postSearch.Empleado_idEmpleado.Cedula;
    this.MovilidadInp=Encontrado.MovilidadDia;

}



async onSavePost(form: NgForm){

        if(form.invalid){
            return;
        } 


        



        //this.ContratoService.postToEdit =this.ContratoService.ContratosSearch.find(p=> p.Nombre_Departamento=== Dept);

        this.isLoading=true;
        

             //Editar Empleado
             console.log("Valores Edit");
             console.log( "id "+
                this.postEditar.Id_Contrato+ " Nombre "+
                this.postEditar.Nombre_Empleado+ " Apellido "+
                this.postEditar.Apellido_Empleado+ " Movilidad "+
                form.value.Movilidad
                 );
         


                 const postforEdit: Contratothree={Id_Contrato: this.postEditar.Id_Contrato ,Nombre_Empleado: this.postEditar.Nombre_Empleado,
                    Apellido_Empleado: this.postEditar.Apellido_Empleado,MovilidadDia:form.value.Movilidad}
               
                 this.ContratoService.MovilidadEdit= postforEdit;
         
         
                 console.log("Valores a Editar");
                 console.log(this.ContratoService.MovilidadEdit);
                 


                    
                    //   //cambios guardados

                  
                    this.ContratoService.updateMov( this.ContratoService.postSearch.Empleado_idEmpleado);




                    //  Swal.fire({
                    //     position: 'top-end',
                    //     icon: 'success',
                    //     title: 'Editado',
                    //     showConfirmButton: false,
                    //     timer: 1500
                    //   })


                    // regresar
                      this.router.navigateByUrl("/movilidadmain");

             



        

        form.resetForm();
    }


    reloadComponent(form:NgForm) {
        let currentUrl = "/movilidadmain/editmovilidad";
            this.router.routeReuseStrategy.shouldReuseRoute = () => false;
            this.router.onSameUrlNavigation = 'reload';
            this.router.navigate([currentUrl]);

            //this.ngOnInit();
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

              
                 this.ContratoService.deletePost();

            }
          })







    }

    onEdit(form: NgForm, Dept : Contrato){
    console.log("Valores Edit");
    console.log(this.ContratoService.postEdit.Id_Contrato,
        
        form.value.Nombre_Empleado, 
        form.value.Apellido_Empleado,
        form.value.Cedula,
        form.value.Telefono,
        form.value.Direccion,
        form.value.Correo_Empleado);

        const postforEdit: Contrato={Id_Contrato: this.ContratoService.postToEdit.Id_Contrato ,Empleado_idEmpleado: this.ContratoService.postToEdit.Empleado_idEmpleado,
            Fecha_Inicio: form.value.Fecha_Inicio,Salario:form.value.Salario,Cargo:form.value.Cargo,Movilidad:form.value.Movilidad,
            Hora_Inicio_Contrato:form.value.Hora_Inicio_Contrato,Hora_Almuerzo_Inicio_Contrato:form.value.Hora_Almuerzo_Inicio_Contrato,Hora_Almuerzo_Final_Contrato:form.value.Hora_Almuerzo_Final_Contrato,
            Hora_Fin_Contrato:form.value.Hora_Fin_Contrato}
      
        this.ContratoService.postToEdit= postforEdit;


        console.log("Valores a Editar");
        console.log(this.ContratoService.postToEdit);



      this.ContratoService.updatePost(
        this.ContratoService.postToEdit.Id_Contrato,
                        this.ContratoService.postToEdit.Empleado_idEmpleado,
                        this.ContratoService.postToEdit.Fecha_Inicio, 
                        this.ContratoService.postToEdit.Salario,
                        this.ContratoService.postToEdit.Cargo,
                        this.ContratoService.postToEdit.Movilidad,
                        this.ContratoService.postToEdit.Hora_Inicio_Contrato,
                        this.ContratoService.postToEdit.Hora_Almuerzo_Inicio_Contrato,
                        this.ContratoService.postToEdit.Hora_Almuerzo_Final_Contrato,    
                        this.ContratoService.postToEdit.Hora_Fin_Contrato
          );
      form.resetForm();
        

    }

  
    
    onCancel(){
        this.ContratoService.postSearch.Id_Contrato=this.CedulaBorrado;
        console.log("buscado borrado= "+this.ContratoService.postSearch.Id_Contrato);
        
      }




    
fillerNav = ['Busqueda de Empleado', 'Nómina', 'Ingreso de Empleado'];






}
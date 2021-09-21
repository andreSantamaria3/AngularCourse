import {NgForm,FormControl, Validators} from "@angular/forms";
import {Component,OnInit} from "@angular/core";
import {PostServiceDisp} from '../../../Capa_Negocio/Dispositivo/post.service';
import { Dispositivo,Dispositivotwo } from "../../../Capa_Negocio/Dispositivo/post.model";
import { PostThree, Postwo } from "../../../Capa_Negocio/Empleado/post.model";
import {PostService} from '../../../Capa_Negocio/Empleado/post.service';
import { Contrato, Contratotwo } from "../../../Capa_Negocio/Contrato/post.model";
import {Permiso,Permisotwo,PermisoThree,PermisoFour,PermisoFive,PermisoSix} from '../../../Capa_Negocio/Permiso/post.model';
import {PostServicePerm} from '../../../Capa_Negocio/Permiso/post.service';
import {ActivatedRoute, ParamMap} from "@angular/router";
import { DatePipe } from '@angular/common';
import { Subscription } from "rxjs";
import { format } from "mysql2";
import Swal from 'sweetalert2';
import { ViewEncapsulation } from '@angular/core';
import {MailService} from '../../../Capa_Negocio/correo.service';
import {PostService as UserService} from '../../../Capa_Negocio/Usuario/post.service';
import {User,Userthree,Usertwo} from '../../../Capa_Negocio/Usuario/post.model';



interface Opcion {
    value: string;
    descripcion: string;
    estado:string;
    tiempo:number;

  }


@Component({
    selector:'permiso-post-create',
    templateUrl:'./permiso-create.component.html',
    styleUrls:['./permiso-create.component.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [DatePipe]
})

export class PermisoCreateComponent implements OnInit {

 
  private PostsSub: Subscription;
  private TiposSub: Subscription;

  UserTipes:Userthree[]=[];

    enteredContent='';

    Fechamax;
    EmpleadoCreadoEncontrado:PermisoThree;
    FechaInp/*=new Date()*/;
    //ContratoInp;
    EmpleadoInp;
    CedulaInp='';
    PermisoInp='';
    private mode='create';
    DispBorrado=0;
    private postId:Number;
    post:Dispositivo;
     isLoading= false;
     CedulaInit:Dispositivotwo={Id_Dispositivo:0,
        Empleado_idEmpleado:null};

        // empleado que se va a pasar
        postPermiso:PermisoThree;

        //empleado que encontramos
        postEncontrado:PermisoThree;

     //dept
     private ContratSub: Subscription;
     private empleadoSub:Subscription;
    Dispos: Dispositivo[] = [];

    OneDispo: Dispositivo[] = [];
     selectedValue: string;

     DispoActivo: string;
    activo: string[] = ['Si', 'No'];


    seleccionPermiso:Opcion;
    opciones: Opcion[] = [
        {value:"Atraso",descripcion:"Permiso para Atraso",estado:"Presentado",tiempo:1},
        {value: "Falta",descripcion:"Permiso para Falta",estado:"Presentado",tiempo:8},
        {value: "Hora Extra",descripcion:"Permiso para Hora Extra",estado:"Presentado",tiempo:1}
      ];
    

      posts :PostThree[]=[

    ];

    nomina :PostThree[]=[

    ];


       //filtro de dias
       weekendsDatesFilter = (d: Date): boolean => {
        const day = d.getDay();
  
        /* Prevent Saturday and Sunday for select. */
        return day !== 0 && day !== 6 ;
    }




    
constructor (public UserService:UserService ,private datePipe: DatePipe,public MailService:MailService,public route:ActivatedRoute,public PostServicePerm:PostServicePerm,public empleadoService: PostService){
    
  this.llenarTipos();
};


getTomorrow(numero:number) {
  let d = new Date();
  d.setDate(d.getDate() + numero);
  console.log(d);
  return this.datePipe.transform(d, 'yyyy-MM-dd');
}

getToday() {
  let d = new Date();
  d.setDate(d.getDate());
  console.log(d);
  return this.datePipe.transform(d, 'yyyy-MM-dd');
}



llenarTipos(){
  this.UserService.getTipos();

  this.TiposSub=this.UserService.getPostUpdateListenerTipes().subscribe
  ((posts:Userthree[])=>{
    this.UserTipes=posts;
    this.isLoading=false;
    
    
   console.log("length de depts is: ",posts.length);


    this.UserService.postTipes=posts;
    console.log("length del service is: ",posts.length);
   // this.OneDept=this.Depts;


});
}

CorreosGerentes(NombreEmple:string,ApellidoEmple:string,tipoPermiso:string,fechaPermiso:string){
  console.log("longitud de gerentes: "+this.UserTipes.length);

  this.UserTipes.forEach(
    element=>{

      console.log(element.User_Name);
      this.MailService.CorreoPedirUsuario(element.User_Name,NombreEmple,ApellidoEmple,
        tipoPermiso,fechaPermiso);

    }


  );

}







ngOnInit(){


  this.Fechamax=this.getTomorrow(4);

  this.FechaInp=this.getTomorrow(1);
  console.log("Fecha de Hoy "+this.FechaInp);
  console.log("Fecha Max "+this.Fechamax);



  console.log("Cedula encontrada: "+this.empleadoService.postPasar.Cedula);


  this.CedulaInp=this.empleadoService.postPasar.Cedula;


  

}




  async  onSavePost(form: NgForm, Permiso: string){

        if(form.invalid){
            return;
        } 


        
        this.isLoading=true;

      

          this.seleccionPermiso=this.opciones.find(p=> p.value=== Permiso);
          console.log("Permiso pedido: ");
          console.log(this.seleccionPermiso);

          console.log("Empleado que se agrega: "+this.empleadoService.postPasar.Nombre_Empleado+
          " fecha: "+form.value.Fecha_Permiso);
            //guardar dispositivo

                  //codigo de guardar
            this.PostServicePerm.addPost(
              1000,
              this.empleadoService.postPasar,
              this.seleccionPermiso.value,
              this.seleccionPermiso.descripcion,
              this.seleccionPermiso.estado,
              form.value.Fecha_Permiso,
              this.seleccionPermiso.tiempo
            
          );


          //correo para todos los usuarios gerente y RRHH
          this.CorreosGerentes(this.empleadoService.postPasar.Nombre_Empleado,this.empleadoService.postPasar.Apellido_Empleado,
            String(this.seleccionPermiso.value),String(form.value.Fecha_Permiso));
         



    
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Guardado',
                        showConfirmButton: false,
                        timer: 1500
                      })








           
        
        
        form.resetForm();
    }

   
    onShow(form: NgForm){

        console.log("valores: "+ form.value.Mac_Add, 
        form.value.Ipdis,
        form.value.Nombre_SO,
        form.value.Activo
   );

    }

      onCancel(){
        console.log("saliendo");
        
      }


    
        





    
fillerNav = ['Busqueda de Empleado', 'Nómina', 'Ingreso de Empleado'];


//input original
// <mat-form-field>
//       <input   matInput type="date"
//       name="Fecha_Permiso" 
//        placeholder="Seleccione la Fecha de permiso" 
//       min="{{FechaInp}}" max="{{Fechamax}}"
//       [(ngModel)]="FechaInp"
//       #FechaTod>
      
     
//       <mat-error *ngIf="FechaTod.invalid ">Por favor Ingrese Fecha Valido</mat-error>
//       </mat-form-field>
    





}
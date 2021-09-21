import {NgForm,FormControl, Validators} from "@angular/forms";
import {Component,OnInit} from "@angular/core";
import {PostServiceContrato} from '../../../../Capa_Negocio/Contrato/post.service';
import { Contrato, Contratotwo } from "../../../../Capa_Negocio/Contrato/post.model";
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

interface Opcion {
    value: string;

  }
@Component({
    selector:'contrato-post-create',
    templateUrl:'./contrato-create.component.html',
    styleUrls:['./contrato-create.component.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [DatePipe]
})
export class ContratoCreateComponent implements OnInit {

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
    HoraIniInp="08:30:00";
    HoraAlmIInp="12:30:00";
    HoraAlmFInp="13:30:00";
    HoraFinInp="17:30:00";
    private mode='create';
    CedulaBorrado=0;
    private postId:Number;
    postEmpleado:PostThree;
    post:Contrato;
     isLoading= false;
     CedulaInit:Contratotwo={Id_Contrato:0,
        Empleado_idEmpleado:null};

        startDate = new Date(1990, 0, 1);
        myDate = new Date();

        HoraInicheck;
        HoraAlmIcheck;
        HoraAlmFcheck;
        HoraFincheck;
    

        //opciones 
        opciones: Opcion[] = [
            {value:"Gerente"},
            {value: "Empleado"},
            {value:"RRHH"}
          ];



     //dept
     private ContratSub: Subscription;
    Contrats: Contrato[] = [];
    Contratwo: Contrato[] = [];

    OneContrat: Contrato[] = [];
     selectedValue: string;



     //filtro de dias
     weekendsDatesFilter = (d=new Date()): boolean => {

        let fechaHoy = new Date();
		let DiaHoy=fechaHoy.getDay();
        const day = DiaHoy;
  
        /* Prevent Saturday and Sunday for select. */
        return day !== 0 && day !== 6 ;
    }



    
constructor (public route:ActivatedRoute,public router:Router,public ContratoService:PostServiceContrato,private datePipe: DatePipe,public empleadoService: PostService,public dispoService: PostServiceDisp){
    
   

};

getTomorrow() {
    let d = new Date();
    d.setDate(d.getDate() + 3);
    console.log(d);
    return this.datePipe.transform(d, 'yyyy-MM-dd');
  }

  getToday() {
    let d = new Date();
    d.setDate(d.getDate());
    console.log(d);
    return this.datePipe.transform(d, 'yyyy-MM-dd');
  }

 ngOnInit(){

    this.ContratoService.Token=false;
    
    this.Fechamax=this.getTomorrow();

    console.log("Fecha de Hoy "+this.FechaInp);
    console.log("Fecha Max "+this.Fechamax);

    //se guarda el empleado para seguir pasandolo
   this.postEmpleado=this.empleadoService.postPasar;

   console.log("Empleado pass a contrat: "+   this.postEmpleado.Nombre_Empleado+" "+this.postEmpleado.Apellido_Empleado+" "+this.postEmpleado.id_Empleado);


    this.route.paramMap.subscribe((/*paraMap:ParamMap*/)=>{
        if(this.ContratoService.editComesC==true){

            this.mode='edit';
 
            

 
            this.isLoading=true;

            //empleado que se tiene desde la pagina de editar empleados
            this.postId=this.empleadoService.postToEdit.id_Empleado;
            console.log("empleado id a editar: "+this.postId);


            // primero obtener todos los contratos
            this.findContrat();

            console.log("Fecha de Hoy "+this.FechaInp);
            console.log("Fecha Max "+this.Fechamax);

           // this.post=this.ContratoService.getPost(this.postId.toString());
         
            



        } else{
            this.mode='create';
            this.FechaInp=this.getToday();
            this.postId=null;
            console.log("Fecha de Hoy "+this.FechaInp);
            console.log("Fecha Max "+this.Fechamax);


        }

    });
}

async  findContrat(){
 
    console.log("vamos a encontrar contrato: ");
    
    var longit= await this.getContrats();
    console.log("long after promise is: "+longit);
    if(longit!=0){



        let valor= String(this.postId);

        let DeparFake:Contrato;

        console.log("por encontrar: "+this.ContratoService.ContratoforEdit.Empleado_idEmpleado);

        this.post=this.ContratoService.ContratosSearch.find(p=> p.Empleado_idEmpleado ===  this.ContratoService.ContratoforEdit.Empleado_idEmpleado );
    
        console.log("el contrato encontrado: "+this.post.Id_Contrato+" con empleado: "+this.post.Empleado_idEmpleado);

        console.log("Encontrado");
        console.log(this.post.Empleado_idEmpleado.id_Empleado+" contrato "+this.post.Id_Contrato);
        //this.getOneDept(this.post);

        this.FechaInp=this.post.Fecha_Inicio;
        this.ContratoService.postEdit=this.post;



        //llenar valores

        this.isLoading=false;


           
        //llenar valores desde el sevicio
        if(this.ContratoService.postEdit!=null){
            const elementoEdit=this.ContratoService.postEdit;

        console.log(elementoEdit.Empleado_idEmpleado+' '+elementoEdit.Fecha_Inicio+' '+elementoEdit.Cargo);
        if(elementoEdit!=null){
    
            var fechaentrada = new Date( elementoEdit.Fecha_Inicio);

            

            this.FechaInp=this.datePipe.transform(fechaentrada, 'yyyy-MM-dd');
           this.SalarioInp= elementoEdit.Salario;
            this.CargoInp=elementoEdit.Cargo;
            this.MovilidadInp=elementoEdit.Movilidad;
            this.HoraIniInp=elementoEdit.Hora_Inicio_Contrato;
            this.HoraAlmIInp=elementoEdit.Hora_Almuerzo_Inicio_Contrato;
            this.HoraAlmFInp=elementoEdit.Hora_Almuerzo_Final_Contrato;
            this.HoraFinInp=elementoEdit.Hora_Fin_Contrato;
        }
    }




    }
    

}


 getContrats(){
     console.log("buscar contratos");

    this.ContratoService.getPostsContrats();
    
   return new Promise((resolve,reject)=>{


        this.ContratSub=this.ContratoService.getPostUpdateListener().subscribe
    ((posts:Contrato[])=>{
        this.Contrats=posts;
        this.isLoading=false;
        
        console.log("length posts is: ",posts.length);


        this.ContratoService.ContratosSearch=posts;
        this.OneContrat=this.Contrats;

        console.log("length contrats is: ", this.ContratoService.ContratosSearch.length);

        resolve( this.ContratoService.ContratosSearch.length);

    });
   }
   );
}

getOneDept(dpt){

    try{
        this.ContratoService.postSearch.Id_Contrato=dpt.ID_Contrato;
        this.ContratoService.getOnePostContrat();
    
                this.ContratSub= this.ContratoService.getPostUpdateListener().subscribe
                ((posts:Contrato[])=>{
                    this.Contrats=posts;
                    this.isLoading=false;
                    
                    console.log("length contrats is: ",posts.length);
                });
    
    
    }
    catch(error)
    {
        console.log(error.name)
  
    }
 
   
}

//controlar las horas diferencia entre 4 horas

ControlHoras(Hinicio:string,Hinialm:string,Hfinalm:string,Hfin:string){

    return new Promise((resolve,reject)=>{

    this.HoraInicheck = new Date(this.FechaInp+" "+Hinicio );
    console.log("hora inicio: "+this.HoraInicheck);
    this.HoraAlmIcheck = new Date(this.FechaInp+" "+Hinialm );
    console.log("hora inicio almuer: "+this.HoraAlmIcheck);
    this.HoraAlmFcheck = new Date(this.FechaInp+" "+Hfinalm );
    console.log("hora fin almuer: "+this.HoraAlmFcheck);
    this.HoraFincheck = new Date(this.FechaInp+" "+Hfin);
    console.log("hora fin: "+this.HoraFincheck);

    console.log("hora fin: "+this.HoraFincheck.getTime());
    console.log("resta: "+ (this.HoraAlmIcheck.getTime() - this.HoraInicheck.getTime())/3600000);
    //controlar hora inicio y almuerzo inicio igual a 4 horas
    if((((this.HoraAlmIcheck.getTime() - this.HoraInicheck.getTime())/3600000)==4 && 
    (((this.HoraAlmFcheck.getTime() - this.HoraAlmIcheck.getTime())/3600000)==1) &&
    (((this.HoraFincheck.getTime() - this.HoraAlmFcheck.getTime())/3600000)==4)
    )){

 
                    // pasa el control
    
        resolve( true);
            
 
    }
    else{
        resolve( false);
    }
    


    });

    
    


}




async onSavePost(form: NgForm){

        if(form.invalid){
            return;
        } 


        



        //this.ContratoService.postToEdit =this.ContratoService.ContratosSearch.find(p=> p.Nombre_Departamento=== Dept);

        this.isLoading=true;
        if(this.mode==='create'){


            

            // console.log("For saving: "+this.ContratoService.postToEdit.Id_Contrato);
            // console.log("For saving Id: "+form.value.idContrato);
            console.log("Para guardar "+form.value.Fecha_Inicio+" "+
            " idemp "+ this.postEmpleado.id_Empleado+" "+ 
            form.value.Salario+" "+
            form.value.Cargo+" "+
            form.value.Movilidad+" "+
            form.value.Hora_Inicio_Contrato+" "+
            form.value.Hora_Almuerzo_Inicio_Contrato+" "+
            form.value.Hora_Almuerzo_Final_Contrato+" "+
            form.value.Hora_Fin_Contrato);


            const contratpass:Contrato={Id_Contrato:1000,Empleado_idEmpleado:this.postEmpleado,Fecha_Inicio:form.value.Fecha_Inicio,
                Salario:form.value.Salario,Cargo:form.value.Cargo,Movilidad:form.value.Movilidad,Hora_Inicio_Contrato:form.value.Hora_Inicio_Contrato,
                Hora_Almuerzo_Inicio_Contrato:form.value.Hora_Almuerzo_Inicio_Contrato,Hora_Almuerzo_Final_Contrato:form.value.Hora_Almuerzo_Final_Contrato,
                Hora_Fin_Contrato:form.value.Hora_Fin_Contrato};

                console.log(contratpass);
                this.ContratoService.ContratoPasar=contratpass;

                this.dispoService.editComesD=false;

                this.ContratoService.Token=true;

                //CONTROL DE INGRESO DE TIEMPO 

                var sumafour= await this.ControlHoras(form.value.Hora_Inicio_Contrato,form.value.Hora_Almuerzo_Inicio_Contrato,form.value.Hora_Almuerzo_Final_Contrato,form.value.Hora_Fin_Contrato);

                if(sumafour ==true){
                    
                  //codigo de guardar
                  this.ContratoService.addPost(
                    this.ContratoService.ContratoPasar.Id_Contrato,
                    this.ContratoService.ContratoPasar.Empleado_idEmpleado,
                    this.ContratoService.ContratoPasar.Fecha_Inicio, 
                    this.ContratoService.ContratoPasar.Salario,
                    this.ContratoService.ContratoPasar.Cargo,
                    this.ContratoService.ContratoPasar.Movilidad,
                    this.ContratoService.ContratoPasar.Hora_Inicio_Contrato,
                    this.ContratoService.ContratoPasar.Hora_Almuerzo_Inicio_Contrato,
                    this.ContratoService.ContratoPasar.Hora_Almuerzo_Final_Contrato,
                    this.ContratoService.ContratoPasar.Hora_Fin_Contrato
                    );
    

                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Guardado',
                        showConfirmButton: false,
                        timer: 1500
                      })

                      this.router.navigateByUrl("/empleado/dispocre");

                }

                else{

                    //Mensaje de indicacion

                    Swal.fire({
                        icon: 'error',
                        title: 'ERROR',
                        text: 'Se ha ingresado erroneamente las horas indicadas!',
                       
                      })

                      
                      this.reloadComponent(form);


                }
        }
        else{

             //Editar Empleado
             console.log("Valores Edit");
             console.log(this.ContratoService.postEdit.Id_Contrato,
                //id empleado
                this.postEmpleado.id_Empleado,
                 form.value.Fecha_Inicio, 
                 form.value.Salario,
                 form.value.Cargo,
                 form.value.Movilidad,
                 form.value.Hora_Inicio_Contrato,
                 form.value.Hora_Almuerzo_Inicio_Contrato,
                 form.value.Hora_Almuerzo_Final_Contrato,
                 form.value.Hora_Fin_Contrato
                 );
         


                 const postforEdit: Contrato={Id_Contrato: this.ContratoService.postEdit.Id_Contrato ,Empleado_idEmpleado: this.ContratoService.postEdit.Empleado_idEmpleado,
                    Fecha_Inicio: form.value.Fecha_Inicio,Salario:form.value.Salario,Cargo:form.value.Cargo,Movilidad:form.value.Movilidad,
                    Hora_Inicio_Contrato:form.value.Hora_Inicio_Contrato,Hora_Almuerzo_Inicio_Contrato:form.value.Hora_Almuerzo_Inicio_Contrato,Hora_Almuerzo_Final_Contrato:form.value.Hora_Almuerzo_Final_Contrato,
                    Hora_Fin_Contrato:form.value.Hora_Fin_Contrato}
               
                 this.ContratoService.postToEdit= postforEdit;
         
                 this.ContratoService.ContratoPasar=postforEdit;
         
                 console.log("Valores a Editar");
                 console.log(this.ContratoService.postToEdit);
                 console.log(this.ContratoService.postToEdit.Id_Contrato);
                 this.dispoService.editComesD=true;
         

                 this.ContratoService.Token=true;



                  //CONTROL DE INGRESO DE TIEMPO 

                  var sumafoure= await this.ControlHoras(form.value.Hora_Inicio_Contrato,form.value.Hora_Almuerzo_Inicio_Contrato,form.value.Hora_Almuerzo_Final_Contrato,form.value.Hora_Fin_Contrato);

                if(sumafoure ==true){
                    
                    //   //cambios guardados

                  
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




                     Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Editado',
                        showConfirmButton: false,
                        timer: 1500
                      })


                      this.router.navigateByUrl("/empleado/dispocre");

                }

                else{

                    //Mensaje de indicacion

                    Swal.fire({
                        icon: 'error',
                        title: 'ERROR',
                        text: 'Se ha ingresado erroneamente las horas indicadas!',
                       
                      })


                     this.reloadComponent(form);
                }






              




           





        }

        form.resetForm();
    }


    reloadComponent(form:NgForm) {
        let currentUrl = "/empleado/contratocre";
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

    controlSeleccion(){
        const elementoEdit=this.ContratoService.postEdit;
        console.log("Editar ");
        console.log(elementoEdit.Id_Contrato+' '+elementoEdit.Empleado_idEmpleado.id_Empleado+''+elementoEdit.Fecha_Inicio);
        if(elementoEdit!=null){
    
            this.FechaInp=elementoEdit.Fecha_Inicio;
            this.SalarioInp=elementoEdit.Salario;
            this.CargoInp=elementoEdit.Cargo;
            this.MovilidadInp=elementoEdit.Movilidad;
            this.HoraIniInp=elementoEdit.Hora_Inicio_Contrato;
            this.HoraAlmIInp=elementoEdit.Hora_Almuerzo_Inicio_Contrato;
            this.HoraAlmFInp=elementoEdit.Hora_Almuerzo_Final_Contrato;
            this.HoraFinInp=elementoEdit.Hora_Fin_Contrato;


       }
    }

    onSelect(){
        if(this.ContratoService.postEdit!=null){
            const elementoEdit=this.ContratoService.postEdit;
        console.log(elementoEdit.Id_Contrato+' '+elementoEdit.Empleado_idEmpleado.id_Empleado);
        if(elementoEdit!=null){
    
            this.ContratoInp=elementoEdit.Id_Contrato;
            this.EmpleadoInp=elementoEdit.Empleado_idEmpleado.id_Empleado;
            this.FechaInp=elementoEdit.Fecha_Inicio;
            this.SalarioInp=elementoEdit.Salario;
            this.CargoInp=elementoEdit.Cargo;
            this.MovilidadInp=elementoEdit.Movilidad;
            this.HoraIniInp=elementoEdit.Hora_Inicio_Contrato;
            this.HoraAlmIInp=elementoEdit.Hora_Almuerzo_Inicio_Contrato;
            this.HoraAlmFInp=elementoEdit.Hora_Almuerzo_Final_Contrato;
            this.HoraFinInp=elementoEdit.Hora_Fin_Contrato;




        }
    }
    }

    
    onCancel(){

        this.ContratoService.postSearch.Id_Contrato=this.CedulaBorrado;
        console.log("buscado borrado= "+this.ContratoService.postSearch.Id_Contrato);
        this.BorrarEmpleado();
        
      }

      BorrarEmpleado(){
        if(this.mode=='create'){
            console.log("Empleado borrado: "+   this.postEmpleado.Nombre_Empleado+" "+this.postEmpleado.Apellido_Empleado+" "+this.postEmpleado.id_Empleado);

            this.empleadoService.postEdit=this.postEmpleado;
            
            this.empleadoService.deletePost();

        }
        else{
            console.log("No se borra");
        }  
       

      }



    
fillerNav = ['Busqueda de Empleado', 'Nómina', 'Ingreso de Empleado'];




//date picker anterior
// <mat-form-field>
// <input   matInput type="date"
// name="Fecha_Inicio" 
//  placeholder="Seleccione la Fecha de Inicio de contrato" 
// min="{{FechaInp}}" max="{{Fechamax}}"
// [(ngModel)]="FechaInp"
// #FechaTod>


// <mat-error *ngIf="FechaTod.invalid ">Por favor Ingrese Fecha Valido</mat-error>

// </mat-form-field>





}
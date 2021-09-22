import {NgForm,FormControl, Validators} from "@angular/forms";
import {Component,OnInit} from "@angular/core";
import {PostServiceDept} from '../../../Capa_Negocio/Departamento/post.service';
import { Departamento, Departamentotwo, DepartamentoThree, DepartamentoFour } from "../../../Capa_Negocio/Departamento/post.model";
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
    selector:'departamento-post-create',
    templateUrl:'./departamento-create.component.html',
    styleUrls:['./departamento-create.component.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [DatePipe]
})
export class DepartamentoEditComponent implements OnInit {

    enteredTitle='';

    enteredContent='';
    
    NombreInp='';
    DescripcionInp='';
    
    FechaInp;
    //Fecha max
    Fechamax;
    //ContratoInp;
    ContratoInp;
    EmpleadoInp;
    //inicio salario
    SalarioInp;
    CargoInp='';
    //inicio movilidad
    MovilidadInp;
    HoraIniInp="08:30";
    HoraAlmIInp="12:30";
    HoraAlmFInp="13:30";
    HoraFinInp="17:30";
    private mode='create';
    CedulaBorrado=0;
    
        private postId:string;

        PostEditar:Departamento;

        isLoading= false;

     //dept
     private ContratSub: Subscription;
  
     selectedValue: string;
    
constructor (public route:ActivatedRoute,public router:Router,public PostServiceDep:PostServiceDept,private datePipe: DatePipe){
    
   

};



 ngOnInit(){


    this.route.paramMap.subscribe((paraMap:ParamMap)=>{

        if(paraMap.has('Id_Departamento')){
    
            this.postId=paraMap.get('Id_Departamento');
            this.isLoading=true;
    
            this.PostEditar=this.PostServiceDep.getPost(this.postId);
            this.isLoading=false;
    
            console.log("Encontrado");
            console.log(this.PostEditar);
    
    
        }
        else{
    
            console.log("Error al Enviar");
    
    
        }
    });
    
    
    this.LlenarValoresFijos(this.PostEditar);
    
   
    
    
}
    
    
    
    LlenarValoresFijos(Encontrado:Departamento){
    
    
        this.NombreInp=this.PostEditar.Nombre_Departamento;
        this.DescripcionInp=this.PostEditar.Descripcion;
    
    
    }










async onSavePost(form: NgForm){

        if(form.invalid){
            return;
        } 


        



        //this.ContratoService.postToEdit =this.ContratoService.ContratosSearch.find(p=> p.Nombre_Departamento=== Dept);

        this.isLoading=true;
    
             //Editar Empleado
             console.log("Valores Edit");
             console.log("Nombre: "+this.PostEditar.Nombre_Departamento+" Descripcion "+
                 form.value.Descripcion
                 );
         


                 const postforEdit: Departamento={Id_Departamento: this.PostEditar.Id_Departamento ,
                    Nombre_Departamento: this.PostEditar.Nombre_Departamento 
                ,Descripcion: form.value.Descripcion, Latitud_Dep1: this.PostEditar.Latitud_Dep1,
                Longitud_Dep1:this.PostEditar.Longitud_Dep1
                ,x_Dep:this.PostEditar.x_Dep,y_Dep:this.PostEditar.y_Dep}
               
                 this.PostServiceDep.postToEdit= postforEdit;
         
                 
         
                 console.log("Valores a Editar");
                 console.log(this.PostServiceDep.postToEdit);
                 console.log(this.PostServiceDep.postToEdit.Id_Departamento);
                


                    
                    //   //cambios guardados

                  
                    this.PostServiceDep.updatePost(
                        this.PostServiceDep.postToEdit.Id_Departamento,
                        this.PostServiceDep.postToEdit.Nombre_Departamento,
                        this.PostServiceDep.postToEdit.Descripcion,
                        this.PostServiceDep.postToEdit.Latitud_Dep1, 
                        this.PostServiceDep.postToEdit.Longitud_Dep1,
                        this.PostServiceDep.postToEdit.x_Dep,
                        this.PostServiceDep.postToEdit.y_Dep
                     );




                     Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Editado',
                        showConfirmButton: false,
                        timer: 1500
                      })


                      this.router.navigateByUrl("/empleado");

                
                     this.reloadComponent(form);
                




        form.resetForm();
    }


    reloadComponent(form:NgForm) {
        let currentUrl = "/empleado";
            this.router.routeReuseStrategy.shouldReuseRoute = () => false;
            this.router.onSameUrlNavigation = 'reload';
            this.router.navigate([currentUrl]);

            //this.ngOnInit();
            form.resetForm();
        }


 

    
fillerNav = ['Busqueda de Empleado', 'Nómina', 'Ingreso de Empleado'];






}
import {NgForm,FormControl, Validators} from "@angular/forms";
import { PostService } from "../../../../Capa_Negocio/Empleado/post.service";
import {Component,OnInit} from "@angular/core";
import { Post, PostThree, Postwo } from "../../../../Capa_Negocio/Empleado/post.model";
import {PostServiceDept} from '../../../../Capa_Negocio/Departamento/post.service';
import { Departamento, Departamentotwo } from "../../../../Capa_Negocio/Departamento/post.model";
import {PostServiceContrato} from '../../../../Capa_Negocio/Contrato/post.service';
import { Contrato, Contratotwo } from "../../../../Capa_Negocio/Contrato/post.model";
import {ActivatedRoute, ParamMap,Router} from "@angular/router";
import { Subscription } from "rxjs";
import { format } from "mysql2";
import Swal from 'sweetalert2';
import { ViewEncapsulation } from '@angular/core';

@Component({
    selector:'app-post-create',
    templateUrl:'./post-create.component.html',
    styleUrls:['./post-create.component.css'],
    encapsulation: ViewEncapsulation.None
})


export class PostCreateComponent implements OnInit {

    enteredTitle='';

    enteredContent='';
    NombreInp='';
    DepartamentoInp;
    DeptId:Departamento;
    
    ApellidoInp='';
    CedulaInp='';
    DireccionInp='';
    TelefonoInp='';
    CorreoInp='';
    private mode='create';
    CedulaBorrado="0";
    private postId:string;
     post:PostThree;
     isLoading= false;
     CedulaInit:Postwo={Cedula: "0"};


     //dept
     private DeptSub: Subscription;
    Depts: Departamento[] = [];

    OneDept: Departamento[] = [];
     selectedValue: string;
    
constructor (public postService: PostService,public route:ActivatedRoute,public DeptService:PostServiceDept,public ContratServ:PostServiceContrato,public router:Router){
    this.postService.Token=false;
    //this.DeptService.getPostsDep();
    //this.getDepts();
};





ngOnInit(){

   

    console.log("token empleado es: "+this.postService.Token);


    this.route.paramMap.subscribe((paraMap:ParamMap)=>{
        if(paraMap.has('id_empleado')){

            this.mode='edit';
            this.postId=paraMap.get('id_empleado');
            this.isLoading=true;


            
            this.post=this.postService.getPost(this.postId);
            this.isLoading=false;


            console.log("Encontrado");
            console.log(this.post);
           // this.getOneDept(this.post);

            this.getDepts();


          //  console.log("length OneDepts is: "+this.DeptService.DeptsSearch.length);
           // console.log("first OneDepts is: "+ this.DeptService.DeptsSearch[0].Nombre_Departamento);
           // console.log("first OneDept Id is: "+ this.DeptService.DeptsSearch[0].Id_Departamento);
            console.log("post.deptarma is: "+ this.post.Departamento_idDepartamento);

            console.log("Depts length: "+this.DeptService.DeptsSearch.length);
            let valor = String(this.post.Departamento_idDepartamento);

            console.log("el user encin "+this.DeptService.DeptsSearch.find(p=> p.Id_Departamento === parseInt(valor)));
            this.DeptService.postSend=this.DeptService.DeptsSearch.find(p=> p.Id_Departamento=== parseInt(valor));
           

            
            console.log("Depart: "+this.DeptService.postSend.Nombre_Departamento);

            //llenar valores desde el sevicio
            if(this.postService.postEdit!=null){
                const elementoEdit=this.postService.postEdit;

            console.log(elementoEdit.Nombre_Empleado+' '+elementoEdit.id_Empleado+' '+elementoEdit.Departamento_idDepartamento);
            if(elementoEdit!=null){
        
                this.NombreInp=elementoEdit.Nombre_Empleado;
               this.DepartamentoInp= this.DeptService.postSend.Nombre_Departamento;
                this.ApellidoInp=elementoEdit.Apellido_Empleado;
                this.CedulaInp=elementoEdit.Cedula;
                this.TelefonoInp=elementoEdit.Telefono;
                this.DireccionInp=elementoEdit.Direccion;
                this.CorreoInp=elementoEdit.Correo;
            }
        }
            



        } else{
            this.mode='create';
            this.postId=null;
            this.getDepts();


        }

    });
}


getDepts(){

    try{

        this.DeptService.getPostsDep();

        this.DeptSub= this.DeptService.getPostUpdateListener().subscribe
        ((posts:Departamento[])=>{
            this.Depts=posts;
            this.isLoading=false;
            
            
           console.log("length de depts is: ",posts.length);


            this.DeptService.DeptsSearch=posts;
            console.log("length del service is: ",posts.length);
            this.OneDept=this.Depts;


        });


    }
    catch(error)
    {
        console.log(error.name)
  
    }
 


            

}

getOneDept(dpt){

    try{
        this.DeptService.postSearch.Id_Departamento=dpt.Departamento_idDepartamento;
        this.DeptService.getOnePostDept();
    
                this.DeptSub= this.DeptService.getPostUpdateListener().subscribe
                ((posts:Departamento[])=>{
                    this.Depts=posts;
                    this.isLoading=false;
                    
                    console.log("length is: ",posts.length);
                });
    
    
    }
    catch(error)
    {
        console.log(error.name)
  
    }
 
  
 
 
}

GuardarEmple( EmpleadoPass: PostThree){

    return new Promise((resolve,reject)=>{
                //para enviar al servicio del contrato que vamos a crear no editar
                this.ContratServ.editComesC=false;

            
                let telef="09"+EmpleadoPass.Telefono;
                 // codigo de guardar
                  this.postService.addPost(
                    EmpleadoPass.id_Empleado,
                    this.DeptService.postToEdit, 
                    EmpleadoPass.Nombre_Empleado, 
                    EmpleadoPass.Apellido_Empleado,
                    EmpleadoPass.Cedula,
                    EmpleadoPass.Direccion,
                    //EmpleadoPass.Telefono,
                    telef,
                    EmpleadoPass.Correo
                    );

                    resolve(EmpleadoPass.Cedula);



    });


}

EditarEmple( EmpleadoPass: PostThree){

    return new Promise((resolve,reject)=>{

        
           
                //para enviar al servicio del contrato que vamos a crear no editar
                this.ContratServ.editComesC=true;

            
              
                  //editar el empleado al final
                  this.postService.updatePost(
                    EmpleadoPass.id_Empleado,
                    this.DeptService.postToEdit,
                    EmpleadoPass.Nombre_Empleado, 
                    EmpleadoPass.Apellido_Empleado,
                    EmpleadoPass.Cedula,    
                
                    EmpleadoPass.Direccion,
                    EmpleadoPass.Telefono,
                    EmpleadoPass.Correo
                 );

                    resolve(EmpleadoPass.Cedula);



    });


}




  async  onSavePost(form: NgForm,Dept: string){
        if(form.invalid){
            return;
        } 
        this.DeptService.postToEdit =this.DeptService.DeptsSearch.find(p=> p.Nombre_Departamento=== Dept);

        this.isLoading=true;
        if(this.mode==='create'){          
            console.log("For saving: "+this.DeptService.postToEdit.Id_Departamento);
            console.log("For saving Id: "+form.value.idEmpleado);          
             //crear el empleado a pasar al siguiente modulo
             const EmpleadoPasar: PostThree={id_Empleado:100,Departamento_idDepartamento:this.DeptService.postToEdit,
                Nombre_Empleado:form.value.Nombre_Empleado,Apellido_Empleado:  form.value.Apellido_Empleado,Cedula: form.value.Cedula,
                Direccion: form.value.Direccion,Telefono:form.value.Telefono,Correo:form.value.Correo};           
                this.postService.postPasar= EmpleadoPasar;
                var cedin = await this.GuardarEmple(EmpleadoPasar);
                if(cedin == EmpleadoPasar.Cedula){
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Guardado',
                        showConfirmButton: false,
                        timer: 1500
                      })
                      this.postService.Token=true;

                      setTimeout(
                        ()=>{
                            this.router.navigateByUrl("/empleado/onelist");
                        } 
                        ,500
                      );
                }
        }
        else{
             //Editar Empleado
             console.log("Valores Edit");
             console.log(this.postService.postEdit.id_Empleado,
                this.DeptService.postToEdit.Id_Departamento,
                 form.value.Nombre_Empleado, 
                 form.value.Apellido_Empleado,
                 form.value.Cedula,
                 form.value.Telefono,
                 form.value.Direccion,
                 form.value.Correo_Empleado);
         
                 const postforEdit: PostThree={id_Empleado: this.postService.postEdit.id_Empleado,Departamento_idDepartamento: this.DeptService.postToEdit,Nombre_Empleado: form.value.Nombre_Empleado,Apellido_Empleado:form.value.Apellido_Empleado,Cedula:form.value.Cedula,
                      Direccion:form.value.Direccion,Telefono:form.value.Telefono,Correo:form.value.Correo}
               
                 //Se guarda en el servicio el post a editar     
                 this.postService.postToEdit= postforEdit;
                 // utilizar para pasar al final 
                 this.postService.postPasar= postforEdit;
                 //this.postService.postforEdit;
         
         
                 console.log("Valores a Editar");
                 console.log(this.postService.postToEdit);
                 console.log(this.DeptService.postToEdit.Id_Departamento);

                 this.ContratServ.editComesC=true;
         
         

                     //para enviar al servicio del contrato que vamos a crear no editar
               // this.ContratServ.editComesC=true;


               var cedin = await this.EditarEmple(this.postService.postToEdit);

                  //cambios guardados

                  this.postService.Token=true;

                  if(cedin==form.value.Cedula){

                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Editado',
                        showConfirmButton: false,
                        timer: 1500
                      });

                      setTimeout(
                        ()=>{
                            this.router.navigateByUrl("/empleado/onelist");
                        } 
                        ,500
                      );

                  }



                    

                    //   setTimeout(
                    //     ()=>{
                    //         this.router.navigateByUrl("/empleado/onelist");
                    //     } 
                    //     ,1000
                    //   );



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
            confirmButtonText: 'Si, eliminar!'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Deleted!',
                'Se eliminó correctamente.',
                'success'
              )

              
                 this.postService.deletePost();

            }
          })







    }

    onEdit(form: NgForm, Dept : Departamento){
    console.log("Valores Edit");
    console.log(this.postService.postEdit.id_Empleado,
        
        form.value.Nombre_Empleado, 
        form.value.Apellido_Empleado,
        form.value.Cedula,
        form.value.Telefono,
        form.value.Direccion,
        form.value.Correo_Empleado);

        const postforEdit: PostThree={id_Empleado: this.postService.postEdit.id_Empleado,Departamento_idDepartamento:Dept,Nombre_Empleado: form.value.Nombre_Empleado,Apellido_Empleado:form.value.Apellido_Empleado,Cedula:form.value.Cedula,
             Direccion:form.value.Direccion,Telefono:form.value.Telefono,Correo:form.value.Correo_Empleado}
      
        this.postService.postToEdit= postforEdit;


        console.log("Valores a Editar");
        console.log(this.postService.postToEdit);



      this.postService.updatePost(
          this.postService.postToEdit.id_Empleado,
          this.postService.postToEdit.Departamento_idDepartamento,
          this.postService.postToEdit.Nombre_Empleado, 
          this.postService.postToEdit.Apellido_Empleado,
          this.postService.postToEdit.Cedula,    
         
          this.postService.postToEdit.Direccion,
    this.postService.postToEdit.Telefono,
    this.postService.postToEdit.Correo
          );
      form.resetForm();
        

    }

    controlSeleccion(){
        const elementoEdit=this.postService.postEdit;
        console.log("Editar ");
        console.log(elementoEdit.Nombre_Empleado+' '+elementoEdit.id_Empleado+''+elementoEdit.Departamento_idDepartamento);
        if(elementoEdit!=null){
    
            this.NombreInp=elementoEdit.Nombre_Empleado;
            //form.value.idEmpleado=elementoEdit.idEmpleado;
//    // this.NombreInp=elementoEdit.Nombre_Empleado;
    this.ApellidoInp=elementoEdit.Apellido_Empleado;
  this.CedulaInp=elementoEdit.Cedula;
     this.TelefonoInp=elementoEdit.Telefono;
     this.DireccionInp=elementoEdit.Direccion;
     this.CorreoInp=elementoEdit.Correo;


       }
    }

    onSelect(){
        if(this.postService.postEdit!=null){
            const elementoEdit=this.postService.postEdit;
        console.log(elementoEdit.Nombre_Empleado+' '+elementoEdit.id_Empleado);
        if(elementoEdit!=null){
    
            this.DepartamentoInp=elementoEdit.Departamento_idDepartamento;
            this.enteredTitle=elementoEdit.Nombre_Empleado;
            //form.value.idEmpleado=elementoEdit.idEmpleado;
   // this.NombreInp=elementoEdit.Nombre_Empleado;
    this.ApellidoInp=elementoEdit.Apellido_Empleado;
    this.CedulaInp=elementoEdit.Cedula;
    this.TelefonoInp=elementoEdit.Telefono;
    this.DireccionInp=elementoEdit.Direccion;
    this.CorreoInp=elementoEdit.Correo;



        }
    }
    }

    
    onCancel(){
        this.postService.Token=true;
        //  this.postService.postSearch.Cedula=this.CedulaBorrado;
        // console.log("buscado borrado= "+this.postService.postSearch.Cedula);
        
      }




    
fillerNav = ['Busqueda de Empleado', 'Nómina', 'Ingreso de Empleado'];






}
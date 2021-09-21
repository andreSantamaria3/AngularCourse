import {NgForm,FormControl, Validators} from "@angular/forms";
import {Component,OnInit} from "@angular/core";
import {PostServiceDisp} from '../../../../Capa_Negocio/Dispositivo/post.service';
import { Dispositivo,Dispositivotwo } from "../../../../Capa_Negocio/Dispositivo/post.model";
import { PostThree, Postwo } from "../../../../Capa_Negocio/Empleado/post.model";
import { PostService } from "../../../../Capa_Negocio/Empleado/post.service";
//usuario
import { PostService as UserService} from "../../../../Capa_Negocio/Usuario/post.service";
import {PostServiceContrato} from '../../../../Capa_Negocio/Contrato/post.service';
import { Contrato, Contratotwo } from "../../../../Capa_Negocio/Contrato/post.model";
import {ActivatedRoute, ParamMap} from "@angular/router";
import { Subscription } from "rxjs";
import { format } from "mysql2";
import Swal from 'sweetalert2';
import { ViewEncapsulation } from '@angular/core';
import {MailService} from '../../../../Capa_Negocio/correo.service';
interface Opcion {
    value: string;
    numero:number;

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
    EmpleadoInp;
    MacInp='';
    IpInp='10.10.10.10';
    SoInp='';
    ActivInp='';
    private mode='create';
    DispBorrado=0;
    private postId:Number;
    post:Dispositivo;
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
    Dispos: Dispositivo[] = [];

    OneDispo: Dispositivo[] = [];
     selectedValue: string;

     DispoActivo: string;
    activo: string[] = ['Si', 'No'];

    optSelected:Opcion;


    
    opciones: Opcion[] = [
        {value:"SI",numero:1},
        {value: "NO",numero:0}
      ];
    

      posts :PostThree[]=[

    ];


    nomina :PostThree[]=[

    ];


    
constructor (public route:ActivatedRoute,public MailService:MailService,public UserService:UserService,public PostServiceDisp:PostServiceDisp,public empleadoService: PostService,public contratoService:PostServiceContrato){
    
  
};


CrearUsuario(){

  let numeroRandom=String( Math.floor((Math.random() * 900) + 100));
  console.log("Empleado pass a dispo: "+this.postEmpleado.id_Empleado+" "+" correo "
  +this.postEmpleado.Correo);


  let passRand=(this.postEmpleado.id_Empleado+"@Em"+numeroRandom);
  console.log("se crea con número Random:  "+numeroRandom);
 this.UserService.Crear(this.postEmpleado.id_Empleado,this.postEmpleado.Correo,passRand).then(valor=>{

  
  console.log("se logro: "+valor);

  this.MailService.CorreoCrearUsuario(this.postEmpleado.Correo,passRand);


 });




}

ngOnInit(){


  this.PostServiceDisp.Token=false;



  //se guarda el empleado para seguir pasandolo
  this.postEmpleado=this.empleadoService.postPasar;

  console.log("Empleado pass a dispo: "+this.postEmpleado.Cedula+" "+this.postEmpleado.Nombre_Empleado+" "
  +this.postEmpleado.Correo);

  console.log("Contrato pass a dispo: "+this.contratoService.ContratoPasar.Empleado_idEmpleado+" "+
  this.contratoService.ContratoPasar.Fecha_Inicio+" "+ 
  this.contratoService.ContratoPasar.Salario+" "+
  this.contratoService.ContratoPasar.Cargo+" "+
  this.contratoService.ContratoPasar.Movilidad
);

    this.route.paramMap.subscribe((/*paraMap:ParamMap*/)=>{
        if(this.PostServiceDisp.editComesD==true){

            this.mode='edit';
  
            this.isLoading=true;
            //obtener todos los dispositivos
          

            //empleados
            this.empleadoService.getPosts();
            //this.searchEmpleadoSuscribe();

            

            //empleado que se ha editado
            this.postId=this.empleadoService.postToEdit.id_Empleado;
            console.log("empleado id a editar: "+this.postId);

            //llamar a promesa

            this.findDispos();
           // this.post=this.PostServiceDisp.getPost(this.postId.toString());
            



        } else{
            this.mode='create';
            this.postId=null;
            this.getDepts();

            //empleados
            
            this.empleadoService.getPosts();
            //this.searchEmpleadoSuscribe();

        }

    });
}

async findDispos(){

  var longdis= await this.getDepts();
  console.log("long after promise is: "+longdis);
  if(longdis!=0){

    console.log("Para encontrar: "+this.PostServiceDisp.DispoforEdit.Empleado_idEmpleado);
    this.post=this.PostServiceDisp.DisposSearch.find(p=> p.Empleado_idEmpleado=== this.PostServiceDisp.DispoforEdit.Empleado_idEmpleado);
    
    this.isLoading=false;


            console.log("Encontrado");
            console.log(this.post);
            //this.getOneDept(this.post);


            //guardar el encontrado en el servicio
            this.PostServiceDisp.postEdit=this.post;


            //llenar valores desde el sevicio
            if(this.PostServiceDisp.postEdit!=null){
                const elementoEdit=this.PostServiceDisp.postEdit;

            console.log(this.PostServiceDisp.postEdit.Empleado_idEmpleado+' '+this.post.IPdis+' '+this.PostServiceDisp.postEdit.Mac_Add);
            if(elementoEdit!=null){
        
                this.EmpleadoInp=this.PostServiceDisp.postEdit.Empleado_idEmpleado;
               this.MacInp= this.PostServiceDisp.postEdit.Mac_Add;
                //this.IpInp=this.PostServiceDisp.postEdit.IPdis;
                this.SoInp=this.PostServiceDisp.postEdit.Nombre_SO;
                this.ActivInp=this.PostServiceDisp.postEdit.Activo;
            }
        }
            



  }


}



getDepts(){

  this.PostServiceDisp.getPostsDisp();

  return new Promise((resolve,reject)=>{

     
      this.ContratSub= this.PostServiceDisp.getPostUpdateListener()
      .subscribe
      ((posts:Dispositivo[])=>{
          this.Dispos=posts;
          this.isLoading=false;
          
          console.log("length dispos is: ",posts.length);
  
  
          this.PostServiceDisp.DisposSearch=posts;
          this.OneDispo=this.Dispos;
  
          resolve(this.PostServiceDisp.DisposSearch.length);
  
      });



  }

  );

    

}

getOneDept(dpt){

  try{
    this.PostServiceDisp.postSearch.Id_Dispositivo=dpt.Id_Dispositivo;
    this.PostServiceDisp.getOnePostDisp();

            this.ContratSub= this.PostServiceDisp.getPostUpdateListener().subscribe
            ((posts:Dispositivo[])=>{
                this.Dispos=posts;
                this.isLoading=false;
                
                console.log("length contrats is: ",posts.length);
            });


  }
  catch(error)
  {
      console.log(error.name)

  }
 
    
}







  async  onSavePost(form: NgForm){

        if(form.invalid){
            return;
        } 
        
        this.isLoading=true;
        if(this.mode==='create'){

           console.log("Empleado seacrh: "+this.postEmpleado.Nombre_Empleado
           +" "+this.postEmpleado.Apellido_Empleado+" "+this.postEmpleado.id_Empleado);

           this.optSelected=this.opciones.find(p=> p.value ===  form.value.Activo);

            //guardar dispositivo

                  //codigo de guardar
                  this.PostServiceDisp.addPost(
            1000,
            this.postEmpleado,
            form.value.Mac_Add,
            this.IpInp,
            form.value.Nombre_SO,
            String(this.optSelected.numero)
          );

          this.CrearUsuario();
    
          this.PostServiceDisp.Token=true;

                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Guardado',
                        showConfirmButton: false,
                        timer: 1500
                      })
        }
        else{


            //guardar empleado editado
            //this.editarEmpleado();

           
             // console.log("Empleado seacrh: "+this.postEncontrado);
  



            //guardar contrato editado
           // this.editarContrato();


           this.optSelected=this.opciones.find(p=> p.value ===  form.value.Activo);


             //Editar Dispo
             console.log("Valores Edit");
             console.log(this.PostServiceDisp.postEdit.Id_Dispositivo,
                //id empleado
                this.PostServiceDisp.postEdit.Empleado_idEmpleado,
                form.value.Mac_Add, 
                this.PostServiceDisp.postEdit.IPdis,
                form.value.Nombre_SO,
                String(this.optSelected.numero)
               
                 );
         




                 const postforEdit: Dispositivo={Id_Dispositivo: this.PostServiceDisp.postEdit.Id_Dispositivo ,Empleado_idEmpleado: this.PostServiceDisp.postEdit.Empleado_idEmpleado,
                    Mac_Add: form.value.Mac_Add,IPdis:this.PostServiceDisp.postEdit.IPdis,Nombre_SO:form.value.Nombre_SO,Activo:String(this.optSelected.numero)}
               
                 this.PostServiceDisp.postToEdit= postforEdit;
         
         
                 console.log("Valores a Editar");
                 console.log(this.PostServiceDisp.postToEdit);
                 console.log(this.PostServiceDisp.postToEdit.Id_Dispositivo);
                 console.log(this.PostServiceDisp.postToEdit.Activo);

                 this.PostServiceDisp.Token=true;
         




                  //cambios guardados

                  
                    this.PostServiceDisp.updatePost(
                        this.PostServiceDisp.postToEdit.Id_Dispositivo,
                        this.PostServiceDisp.postToEdit.Empleado_idEmpleado,
                        this.PostServiceDisp.postToEdit.Mac_Add, 
                        this.PostServiceDisp.postToEdit.IPdis,
                        this.PostServiceDisp.postToEdit.Nombre_SO,
                        this.PostServiceDisp.postToEdit.Activo
                     );





                     Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Editado',
                        showConfirmButton: false,
                        timer: 1500
                      })




           





        }

        this.contratoService.Token=true;
        this.empleadoService.Token=true;
        this.PostServiceDisp.Token=true;
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

    controlSeleccion(){
    
      try{
        const elementoEdit=this.PostServiceDisp.postEdit;
        console.log("Editar ");
        console.log(elementoEdit.Id_Dispositivo+' '+elementoEdit.Empleado_idEmpleado+''+elementoEdit.Mac_Add);
        if(elementoEdit!=null){
            this.DispositivoInp=elementoEdit.Id_Dispositivo;
            this.EmpleadoInp=elementoEdit.Empleado_idEmpleado;
            this.MacInp=elementoEdit.Mac_Add;
            this.IpInp=elementoEdit.IPdis;
            this.SoInp=elementoEdit.Nombre_SO;
            this.ActivInp=elementoEdit.Activo;


       }
      }
      catch(error)
      {
          console.log(error.name)
    
      }
     
    
     
    }







    onSelect(){
      
      try{
        if(this.PostServiceDisp.postEdit!=null){
          const elementoEdit=this.PostServiceDisp.postEdit;
      console.log(elementoEdit.Id_Dispositivo+' '+elementoEdit.Empleado_idEmpleado);
      if(elementoEdit!=null){
  
          this.DispositivoInp=elementoEdit.Id_Dispositivo;
          this.EmpleadoInp=elementoEdit.Empleado_idEmpleado;
          this.MacInp=elementoEdit.Mac_Add;
          this.IpInp=elementoEdit.IPdis;
          this.SoInp=elementoEdit.Nombre_SO;
          this.ActivInp=elementoEdit.Activo;

      }
  }
      }
      catch(error)
      {
          console.log(error.name)
    
      }
      
      
    }

    
    onCancel(){
        this.PostServiceDisp.postSearch.Id_Dispositivo=this.DispBorrado;
        console.log("buscado borrado= "+this.PostServiceDisp.postSearch.Id_Dispositivo);
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
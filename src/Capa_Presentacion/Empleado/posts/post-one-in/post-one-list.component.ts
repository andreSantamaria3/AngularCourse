import{Component, Input, OnInit} from "@angular/core";
import { Subscription } from "rxjs";
import {PostThree,Postwo} from '../../../../Capa_Negocio/Empleado/post.model';
import {PostService} from '../../../../Capa_Negocio/Empleado/post.service';
import {PostServiceContrato} from '../../../../Capa_Negocio/Contrato/post.service';
import {Contrato} from '../../../../Capa_Negocio/Contrato/post.model';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import { ViewEncapsulation } from '@angular/core';

import {NgForm} from "@angular/forms";

import {PostServiceDept} from '../../../../Capa_Negocio/Departamento/post.service';
import { Departamento, Departamentotwo } from "../../../../Capa_Negocio/Departamento/post.model";



import {ActivatedRoute, ParamMap} from "@angular/router";
import { format } from "mysql2";
import Swal from 'sweetalert2';

@Component({
    selector:'app-one-post-list',
    templateUrl:'./post-one-list.component.html',
    styleUrls:['./post-one-list.component.css'],
    encapsulation: ViewEncapsulation.None

})
export class PostOneListComponent implements OnInit{

  isLoading=false;
   posts :PostThree[]=[

    ];
    private PostsSub: Subscription;
     //table data
     displayedColumns: string[] = ['idEmpleado','Id_Departamento', 'Nombre_Empleado', 'Apellido_Empleado', 'Cedula', 'Telefono','Direccion','Correo'];
     dataSource = new MatTableDataSource<PostThree>();
     selection = new SelectionModel<PostThree>();
     selectedRowIndex ;

     private DeptSub: Subscription;
     private ContSub: Subscription;
     Depts: Departamento[] = [];
     Contrats:Contrato[]=[];


     
    
    constructor(public ContratoService:PostServiceContrato,public DeptService:PostServiceDept,public postsService: PostService,public route:ActivatedRoute){
     

      this.postsService.iniciarElementos();

    
      
      // this.postsService.getPosts();
      // this.postsService.getPostUpdateListener();
      
      
      
      

    };


    


    ngOnInit(){


      const CedulaInit:Postwo={Cedula: this.postsService.postPasar.Cedula};
      this.postsService.elementoBusqueda(CedulaInit);

      console.log(this.postsService.postSearch);

   



      this.isLoading=true;
     
      console.log("LA cedula ingresada es: "+this.postsService.CedulaInitwo.Cedula);

      if(this.postsService.postSearch.Cedula=="0" || this.postsService.postSearch.Cedula==null){
        Swal.fire({
          icon: 'error',
          title: 'ERROR',
          text: 'No se ingreso una cedula Correcta!'
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {

            this.onCancel();
            //Swal.fire('Saved!', '', 'success')
          }
        })
        console.log("No se selecciona una cedula correcta");

      }


      else{
        this.postsService.getOnePost();
      }
        
        this.PostsSub= this.postsService.getPostUpdateListener().subscribe
        ((posts:PostThree[])=>{
            this.posts=posts;
            this.isLoading=false;
            this.selection = new SelectionModel<PostThree>(true, []);
            this.dataSource = new MatTableDataSource<PostThree>(posts);
            console.log("length is: ",posts.length);
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

            if(posts[0].id_Empleado!=undefined){

              console.log("ingresado: "+posts[0].id_Empleado+" "+posts[0].Nombre_Empleado);
            this.postsService.postPasar.id_Empleado= posts[0].id_Empleado;
           

            }

            this.postsService.CedulaInitwo.Cedula="0";
            

        });
    };

    ngOnDestroy(){
        this.PostsSub.unsubscribe();
    }


    /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PostThree): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${Number( row.id_Empleado) }`;
  }

  highlight(row){
    this.LlenarDepts();
    //this.BuscarContrato();
    this.selectedRowIndex = row.id_Empleado;
    this.postsService.llenarEspacios(row);

    console.log(row);

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
        'Eliminado!',
        'El elemento ha sido eliminado.',
        'success'
      )

      
         this.postsService.deletePost();

    }
  })







}

onCancel(){

  // this.postsService.postSearch.Cedula=="0";
  console.log("buscado borrado= "+this.postsService.postSearch);
  //this.postsService.getPosts();
}

controlLista(){
  
}

fillerNav = ['Busqueda de Empleado', 'Nómina', 'Ingreso de Empleado'];



LlenarDepts(){
  
  try{

    // this.DeptService.getPostsDep();

    this.DeptService.getPostsDep();
     this.DeptSub= this.DeptService.getPostUpdateListener().subscribe
     ((posts:Departamento[])=>{
         this.Depts=posts;
         this.isLoading=false;
         
         
        console.log("length de depts is: ",posts.length);


         this.DeptService.DeptsSearch=posts;
         console.log("length del service is: ",posts.length);
        // this.OneDept=this.Depts;


     });


 }
 catch(error)
 {
     console.log(error.name)

 }

}


BuscarContrato(){
  

  this.ContratoService.getOneContrat(this.postsService.postPasar.id_Empleado);

  this.ContSub= this.ContratoService.getPostUpdateListener().subscribe
  ((posts:Contrato[])=>{
      this.Contrats=posts;
      this.isLoading=false;
      
      
     console.log("length de contrats is: ",posts.length);


      this.ContratoService.ContratosforEdit=posts;
      console.log("length del contrat is: ",posts.length);
      if(posts.length!=0){

        this.ContratoService.ContratoforEdit=posts[0];

      }
      else{
        console.log("Error con la cedula");
      }
     // this.OneDept=this.Depts;


  });



}





  // onRowClicked(row){

    
    
  //   this.selectedRowIndex = row.id;
  // }
}
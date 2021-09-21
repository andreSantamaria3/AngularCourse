import{Component, Input, OnInit} from "@angular/core";
import { Subscription } from "rxjs";
import {PostThree,Postwo} from '../../../../Capa_Negocio/Empleado/post.model';
import {PostService} from '../../../../Capa_Negocio/Empleado/post.service';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import { ViewEncapsulation } from '@angular/core';
import { ViewChild } from '@angular/core'
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatPaginator} from '@angular/material/paginator';

import {PostServiceContrato} from '../../../../Capa_Negocio/Contrato/post.service';
import {Contrato} from '../../../../Capa_Negocio/Contrato/post.model';

import {PostServiceDisp} from '../../../../Capa_Negocio/Dispositivo/post.service';
import {Dispositivo} from '../../../../Capa_Negocio/Dispositivo/post.model';
import { MatTableExporterDirective } from 'mat-table-exporter';


import {PostServiceDept} from '../../../../Capa_Negocio/Departamento/post.service';
import { Departamento, Departamentotwo } from "../../../../Capa_Negocio/Departamento/post.model";


import {PostService as UserService} from '../../../../Capa_Negocio/Usuario/post.service';
import { Observable } from 'rxjs';



import {NgForm} from "@angular/forms";

import {ActivatedRoute, ParamMap} from "@angular/router";
import { format } from "mysql2";
import Swal from 'sweetalert2';
import { R } from "node_moduleswrong/@angular/cdk/keycodes";

@Component({
    selector:'app-post-list',
    templateUrl:'./post-list.component.html',
    styleUrls:['./post-list.component.css'],
    encapsulation: ViewEncapsulation.None

})


export class PostListComponent implements OnInit{

  isLoading=false;
   posts :PostThree[]=[

    ];
    Contrats:Contrato[]=[];
    Dispos:Dispositivo[]=[];
    private PostsSub: Subscription;
    CedulaBuscar:Postwo={Cedula: "0"};

     //table data
     displayedColumns: string[] = ['idEmpleado','Id_Departamento', 'Nombre_Empleado', 'Apellido_Empleado', 'Cedula', 'Telefono','Direccion','Correo'];
     dataSource = new MatTableDataSource<PostThree>();
     selection = new SelectionModel<PostThree>();
     selectedRowIndex ;

          //dept
          private DeptSub: Subscription;
          Depts: Departamento[] = [];
     //paginator: MatPaginator;

     //contrat
     private ContSub: Subscription;
     private DispSub: Subscription;

     @ViewChild(MatPaginator) paginator: MatPaginator;

     private empleListenerSubs:Subscription;
     UsuarioEmpleAdmin=false;


     
    
    constructor(public UserService:UserService,public DispoService:PostServiceDisp,public ContratoService:PostServiceContrato,public DeptService:PostServiceDept,public postsService: PostService,public route:ActivatedRoute){
      this.postsService.iniciarElementos();

       

    };


    


    ngOnInit(){


      this.isLoading=true;
      
      
      //listener de gerente
      this.empleListenerSubs=this.UserService.getEmpleadoListener().subscribe(isAuthenticated=>{

        this.UsuarioEmpleAdmin=isAuthenticated;

    });
      
      
      
      
      console.log();
      console.log("LA cedula ingresada es: "+this.postsService.CedulaInitwo.Cedula);

      this.CedulaBuscar.Cedula= this.postsService.CedulaInitwo.Cedula;
   
      if(this.postsService.postSearch.Cedula=="0"){
        this.postsService.getPosts();
      }

      else if(this.postsService.postSearch.Cedula=="3"){

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
            // paginator
            this.dataSource.paginator = this.paginator;

            console.log("length is: ",posts.length);
            console.log("length de propios is: ",this.posts.length);
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
    console.log("seleccionado id: "+row.id_Empleado+" "+row.Cedula);
    console.log("cedula Buscar: "+this.CedulaBuscar.Cedula);
    if(this.CedulaBuscar.Cedula=="0"){
      this.CedulaBuscar.Cedula=row.Cedula;
    }
    else{
      console.log("se tiene cedula: "+this.CedulaBuscar.Cedula);
    }
    
    this.BuscarContrato();
    this.BuscarDispo();
    this.LlenarDepts();
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
  // console.log("buscado borrado= "+this.postsService.postSearch);
  this.postsService.getPosts();
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
  
  console.log("cedula a buscar: "+this.CedulaBuscar.Cedula);

  let EmpleFind:PostThree=this.posts.find(p=> p.Cedula ===  this.CedulaBuscar.Cedula );

  console.log("Empleado: "+EmpleFind.id_Empleado);
  this.ContratoService.getOneContrat(EmpleFind.id_Empleado);

  this.ContSub= this.ContratoService.getPostUpdateListenerOne().subscribe
  ((posts:Contrato[])=>{
      this.Contrats=posts;
      this.isLoading=false;
      
      
     console.log("length de contrats is: ",posts.length);


      this.ContratoService.ContratosforEdit=posts;
      console.log("length del contrat is: ",posts.length);
      if(posts.length!=0){

        console.log("contrato encontrado: "+posts[0].Id_Contrato);
        this.ContratoService.ContratoforEdit=posts[0];

      }
      else{
        console.log("Error con la cedula");
      }
     // this.OneDept=this.Depts;


  });



}



BuscarDispo(){
  
  console.log("cedula a buscar: "+this.CedulaBuscar.Cedula);

  let EmpleFind:PostThree=this.posts.find(p=> p.Cedula ===  this.CedulaBuscar.Cedula );

  console.log("Empleado: "+EmpleFind.id_Empleado);
  this.DispoService.getOneDisp(EmpleFind.id_Empleado);

  this.ContSub= this.DispoService.getPostUpdateListenerOne().subscribe
  ((posts:Dispositivo[])=>{
      this.Dispos=posts;
      this.isLoading=false;
      
      
     console.log("length de contrats is: ",posts.length);


      this.DispoService.DisposforEdit=posts;
      console.log("length del Dispo is: ",posts.length);
      if(posts.length!=0){

        console.log("dispo enocntrado: "+posts[0].Id_Dispositivo);
        this.DispoService.DispoforEdit=posts[0];

      }
      else{
        console.log("Error con la cedula");
      }
     // this.OneDept=this.Depts;


  });



}


@ViewChild(MatTableExporterDirective) matTableExporter: MatTableExporterDirective;
export(){

  this.matTableExporter.exportTable('xlsx',{fileName:'ResumenEmpleados'});
  
  }





  // onRowClicked(row){

    
    
  //   this.selectedRowIndex = row.id;
  // }
}
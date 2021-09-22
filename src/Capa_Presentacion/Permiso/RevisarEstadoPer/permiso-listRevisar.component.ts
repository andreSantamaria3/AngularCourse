import{Component, Input, OnInit} from "@angular/core";
import { Subscription } from "rxjs";
import {PostServiceDisp} from '../../../Capa_Negocio/Dispositivo/post.service';
import { Dispositivo,Dispositivotwo } from "../../../Capa_Negocio/Dispositivo/post.model";
import { PostThree, Postwo } from "../../../Capa_Negocio/Empleado/post.model";
import { PostService } from "../../../Capa_Negocio/Empleado/post.service";
import {PostServiceContrato} from '../../../Capa_Negocio/Contrato/post.service';
import { Contrato, Contratotwo } from "../../../Capa_Negocio/Contrato/post.model";
import {Permiso,Permisotwo,PermisoThree,PermisoFour,PermisoFive,PermisoSix} from '../../../Capa_Negocio/Permiso/post.model';
import {PostServicePerm} from '../../../Capa_Negocio/Permiso/post.service';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import { ViewEncapsulation } from '@angular/core';
import { ViewChild } from '@angular/core'
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatPaginator} from '@angular/material/paginator';


import {NgForm} from "@angular/forms";

import {ActivatedRoute, ParamMap,Router} from "@angular/router";
import { format } from "mysql2";
import Swal from 'sweetalert2';

@Component({
    selector:'permiso-post-listRevisar',
    templateUrl:'./permiso-listRevisar.component.html',
    styleUrls:['./permiso-listRevisar.component.css'],
    encapsulation: ViewEncapsulation.None

})


export class PermisoListRevisarComponent implements OnInit{

  isLoading=false;
  
  postsEmpleado:PostThree[]=[];
  EmpleadoPasar:PostThree;


  posts :PermisoThree[]=[

  ];
  private PostsSub: Subscription;
   //table data
   displayedColumns: string[] = ['id_Permiso', 'Nombre_Empleado', 'Apellido_Empleado', 'Tipo', 'Estado_Permiso','Fecha','Tiempo'];
   dataSource = new MatTableDataSource<PermisoThree>();
   selection = new SelectionModel<PermisoThree>();
   selectedRowIndex ;

     //paginator: MatPaginator;

     @ViewChild(MatPaginator) paginator: MatPaginator;

  


     
    
    constructor(public EmpleadoService:PostService,public router:Router,public postsService: PostServicePerm,public route:ActivatedRoute){
      this.postsService.iniciarElementos();

      this.EmpleadoService.getPosts();

      this.empleadoSuscribir();

    };


    buscarEmpleado(Nombre:String,Apellido:String){
      this.EmpleadoPasar=this.postsEmpleado.find(p=> (p.Nombre_Empleado=== Nombre && p.Apellido_Empleado=== Apellido));

      console.log("empleado Encontrado: "+this.EmpleadoPasar.Nombre_Empleado+" "+this.EmpleadoPasar.Cedula);

      this.EmpleadoService.postCorreo=this.EmpleadoPasar;

    }


    ngOnInit(){
      this.isLoading=true;
      console.log();
      console.log("LA cedula ingresada es: "+this.postsService.Permisotwo.Cedula);

      console.log("Es seleccion con cedula: "+this.postsService.SeleccionCedula );
      if(this.postsService.SeleccionCedula== false){

        console.log("Es seleccion de atraso-falta-HE: "+this.postsService.SeleccionPermiso );


          this.postsService.getPermisPresEightDay();


      }
      else if(this.postsService.SeleccionCedula== true) {
      

        console.log("Es seleccion de atraso-falta-HE: "+this.postsService.SeleccionPermiso );

          this.postsService.getOnePermisPresenEmple8();

        

      }
   

      // else {

      //   Swal.fire({
      //     icon: 'error',
      //     title: 'ERROR',
      //     text: 'No se ingreso una cedula Correcta!'
      //   }).then((result) => {
      //     /* Read more about isConfirmed, isDenied below */
      //     if (result.isConfirmed) {

      //       this.onCancel();
      //       //Swal.fire('Saved!', '', 'success')
      //     }
      //   })



      //   console.log("No se selecciona una cedula correcta");
      // }


        console.log("llenar el datasource");
        this.PostsSub= this.postsService.getPostUpdateListenerthree().subscribe
        ((posts:PermisoThree[])=>{
            this.posts=posts;
            this.isLoading=false;
            this.selection = new SelectionModel<PermisoThree>(true, []);
            this.dataSource = new MatTableDataSource<PermisoThree>(posts);
            // paginator
            this.dataSource.paginator = this.paginator;

            console.log("length is: ",posts.length);
            this.postsService.PermisosPasar=posts;
            if(posts.length==0){

              Swal.fire({
                icon: 'error',
                title: 'ERROR',
                text: 'No se tiene permisos pendientes para el empleado!'
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
      
                  this.onCancel();
                  //Swal.fire('Saved!', '', 'success')
                }
              })


            }

            this.postsService.SeleccionCedula= false;
            this.postsService.Permisotwo.Cedula="0";

        });
    };

    ngOnDestroy(){
        this.PostsSub.unsubscribe();
        this.postsService.SeleccionCedula= false;
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
  checkboxLabel(row?: PermisoThree): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${Number( row.id_Permiso) }`;
  }

  highlight(row){
    this.selectedRowIndex = row.id_Permiso;

    console.log("buscar emple: "+ row.Nombre_Empleado+" "+row.Apellido_Empleado);
    this.buscarEmpleado(row.Nombre_Empleado,row.Apellido_Empleado);
    
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



////////// ver empleados

empleadoSuscribir(){
      
  return new Promise((resolve,reject)=>{

    console.log("a suscribir ");
    var CedulaBus;
    this.PostsSub= this.EmpleadoService.getPostUpdateListener().subscribe
    ((posts:PostThree[])=>{
        this.postsEmpleado=posts;
        this.isLoading=false;
        
        console.log("length is: ",posts.length);
       
        
         
            // console.log("encontrado: "+posts[0].id_Empleado+" "+posts[0].Nombre_Empleado);
            // this.EmpleadoPasar=posts[0];
            // this.CedulaParaPasar.Cedula=posts[0].Cedula;
            //  CedulaBus=posts[0].Cedula;
          
        
    });
    
    resolve(this.posts.length);
  });
}








/////


onCancel(){

  this.postsService.SeleccionCedula= false;
  this.router.navigateByUrl("permisos");
  // this.postsService.postSearch.Cedula=="0";
  // console.log("buscado borrado= "+this.postsService.postSearch);
  //this.postsService.getPosts();
}

controlLista(){
  
}

fillerNav = ['Busqueda de Empleado', 'Nómina', 'Ingreso de Empleado'];



  // onRowClicked(row){

    
    
  //   this.selectedRowIndex = row.id;
  // }
}
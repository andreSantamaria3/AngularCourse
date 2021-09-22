import{Component, Input, OnInit} from "@angular/core";
import { Subscription } from "rxjs";
import {Contratofour, Contratofive,Contratosix} from '../../../Capa_Negocio/Contrato/post.model';
import {PostServicePerm} from '../../../Capa_Negocio/Permiso/post.service';
import {PostServiceContrato} from '../../../Capa_Negocio/Contrato/post.service';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import { ViewEncapsulation } from '@angular/core';
import { ViewChild } from '@angular/core'
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatPaginator} from '@angular/material/paginator';


import {NgForm} from "@angular/forms";

import {ActivatedRoute, ParamMap} from "@angular/router";
import { format } from "mysql2";
import Swal from 'sweetalert2';

@Component({
    selector:'app-Horario-list',
    templateUrl:'./Horario-list.component.html',
    styleUrls:['./Horario-list.component.css'],
    encapsulation: ViewEncapsulation.None

})


export class HorarioListComponent implements OnInit{

  isLoading=false;
   posts :Contratofour[]=[

    ];
    Permisosposts :Contratofour[]=[

    ];
    private PostsSub: Subscription;
     //table data
     displayedColumns: string[] = ['Id_Contrato', 'Nombre_Empleado', 'Apellido_Empleado','Cargo', 'Hora_Inicio_Contrato',
      'Hora_Almuerzo_Inicio_Contrato','Hora_Almuerzo_Final_Contrato','Hora_Fin_Contrato'];
     dataSource = new MatTableDataSource<Contratofour>();
     selection = new SelectionModel<Contratofour>();
     selectedRowIndex ;

     //paginator: MatPaginator;
     dataSourceSeven = new MatTableDataSource<Contratofour>();

     @ViewChild(MatPaginator) paginator: MatPaginator;

  
     


     
    
    constructor(public postsService: PostServiceContrato,public route:ActivatedRoute){
      this.postsService.iniciarElementos();

       

    };


    


    

    /*INIT BUENO*/ 

    ngOnInit(){
    
      this.isLoading=true;
      console.log();
     
        //consulta de horario
       

          this.postsService.getPostsHorario();

       

      
      this.mostrarPermisos();
   

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


      
    };






    mostrarPermisos(){

      console.log("Poner suscribir");
        this.PostsSub= this.postsService.getPostUpdateListenerFour().subscribe
        ((Pposts:Contratofour[])=>{
            this.posts=Pposts;
            console.log("se tiene posts: ");
            this.isLoading=false;
            this.selection = new SelectionModel<Contratofour>(true, []);
            this.dataSource = new MatTableDataSource<Contratofour>(Pposts);
            // paginator
            this.dataSource.paginator = this.paginator;

            console.log("length is: ",Pposts.length);
            // if(posts.length==0){

            //   Swal.fire({
            //     icon: 'error',
            //     title: 'ERROR',
            //     text: 'No se tiene empleados con dicha cedula!'
            //   }).then((result) => {
            //     /* Read more about isConfirmed, isDenied below */
            //     if (result.isConfirmed) {
      
            //       this.onCancel();
            //       //Swal.fire('Saved!', '', 'success')
            //     }
            //   })


            // }

            //this.postsService.Permisotwo.Cedula="0";

        });


    }




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
  checkboxLabel(row?: Contratofour): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${Number( row.Id_Contrato) }`;
  }

  highlight(row){
    this.selectedRowIndex = row.id_Empleado;
    this.postsService.llenarEspacios(row);

    console.log(row);

}



onCancel(){

  // this.postsService.postSearch.Cedula=="0";
  // console.log("buscado borrado= "+this.postsService.postSearch);
  //this.postsService.getPostsPerm();
  //this.postsService.SeleccionCedula== false;
}

controlLista(){
  
}

//fillerNav = ['Busqueda de Empleado', 'Nómina', 'Ingreso de Empleado'];



  // onRowClicked(row){

    
    
  //   this.selectedRowIndex = row.id;
  // }
}
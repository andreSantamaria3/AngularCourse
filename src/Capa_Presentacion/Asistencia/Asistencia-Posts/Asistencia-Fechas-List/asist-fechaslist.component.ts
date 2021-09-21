import{Component, Input, OnInit} from "@angular/core";
import { Subscription } from "rxjs";
import {Asistencia} from '../../../../Capa_Negocio/Asistencia/post.model';
import {Asistenciatwo} from '../../../../Capa_Negocio/Asistencia/post.model';
import {AsistenciaThree} from '../../../../Capa_Negocio/Asistencia/post.model';
import {AsistenciaFour} from '../../../../Capa_Negocio/Asistencia/post.model';
import {AsistenciaFive,AsistenciaSix} from '../../../../Capa_Negocio/Asistencia/post.model';
import {PostServiceAsist} from '../../../../Capa_Negocio/Asistencia/post.service';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import { ViewEncapsulation } from '@angular/core';

import { MatTableExporterDirective } from 'mat-table-exporter';
import { ViewChild } from '@angular/core'



import {NgForm} from "@angular/forms";

import {ActivatedRoute, ParamMap} from "@angular/router";
import { format } from "mysql2";
import Swal from 'sweetalert2';

@Component({
    selector:'app-asistfechas-list',
    templateUrl:'./asist-fechaslist.component.html',
    styleUrls:['./asist-fechaslist.component.css'],
    encapsulation: ViewEncapsulation.None

})
export class AsistFechasListComponent implements OnInit{

  isLoading=false;
   posts :Asistencia[]=[

    ];
    poststwo :Asistenciatwo[]=[

    ];
    postsThree :AsistenciaThree[]=[

    ];
    postsFour :AsistenciaFour[]=[

    ];
    postsFive :AsistenciaFive[]=[

    ];
    postsSix :AsistenciaSix[]=[

    ];








    private PostsSub: Subscription;
     //table data
     displayedColumns: string[] = ['Nombre_Empleado','Apellido_Empleado', 'Fecha_Asistencia', 'Hora_Inicio_Dia'];
     dataSource = new MatTableDataSource<Asistencia>();
     selection = new SelectionModel<Asistencia>();
     selectiontwo = new SelectionModel<Asistenciatwo>();
     selectionThree = new SelectionModel<AsistenciaThree>();
     selectionFour = new SelectionModel<AsistenciaFour>();
     selectionFive = new SelectionModel<AsistenciaFive>();
     selectionSix = new SelectionModel<AsistenciaSix>();

     //para tabla 2

     dataSourcetwo = new MatTableDataSource<Asistenciatwo>();
    
     //para tabla 3
     dataSourcethree = new MatTableDataSource<AsistenciaThree>();
  

     //tabla 4
     dataSourcefour = new MatTableDataSource<AsistenciaFour>();
    


     //tabla 5
     dataSourcefive = new MatTableDataSource<AsistenciaFive>();


     //tabla 6
     dataSourcesix = new MatTableDataSource<AsistenciaSix>();




     selectedRowIndex ;



     
    
    constructor(public postsService: PostServiceAsist,public route:ActivatedRoute){
      this.postsService.iniciarElementos();

       

    };


    


    ngOnInit(){

      console.log("se presenta datos de la nomina? "+ this.postsService.allmode);


      if(this.postsService.allmode==true){


        this.isLoading=true;
      console.log();
      console.log("LA modo de trabajo es: "+this.postsService.PostMode);

      

       if(this.postsService.PostMode==2){
        this.postsService.getPostsFechasAtraso();
        this.mostrarFechasAsis();

      }
      
      
      else if(this.postsService.PostMode==4){
        this.postsService.getPostsFechaFaltas();
        this.mostrarFechasAsis();

      }
       
      


      else{
        
        Swal.fire({
          icon: 'error',
          title: 'ERROR',
          text: 'No se ingreso una opcion Correcta!'
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {

            this.onCancel();
            //Swal.fire('Saved!', '', 'success')
          }
        })



        console.log("No se selecciona una opcion correcta");

      }
      


      }

      else{

        // si no es allmode se debe buscar con la cedula

        console.log("El modo de trabajo es: "+this.postsService.PostMode);

      

        if(this.postsService.PostMode==2){
         this.postsService.getOneFechaatraso();
         this.mostrarFechasAsis();
 
       }
       
       
       else if(this.postsService.PostMode==4){
         this.postsService.getOneFechafaltas();
         this.mostrarFechasAsis();
 
       }
        
       
 
 
       else{
         
         Swal.fire({
           icon: 'error',
           title: 'ERROR',
           text: 'No se ingreso una opcion Correcta!'
         }).then((result) => {
           /* Read more about isConfirmed, isDenied below */
           if (result.isConfirmed) {
 
             this.onCancel();
             //Swal.fire('Saved!', '', 'success')
           }
         })
 
 
 
         console.log("No se selecciona una opcion correcta");
 
       }
      

      }

        



        
    };

 

    //consulta de fechas atrasos y faltas
    mostrarFechasAsis(){

      this.PostsSub= this.postsService.getPostUpdateListenerthree().subscribe
            ((fposts:AsistenciaThree[])=>{
                this.postsThree=fposts;
                this.isLoading=false;
                this.selectionThree = new SelectionModel<AsistenciaThree>(true, []);
                this.dataSourcethree = new MatTableDataSource<AsistenciaThree>(fposts);
                console.log("length is: ",fposts.length);
                if(fposts.length==0){
    
                  Swal.fire({
                    icon: 'error',
                    title: 'ERROR',
                    text: 'No se tiene registros!'
                  }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
          
                      this.onCancel();
                      //Swal.fire('Saved!', '', 'success')
                    }
                  })
    
    
                }
    
                this.postsService.PostMode=10;
    
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
  checkboxLabel(row?: Asistencia): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${Number( row.id_Asistencia) }`;
  }

  highlight(row){
    this.selectedRowIndex = row.Nombre_Empleado;
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
  this.postsService.getPostsAsists();
}

controlLista(){
  
}





@ViewChild(MatTableExporterDirective) matTableExporter: MatTableExporterDirective;
export(){

  this.matTableExporter.exportTable('xlsx',{fileName:'ResumenFechas'});
  
  }












fillerNav = ['Busqueda de Empleado', 'Nómina', 'Ingreso de Empleado'];



  // onRowClicked(row){

    
    
  //   this.selectedRowIndex = row.id;
  // }
}
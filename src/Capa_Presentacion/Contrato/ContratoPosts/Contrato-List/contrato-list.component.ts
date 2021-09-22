import {NgForm,FormControl, Validators} from "@angular/forms";
import {Component,OnInit} from "@angular/core";
import {PostServiceContrato} from '../../../../Capa_Negocio/Contrato/post.service';
import { Contrato, Contratotwo, Contratothree,Contratofive } from "../../../../Capa_Negocio/Contrato/post.model";

import {ActivatedRoute, ParamMap,Router} from "@angular/router";
import { Subscription } from "rxjs";
import { format } from "mysql2";
import Swal from 'sweetalert2';
import {MatPaginator} from '@angular/material/paginator';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import { ViewEncapsulation } from '@angular/core';
import { ViewChild } from '@angular/core'
import { MatTableExporterDirective } from 'mat-table-exporter';






@Component({
    selector:'app-contrato-list',
    templateUrl:'./contrato-list.component.html',
    styleUrls:['./contrato-list.component.css'],
    encapsulation: ViewEncapsulation.None

})


export class ContratoListComponent implements OnInit{

  isLoading=false;
   posts :Contratofive[]=[

    ];
    Permisosposts :Contratofive[]=[

    ];
    private PostsSub: Subscription;
     //table data
     displayedColumns: string[] = ['Id_Contrato', 'Nombre_Empleado', 'Apellido_Empleado', 'Cargo', 'Salario'];
     dataSource = new MatTableDataSource<Contratofive>();
     selection = new SelectionModel<Contratofive>();
     selectedRowIndex ;

     //paginator: MatPaginator;
     dataSourceFive = new MatTableDataSource<Contratofive>();

     @ViewChild(MatPaginator) paginator: MatPaginator;

  
     


     
    
    constructor(public postsService: PostServiceContrato,public route:ActivatedRoute){
      this.postsService.iniciarElementos();

       

    };


    


    ngOnInit(){
    
      this.isLoading=true;
      console.log();


        //presentados
      

          this.postsService.getOnePosContrato();


      

      
     
      this.mostrarPermisos();
   

   

      
    };


    mostrarPermisos(){

      console.log("Poner suscribir");
        this.PostsSub= this.postsService.getPostUpdateListenerFive().subscribe
        ((Pposts:Contratofive[])=>{
            this.posts=Pposts;
            console.log("se tiene posts: ");
            this.isLoading=false;
            this.selection = new SelectionModel<Contratofive>(true, []);
            this.dataSource = new MatTableDataSource<Contratofive>(Pposts);
            // paginator
            this.dataSource.paginator = this.paginator;

            console.log("length is: ",Pposts.length);
        

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
  checkboxLabel(row?: Contratofive): string {
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





@ViewChild(MatTableExporterDirective) matTableExporter: MatTableExporterDirective;
export(){

  this.matTableExporter.exportTable('xlsx',{fileName:'ResumenContratos'});
  
  }







//fillerNav = ['Busqueda de Empleado', 'Nómina', 'Ingreso de Empleado'];



  // onRowClicked(row){

    
    
  //   this.selectedRowIndex = row.id;
  // }
}
import {NgForm,FormControl, Validators} from "@angular/forms";
import {Component,OnInit} from "@angular/core";
import {PostServiceContrato} from '../../../../Capa_Negocio/Contrato/post.service';
import { Contrato, Contratotwo, Contratothree } from "../../../../Capa_Negocio/Contrato/post.model";
import {Dispositivo,Dispositivotwo,Dispositivothree,Dispositivofour} from '../../../../Capa_Negocio/Dispositivo/post.model';
import {PostServiceDisp} from '../../../../Capa_Negocio/Dispositivo/post.service';

import {ActivatedRoute, ParamMap,Router} from "@angular/router";
import { Subscription } from "rxjs";
import { format } from "mysql2";
import Swal from 'sweetalert2';
import {MatPaginator} from '@angular/material/paginator';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import { ViewEncapsulation } from '@angular/core';
import { ViewChild } from '@angular/core'







@Component({
    selector:'app-post-list',
    templateUrl:'./post-list.component.html',
    styleUrls:['./post-list.component.css'],
    encapsulation: ViewEncapsulation.None

})


export class PermisoListComponent implements OnInit{

  isLoading=false;
   posts :Contratothree[]=[

    ];
    postsThree :Dispositivothree[]=[

    ];
    private PostsSub: Subscription;
     //table data
     displayedColumns: string[] = ['Id_Dispositivo', 'Nombre_Empleado', 'Apellido_Empleado', 'Mac_Add', 'IPdis'];
     dataSource = new MatTableDataSource<Dispositivothree>();
     selection = new SelectionModel<Dispositivothree>();
     selectedRowIndex ;

     //paginator: MatPaginator;
     dataSourceThree = new MatTableDataSource<Dispositivothree>();

     @ViewChild(MatPaginator) paginator: MatPaginator;
 
    constructor(public postsServiceDisp: PostServiceDisp,public route:ActivatedRoute){
     // this.postsService.iniciarElementos();

       

    };


    


    ngOnInit(){
    
      this.isLoading=true;
      console.log();


        //presentados
      

          this.postsServiceDisp.getOnePostsDispEmple();


      

      
     
      this.mostrarPermisos();
   

   

      
    };


    mostrarPermisos(){

      console.log("Poner suscribir");
        this.PostsSub= this.postsServiceDisp.getPostUpdateListenerThree().subscribe
        ((Pposts:Dispositivothree[])=>{
            this.postsThree=Pposts;
            console.log("se tiene posts: ");
            this.isLoading=false;
            this.selection = new SelectionModel<Dispositivothree>(true, []);
            this.dataSourceThree = new MatTableDataSource<Dispositivothree>(Pposts);
            // paginator
            this.dataSourceThree.paginator = this.paginator;

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
  checkboxLabel(row?: Dispositivothree): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${Number( row.Id_Dispositivo) }`;
  }

  highlight(row){
    this.selectedRowIndex = row.id_Empleado;
    this.postsServiceDisp.llenarEspacios(row);

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
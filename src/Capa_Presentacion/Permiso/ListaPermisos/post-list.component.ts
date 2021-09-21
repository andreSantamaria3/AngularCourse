import{Component, Input, OnInit} from "@angular/core";
import { Subscription } from "rxjs";
import {Permiso,Permisotwo,PermisoThree,PermisoFour,PermisoFive,PermisoSix} from '../../../Capa_Negocio/Permiso/post.model';
import {PostServicePerm} from '../../../Capa_Negocio/Permiso/post.service';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import { ViewEncapsulation } from '@angular/core';
import { ViewChild } from '@angular/core'
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableExporterDirective } from 'mat-table-exporter';

import {NgForm} from "@angular/forms";

import {ActivatedRoute, ParamMap} from "@angular/router";
import { format } from "mysql2";
import Swal from 'sweetalert2';

@Component({
    selector:'app-post-list',
    templateUrl:'./post-list.component.html',
    styleUrls:['./post-list.component.css'],
    encapsulation: ViewEncapsulation.None

})


export class PermisoListComponent implements OnInit{

  isLoading=false;
   posts :PermisoThree[]=[

    ];
    Permisosposts :PermisoThree[]=[

    ];
    private PostsSub: Subscription;
     //table data
     displayedColumns: string[] = ['id_Permiso', 'Nombre_Empleado', 'Apellido_Empleado', 'Tipo', 'Estado_Permiso','Fecha','Tiempo'];
     dataSource = new MatTableDataSource<PermisoThree>();
     selection = new SelectionModel<PermisoThree>();
     selectedRowIndex ;

     //paginator: MatPaginator;
     dataSourceThree = new MatTableDataSource<PermisoThree>();

     @ViewChild(MatPaginator) paginator: MatPaginator;

  
     


     
    
    constructor(public postsService: PostServicePerm,public route:ActivatedRoute){
      this.postsService.iniciarElementos();

       

    };


    


    ngOnInit(){
    
      this.isLoading=true;
      console.log();
      console.log("LA cedula ingresada es: "+this.postsService.Permisotwo.Cedula);

      console.log("Es seleccion con cedula: "+this.postsService.SeleccionCedula );
      if(this.postsService.SeleccionCedula== false){

        console.log("Es seleccion de atraso-falta-HE: "+this.postsService.SeleccionPermiso );

        //presentados
        if(this.postsService.SeleccionPermiso==1){

          this.postsService.getPermisPresOneMes();


        }
        //aceptados
        else if(this.postsService.SeleccionPermiso==2){

          this.postsService.getPermisAceptOneMes();

        }
        //negados
        else if(this.postsService.SeleccionPermiso==3){

          this.postsService.getPermisNegaOneMes();
        }
        else{
          console.log("OPCION CON ERROR");
        }

      }
      else if(this.postsService.SeleccionCedula== true) {

        console.log("Es seleccion de atraso-falta-HE: "+this.postsService.SeleccionPermiso );

        //presentados con cedula
        if(this.postsService.SeleccionPermiso==1){

          this.postsService.getOnePermisPresenEmple();

        }
        //aceptados con cedula
        else if(this.postsService.SeleccionPermiso==2){

          this.postsService.getOnePermisAcepEmple()
        }
        //negados con cedula
        else if(this.postsService.SeleccionPermiso==3){

          this.postsService.getOnePermisNegEmple();

        }
        else{
          console.log("OPCION CON ERROR");
        }


      }
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
        this.PostsSub= this.postsService.getPostUpdateListenerthree().subscribe
        ((Pposts:PermisoThree[])=>{
            this.posts=Pposts;
            console.log("se tiene posts: ");
            this.isLoading=false;
            this.selection = new SelectionModel<PermisoThree>(true, []);
            this.dataSourceThree = new MatTableDataSource<PermisoThree>(Pposts);
            // paginator
            this.dataSourceThree.paginator = this.paginator;

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

           // this.postsService.Permisotwo.Cedula="0";

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
  checkboxLabel(row?: PermisoThree): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${Number( row.id_Permiso) }`;
  }

  highlight(row){
    this.selectedRowIndex = row.id_Empleado;
    this.postsService.llenarEspacios(row);

    console.log(row);

}



onCancel(){

  // this.postsService.postSearch.Cedula=="0";
  // console.log("buscado borrado= "+this.postsService.postSearch);
  this.postsService.getPostsPerm();
  this.postsService.SeleccionCedula== false;
}

controlLista(){
  
}



@ViewChild(MatTableExporterDirective) matTableExporter: MatTableExporterDirective;
export(){

  this.matTableExporter.exportTable('xlsx',{fileName:'ResumenPermisos'});
  
  }











//fillerNav = ['Busqueda de Empleado', 'Nómina', 'Ingreso de Empleado'];



  // onRowClicked(row){

    
    
  //   this.selectedRowIndex = row.id;
  // }
}
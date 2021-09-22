import {NgForm,FormControl, Validators} from "@angular/forms";
import {Component,OnInit} from "@angular/core";
import {PostServiceDept} from '../../../Capa_Negocio/Departamento/post.service';
import { Departamento, Departamentotwo, DepartamentoThree, DepartamentoFour } from "../../../Capa_Negocio/Departamento/post.model";

import {ActivatedRoute, ParamMap,Router} from "@angular/router";
import { Subscription } from "rxjs";
import { format } from "mysql2";
import Swal from 'sweetalert2';
import {MatPaginator} from '@angular/material/paginator';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import { ViewEncapsulation } from '@angular/core';
import { ViewChild } from '@angular/core'

import {PostService as UserService} from '../../../Capa_Negocio/Usuario/post.service';
import { Observable } from 'rxjs';






@Component({
    selector:'app-departamento-list',
    templateUrl:'./departamento-list.component.html',
    styleUrls:['./departamento-list.component.css'],
    encapsulation: ViewEncapsulation.None

})


export class DepartamentoListComponent implements OnInit{

  isLoading=false;
   posts :Departamento[]=[

    ];
    Departshorts :DepartamentoFour[]=[

    ];
    private PostsSub: Subscription;
     //table data
     displayedColumns: string[] = ['Id_Departamento', 'Nombre_Departamento', 'Descripcion', 'Latitud_Dep1', 'Longitud_Dep1','x_Dep','y_Dep'];
     dataSource = new MatTableDataSource<Departamento>();
     selection = new SelectionModel<Departamento>();
     selectedRowIndex ;

     //paginator: MatPaginator;
     dataSourceThree = new MatTableDataSource<Departamento>();

     @ViewChild(MatPaginator) paginator: MatPaginator;

  
     private empleListenerSubs:Subscription;
     UsuarioEmpleAdmin=false;
     


     
    
    constructor(public UserService:UserService,public postsService: PostServiceDept,public route:ActivatedRoute){
      this.postsService.iniciarElementos();

       

    };


    


    ngOnInit(){
    
      this.isLoading=true;


       //listener de gerente
       this.empleListenerSubs=this.UserService.getEmpleadoListener().subscribe(isAuthenticated=>{

        this.UsuarioEmpleAdmin=isAuthenticated;

    });
      


      console.log();


        //presentados
      

          this.postsService.getPostsDep();


      

      
     
      this.mostrarPermisos();
   

   

      
    };


    mostrarPermisos(){

      console.log("Poner suscribir");
        this.PostsSub= this.postsService.getPostUpdateListener().subscribe
        ((Pposts:Departamento[])=>{
            this.posts=Pposts;
            console.log("se tiene posts: ");
            this.isLoading=false;
            this.selection = new SelectionModel<Departamento>(true, []);
            this.dataSourceThree = new MatTableDataSource<Departamento>(Pposts);
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
  checkboxLabel(row?: Departamento): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${Number( row.Id_Departamento) }`;
  }

  highlight(row){
    this.selectedRowIndex = row.Id_Departamento;
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
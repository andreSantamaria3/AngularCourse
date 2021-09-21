import {NgForm,FormControl, Validators} from "@angular/forms";
import {Component,OnInit} from "@angular/core";
import { Contrato,Contratotwo,Contratothree,Contratofive,Contratosix,ContratoSeven } from "../../../../Capa_Negocio/Contrato/post.model";
import {PostThree} from "../../../../Capa_Negocio/Empleado/post.model";
import {PostService} from "../../../../Capa_Negocio/Empleado/post.service"; 
import { PostServiceContrato } from "../../../../Capa_Negocio/Contrato/post.service";
import {ActivatedRoute, ParamMap,Router} from "@angular/router";
import { Subscription } from "rxjs";
import { format } from "mysql2";
import Swal from 'sweetalert2';
import {MatPaginator} from '@angular/material/paginator';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import { ViewEncapsulation } from '@angular/core';
import { ViewChild } from '@angular/core'

import {PostService as UserService} from '../../../../Capa_Negocio/Usuario/post.service';
import { Observable } from 'rxjs';





@Component({
    selector:'app-movilidad-list',
    templateUrl:'./movilidad-list.component.html',
    styleUrls:['./movilidad-list.component.css'],
    encapsulation: ViewEncapsulation.None

})


export class ListMovilidad implements OnInit{

  isLoading=false;
   posts :Contratothree[]=[

    ];
    Permisosposts :Contratothree[]=[

    ];
    private PostsSub: Subscription;

    ContratoPasar:Contrato;

    postsContrat :Contrato[]=[];

    postsEmpleado:PostThree[]=[];

    EmpleadoPasar:PostThree;
     //table data
     displayedColumns: string[] = ['id_Permiso', 'Nombre_Empleado', 'Apellido_Empleado', 'MovilidadDia'];
     dataSource = new MatTableDataSource<Contratothree>();
     selection = new SelectionModel<Contratothree>();
     selectedRowIndex ;

     //paginator: MatPaginator;
     dataSourceThree = new MatTableDataSource<Contratothree>();

     @ViewChild(MatPaginator) paginator: MatPaginator;

  
     private empleListenerSubs:Subscription;
     UsuarioEmpleAdmin=false;



     
    
    constructor(public UserService:UserService,public postsService: PostServiceContrato,public route:ActivatedRoute,public EmpleadoService:PostService){
     
      //contratos
       this.postsService.getPostsContrats();

       this.contratoSuscribir();

       //empleados

       this.EmpleadoService.getPosts();

       this.empleadoSuscribir();



    };


    


    ngOnInit(){
    
      this.isLoading=true;


        //listener de gerente
        this.empleListenerSubs=this.UserService.getEmpleadoListener().subscribe(isAuthenticated=>{

          this.UsuarioEmpleAdmin=isAuthenticated;
  
      });






      console.log("cedula: "+this.postsService.postSearch.Empleado_idEmpleado.Cedula);

      if(this.postsService.postSearch.Empleado_idEmpleado.Cedula=="0"){
        this.postsService.getPostsMovilidad();
      }
      else{
        this.postsService.getOnePosMovilidad();
      }

      //this.suscribirMovilidad();
     
      this.mostrarPermisos();
    };


    suscribirMovilidad(){


      this.PostsSub= this.postsService.getPostUpdateListenerthree().subscribe
      ((posts:Contratothree[])=>{
          this.posts=posts;
          this.isLoading=false;
          this.selection = new SelectionModel<Contratothree>(true, []);
          this.dataSource = new MatTableDataSource<Contratothree>(posts);
          // paginator
          this.dataSource.paginator = this.paginator;

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

          this.postsService.postSearch.Empleado_idEmpleado.Cedula="0";

      });


    }



    mostrarPermisos(){

      console.log("Poner suscribir");
        this.PostsSub= this.postsService.getPostUpdateListenerthree().subscribe
        ((Pposts:Contratothree[])=>{
            this.posts=Pposts;
            console.log("se tiene posts: ");
            this.isLoading=false;
            this.selection = new SelectionModel<Contratothree>(true, []);
            this.dataSourceThree = new MatTableDataSource<Contratothree>(Pposts);
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
  checkboxLabel(row?: Contratothree): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${Number( row.Id_Contrato) }`;
  }

  highlight(row){
    this.selectedRowIndex = row.Id_Contrato;
    console.log("Id es: "+row.Id_Contrato);
    this.obtenerContrato(row);
    this.postsService.llenarEspacios(row);

    console.log(row);

}



onCancel(){

  // this.postsService.postSearch.Cedula=="0";
  // console.log("buscado borrado= "+this.postsService.postSearch);
  //this.postsService.getPostsPerm();
  //this.postsService.SeleccionCedula== false;
}

contratoSuscribir(){

  return new Promise((resolve,reject)=>{

    console.log("a suscribir ");
    
    this.PostsSub= this.postsService.getPostUpdateListener().subscribe
    ((posts:Contrato[])=>{
        this.postsContrat=posts;
        this.isLoading=false;
        
        console.log("length is: ",posts.length);
       
        console.log("length llenado is: ",this.postsContrat.length);
        
         
            // console.log("encontrado: "+posts[0].id_Empleado+" "+posts[0].Nombre_Empleado);
            // this.EmpleadoPasar=posts[0];
            // this.CedulaParaPasar.Cedula=posts[0].Cedula;
            //  CedulaBus=posts[0].Cedula;
          
        
    });
    //console.log("despues de suscribir: "+this.EmpleadoPasar.Cedula);
    resolve(this.posts.length);
  });
  
}


obtenerContrato(Id_ContratoB:Contratothree){

  console.log("se debe buscar: "+this.postsContrat[0].Empleado_idEmpleado.id_Empleado);
        
  this.ContratoPasar=this.postsContrat.find(p=> p.Id_Contrato=== Id_ContratoB.Id_Contrato);
  console.log("Encontrado es: "+this.ContratoPasar.Empleado_idEmpleado);

  let valor= String(this.ContratoPasar.Empleado_idEmpleado);


  this.EmpleadoPasar=this.postsEmpleado.find(p=> p.id_Empleado=== parseInt(valor));

  console.log("despues de suscribir: "+this.EmpleadoPasar.Cedula);

  console.log("empleado Encontrado: "+this.EmpleadoPasar.Nombre_Empleado+" "+this.EmpleadoPasar.Cedula);

  this.postsService.postSearch.Empleado_idEmpleado=this.EmpleadoPasar;


}



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

//fillerNav = ['Busqueda de Empleado', 'Nómina', 'Ingreso de Empleado'];



  // onRowClicked(row){

    
    
  //   this.selectedRowIndex = row.id;
  // }
}
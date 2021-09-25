import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router"
//login
import{LoginComponent} from './Login/login.component';
//Empleado
import { PostCreateComponent } from "./Empleado/posts/post-create/post-create.component";
import {PostListComponent} from "./Empleado/posts/post-list/post-list.component";
import {PostSearchComponent} from "./Empleado/posts/post-search/post-search.component";
import { EmpleMainComponent } from './Empleado/EmpleMain/empleMain.component';
import {PostOneListComponent} from './Empleado/posts/post-one-in/post-one-list.component';
import {HomeComponent} from "./Principal/home.component";
import {DispoCreateComponent} from "./Dispositivo/DispositivoPosts/Dispositivo-Create/dispo-create.component";
import {ContratoCreateComponent} from "./Contrato/ContratoPosts/Contrato-Create/contrato-create.component";
//Asistencia
import {AsisNomMainComponent} from "./Asistencia/Asistencia-Main-Nomina/AsistNomMain.component";
import {AsistListComponent} from "./Asistencia/Asistencia-Posts/Asistencia-Posts-List/asist-list.component";
import {AsistFechasListComponent} from "./Asistencia/Asistencia-Posts/Asistencia-Fechas-List/asist-fechaslist.component";
import {AsistFHEListComponent} from "./Asistencia/Asistencia-Posts/Asistencia-FHE-List/asist-fhelist.component";
import {AsistFMEListComponent} from "./Asistencia/Asistencia-Posts/Asistencia-FME-List/asist-fmelist.component";
import {AsistTMEListComponent} from "./Asistencia/Asistencia-Posts/Asistencia-TME-List/asist-tmelist.component";
import {AsistTotalListComponent} from "./Asistencia/Asistencia-Posts/Asistencia-Total-List/asist-totallist.component";
import {AsisSelectMainComponent} from "./Asistencia/Asistencia-Seleccion-Main/AsistSelecMain.component";
import {PostAsistSearchComponent} from "./Asistencia/Asistencia-Cedula-In/post-asistsearch.component";
//Permisos
import {PermisoAprobeComponent} from "./Permiso/AprobNegPermi/permiso-aprobe.component";
import {PostPermisoSearchComponent} from "./Permiso/CedulaPermisoBuscar/post-permsearch.component";
import {PostPermisoAskComponent} from "./Permiso/CedulaPermisoPedir/post-permsearch.component";
import {PostPermisoRevComponent} from "./Permiso/CedulaPermisoRevisar/post-permsearch.component";
import {PermisoEstadoMainComponent} from "./Permiso/EstadoPermisoMain/permisoEstadoMain.component";
import {PermisoListComponent} from "./Permiso/ListaPermisos/post-list.component";
import {PermisoCreateComponent} from "./Permiso/PedirPermiso/permiso-create.component";
import {PermisoMainComponent} from "./Permiso/PermisoMain/permisoMain.component";
import {PermisoRevisarMainComponent} from "./Permiso/RevisarEstadoMain/permisoRevisarMain.component";
import {PermisoListRevisarComponent} from "./Permiso/RevisarEstadoPer/permiso-listRevisar.component";
import {PermisoPresenMainComponent} from "./Permiso/SeleccionPendientes/presentadoMain.component";
//horarios
import {HorarioListComponent} from "./Permiso/Horarios/Horario-list.component";
//Movilidad
import {MovilidadMainComponent} from "./Contrato/ContratoPosts/Movilidad Main/MovilidadMain.component";
import {PostCedulaMovilidadComponent} from "./Contrato/ContratoPosts/Cedula Movilidad/post-cedmov.component";
import {ListMovilidad} from "./Contrato/ContratoPosts/Movilidad List/movilidad-list.component";
import {MovilidadEditComponent} from "./Contrato/ContratoPosts/Movilidad Edit/Movilidad-edit.component";
//Contrato
import {CedulaSearchComponent} from "./Contrato/ContratoPosts/Cedula Contrato/post-Contrato.component";
import {ContratoListComponent} from "./Contrato/ContratoPosts/Contrato-List/contrato-list.component";
//departamento
//import {DepartamentoEditComponent} from "./Departamento/Departamento-Edit/departamento-create.component";
import {DepartamentoEditComponent} from "./Departamento/Departamento-Edit/departamento-create.component";
import {DepartamentoListComponent} from "./Departamento/Departamento-List/departamento-list.component";

// guard
import{AuthGuard} from '../Capa_Negocio/Usuario/auth.guard';


 const routes : Routes =[

    {path: 'login',component:LoginComponent,pathMatch:'full'},

    {path:'',component: HomeComponent,canActivate:[AuthGuard]},
    
  


        {
            path:'empleado',
            component:EmpleMainComponent,canActivate:[AuthGuard],
            children:[
                {path: 'search',component:PostSearchComponent,canActivate:[AuthGuard]},
                {path:'list',component: PostListComponent,canActivate:[AuthGuard]},
                {path: 'edit/:id_empleado',component:PostCreateComponent,canActivate:[AuthGuard]},
                {path: 'create',component:PostCreateComponent,canActivate:[AuthGuard]},
                {path: 'onelist',component:PostOneListComponent,canActivate:[AuthGuard]},
                {path: 'contratocre',component:ContratoCreateComponent,canActivate:[AuthGuard]},
                {path: 'dispocre',component:DispoCreateComponent,canActivate:[AuthGuard]},            
                //contrato
                {path: 'cedulaContrato',component:CedulaSearchComponent,canActivate:[AuthGuard]},
                
                {path:'contratolist',component: ContratoListComponent,canActivate:[AuthGuard]},
                
            
    
                //departamento
                {path:'deparlist',component: DepartamentoListComponent,canActivate:[AuthGuard]},
                
                {path: 'deparedit/:Id_Departamento',component:DepartamentoEditComponent,canActivate:[AuthGuard]},
                
             
            ]
        },
        {
            path:'asistencia',
            component:AsisSelectMainComponent,canActivate:[AuthGuard],
            children:[      
                {path:'asiscedula',component: PostAsistSearchComponent,canActivate:[AuthGuard]},
                {path:'asisoption',component: AsisNomMainComponent,canActivate:[AuthGuard],
                children:[
                    {path:'asislist',component: AsistListComponent,canActivate:[AuthGuard]},
                    {path:'asislistfechas',component: AsistFechasListComponent,canActivate:[AuthGuard]},
                    {path:'asislistfhe',component: AsistFHEListComponent,canActivate:[AuthGuard]},
                    {path:'asislistfme',component: AsistFMEListComponent,canActivate:[AuthGuard]},
                    {path:'asislisttme',component: AsistTMEListComponent,canActivate:[AuthGuard]},
                    {path:'asislisttotal',component: AsistTotalListComponent,canActivate:[AuthGuard]}
                ]
                }
            ]
        },
        {
    
            //*************************************Permisos
            path:'permisos',
            component:PermisoMainComponent,canActivate:[AuthGuard],
            children:[
               //ingresa la cedula y pide permiso
                    {path:'permcedula',component: PostPermisoSearchComponent,canActivate:[AuthGuard]},
                    
                        {path:'creapermiso',component: PermisoCreateComponent,canActivate:[AuthGuard]
                    
                },
                //para revisar permiso se selecciona si es de uno o todos
                           //ingresa la cedula y observa permiso
                            //observa permisos
                {path:'permrevisarmain',component: PermisoEstadoMainComponent,canActivate:[AuthGuard],
                children:[
                    {path:'revisacedula',component: PostPermisoRevComponent,canActivate:[AuthGuard]},
                    {path:'seleccionrevisar',component: PermisoPresenMainComponent,canActivate:[AuthGuard],
                    children:[
                        {path:'revisapermiso',component: PermisoListComponent,canActivate:[AuthGuard]}
                    ]
                
                }, 
                                  
                ]
                },
                //para aprobar/negar permiso se selecciona si quiere buscar por cedula o seleccionar
                           //ingresa la cedula y observa permiso a aprobar
                            //observa permisos por aprobar/negar
                {path:'permaprobarmain',component: PermisoRevisarMainComponent,canActivate:[AuthGuard],
                children:[   
                {path:'aprobarcedula',component: PostPermisoAskComponent,canActivate:[AuthGuard]},
                {path:'revisaestadopermiso',component: PermisoListRevisarComponent,canActivate:[AuthGuard]},             
                {path:'apronegapermi/:id_Permiso',component: PermisoAprobeComponent,canActivate:[AuthGuard]}          
                ]
                },
    
                //horario
                {
                    path:'horario',component: HorarioListComponent,canActivate:[AuthGuard]
                },
              
    
    
            ]
        },
    
          //Movilidad
    
          {path:'movilidadmain',component: MovilidadMainComponent,canActivate:[AuthGuard],
          children:[   
          {path:'movilidadcedula',component: PostCedulaMovilidadComponent,canActivate:[AuthGuard]},
          {path:'listamovilidad',component: ListMovilidad,canActivate:[AuthGuard]},             
          {path:'editmovilidad/:Id_Contrato',component: MovilidadEditComponent,canActivate:[AuthGuard]}          
          ]
          }



       

    
    

   
    
];


// const routes : Routes =[

//     {path:'',component: HomeComponent,pathMatch:'full'},
   
//     { path:'empleado/main', component:EmpleMainComponent},
//     {path: 'empleado/main/search',component:PostSearchComponent},
//     {path:'empleado/main/list',component: PostListComponent},
//     {path: 'empleado/main/create',component:PostCreateComponent},
//     {path: 'empleado/main/edit/:idempleado',component:PostCreateComponent}
    
// ];






@NgModule({

    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule],
    providers:[AuthGuard]

})

export class AppRoutingModule{}
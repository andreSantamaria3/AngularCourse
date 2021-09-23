import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatGridListModule} from '@angular/material/grid-list';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { MatTableExporterModule } from 'mat-table-exporter';

import { HTTP_INTERCEPTORS } from 'node_modules/@angular/common/http';
//interceptor
//import{AuthInterceptor} from './Usuario/auth-interceptor';


import {HttpClientModule} from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import { AppComponent } from './app.component';

import{LoginComponent} from './Login/login.component';
import{UserCreateComponent} from './Usuario/Create-User/user-create.component';
import {PostCreateComponent} from './Empleado/posts/post-create/post-create.component';
import { MainHeaderComponent } from './Principal/header/Main-header.component';
import { PostListComponent} from './Empleado/posts/post-list/post-list.component';
import { AppRoutingModule } from './app-routing.module';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { PostSearchComponent } from './Empleado/posts/post-search/post-search.component';
import { EmpleMainComponent } from './Empleado/EmpleMain/empleMain.component';
import { HomeComponent } from './Principal/home.component';
import {DispoCreateComponent} from "./Dispositivo/DispositivoPosts/Dispositivo-Create/dispo-create.component";
import {ContratoCreateComponent} from "./Contrato/ContratoPosts/Contrato-Create/contrato-create.component";
import {AsisNomMainComponent} from "./Asistencia/Asistencia-Main-Nomina/AsistNomMain.component";
import {AsistListComponent} from "./Asistencia/Asistencia-Posts/Asistencia-Posts-List/asist-list.component";
import {AsistFechasListComponent} from "./Asistencia/Asistencia-Posts/Asistencia-Fechas-List/asist-fechaslist.component";
import {AsistFHEListComponent} from "./Asistencia/Asistencia-Posts/Asistencia-FHE-List/asist-fhelist.component";
import {AsistFMEListComponent} from "./Asistencia/Asistencia-Posts/Asistencia-FME-List/asist-fmelist.component";
import {AsistTMEListComponent} from "./Asistencia/Asistencia-Posts/Asistencia-TME-List/asist-tmelist.component";
import {AsistTotalListComponent} from "./Asistencia/Asistencia-Posts/Asistencia-Total-List/asist-totallist.component";
import {PostAsistSearchComponent} from "./Asistencia/Asistencia-Cedula-In/post-asistsearch.component";
import {AsisSelectMainComponent} from "./Asistencia/Asistencia-Seleccion-Main/AsistSelecMain.component";
import {PostOneListComponent} from './Empleado/posts/post-one-in/post-one-list.component';
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




export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserCreateComponent,
    HomeComponent,
    EmpleMainComponent,
    PostCreateComponent,
    MainHeaderComponent,
    PostListComponent,
    PostSearchComponent,
    DispoCreateComponent,
    ContratoCreateComponent,
    AsisNomMainComponent,
    AsistListComponent,
    AsistFechasListComponent,
    AsistFHEListComponent,
    AsistFMEListComponent,
    AsistTMEListComponent,
    AsistTotalListComponent,
    PostAsistSearchComponent,
    AsisSelectMainComponent,
    PostOneListComponent,
    PermisoAprobeComponent,
    PostPermisoSearchComponent,
    PostPermisoAskComponent,
    PostPermisoRevComponent,
    PermisoEstadoMainComponent,
    PermisoListComponent,
    PermisoCreateComponent,
    PermisoMainComponent,
    PermisoRevisarMainComponent,
    PermisoListRevisarComponent,
    PermisoPresenMainComponent,
    HorarioListComponent,
    MovilidadMainComponent,
    PostCedulaMovilidadComponent,
    ListMovilidad,
    MovilidadEditComponent,
    CedulaSearchComponent,
    ContratoListComponent,
    DepartamentoEditComponent,
    DepartamentoListComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    HttpClientModule,
    MatTableModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatSelectModule,
    MatTabsModule,
    MatDatepickerModule,
    MatGridListModule,
    NgxMaterialTimepickerModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatTableExporterModule,
    
    NgxMaskModule.forRoot()
 
    
    
  ],
  providers: [/*{provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi: true}*/],
  bootstrap: [AppComponent]
})
export class AppModule { }

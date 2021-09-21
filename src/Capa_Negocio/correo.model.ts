

export interface CorreoCrear{

    
     NombreUser: string;
     PassUser: string;
      
 }


 export interface CorreoPedir{

     CorreoGerente: string;
     NombreUser: string;
     ApellidoUser: string;
     TipoPermiso: string;
     FechaPermiso: string;
     
 }


 export interface CorreoAprobar{

    CorreoEmpleado: string;
    TipoPermiso: string;
    FechaPermiso: string;
    Verificado: string;
   
}
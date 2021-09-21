

import { Post, PostThree, Postwo } from "../../Capa_Negocio/Empleado/post.model";

export interface Permiso{

    id_Permiso:Number,
    Empleado_idEmpleado:PostThree;
    //Cedula:string;
    Tipo: string;
    Descripcion: string;
    Estado_Permiso: string;
    Fecha:Date;
    tiempo: number;

    
}
export interface PermisoCed{

    
    //id_Asistencia:Number;
    Cedula: string;

    
}




export interface Permisotwo{

    
    Id_Permiso:Number;
    Empleado_idEmpleado:PostThree;

    
}





//para vistas con los permisos aceptados, presentados,negados de atraso,faltas,extra
export interface PermisoThree{

   id_Permiso:Number;
    Nombre_Empleado: string;
    Apellido_Empleado: string;
    Tipo: string;
    Estado_Permiso: string;
    Fecha: Date,
    Tiempo: Number;

    
}

//para vista total de permisos de atrasos, faltas,  horas extra
export interface PermisoFour{


    Nombre_Empleado:string,
    Apellido_Empleado:string,
    Total: Number;   
}

//vista movilidad
export interface PermisoFive{


    
    Nombre_Empleado:string,
    Apellido_Empleado:string,
    Fecha_Asistencia:Date;
    Movilidad_Dia: Number;
    Movilidad_Permitida: Number;   
}

//vista movilidad
export interface PermisoSix{


    Nombre_Empleado:string,
    Apellido_Empleado:string,
    Movilidad_Permitida: Number;
    Total_Exceso_Movilidad:number;   
}


export interface PermisoSeven{

     id_Contrato:Number;
     Nombre_Empleado: string;
     Apellido_Empleado: string;
     Cargo: string;
     Hora_Inicio_Contrato: Date;
     Hora_Almuerzo_Inicio_Contrato: Date,
     Hora_Almuerzo_Final_Contrato: Date;
     Hora_Fin_Contrato: Date;
 
     
 }

import { Post, PostThree, Postwo } from "../../Capa_Negocio/Empleado/post.model";
export interface Dispositivo{

    Id_Dispositivo:Number,
    Empleado_idEmpleado: PostThree;
    Mac_Add: string;
    IPdis: string;
    Nombre_SO: string;
    Activo:string;
    

    
}

export interface Dispositivotwo{

    
    Id_Dispositivo:Number;
    Empleado_idEmpleado: PostThree;

    
}



//dispositivo cedula
export interface Dispositivothree{

    Id_Dispositivo:Number,
    Nombre_Empleado:string;
    Apellido_Empleado:string;
    Mac_Add: string;
    IPdis: string;    
}

export interface Dispositivofour{

    
    //id_Asistencia:Number;
    Cedula: String;

    
}

import { Departamento } from "../../Capa_Negocio/Departamento/post.model";

// export interface Post{

//     Nombre_Empleado: string;
//     Apellido_Empleado: string;
//     Cedula: string;
// }

export interface Post{

   // id_Empleado:Number,
    Departamento_idDepartamento:Departamento,
    Nombre_Empleado: string;
    Apellido_Empleado: string;
    Cedula: string;
    Direccion:string;
    Telefono: string;
    Correo: string;

    
}

export interface Postwo{

    
    Cedula: string;

    
}
export interface PostThree{

    id_Empleado:Number,
    Departamento_idDepartamento:Departamento,
    Nombre_Empleado: string;
    Apellido_Empleado: string;
    Cedula: string;
    Direccion:string;
    Telefono: string;
    Correo: string;

    
}





import { Post, PostThree, Postwo } from "../../Capa_Negocio/Empleado/post.model";

export interface Contrato{

    

    Id_Contrato:Number;
    Empleado_idEmpleado:PostThree;
    Fecha_Inicio: string;
    Salario: number;
    Cargo: string;
    Movilidad: number;
    Hora_Inicio_Contrato:string;
    Hora_Almuerzo_Inicio_Contrato: string;
    Hora_Almuerzo_Final_Contrato: string;
    Hora_Fin_Contrato: string;

    
}

export interface Contratotwo{

    
    Id_Contrato:Number;
    Empleado_idEmpleado:PostThree;

    
}

//PARA VER Movilidad
export interface Contratothree{

    
    Id_Contrato:Number;
    Nombre_Empleado: string;
    Apellido_Empleado: string;
    MovilidadDia:Number;

    
}


//PARA VER HORARIO

export interface Contratofour{

    
    Id_Contrato:Number;
    Nombre_Empleado: string;
    Apellido_Empleado: string;
    Cargo: string;
    Hora_Inicio_Contrato:string;
    Hora_Almuerzo_Inicio_Contrato: string;
    Hora_Almuerzo_Final_Contrato: string;
    Hora_Fin_Contrato: string;

    
}


//PARA VER Contrato
export interface Contratofive{

    
    Id_Contrato:Number;
    Nombre_Empleado: string;
    Apellido_Empleado: string;
    Cargo: string;
    Salario: number;
    

    
}


//editar contrato
export interface Contratosix{

    
    Id_Contrato:Number;
    Nombre_Empleado: string;
    Apellido_Empleado: string;
    Fecha_Inicio: string;
    Salario: number;
    Cargo: string;
    Movilidad: number;    
}


export interface ContratoSeven{

    
    //id_Asistencia:Number;
    Cedula: String;

    
}



export interface Contratoeight{

    
    Id_Contrato:Number;
    Nombre_Empleado: string;
    Apellido_Empleado: string;
    Cargo: string;
    Salario: number;
    

    
}
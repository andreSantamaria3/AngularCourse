


import { Time } from "@angular/common";
import { Post, PostThree, Postwo } from "../../Capa_Negocio/Empleado/post.model";

export interface Asistencia{


    id_Asistencia:Number,
    Empleado_idEmpleado: PostThree;
    Fecha_Asistencia: Date;
    Hora_Inicio_Dia: Time;
    Hora_Almuerzo_Inicio_Dia: Time;
    Hora_Almuerzo_Fin_Dia:Time;
    Hora_Fin: Time;
    Movilidad_Dia: number;

    
}

export interface Asistenciatwo{

    
    //id_Asistencia:Number;
    Cedula: String;

    
}

//para vista fechas de atrasos y fechas de faltas
export interface AsistenciaThree{


    Nombre_Empleado:String,
    Apellido_Empleado:String,
    Fecha_Asistencia: Date,
    Hora_Inicio_Dia: Time;

    
}

//para vista total de atrasos, faltas, permisos , horas extra
export interface AsistenciaFour{


    Nombre_Empleado:String,
    Apellido_Empleado:String,
    Total: Number;   
}

// para vista de fechas de horas extra
export interface AsistenciaFive{


    Nombre_Empleado:String,
    Apellido_Empleado:String,
    Fecha_Asistencia: Date,
    Hora_Inicio_Dia: Time,
    Hora_Fin: Time;

    
}

// para vista de total de movilidad excedida
export interface AsistenciaSix{


    id_Empleado:Number,
    Nombre_Empleado:String,
    Apellido_Empleado:String,
    Movilidad_Permitida: Number,
    Total_Exceso_Movilidad: Number;

    
}

// para vista de fechas de movilidad excedida
export interface AsistenciaSeven{


    id_Asistencia:Number,
    Nombre_Empleado:String,
    Apellido_Empleado:String,
    Fecha_Asistencia: Date,
    Movilidad_Dia: Number,
    Movilidad_Permitida: Number;

    
}
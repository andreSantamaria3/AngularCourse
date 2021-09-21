

// export interface Post{

//     Nombre_Empleado: string;
//     Apellido_Empleado: string;
//     Cedula: string;
// }

export interface Departamento{

    Id_Departamento:Number,
    Nombre_Departamento: string;
    //Nombre_Dept: Enumerator;
    Descripcion: string;
    Latitud_Dep1: number;
    Longitud_Dep1:number;
    x_Dep: number;
    y_Dep: number;

    
}

export interface Departamentotwo{

    
    Id_Departamento:Number;

    
}


// para vista de empleados en un departamento

export interface DepartamentoThree{

    id_Empleado:Number,
    Nombre_Empleado: string;
    Apellido_Empleado: string;
    Cedula: string;
    Telefono: string;
    Direccion:string;
    Correo: string;
    NOmbre_Departamento: string;

    
}



//departamento por empleados
export interface DepartamentoFour{

    id_Departamento:Number,
    Nombre_Empleado: string;
    Apellido_Empleado: string;
    Nombre_Departamento: string;
    Descripcion: string;
}


export interface DepartamentoFive{

    
    Cedula:string;

    
}
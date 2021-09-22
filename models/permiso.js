const db=require('../utils/database');

module.exports= class Permiso{


    //constructor(){}

    constructor(/*PermisoIN*/
        id_Permiso,
        Empleado_idEmpleado,
        //Cedula,
        Tipo,
        Descripcion,
        Estado_Permiso,
        Fecha,
        tiempo){
        
        //this.PermisoIN=PermisoIN;
        this.id_Permiso=id_Permiso,
        this.Empleado_idEmpleado=Empleado_idEmpleado,
        //this.Cedula=Cedula,
        this.Tipo=Tipo,
        this.Descripcion=Descripcion,
        this.Estado_Permiso=Estado_Permiso,
        this.Fecha=Fecha,
        this.tiempo=tiempo

    }

static fetchAllAsis(){
    return db.execute('SELECT * FROM Permiso');
}

static fetchOneAsis(Cedula){
    return db.execute("select * from Permiso where  Empleado_idEmpleado in (select id_Empleado from Empleado where Cedula=?)",[Cedula]);
}


static post(id_EmpleadoIn,Tipo,Descripcion,Estado_Permiso,Fecha,tiempo){

    return db.execute("INSERT INTO Permiso (Permiso.Tipo,Empleado_idEmpleado,Permiso.Descripcion,Permiso.Estado_Permiso,Permiso.Fecha,Permiso.tiempo) VALUES (?,?,?,?,?,?)",[Tipo,id_EmpleadoIn,Descripcion,Estado_Permiso,Fecha,tiempo]);
}

static update(id_Permiso,Empleado_idEmpleado,Tipo,Descripcion,Estado_Permiso,Fecha,tiempo){

    
    return db.execute('UPDATE Permiso SET Tipo=?,Descripcion=?,Estado_Permiso=?,Fecha=?,tiempo=? and Empleado_idEmpleado=? where id_Permiso=? '
    ,[Tipo,Descripcion,Estado_Permiso,Fecha,tiempo,Empleado_idEmpleado,id_Permiso]);
}

static delete(Id_Permiso){

    console.log(Id_Permiso);
    return db.execute("DELETE FROM Permiso WHERE Id_Permiso =? ",[Id_Permiso]);
}

static postt(Tipo,Permiso_Empleado_idEmpleado,Descripcion,Permiso_Estado_Permiso,Fecha,tiempo){

    console.log(Permiso_Empleado_idEmpleado);
    return db.execute("INSERT INTO Permiso (Tipo,Permiso.Empleado_idEmpleado,Descripcion,Permiso.Estado_Permiso,Fecha,tiempo)"+
    " VALUES (?,?,?,?,?,?) ",[Tipo,Permiso_Empleado_idEmpleado,Descripcion,Permiso_Estado_Permiso,Fecha,tiempo]);
}




//////////VISTAS PERMISOS 

// //vista permisos aceptados de faltas
// static ViewPermisoAcepFalta(){
//     return db.execute('select * from VistaPermisosAceptadosFaltas;');
// }

// // vista permisos negados de faltas
// static ViewPermisoNegFalta(){
//     return db.execute('select * from VistaPermisosNegadosFaltas;');
// }

// // vista permisos presentados de faltas
// static ViewPermisoPresFalta(){
//     return db.execute('select * from VistaPermisosPresentadosFaltas;');
// }
// // vista total permisos  de faltas
// static ViewTotPermisoFalta(){
//     return db.execute('select * from VistaTotalPermisosFaltas;');
// }



// // vista permisos aceptados horas Extra
// static ViewPermAceptHoraExtra(){
//     return db.execute('select * from VistaPermisosAceptadosHorasExtra;');
// }

// // vista permisos Negados horas Extra
// static ViewPermNegaHoraExtra(){
//     return db.execute('select * from VistaPermisosNegadosHorasExtra;');
// }
// // vista permisos Presentados horas Extra
// static ViewPermPresenHoraExtra(){
//     return db.execute('select * from VistaPermisosPresentadosHorasExtra;');
// }
// // vista total permisos  de horas Extra
// static ViewTotPermisoHoraExtra(){
//     return db.execute('select * from VistaTotalPermisosHorasExtra;');
// }




// // vista permisos aceptados atrasos
// static ViewPermAceptAtraso(){
//     return db.execute('select * from VistaPermisosAtrasoAceptados;');
// }

// // vista permisos Negados atrasos
// static ViewPermNegaAtraso(){
//     return db.execute('select * from VistaPermisosAtrasoNegados;');
// }
// // vista permisos Presentados atrasos
// static ViewPermPresenAtraso(){
//     return db.execute('select * from VistaPermisosAtrasoPresentados;');
// }
// // vista permisos total atrasos
// static ViewTotPermisoAtraso(){
//     return db.execute('select * from VistaTotalPermisosAtraso;');
// }





// /***************Vistas MOVILIDAD TODOS ***************/
// /******ver las fechas donde hay exceso de movilidad******/

// static VistaFechasExcesoMovilidad(){
//     return db.execute('select * from VistaFechasExcesoMovilidad;');
// }

// /******Vista  total de Exceso Movilidad******/
// static VistaTotalExcesoMovilidad(){
//     return db.execute('select * from VistaTotalExcesoMovilidad;');
// }



// /*********************************POR EMPLEADO**********************************/
// /*ACEPTADOS*/ 
// /*permisos aceptados de atraso de un empleado*/

// static PermiAcepAtraso(Empleado_cedula){
//     return db.execute("select Nombre_Empleado,Apellido_Empleado, Permiso.Tipo,Permiso.Estado_Permiso,Permiso.Fecha,Permiso.Tiempo from Empleado inner join Permiso on Permiso.Empleado_idEmpleado=Empleado.id_Empleado where Permiso.Fecha between (CURDATE() - INTERVAL 1 MONTH ) and CURDATE() and Permiso.Estado_Permiso= ? and Permiso.Tipo=? and Empleado.Cedula =?",["Aceptado","Atraso",Empleado_cedula]);
// }


// /*permisos aceptados de hora extra de un empleado*/
// static PermiAcepHoExtra(Empleado_cedula){
//     return db.execute("select Nombre_Empleado,Apellido_Empleado, Permiso.Tipo,Permiso.Estado_Permiso,Permiso.Fecha,Permiso.Tiempo from Empleado inner join Permiso on Permiso.Empleado_idEmpleado=Empleado.id_Empleado where Permiso.Fecha between (CURDATE() - INTERVAL 1 MONTH ) and CURDATE() and Permiso.Estado_Permiso=? and Permiso.Tipo=? and Empleado.Cedula =?",["Aceptado","Hora Extra",Empleado_cedula]);
// }



// /*permisos aceptados de faltas de un empleado*/
// static PermiAcepFalta(Empleado_cedula){
//     return db.execute("select Nombre_Empleado,Apellido_Empleado, Permiso.Tipo,Permiso.Estado_Permiso,Permiso.Fecha,Permiso.Tiempo from Empleado inner join Permiso on Permiso.Empleado_idEmpleado=Empleado.id_Empleado where Permiso.Fecha between (CURDATE() - INTERVAL 1 MONTH ) and CURDATE() and Permiso.Estado_Permiso=? and Permiso.Tipo=? and Empleado.Cedula=?",["Aceptado","Falta",Empleado_cedula]);
// }

// /*NEGADOS*/ 

// /*permisos negados de atraso de un empleado*/
// static PermiNegaAtraso(Empleado_cedula){
//     return db.execute("select Nombre_Empleado,Apellido_Empleado, Permiso.Tipo,Permiso.Estado_Permiso,Permiso.Fecha,Permiso.Tiempo from Empleado inner join Permiso on Permiso.Empleado_idEmpleado=Empleado.id_Empleado where Permiso.Fecha between (CURDATE() - INTERVAL 1 MONTH ) and CURDATE() and Permiso.Estado_Permiso=? and Permiso.Tipo=? and Empleado.Cedula=?",["Negado","Atraso",Empleado_cedula]);
// }

// /*permisos negados de hora extra de un empleado*/
// static PermiNegaHoraExtra(Empleado_cedula){
//     return db.execute("select Nombre_Empleado,Apellido_Empleado, Permiso.Tipo,Permiso.Estado_Permiso,Permiso.Fecha,Permiso.Tiempo from Empleado inner join Permiso on Permiso.Empleado_idEmpleado=Empleado.id_Empleado where Permiso.Fecha between (CURDATE() - INTERVAL 1 MONTH ) and CURDATE() and Permiso.Estado_Permiso=? and Permiso.Tipo=? and Empleado.Cedula=?",["Negado","Hora Extra",Empleado_cedula]);
// }

// /*permisos negados de faltas de un empleado*/
// static PermiNegaFalta(Empleado_cedula){
//     return db.execute("select Nombre_Empleado,Apellido_Empleado, Permiso.Tipo,Permiso.Estado_Permiso,Permiso.Fecha,Permiso.Tiempo from Empleado inner join Permiso on Permiso.Empleado_idEmpleado=Empleado.id_Empleado  where Permiso.Fecha between (CURDATE() - INTERVAL 1 MONTH ) and CURDATE() and Permiso.Estado_Permiso=? and Permiso.Tipo=? and Empleado.Cedula=?",["Negado","Falta",Empleado_cedula]);
// }

// /*PRESENTADOS */

// /*permisos presentados de atraso de un empleado*/
// static PermiPresenAtraso(Empleado_cedula){
//     return db.execute("select Nombre_Empleado,Apellido_Empleado, Permiso.Tipo,Permiso.Estado_Permiso,Permiso.Fecha,Permiso.Tiempo from Empleado inner join Permiso on Permiso.Empleado_idEmpleado=Empleado.id_Empleado  where Permiso.Fecha between (CURDATE() - INTERVAL 1 MONTH ) and CURDATE() and Permiso.Estado_Permiso=? and Permiso.Tipo=? and Empleado.Cedula=?",["Presentado","Atraso",Empleado_cedula]);
// }

// /*permisos presentados de hora extra de un empleado*/
// static PermiPresenHoraExtra(Empleado_cedula){
//     return db.execute("select Nombre_Empleado,Apellido_Empleado, Permiso.Tipo,Permiso.Estado_Permiso,Permiso.Fecha,Permiso.Tiempo from Empleado inner join Permiso on Permiso.Empleado_idEmpleado=Empleado.id_Empleado  where Permiso.Fecha between (CURDATE() - INTERVAL 1 MONTH ) and CURDATE() and Permiso.Estado_Permiso=? and Permiso.Tipo=? and Empleado.Cedula=?",["Presentado","Hora Extra",Empleado_cedula]);
// }

// /*permisos presentados de faltas de un empleado*/
// static PermiPresenFalta(Empleado_cedula){
//     return db.execute("select Nombre_Empleado,Apellido_Empleado, Permiso.Tipo,Permiso.Estado_Permiso,Permiso.Fecha,Permiso.Tiempo from Empleado inner join Permiso on Permiso.Empleado_idEmpleado=Empleado.id_Empleado where Permiso.Fecha between (CURDATE() - INTERVAL 1 MONTH ) and CURDATE() and Permiso.Estado_Permiso=? and Permiso.Tipo=? and Empleado.Cedula=?",["Presentado","Falta",Empleado_cedula]);
// }




/********************* PErmisos aceptados 1 mes ***********/
static PermiAcepOneMes(){
    return db.execute("select * from VistaPermisosAceptados30Total;");
}
/********************* PErmisos presentados 1 mes ***********/
static PermiPresenOneMes(){
    return db.execute("select * from VistaPermisosPresentados30Total;");
}
/********************* PErmisos presentados 8 dias ***********/
static PermiPresenEightDay(){
    return db.execute("select * from VistaPermisosPresentados8Total;");
}
/********************* PErmisos negados 1 mes ***********/
static PermiNegaOneMes(){
    return db.execute("select * from VistaPermisosNegados30Total;");
}
/****************TODOS LOS PERMISOS DE UN EMPLEADO****************/
static PermiEmpleOne(Empleado_cedula){
    return db.execute("select Nombre_Empleado,Apellido_Empleado, Permiso.Tipo,Permiso.Estado_Permiso,Permiso.Fecha,Permiso.Tiempo from Empleado inner join Permiso on Permiso.Empleado_idEmpleado=Empleado.id_Empleado where Permiso.Fecha and Permiso.Fecha between (CURDATE() - INTERVAL 1 MONTH ) and CURDATE() and Empleado.Cedula=?",[Empleado_cedula]);
}




/*********************************FECHAS**************************************/

/**************************************ATRASOS**********************/

/******fechas de atraso de un empleado******/
static FechasAtrasoEmpleado(Empleado_cedula){
    return db.execute("select Empleado.Nombre_Empleado,Empleado.Apellido_Empleado,Fecha_Asistencia from Asistencia inner join Empleado on Empleado.id_Empleado=Asistencia.Empleado_idEmpleado inner join Contrato on Contrato.Empleado_idEmpleado=Asistencia.Empleado_idEmpleado where  Hora_Inicio_Dia>Contrato.Hora_Inicio_Contrato and Fecha_Asistencia between (CURDATE() - INTERVAL 1 MONTH ) and CURDATE() and Empleado.Cedula=?",[Empleado_cedula]);
}

/**************************************Hora Extra**********************/


/******fechas de hora extra de un empleado******/
static FechasHoraExtraEmpleado(Empleado_cedula){
    return db.execute("select Empleado.Nombre_Empleado,Empleado.Apellido_Empleado,Fecha_Asistencia from Asistencia inner join Empleado on Empleado.id_Empleado=Asistencia.Empleado_idEmpleado inner join Contrato on Contrato.Empleado_idEmpleado=Empleado.id_Empleado where  Hora_Inicio_Dia>Contrato.Hora_Inicio_Contrato and Hora_Fin>Contrato.Hora_Fin_Contrato and Fecha_Asistencia between (CURDATE() - INTERVAL 1 MONTH ) and CURDATE() and Empleado.Cedula=?",[Empleado_cedula]);
}

/**************************************FALTAS**********************/

/******fechas de faltas con permisos de un empleado******/
static FechasFaltaEmpleado(Empleado_cedula){
    return db.execute("select Empleado.Nombre_Empleado,Empleado.Apellido_Empleado,Fecha_Asistencia from Asistencia inner join Empleado on Empleado.id_Empleado=Asistencia.Empleado_idEmpleado where Fecha_Asistencia in (select Permiso.Fecha from Empleado inner join Permiso on Permiso.Empleado_idEmpleado=Empleado.id_Empleado) and Hora_Inicio_Dia=? and Hora_Fin=? and Fecha_Asistencia between (CURDATE() - INTERVAL 1 MONTH ) and CURDATE() and Empleado.Cedula=?",["00:00:00","00:00:00",Empleado_cedula]);
}



/*********************************TOTAL**************************************/

/**************************************ATRASOS**********************/

/******Total de atraso de un empleado******/
static TotalAtrasoEmpleado(Empleado_cedula){
    return db.execute("select Empleado.Nombre_Empleado,Empleado.Apellido_Empleado,count(Fecha_Asistencia) as Total from Asistencia inner join Empleado on Empleado.id_Empleado=Asistencia.Empleado_idEmpleado inner join Contrato on Contrato.Empleado_idEmpleado=Asistencia.Empleado_idEmpleado where  Hora_Inicio_Dia>Contrato.Hora_Inicio_Contrato and Fecha_Asistencia between (CURDATE() - INTERVAL 1 MONTH ) and CURDATE() and Empleado.Cedula=?",[Empleado_cedula]);
}


/**************************************Hora Extra**********************/


/******Total de hora extra de un empleado******/
static TotalHorExtraEmpleado(Empleado_cedula){
    return db.execute("select Empleado.Nombre_Empleado,Empleado.Apellido_Empleado,count(Fecha_Asistencia) as Total from Asistencia inner join Empleado on Empleado.id_Empleado=Asistencia.Empleado_idEmpleado inner join Contrato on Contrato.Empleado_idEmpleado=Empleado.id_Empleado where  Hora_Inicio_Dia>Contrato.Hora_Inicio_Contrato and Hora_Fin>Contrato.Hora_Fin_Contrato and Fecha_Asistencia between (CURDATE() - INTERVAL 1 MONTH ) and CURDATE() and Empleado.Cedula=?",[Empleado_cedula]);
}



/**************************************FALTAS**********************/
/******total de faltas de un empleado******/
static TotalFaltaEmpleado(Empleado_cedula){
    return db.execute("select Empleado.Nombre_Empleado,Empleado.Apellido_Empleado,count(Fecha_Asistencia) as Total from Asistencia inner join Empleado on Empleado.id_Empleado=Asistencia.Empleado_idEmpleado where  Hora_Inicio_Dia=? and Hora_Fin=? and Fecha_Asistencia between (CURDATE() - INTERVAL 1 MONTH ) and CURDATE() and Empleado.Cedula=?",["00:00:00","00:00:00",Empleado_cedula]);
}








/***************Vistas MOVILIDAD EMPLEADO ***************/
/******Total Fechas Exceso Movilidad Empleado******/
static TotalExcesMovEmpleado(Empleado_cedula){
    return db.execute("select distinct Nombre_Empleado,Apellido_Empleado,Asistencia.Fecha_Asistencia,Asistencia.Movilidad_Dia, Contrato.Movilidad as Movilidad_Permitida from Empleado inner join Contrato on Contrato.Empleado_idEmpleado=Empleado.id_Empleado inner join Asistencia on Asistencia.Empleado_idEmpleado= Empleado.id_Empleado where Asistencia.Fecha_Asistencia between (CURDATE() - INTERVAL 1 MONTH ) and CURDATE() and Contrato.Movilidad<Asistencia.Movilidad_Dia and Empleado.Cedula=?",[Empleado_cedula]);
}



/******Vista  total de Exceso Movilidad Empleado******/
static FechasMoviEmpleado(Empleado_cedula){
    return db.execute("select distinct  Nombre_Empleado,Apellido_Empleado,Contrato.Movilidad as Movilidad_Permitida  , count(Asistencia.Fecha_Asistencia)as Total_Exceso_Movilidad from Empleado inner join Contrato on Contrato.Empleado_idEmpleado=Empleado.id_Empleado inner join Asistencia on Asistencia.Empleado_idEmpleado= Empleado.id_Empleado where Asistencia.Fecha_Asistencia between (CURDATE() - INTERVAL 1 MONTH ) and CURDATE() and Contrato.Movilidad<Asistencia.Movilidad_Dia and Empleado.Cedula=?",[Empleado_cedula]);
}



/***************Ingreso de Permiso con Cedula ***************/
/******Ingreso usando la cedula******/

static post(Cedula,Tipo,Descripcion,Estado_Permiso,Fecha,tiempo){

    return db.execute("INSERT INTO Permiso (Empleado_idEmpleado,Tipo,Descripcion,Estado_Permiso,Fecha,tiempo) VALUES "+ 
    "( (select id_Empleado from Empleado where Cedula= ?) "+
    ",?,?,?,?,?)",[Cedula,Tipo,Descripcion,Estado_Permiso,Fecha,tiempo]);
}

/******Vista  total de Exceso Movilidad Empleado******/
static TodosPermisosUnEmpleado(Empleado_cedula){
    return db.execute("select Nombre_Empleado,Apellido_Empleado, Permiso.Tipo,Permiso.Estado_Permiso,Permiso.Fecha,Permiso.Tiempo from Empleado"
    +" inner join Permiso on Permiso.Empleado_idEmpleado=Empleado.id_Empleado where Permiso.Fecha" + 
    " and Permiso.Fecha between (CURDATE() - INTERVAL 1 MONTH ) and CURDATE() and Empleado.Cedula=?",[Empleado_cedula]);
}













/************* PARA TODOS LOS EMPLEADOS *************/

/******Vista  permisos negados de 30 dias de todos Empleado******/
static VistaPermisosNegados30Total(){
    return db.execute("select * from VistaPermisosNegados30Total;");
}


/******Vista  permisos negados de 30 dias de todos Empleado******/
static VistaPermisosAceptados30Total(){
    return db.execute("select * from VistaPermisosAceptados30Total;");
}

/******Vista  permisos negados de 30 dias de todos Empleado******/
static VistaPermisosPresentados30Total(){
    return db.execute("select * from VistaPermisosPresentados30Total;");
}

/******Vista  permisos negados de 30 dias de todos Empleado******/
static VistaPermisosPresentados8Total(){
    return db.execute("select * from select * from VistaPermisosPresentados8Total;");
}

/******Vista  permisos de 30 dias de todos Empleado******/
static VistaPermisosTotal(){
    return db.execute("select * from VistaPermisos30Total;");
}




/***************************PARA UN EMPLEADO***********************************/

/*****************PERMISOS ACEPTADOS**************** */
static TodosPermisosUnEmpleadoAceptado(Empleado_cedula){
    return db.execute("select Nombre_Empleado,Apellido_Empleado, Permiso.Tipo,Permiso.Estado_Permiso,Permiso.Fecha,Permiso.Tiempo from Empleado"
    + " inner join Permiso on Permiso.Empleado_idEmpleado=Empleado.id_Empleado" + 
    " where Permiso.Fecha and Permiso.Fecha between (CURDATE() - INTERVAL 1 MONTH ) and CURDATE()" + 
    " and Permiso.Estado_Permiso=? and Empleado.Cedula=?",["Aceptado",Empleado_cedula]);
}

/*****************PERMISOS PRESENTADOS 30**************** */
static TodosPermisosUnEmpleadoPresentado30(Empleado_cedula){
    return db.execute("select Nombre_Empleado,Apellido_Empleado, Permiso.Tipo,Permiso.Estado_Permiso,Permiso.Fecha,Permiso.Tiempo from Empleado"
    + " inner join Permiso on Permiso.Empleado_idEmpleado=Empleado.id_Empleado" + 
    " where Permiso.Fecha and Permiso.Fecha between (CURDATE() - INTERVAL 1 MONTH ) and CURDATE()" + 
    " and Permiso.Estado_Permiso=? and Empleado.Cedula=?",["Presentado",Empleado_cedula]);
}

/*****************PERMISOS PRESENTADOS 8**************** */
static TodosPermisosUnEmpleadoPresentado8(Empleado_cedula){
    return db.execute("select Permiso.id_Permiso,Nombre_Empleado,Apellido_Empleado, Permiso.Tipo,Permiso.Estado_Permiso,Permiso.Fecha,Permiso.Tiempo from Empleado"+
    " inner join Permiso on Permiso.Empleado_idEmpleado=Empleado.id_Empleado" 
   + " where  Permiso.Fecha between CURDATE() and  (CURDATE() + INTERVAL 8 day )"
   + "and Permiso.Estado_Permiso=? and Empleado.Cedula=?",["Presentado",Empleado_cedula]);
}


/*****************PERMISOS NEGADOS**************** */
static TodosPermisosUnEmpleadoNEgado(Empleado_cedula){
    return db.execute("select Nombre_Empleado,Apellido_Empleado, Permiso.Tipo,Permiso.Estado_Permiso,Permiso.Fecha,Permiso.Tiempo from Empleado"
    + " inner join Permiso on Permiso.Empleado_idEmpleado=Empleado.id_Empleado" + 
    " where Permiso.Fecha and Permiso.Fecha between (CURDATE() - INTERVAL 1 MONTH ) and CURDATE()" + 
    " and Permiso.Estado_Permiso=? and Empleado.Cedula=?",["Negado",Empleado_cedula]);
}


/*****************PERMISOS TODOS**************** */
static TodosPermisosUnEmpleado(Empleado_cedula){
    return db.execute("select Nombre_Empleado,Apellido_Empleado, Permiso.Tipo,Permiso.Estado_Permiso,Permiso.Fecha,Permiso.Tiempo from Empleado"
    + " inner join Permiso on Permiso.Empleado_idEmpleado=Empleado.id_Empleado where Permiso.Fecha " 
    + " and Permiso.Fecha between (CURDATE() - INTERVAL 1 MONTH ) and CURDATE()"
    + "and Empleado.Cedula=?",["Negado",Empleado_cedula]);
}




};
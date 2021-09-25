const db=require('../utils/database');

module.exports= class Asistencia{


    //constructor(){}

    constructor(/*AsistenciaIN*/ 
        Empleado_idEmpleado,
        Fecha_Asistencia,
        Hora_Inicio_Dia,
        Hora_Almuerzo_Inicio_Dia,
        Hora_Almuerzo_Fin_Dia,
        Hora_Fin,
        Movilidad_Dia){
        
        //this.AsistenciaIN=AsistenciaIN;
        
        this.Empleado_idEmpleado=Empleado_idEmpleado,
        this.Fecha_Asistencia=Fecha_Asistencia,
        this.Hora_Inicio_Dia=Hora_Inicio_Dia,
        this.Hora_Almuerzo_Inicio_Dia=Hora_Almuerzo_Inicio_Dia,
        this.Hora_Almuerzo_Fin_Dia=Hora_Almuerzo_Fin_Dia,
        this.Hora_Fin=Hora_Fin,
        this.Movilidad_Dia=Movilidad_Dia

    }



static fetchAllAsist(){
    return db.execute('select * from Asistencia');
}

//buscar asistencias por empleado
static fetchOne(id){
    return db.execute("SELECT * FROM Asistencia where  Empleado_idEmpleado =?",[id]);
}


//crear una asistencia para dia, solo se ingresa la fecha y las horas se deja en 00:00
static post(Empleado_idEmpleado,Fecha_Asistencia,Hora_Inicio_Dia,Hora_Almuerzo_Inicio_Dia,Hora_Almuerzo_Fin_Dia,Hora_Fin,Movilidad_Dia){

    return db.execute("INSERT INTO Asistencia (Empleado_idEmpleado,Fecha_Asistencia,Hora_Inicio_Dia,Hora_Almuerzo_Inicio_Dia,Hora_Almuerzo_Fin_Dia,Hora_Fin,Movilidad_Dia) VALUES (?,?,?,?,?,?,?)",[Empleado_idEmpleado,Fecha_Asistencia,Hora_Inicio_Dia,Hora_Almuerzo_Inicio_Dia,Hora_Almuerzo_Fin_Dia,Hora_Fin,Movilidad_Dia]);
}
//modificar dicha asisitencia para llenar las horas de cada dia y al final insertar la movilidad

//modificar para la hora de ingreso
static updateHoraIN(Empleado_idEmpleado,Fecha_Asistencia,Hora_Inicio_Dia){

    
    return db.execute('UPDATE Asistencia SET Hora_Inicio_Dia=? where  Empleado_idEmpleado =? and Fecha_Asistencia=?',[Hora_Inicio_Dia,Empleado_idEmpleado,Fecha_Asistencia]);
}
//modificar para la hora de inicio almuerzo
static updateHoraInLunch(Empleado_idEmpleado,Fecha_Asistencia,Hora_Almuerzo_Inicio_Dia){

    
    return db.execute('UPDATE Asistencia SET Hora_Almuerzo_Inicio_Dia=?where  Empleado_idEmpleado =? and Fecha_Asistencia=?',[Hora_Almuerzo_Inicio_Dia,Empleado_idEmpleado,Fecha_Asistencia]);
}
//modificar hora fin de almuerzo
static updateHoraEndLunch(Empleado_idEmpleado,Fecha_Asistencia,Hora_Almuerzo_Fin_Dia){

    
    return db.execute('UPDATE Asistencia SET Hora_Almuerzo_Fin_Dia=? where  Empleado_idEmpleado =? and Fecha_Asistencia=?',[Hora_Almuerzo_Fin_Dia,Empleado_idEmpleado,Fecha_Asistencia]);
}
//modificar hora salida de empresa
static updateHoraEnd(Empleado_idEmpleado,Fecha_Asistencia,Hora_Fin){

    
    return db.execute('UPDATE Asistencia SET Hora_Fin=? where  Empleado_idEmpleado =? and Fecha_Asistencia=?',[Hora_Fin,Empleado_idEmpleado,Fecha_Asistencia]);
}
//modificar movilidad del dia
static updateMovilidad(Empleado_idEmpleado,Fecha_Asistencia,Movilidad_Dia){

    
    return db.execute('UPDATE Asistencia SET Movilidad_Dia=? where  Empleado_idEmpleado =? and Fecha_Asistencia=?',[Movilidad_Dia,Empleado_idEmpleado,Fecha_Asistencia]);
}




//modificar toda la asistencia
static updateAsistencia(Empleado_idEmpleado,Fecha_Asistencia,Hora_Inicio_Dia,Hora_Almuerzo_Inicio_Dia,Hora_Almuerzo_Fin_Dia,Hora_Fin,Movilidad_Dia){

    
    return db.execute('UPDATE Asistencia SET Hora_Inicio_Dia=?,Hora_Almuerzo_Inicio_Dia=?,Hora_Almuerzo_Fin_Dia=?,Hora_Fin=?,Movilidad_Dia=? where  Empleado_idEmpleado =? and Fecha_Asistencia=?',[Hora_Inicio_Dia,Hora_Almuerzo_Inicio_Dia,Hora_Almuerzo_Fin_Dia,Hora_Fin,Movilidad_Dia,Empleado_idEmpleado,Fecha_Asistencia]);
}
//Borrar Asistencia
static delete(id){

    console.log(id);
    return db.execute("DELETE FROM Asistencia WHERE id_Asistencia =?",[id]);
}

// Vistas con los atrasos, faltas y horas extra
//******* */ vistas para atrasos*****


//vista fechas de atrasos

static ViewFechaAtraso(){
    return db.execute('select * from VistaFechasAtraso;');
}

//vista total de atrasos por empleado

static ViewTotalAtraso(){
    return db.execute('select * from VistaTotalAtrasos;');
}

//vista de fechas con faltas

static ViewFechaFalta(){
    return db.execute('select * from VistaFechasFaltas;');
}
// vista total de faltas
static ViewTotalFalta(){
    return db.execute('select * from VistaTotalFaltas;');
}

// vista fechas de horas Extra
static ViewFechaHoraExtra(){
    return db.execute('select * from VistaFechasHoraSalidaTarde;');
}

// vista total de horas Extra
static ViewTotalHoraExtra(){
    return db.execute('select * from VistaTotalHorasExtra;');
}


// vista Fechas de movilidad excedida
static ViewFechasMovilidadExtra(){
    return db.execute('select * from VistaFechasExcesoMovilidad;');
}



// vista total de movilidad excedida
static ViewTotalDiasMovilidadExe(){
    return db.execute('select * from VistaTotalExcesoMovilidad;');
}





// consultas con cedula de empleado

//buscar para un empleado fechas de atraso
static fetchOneFechatraso(cedula){
    

    return db.execute("select Empleado.Nombre_Empleado,Empleado.Apellido_Empleado,Fecha_Asistencia, Hora_Inicio_Dia from Asistencia inner join Empleado on Empleado.id_Empleado=Asistencia.Empleado_idEmpleado inner join Contrato on Contrato.Empleado_idEmpleado=Asistencia.Empleado_idEmpleado where "+
    "Hora_Inicio_Dia>Contrato.Hora_Inicio_Contrato and Fecha_Asistencia between (CURDATE() - INTERVAL 1 MONTH ) and CURDATE() and Empleado.Cedula=?",[cedula]);
     
}


//buscar para un empleado total de atraso
static fetchOneTotatraso(cedula){
  

    return db.execute("select Empleado.Nombre_Empleado,Empleado.Apellido_Empleado,count(Fecha_Asistencia) as Total from Asistencia "+
"    inner join Empleado on Empleado.id_Empleado=Asistencia.Empleado_idEmpleado "+
"    inner join Contrato on Contrato.Empleado_idEmpleado=Asistencia.Empleado_idEmpleado "+
"    where  Hora_Inicio_Dia>Contrato.Hora_Inicio_Contrato "+
"    and Fecha_Asistencia between (CURDATE() - INTERVAL 1 MONTH ) and CURDATE() "+    
    "and Empleado.Cedula=?",[cedula]);
     
}



//buscar para un empleado fechas de faltas
static fetchOneFechaFalta(cedula){
    

    return db.execute("select Empleado.Nombre_Empleado,Empleado.Apellido_Empleado,Fecha_Asistencia, Hora_Inicio_Dia from Asistencia "+
     "inner join Empleado on Empleado.id_Empleado=Asistencia.Empleado_idEmpleado "+
     "where  Hora_Inicio_Dia='00:00:00' and Hora_Fin='00:00:00' "+
    "and Fecha_Asistencia between (CURDATE() - INTERVAL 1 MONTH ) and CURDATE() "+ 
    "and Empleado.Cedula=?",[cedula]);
     
}




//buscar para un empleado total de faltas
static fetchOneTotalFalta(cedula){
    

    return db.execute(
    "select Empleado.Nombre_Empleado,Empleado.Apellido_Empleado,count(Fecha_Asistencia) as Total from Asistencia"+
" inner join Empleado on Empleado.id_Empleado=Asistencia.Empleado_idEmpleado"+
" where  Hora_Inicio_Dia='00:00:00' and Hora_Fin='00:00:00'"+
    " and Fecha_Asistencia between (CURDATE() - INTERVAL 1 MONTH ) and CURDATE()"+ 
    " and Empleado.Cedula=?",[cedula]);
     
}

//buscar para un empleado fechas de horas Extra
static fetchOneFHE(cedula){
    

    return db.execute(
    "select Empleado.Nombre_Empleado,Empleado.Apellido_Empleado,Fecha_Asistencia, Hora_Inicio_Dia,Hora_Fin from Asistencia"+
 " inner join Empleado on Empleado.id_Empleado=Asistencia.Empleado_idEmpleado"+
" inner join Contrato on Contrato.Empleado_idEmpleado=Asistencia.Empleado_idEmpleado"+
" where  Fecha_Asistencia between (CURDATE() - INTERVAL 1 MONTH ) and CURDATE()"+
" and Hora_Fin>Contrato.Hora_Fin_Contrato"+ 
    " and Empleado.Cedula=?",[cedula]);
     
}

//buscar para un empleado total de horas Extra
static fetchOneTHE(cedula){
    

    return db.execute(
    "select Empleado.Nombre_Empleado,Empleado.Apellido_Empleado,count(Fecha_Asistencia) as Total from Asistencia"+
" inner join Empleado on Empleado.id_Empleado=Asistencia.Empleado_idEmpleado"+
" inner join Contrato on Contrato.Empleado_idEmpleado=Asistencia.Empleado_idEmpleado"+
" where  Hora_Fin>Contrato.Hora_Fin_Contrato"+
" and Fecha_Asistencia between (CURDATE() - INTERVAL 1 MONTH ) and CURDATE()"    + 
    " and Empleado.Cedula=?",[cedula]);
     
}

//buscar para un empleado fechas de movilidad Extra
static fetchOneFechasFME(cedula){
    

    return db.execute(
    "select distinct Asistencia.id_Asistencia ,Nombre_Empleado,Apellido_Empleado,Asistencia.Fecha_Asistencia,Asistencia.Movilidad_Dia,Contrato.Movilidad as Movilidad_Permitida from Empleado"+
" inner join Contrato on Contrato.Empleado_idEmpleado=Empleado.id_Empleado"+
" inner join Asistencia on Asistencia.Empleado_idEmpleado= Empleado.id_Empleado"+
" where Asistencia.Fecha_Asistencia between (CURDATE() - INTERVAL 1 MONTH ) and CURDATE()"+
" and Contrato.Movilidad<Asistencia.Movilidad_Dia"    + 
    " and Empleado.Cedula=?",[cedula]);
     
}

//buscar para un empleado total de movilidad Extra
static fetchOneTotalFME(cedula){
    

    return db.execute(
    "select distinct  Empleado.id_Empleado,Nombre_Empleado,Apellido_Empleado,Contrato.Movilidad as Movilidad_Permitida , count(Asistencia.Fecha_Asistencia)as Total from Empleado"+
" inner join Contrato on Contrato.Empleado_idEmpleado=Empleado.id_Empleado"+
" inner join Asistencia on Asistencia.Empleado_idEmpleado= Empleado.id_Empleado"+
" where Asistencia.Fecha_Asistencia between (CURDATE() - INTERVAL 1 MONTH ) and CURDATE()"+
" and Contrato.Movilidad<Asistencia.Movilidad_Dia "    + 
    " and Empleado.Cedula=?",[cedula]);
     
}


//buscar para un empleado las asistencias
static fetchOneAsists(cedula){
    

    return db.execute(
    "select * from Asistencia"+ 
    " inner join Empleado on Empleado.id_Empleado=Asistencia.Empleado_idEmpleado"+
    " where Empleado.Cedula=?",[cedula]); 
      
}




};
const db=require('../utils/database');

module.exports= class Contrato{


    //constructor(){}

    constructor(/*ContratoIN*/Empleado_idEmpleado,
        Fecha_Inicio,
        Salario,
        Cargo,
        Movilidad,
        Hora_Inicio_Contrato,
        Hora_Almuerzo_Inicio_Contrato,
        Hora_Almuerzo_Final_Contrato,
        Hora_Fin_Contrato){
        
        //this.ContratoIN=ContratoIN;

        this.Empleado_idEmpleado=Empleado_idEmpleado,
        this.Fecha_Inicio=Fecha_Inicio,
        this.Salario=Salario,
        this.Cargo=Cargo,
        this.Movilidad=Movilidad,
        this.Hora_Inicio_Contrato=Hora_Inicio_Contrato,
        this.Hora_Almuerzo_Inicio_Contrato=Hora_Almuerzo_Inicio_Contrato,
        this.Hora_Almuerzo_Final_Contrato=Hora_Almuerzo_Final_Contrato,
        this.Hora_Fin_Contrato=Hora_Fin_Contrato
        

    }

static fetchAllDep(){
    return db.execute('select * from Contrato');
}

static fetchOne(id){
    return db.execute("SELECT * FROM Contrato where  Empleado_idEmpleado =?",[id]);
}


//para ver un contrato el gerente
static fetchOneGerente(id){
    console.log("buscar en query: "+id);
    return db.execute("SELECT * FROM Contrato  where  Empleado_idEmpleado =? ",[id],(err,rows,fields)=>{
        if(err) throw err;
                  rows = JSON.stringify(rows);
                  message.reply(rows);

    });
}



static post(Empleado_idEmpleado,Fecha_Inicio,Salario,Cargo,Movilidad,Hora_Inicio_Contrato,Hora_Almuerzo_Inicio_Contrato,Hora_Almuerzo_Final_Contrato,Hora_Fin_Contrato){

    return db.execute("INSERT INTO Contrato (Empleado_idEmpleado,Fecha_Inicio,Salario,Cargo,Movilidad,Hora_Inicio_Contrato,Hora_Almuerzo_Inicio_Contrato,Hora_Almuerzo_Final_Contrato,Hora_Fin_Contrato) VALUES (?,?,?,?,?,?,?,?,?)",[Empleado_idEmpleado,Fecha_Inicio,Salario,Cargo,Movilidad,Hora_Inicio_Contrato,Hora_Almuerzo_Inicio_Contrato,Hora_Almuerzo_Final_Contrato,Hora_Fin_Contrato]);
}

static update(Id_Contrato,Empleado_idEmpleado,Fecha_Inicio,Salario,Cargo,Movilidad,Hora_Inicio_Contrato,Hora_Almuerzo_Inicio_Contrato,Hora_Almuerzo_Final_Contrato,Hora_Fin_Contrato){

    
    return db.execute('UPDATE Contrato SET Fecha_Inicio=?,Salario=?,Cargo=?,Movilidad=?,Hora_Inicio_Contrato=?,Hora_Almuerzo_Inicio_Contrato=?,Hora_Almuerzo_Final_Contrato=?,Hora_Fin_Contrato=? where Id_Contrato=? and Empleado_idEmpleado=?'
    ,[Fecha_Inicio,Salario,Cargo,Movilidad,Hora_Inicio_Contrato,Hora_Almuerzo_Inicio_Contrato,Hora_Almuerzo_Final_Contrato,Hora_Fin_Contrato,Id_Contrato,Empleado_idEmpleado]);
}

static delete(id){

    console.log(id);
    return db.execute("DELETE FROM Contrato WHERE Id_Contrato =?",[id]);
}


//Vista para contrato empleado

static fetchContratoEmpleado(){
    return db.execute('select * from VistaContratoEmpleado;');
}

static fetchOneContrato(cedula){
  

    return db.execute("select Id_Contrato,Empleado.Nombre_Empleado, Empleado.Apellido_Empleado, "
    +"Contrato.Cargo, Contrato.Salario "
    +"from Empleado "
     +"inner join Contrato on Contrato.Empleado_idEmpleado=Empleado.id_Empleado "
    +"where Empleado.Cedula=?",[cedula]);
     
}


//update contrato
static updateContrato(Fecha_Inicio,Salario,Cargo,Movilidad,Cedula){

    
    return db.execute("UPDATE Contrato SET Movilidad=? ,Fecha_Inicio=?, Salario=?,Cargo=? where Id_Contrato in (select Id_Contrato "
        +"from Contrato " 
        +"inner join Empleado on Contrato.Empleado_idEmpleado=Empleado.id_Empleado "
        +"where Empleado.Cedula=?);",[Movilidad,Fecha_Inicio,Salario,Cargo,Cedula]);
}






//*************** */ PARA VER HORARIOS
static fetchHorario(){
    return db.execute('select * from VistaHorariosEmpleados');
}

static fetchOneHorario(cedula){
  

    return db.execute("select Id_Contrato,Empleado.Nombre_Empleado, Empleado.Apellido_Empleado, " 
    +"Contrato.Cargo, Contrato.Hora_Inicio_Contrato,Contrato.Hora_Almuerzo_Inicio_Contrato,Contrato.Hora_Almuerzo_Final_Contrato,Contrato.Hora_Fin_Contrato "
    +"from Empleado "  
    +"inner join Contrato on Contrato.Empleado_idEmpleado=Empleado.id_Empleado "
    +"where Empleado.Cedula=?",[cedula]);
     
}


//*****************PARA VER MOVILIDAD

static fetchMovilidad(){
    return db.execute('select * from VistaMovilidadEmpleados');
}

static fetchOneMovilidad(cedula){
  

    return db.execute("select Id_Contrato,Empleado.Nombre_Empleado, Empleado.Apellido_Empleado, " 
    +"Contrato.Movilidad as MovilidadDia from Empleado " 
    +"inner join Contrato on Contrato.Empleado_idEmpleado=Empleado.id_Empleado "
    +"where Empleado.Cedula=?",[cedula]);
     
}

// Para editar movilidad

static updateMovilidad(Cedula,Movilidad){

    
    return db.execute("UPDATE Contrato SET Movilidad=? where Id_Contrato =? ",[Movilidad,Cedula]);
}





//Ver un contrato

static fetchOneContrat(IdEmpleado){
  

    return db.execute("select * from Contrato "+
    "where Empleado_idEmpleado=?",[IdEmpleado]);
     
}

};
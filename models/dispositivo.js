const db=require('../utils/database');

module.exports= class Dispositivo{


    //constructor(){}

    constructor(/*DispositivoIN*/ Id_Dispositivo,

        Empleado_idEmpleado, 
        Mac_Add, 
        IPdis,
        Nombre_SO, 
        Activo){
        
        // this.DispositivoIN=DispositivoIN;
        this.Id_Dispositivo=Id_Dispositivo,
        this.Empleado_idEmpleado=Empleado_idEmpleado;
        this.Mac_Add=Mac_Add;
        this.IPdis=IPdis;
        this.Nombre_SO=Nombre_SO;
        this.Activo=Activo;


    }

static fetchAllDisp(){
    return db.execute('SELECT * FROM Dispositivo');
}

static fetchOne(Empleado_idEmpleado){
    return db.execute("SELECT * FROM Dispositivo where  Empleado_idEmpleado =?",[Empleado_idEmpleado]);
}


static post(Empleado_idEmpleado,Mac_Add,IP,Nombre_SO,Activo){

    return db.execute("INSERT INTO Dispositivo (Empleado_idEmpleado,Mac_Add,IPdis,Nombre_SO,Activo) VALUES (?,?,?,?,?)",[Empleado_idEmpleado,Mac_Add,IP,Nombre_SO,Activo]);
}

static update(Id_Dispositivo,Empleado_idEmpleado,Mac_Add,IP,Nombre_SO,Activo){

    
    return db.execute('UPDATE Dispositivo SET Mac_Add=?,IPdis=?,Nombre_SO=?,Activo=? where Id_Dispositivo=? and Empleado_idEmpleado=?'
    ,[Mac_Add,IP,Nombre_SO,Activo,Id_Dispositivo,Empleado_idEmpleado]);
}

static delete(Id_Dispositivo,Empleado_idEmpleado){

    console.log(id);
    return db.execute("DELETE FROM Dispositivo WHERE Id_Dispositivo =? and Empleado_idEmpleado=?",[Id_Dispositivo,Empleado_idEmpleado]);
}



/****************************DISPOSITIVO  */
//Dispositivo por empleado
static fetchDispEmple(Cedula){
    return db.execute("select Id_Dispositivo,Empleado.Nombre_Empleado, Empleado.Apellido_Empleado, "
    +"Dispositivo.Mac_Add, Dispositivo.IPdis "
     +"from Empleado " 
    +"inner join Dispositivo on Dispositivo.Empleado_idEmpleado=Empleado.id_Empleado "
    +"where Empleado.Cedula=?;",[Cedula]);
}



//update disposiivo
static updateDispo(Mac_Add,Cedula){

    
    return db.execute("UPDATE Dispositivo SET Mac_add=? where Id_Dispositivo in (select Id_Dispositivo "
        +" from   Dispositivo "
        +"inner join Empleado on Dispositivo.Empleado_idEmpleado=Empleado.id_Empleado "
       +"where Empleado.Cedula=?);",[Mac_Add,Cedula]);
}



//Ver un dispositivo

static fetchOneDisp(IdEmpleado){
  

    return db.execute("select * from Dispositivo "+
    "where Empleado_idEmpleado=?",[IdEmpleado]);
     
}












};
const db=require('../utils/database');
module.exports= class Empleado{
    constructor(/*EmpleadoIN*/
        Departamento_idDepartamento,
        Nombre_Empleado,
        Apellido_Empleado,
        Cedula,
        Telefono,
        Direccion,
        Correo
    ){
        this.Departamento_idDepartamento=Departamento_idDepartamento,
        this.Nombre_Empleado=Nombre_Empleado,
        this.Apellido_Empleado=Apellido_Empleado,
        this.Cedula=Cedula,
        this.Telefono=Telefono,
        this.Direccion=Direccion,
        this.Correo=Correo
    }
static fetchAll(){
    return db.execute('SELECT * FROM Empleado');
}

static fetchOne(Cedula){
    return db.execute("SELECT * FROM Empleado where  Cedula =?",[Cedula]);
}


static post(Departamento_idDepartamento,Nombre_Empleado,Apellido_Empleado,Cedula,Telefono,Direccion,Correo_Empleado){

    return db.execute("INSERT INTO Empleado (Departamento_idDepartamento,Nombre_Empleado, Apellido_Empleado, Cedula, Telefono, Direccion,Correo) VALUES (?,?,?,?,?,?,?)",[Departamento_idDepartamento,Nombre_Empleado,Apellido_Empleado,Cedula,Telefono,Direccion,Correo_Empleado]);
}

static update(id,Departamento_idDepartamento,Nombre_Empleado,Apellido_Empleado,Cedula,Telefono,Direccion,Correo_Empleado){

    
    return db.execute('UPDATE Empleado SET Departamento_idDepartamento=?,Nombre_Empleado=?, Apellido_Empleado=?, Cedula=?, Telefono=?, Direccion=?, Correo=? Where id_Empleado=?',[Departamento_idDepartamento,Nombre_Empleado,Apellido_Empleado,Cedula,Telefono,Direccion,Correo_Empleado,id]);
}

static delete(id){

    console.log("id a eliminar "+id);
    return db.execute("DELETE FROM Empleado WHERE id_Empleado =?",[id]);
}

};
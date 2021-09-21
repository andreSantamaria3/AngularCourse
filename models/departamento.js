const db=require('../utils/database');

module.exports= class Departamento{


    //constructor(){}

    constructor(/*DepartamentoIN*/
        Nombre_Departamento,
        Descripcion,
        Latitud_Dep1,
        Longitud_Dep1,
        x_Dep,
        y_Dep
    ){
        
        //this.DepartamentoIN=DepartamentoIN;
        
        this.Nombre_Departamento=Nombre_Departamento,
        this.Descripcion=Descripcion,
        this.Latitud_Dep1=Latitud_Dep1,
        this.Longitud_Dep1=Longitud_Dep1,
        this.x_Dep=x_Dep,
        this.y_Dep=y_Dep

    }

static fetchAllDepUser(){
    return db.execute('select id_Departamento,Nombre_Departamento from Departamento');
}


static fetchAllDep(){
    return db.execute('select * from Departamento');
}

static fetchOne(id){
    return db.execute("SELECT * FROM Departamento where  Id_Departamento =?",[id]);
}

// static fetchOneName(id){
//     return db.execute("SELECT Nombre_Departamento FROM Departamento where  Id_Departamento =?",[id]);
// }


static post(Departamento_idDepartamento,Nombre_Empleado,Apellido_Empleado,Cedula,Telefono,Direccion,Correo_Empleado){

    return db.execute("INSERT INTO Empleado (Departamento_idDepartamento,Nombre_Empleado, Apellido_Empleado, Cedula, Telefono, Direccion,Correo_Empleado) VALUES (?,?,?,?,?,?)",[Departamento_idDepartamento,Nombre_Empleado,Apellido_Empleado,Cedula,Telefono,Direccion,Correo_Empleado]);
}

static update(Id_Departamento,Nombre_Departamento,Descripcion,Latitud_Dep1,Longitud_Dep1,x_Dep,y_Dep){

    
    return db.execute('UPDATE Departamento SET Nombre_Departamento=?,Descripcion=?,Latitud_Dep1=?,Longitud_Dep1=?,x_Dep=?,y_Dep=? Where Id_Departamento=?'
    ,[Nombre_Departamento,Descripcion,Latitud_Dep1,Longitud_Dep1,x_Dep,y_Dep,Id_Departamento]);
}

static delete(id){

    console.log(id);
    return db.execute("DELETE FROM Empleado WHERE idEmpleado =?",[id]);
}



/*Departamento con Empleados*/

static ViewEmpleadoDepartamento(){
    return db.execute('select * from VistaDepartamentoEmpleados;');
}

//busqueda por empleado
static OneEmpleadoDepartamento(Cedula){

    
    return db.execute("select Id_Departamento,Empleado.Nombre_Empleado, Empleado.Apellido_Empleado "
    +"Departamento.Nombre_Departamento, Departamento.Descripcion "
    +"from Empleado " 
     +"inner join Departamento on Departamento.Id_Departamento=Empleado.Departamento_idDepartamento "
    +"where Empleado.Cedula=?",[Cedula]);
}




};
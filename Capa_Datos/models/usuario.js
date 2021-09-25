const db=require('../utils/database');
module.exports= class Usuario{
    constructor(
       // id_Usuario, 
        Empleado_idEmpleado,
         User_Name,
         Password, 
    ){
       // this.id_Usuario=id_Usuario, 
        this.Empleado_idEmpleado=Empleado_idEmpleado,
        this.User_Name=User_Name,
        this.Password=Password
    }
static fetchAll(){
    return db.execute('SELECT * FROM Usuario');
}

static fetchOne(User_Name){
    console.log("buscar en query: "+User_Name);
    return db.execute("SELECT * FROM Usuario WHERE User_Name=?  ",[User_Name],(err,rows,fields)=>{
        if(err) throw err;
                  rows = JSON.stringify(rows);
                  message.reply(rows);

    });
}
//and Password=?;


// Ver correos y cargos
static fetchCargo(){
    console.log("buscar en query cargos: ");
    let Gerente="Gerente";
    let RRHH="RRHH";
    return db.execute("select User_Name, Usuario.Empleado_idEmpleado,Contrato.Cargo " 
    +"  from Usuario "+ 
    " inner join Contrato on Contrato.Empleado_idEmpleado=Usuario.Empleado_idEmpleado "
    +"where (Contrato.Cargo=? or Contrato.Cargo=? );  ",[Gerente,RRHH]
    );
}




static fetchOneQ(User_Name){
    console.log("buscar en query: "+User_Name);
    return db.query("SELECT * FROM Usuario WHERE User_Name=?  ",[User_Name]);
}


static post(idEmpleado,User_Name,Password){

    return db.execute("INSERT INTO Usuario (Empleado_idEmpleado,User_Name,Password) VALUES (?,?,?)",[idEmpleado,User_Name,Password]);
}

static update(id,Departamento_idDepartamento,Nombre_Empleado,Apellido_Empleado,Cedula,Telefono,Direccion,Correo_Empleado){

    
    return db.execute('UPDATE Empleado SET Departamento_idDepartamento=?,Nombre_Empleado=?, Apellido_Empleado=?, Cedula=?, Telefono=?, Direccion=?, Correo=? Where id_Empleado=?',[Departamento_idDepartamento,Nombre_Empleado,Apellido_Empleado,Cedula,Telefono,Direccion,Correo_Empleado,id]);
}

static delete(id){

    console.log("id a eliminar "+id);
    return db.execute("DELETE FROM Empleado WHERE id_Empleado =?",[id]);
}

};
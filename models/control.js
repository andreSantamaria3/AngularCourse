const db=require('../utils/database');

module.exports=UserPos=class{




    //constructor(){}

    constructor( mac,
        name,
		cedula,
        id_Empleado,
		areaEmple,
        PosLng,
        PosLat,
        PosX,
        PosY,
        lat,
        long,
        x,
        y,
        time,
		horaInicio,
		horaInicioAlmuerzo,
		horaFinAlmuerzo,
		horaFin,
		MovilidadPermitida,
		distancias,
		APname,
		CompararPosicion,
		CompararTiempos,
		movilidadDiaria,
        encontrado,
		estado,
		estadoONE,
		calcular

		){
        
        
        this.mac=mac;
        this.name=name;
		this.cedula=cedula;
        this.id_Empleado=id_Empleado;
		this.areaEmple=areaEmple;
        this.PosLng=PosLng;
        this.PosLat=PosLat;
        this.PosX=PosX;
        this.PosY=PosY;
        this.lat=lat;
        this.long=long;
        this.x=x;
        this.y=y;
        this.time=time;
		this.horaInicio=horaInicio,
		this.horaInicioAlmuerzo=horaInicioAlmuerzo,
		this.horaFinAlmuerzo=horaFinAlmuerzo,
		this.horaFin=horaFin,
		this.MovilidadPermitida=MovilidadPermitida,
		this.distancias=distancias;
		this.APname=APname;
		this.CompararPosicion=CompararPosicion;
		this.CompararTiempos=CompararTiempos;
		this.movilidadDiaria=movilidadDiaria;
        this.encontrado=encontrado;
		this.estado=estado;
		this.estadoONE=estadoONE;
		this.calcular=calcular

    }



    static fetchAllControl(){
        return db.execute("select Dispositivo.Mac_Add,Empleado.Nombre_Empleado, Empleado.Cedula,Empleado.id_Empleado, " +
       " Departamento.Nombre_Departamento,Contrato.Movilidad " +
        " from Empleado inner join Dispositivo on Dispositivo.Empleado_idEmpleado=Empleado.id_Empleado " +
        " inner join Contrato on Contrato.Empleado_idEmpleado=Empleado.id_Empleado " +
        "inner join Departamento on Departamento.Id_Departamento=Empleado.Departamento_idDepartamento;",[],(err,rows,fields)=>{
            if(err) throw err;
                      rows = JSON.stringify(rows);
                      message.reply(rows);
    
        });
    }



    static insetarAsistencia(Empleado_idEmpleado,Fecha_Asistencia,Hora_Inicio_Dia,Hora_Almuerzo_Inicio_Dia,Hora_Almuerzo_Fin_Dia,Hora_Fin,Movilidad_Dia){

        return new Promise((resolve,reject)=>{
            var chequeo;

            db.execute("INSERT INTO Asistencia (Empleado_idEmpleado,Fecha_Asistencia,Hora_Inicio_Dia,Hora_Almuerzo_Inicio_Dia,Hora_Almuerzo_Fin_Dia,Hora_Fin,Movilidad_Dia) VALUES (?,?,?,?,?,?,?)",[Empleado_idEmpleado,Fecha_Asistencia,Hora_Inicio_Dia,Hora_Almuerzo_Inicio_Dia,Hora_Almuerzo_Fin_Dia,Hora_Fin,Movilidad_Dia]);

            chequeo="completado";

            resolve(chequeo);

        });

        //return db.execute("INSERT INTO Asistencia (Empleado_idEmpleado,Fecha_Asistencia,Hora_Inicio_Dia,Hora_Almuerzo_Inicio_Dia,Hora_Almuerzo_Fin_Dia,Hora_Fin,Movilidad_Dia) VALUES (?,?,?,?,?,?,?)",[Empleado_idEmpleado,Fecha_Asistencia,Hora_Inicio_Dia,Hora_Almuerzo_Inicio_Dia,Hora_Almuerzo_Fin_Dia,Hora_Fin,Movilidad_Dia]);
    }



}







// }




const express = require("express");
const router = express.Router();
var bodyParser = require('body-parser');
const { array } = require('yargs');

var jsonParser = bodyParser.json();

var secret =  'Andres3';
var validator =  '45a1cf7d6e72cc672a7712e40e8aff837288eef7';



const UserPos = require('../models/control');
const ApPosInfo = require('../models/control2');

/***************************************************VARIABLES****************** */
//variable para los empleados
const MacsEmp= new Array();
const MacsEjemp= new Array();

let FechaDia;

//variables de control
var unaVez;
var segundaVez;
var IngresoVez;


/// ejemplos de arreglos a usar, se debe tener estos arreglos desde la base
//const MacsEjemp=[mat,andy,oswald,lucy,vizio,dellAn];
//const ApDepar=[ApComedor,ApEstudio,ApSala];



let ValorOriginal=0;

/******************************************************Recordar cambiar de posicion de los AP para Edimca */

//crear nuevos User Pos y nuevos ApPos

// ejemplo de crear usuario

let mat= new UserPos(
    "c0:9a:d0:71:d2:a8",
    'Mat',
	cedula="1804968833",
	areaEmple='Sala',
	PosLng=[ ],
	PosLat=[ ],
	PosX=[ ],
	PosY=[ ],
	lat=0.000,
    long=0.000,
	x=0.000,
    y=0.000,
    time="00:00:00",
	horaInicio="00:00:00",
	horaInicioAlmuerzo="00:00:00",
	horaFinAlmuerzo="00:00:00",
	horaFin="00:00:00",
	MovilidadPermitida=9,
	distancias=[],
	Apname="",
	CompararPosicion=[],
	CompararTiempos=[],
	movilidadDiaria=0,
    encontrado=false,
	estado=0,
	estadoONE=0,
	calcular=0
);


// el array de empleados desde la base
//=[mat,andy,oswald,lucy,vizio,dellAn];


/**********************CREAR APs *******************************************/

//ejemplo de crear Ap
const ApEstudio= new ApPosInfo(

	mac="f8:9e:28:7a:ef:e4",
    name='Ventas', //estudio
	lat=-1.231453853,
    long=-78.64008442,
     xval=6.219846447,
     yval=3.025561128

);

const ApSala=new ApPosInfo(
	mac="e0:cb:bc:34:b6:a7",
    name='Bodega',//Sala
	lat=-1.231436422,
    long=-78.64011861,
	xval=2.781686907,
    yval=5.549212355	
);

const ApComedor=new ApPosInfo( 
	mac="e0:cb:bc:34:b6:7b",
    name='Corte',//comedor
	lat=-1.231422344,
    long=-78.64007872,
	xval=7.408717407,
    yval=6.379543627	
);


const ApDepar=[ApComedor,ApEstudio,ApSala];

/***************************FUncion crear empleado ***************/
function CrearEmpleado(element){

    //MacsEmp.length=0;
    //MacsEjemp.length=0;

	console.log(element);

//    let mat= new UserPos(
	MacsEjemp.push(new UserPos(
        element.Mac_Add,
        element.Nombre_Empleado,
        cedula=element.Cedula,
		id_Empleado=element.id_Empleado,
        areaEmple=element.Nombre_Departamento,
        PosLng=[ ],
        PosLat=[ ],
        PosX=[ ],
        PosY=[ ],
        lat=0.000,
        long=0.000,
        x=0.000,
        y=0.000,
        time="00:00:00",
        horaInicio="00:00:00",
        horaInicioAlmuerzo="00:00:00",
        horaFinAlmuerzo="00:00:00",
        horaFin="00:00:00",
        MovilidadPermitida=element.Movilidad,
        distancias=[],
        Apname="",
        CompararPosicion=[],
        CompararTiempos=[],
        movilidadDiaria=0,
        encontrado=false,
        estado=0,
        estadoONE=0,
        calcular=0
    ));
    //console.log(mat);

    //MacsEjemp.push(mat);
    

	
}
/**************************Funcion para crear todo al principio **********************************/
// en el primer get se crea y al final del día se borrará
// primero crear los elementos de asistencia

async function IniciodeTodo(){


        console.log("CRear Horarios");

		//ingresar la hora para tomar datos
        CrearHorarioEmpresa("08:30:00","12:30:00","13:30:00","17:30:00","18:30:00");

        console.log("El valor original es: "+ValorOriginal);
        

        ValorOriginal+=1;

        console.log("El valor original sumado es es: "+ValorOriginal);


        console.log("len de MacsEjemp "+ApDepar.length);
     


}



async function IniciodeTodo1(){

    
    let ElemenAsist;
    //elementos de asistencia

    await UserPos.fetchAllControl().then(posts=>{
        console.log("Respuesta ");
        let ContratoT= new Array();
		 ContratoT=JSON.parse(JSON.stringify(posts[0]));
        //console.log(ContratoT);

        ContratoT.forEach(element => {

            console.log(element.Mac_Add);
            CrearEmpleado(element);


        })
        console.log("len de MacsEjemp "+MacsEjemp.length);


      
    });


}







/********************HORARIO EMPRESA**************************/
let HoraOpen=Date();
let HoraStartLunch=new Date();
let HoraEndLunch=new Date();
let HoraEnd=new Date();
let HoraClose=new Date();
// intervalos para toma de datos
let IntervaloHoraOpenBefore=new Date();
let IntervaloHoraOpenBefore2=new Date();
let IntervaloHoraOpenOntime=new Date();
let IntervaloHoraOpenAfter=new Date();
let IntervaloHoraStartLunchOntime=new Date();
let IntervaloHoraStartLunchAFter=new Date();
let IntervaloHoraStartLunchAFter2=new Date();
let IntervaloHoraEndLunchOntime=new Date();
let IntervaloHoraEndLunchAfter=new Date();
let IntervaloHoraEndOntime=new Date();
let IntervaloHoraEndBefore=new Date();
let IntervaloHoraEndAfter=new Date();
let IntervaloHoraEndAfter2=new Date();
let IntervaloHoraCloseBefore=new Date();
let IntervaloHoraCloseOntime=new Date();
let IntervaloHoraCloseAfter=new Date();



// crear horario de empresa

function CrearHorarioEmpresa(HoraOpenVar,HoraStarLunchVar,HoraFinishLunchVar,HoraFinishVar,HoraCloseVar){
	console.log("Horario");
	let date1 = new Date();
	let year=(date1.getYear()-100)+2000;
	let month=(date1.getMonth())+1;
	let day=(date1.getDate());  
	console.log(year);
	console.log(month);
	console.log(day);

	FechaDia=(String(year)+"-"+String(month)+"-"+String(day));

	HoraOpen = new Date(year+'-'+month+'-'+day+' '+HoraOpenVar);
	HoraStartLunch = new Date(year+'-'+month+'-'+day+' '+HoraStarLunchVar);
	HoraEndLunch = new Date(year+'-'+month+'-'+day+' '+HoraFinishLunchVar);
	HoraEnd = new Date(year+'-'+month+'-'+day+' '+HoraFinishVar);
	HoraClose = new Date(year+'-'+month+'-'+day+' '+HoraCloseVar);
	console.log("Hora Iniciar: "+HoraOpen);
	console.log("Hora Iniciar Almuerzo: "+HoraStartLunch);
	console.log("Hora Fin Almuerzo: "+HoraEndLunch);
	console.log("Hora Final: "+HoraEnd);
	console.log("Hora Cerrar: "+HoraClose);

	IntervalosCompletos(HoraOpen,HoraStartLunch,HoraEndLunch,HoraEnd,HoraClose);

}


// calculo de intervalo  para despues. 
//Los intervalos de tiempo sirven para tener una ventana de tiempo en la que el usuario pueda que haya llegado o salido

function CalculoIntervaloAfter(date1,value){
	
	let IntervaloOperado=new Date(date1.getTime() + value*60000);
	let intervaloMin=IntervaloOperado.getMinutes();
	if(intervaloMin<"10"){

		intervaloMin="0"+intervaloMin;
	}
	let intervaloHou=IntervaloOperado.getHours();
	if(intervaloHou<"10"){

		intervaloHou="0"+intervaloHou;
	}
	


	let HoraIntervalo = intervaloHou+':'+intervaloMin;

	console.log(date1);
	console.log(HoraIntervalo);
	return HoraIntervalo;
	
}


// calculo de intervalo  para antes.
function CalculoIntervaloBefore(date1, value){
	let intervaloMin=(date1.getMinutes())-value;
	if(intervaloMin<"10"){

		intervaloMin="0"+intervaloMin;
	}
	let intervaloHou=(date1.getHours());

	if(intervaloHou<"10"){

		intervaloHou="0"+intervaloHou;
	}


	
	let HoraIntervalo = intervaloHou+':'+intervaloMin;

	console.log(date1);
	console.log(HoraIntervalo);
	return HoraIntervalo;
	
}


// para tener los intervalos en funcion de la hora de llegada o salida 

function IntervalosCompletos(HoraOpenVar,HoraStarLunchVar,HoraFinishLunchVar,HoraFinishVar,HoraCloseVar){

	//sumado 3 min
	IntervaloHoraOpenBefore=CalculoIntervaloAfter(HoraOpenVar,-3);
	IntervaloHoraOpenBefore2=CalculoIntervaloAfter(HoraOpenVar,-6);
	//a tiempo
	IntervaloHoraOpenOntime=CalculoIntervaloAfter(HoraOpenVar,0);
    IntervaloHoraOpenAfter=CalculoIntervaloAfter(HoraOpenVar,3);
    //almuerzo a tiempo
	IntervaloHoraStartLunchOntime=CalculoIntervaloAfter(HoraStarLunchVar,0);
	IntervaloHoraStartLunchAFter=CalculoIntervaloAfter(HoraStarLunchVar,3);
    IntervaloHoraStartLunchAFter2=CalculoIntervaloAfter(HoraFinishLunchVar,-3);
	//terminar almuerzo a tiempo
	
	IntervaloHoraEndLunchOntime=CalculoIntervaloAfter(HoraFinishLunchVar,0);
	IntervaloHoraEndLunchAfter=CalculoIntervaloAfter(HoraFinishLunchVar,3);
    //salida a tiempo
	IntervaloHoraEndOntime=CalculoIntervaloAfter(HoraFinishVar,0);
	IntervaloHoraEndAfter=CalculoIntervaloAfter(HoraFinishVar,-3);
    IntervaloHoraEndAfter2=CalculoIntervaloAfter(HoraFinishVar,5);
	//cerrar a tiempo
	IntervaloHoraCloseOntime=CalculoIntervaloAfter(HoraFinishVar,0);
	IntervaloHoraCloseBefore=CalculoIntervaloAfter(HoraCloseVar,3);
	IntervaloHoraCloseAfter=CalculoIntervaloAfter(HoraCloseVar,6);
	console.log("INtervalo antes de abrir 1 "+IntervaloHoraOpenBefore2);
	console.log("INtervalo antes de abrir 2 "+IntervaloHoraOpenBefore);
	console.log("Intervalo despues de abrir "+IntervaloHoraOpenAfter);
	console.log("Intervalo salida al almuerzo "+IntervaloHoraStartLunchAFter);
	console.log("Intervalo antes de volver del almuerzo "+IntervaloHoraStartLunchAFter2);
	console.log("Intervalo despues de almuerzo "+IntervaloHoraEndLunchAfter);
	console.log("Intervalo antes de salir uno "+IntervaloHoraEndAfter);
	console.log("Intervalo despues de salir uno 2 "+IntervaloHoraEndAfter2);
	console.log("Intervalo antes de cerrar "+IntervaloHoraCloseBefore);
	console.log("Intervalo despues de cerrar "+IntervaloHoraCloseAfter);


}






/***********************Funciones para manejo de fechas ***********/
function getToday(d) {
    //var d = new Date;
    var hs=d.getHours();
    if(hs<10){
    hs='0'+hs;
    }
    var min= d.getMinutes();
    if(min<10){
    min='0'+min;
    }

    var now = hs+":"+min;
    return now;
  }




  /***************************FUNCION PARA REVISAR ESTADOS ******************************************************/
   // segun el estado realizar funcion
   async function revisarEstados(empleado){

	//var horanow=getToday(empleado.time);
	let horaReal=new Date();
	var horanow=CalculoIntervaloAfter(horaReal,-3);

	console.log(horanow);


	console.log("El estado es: "+empleado.estado);


     if(empleado.estado ==1){
		// estado para poder guardar la hora de llegada, chequear la hora y ver si es más de 8:30 para guardar y 
		// despues de guardar cambiar a estado 2
		if(empleado.APname==empleado.areaEmple ){ 
			
			empleado.estadoONE=1;
			empleado.horaInicio=empleado.CompararTiempos[0];	
			console.log("Hora de Llegada: "+empleado.horaInicio);
			empleado.estado=0;
		}
		else{
			console.log(empleado.name+" aun no llega a su area");
		}

	}
	else if(empleado.estado ==2){
		// estado para guardar hora de inicio de almuerzo, chequear la hora y ver si es más de 12:30 y menos de 13:28 para guardar la hora de almuerzo  
		// cambiar a estado 3

		if(horanow<IntervaloHoraStartLunchAFter2){

			console.log("el empleado: "+empleado.name);
			console.log("Hora de Almuerzo: "+horanow);
		}
		else{
			console.log("el empleado: "+empleado.name+" guarda la hora");
			empleado.horaInicioAlmuerzo=empleado.CompararTiempos[0];
			console.log("Hora de Almuerzo: "+empleado.horaInicioAlmuerzo);
			empleado.estadoONE=2;
			empleado.estado=0;	

			
		}
			
			

	}
	else if(empleado.estado ==3){
		// estado para guardar hora de fin de almuerzo, chequear la hora y ver si es más de 13:28 y menos de 13:32 para guardar la hora de almuerzo  
		// cambiar a estado 4 despues de guardar
		//if(horanow>="13:29" && horanow<"13:33" ){
			if(empleado.APname==empleado.areaEmple ){
			
				empleado.horaFinAlmuerzo=empleado.CompararTiempos[0];
			console.log("el empleado: "+empleado.name);
			console.log("Hora fin de Almuerzo: "+empleado.horaFinAlmuerzo);
			empleado.estado=0;	
			empleado.estadoONE=3;

			}
			else{
				console.log(empleado.name+" aun no llega a su area");
			}


	}
	else if(empleado.estado ==4 ){
		// estado para guardar hora de salida, chequear la hora y ver si es más de 17:28 y menos de 17:32 para guardar la hora de almuerzo  
		// cambiar a estado 5 despues de guardar

		if(horanow<IntervaloHoraCloseBefore){

			console.log("el empleado: "+empleado.name);
			console.log("Hora de Salida: "+horanow);
		}
		else{
			empleado.estadoONE=4;
			console.log("El empleado: "+empleado.name+" salio "+empleado.CompararTiempos[0]);

			empleado.horaFin=empleado.CompararTiempos[0];
			console.log("Hora de Salida: "+empleado.horaFin);

			empleado.estado=0;	

		}


		//	}

	}
	// else if( empleado.estado ==5){
	// 	// estado para guardar hora de salida en hora extra, chequear la hora y ver si es más de 17:28 y menos de 17:32 para guardar la hora de almuerzo  
	// 	// cambiar a estado 5 despues de guardar

	// 	//if(horanow>="17:27" && horanow<"17:33" ){

	// 		if(horanow<IntervaloHoraCloseBefore){

	// 			console.log("el empleado: "+empleado.name);
	// 			console.log("Hora de Salida en Hora Extra: "+horanow);
	// 		}
	// 		else{
			
	// 			empleado.estadoONE=5;
	// 		console.log("El empleado: "+empleado.name+" salio "+empleado.CompararTiempos[0]);

	// 		empleado.horaFin=empleado.CompararTiempos[0];
	// 		console.log("Hora de Salida: "+empleado.horaFin);

	// 		empleado.estado=0;	

	// 		}

		    
	// 	//	}

	// }
	
	else if(empleado.estado ==5){

		// calculo de los tiempos de movimiento
		// presentar el porcentaje de movilidad
		// indicar las horas de llegada,salida, almuerzo 

		if(empleado.estadoONE!=0){

			let Porcentagemovili;


			if(empleado.movilidadDiaria>0){
				Porcentagemovili=(empleado.movilidadDiaria*100)/480;
	
			}
			else{
				Porcentagemovili=0;
	
			}
	
			if(Porcentagemovili<= empleado.MovilidadPermitida){
				console.log("El empleado: "+empleado.name+" cumple con  movilidad:  "+empleado.movilidadDiaria);
				console.log("El empleado: "+empleado.name+" cumple con la movilidad Permitida con un porcentaje de:  "+Porcentagemovili);
	
			}else{
				console.log("El empleado: "+empleado.name+" NO cumple con la movilidad Permitida con:  "+Porcentagemovili);
			}
	
	
	
			console.log("El empleado: "+empleado.name+" ingresó a la empresa a la hora:  "+empleado.horaInicio);
			console.log("El empleado: "+empleado.name+" ingresó al almuerzo a:  "+empleado.horaInicioAlmuerzo);
			console.log("El empleado: "+empleado.name+" salió del almuerzo a:  "+empleado.horaFinAlmuerzo);
			console.log("El empleado: "+empleado.name+" salió de la empresa a la hora:  "+empleado.horaFin);			
			console.log("El empleado: "+empleado.name+" tiene una movilidad Total Diaria:  "+empleado.movilidadDiaria);
			console.log("El empleado: "+empleado.name+" tiene una movilidad Permitida:  "+empleado.MovilidadPermitida);
	


		}



		/*******************Codigo Extra solo para revisar*********************/ 
		//verAtraso(empleado);
		//verFalta(empleado);
	   /*********************************************************** */
		//await regresarValores(empleado);

	}
	else if(empleado.estado==0){

		console.log("el empleado: "+empleado.name+" se encuentra en sus horas de trabajo con estado: "+empleado.estado);
	}

  }

  //*************************Otras funciones*********** */

    //funcion para ver si el empleado se ha atrasado
    function verAtraso(empleado){

        let horaLlegadaComparar=getToday(empleado.horaInicio);
    
        console.log("Para ver atraso la hora a comparar es: "+horaLlegadaComparar);
        if(horaLlegadaComparar>HoraOpen){
    
            console.log("El empleado: "+empleado.name+" ingresó a la empresa a la hora:  "+empleado.horaInicio+ " Con atraso");
        }
        else{
            console.log("El empleado: "+empleado.name+" ingresó a la empresa a la hora:  "+empleado.horaInicio+ " A tiempo");
        }
    
      }


      //funcion para regresar los valores de cada empleado a iniciales
  function regresarValores(empleado){
    return new Promise((resolve,reject)=>{

      RefreshCadaValor(empleado);
      empleado.lat=0.000;
      empleado.long=0.000;
      empleado.x=0.000;
      empleado.y=0.000;
      empleado.time="00:00:00";
      empleado.horaInicio="00:00:00";
      empleado.horaInicioAlmuerzo="00:00:00";
      empleado.horaFinAlmuerzo="00:00:00";
      empleado.horaFin="00:00:00";
      empleado.CompararPosicion.length=0;
      empleado.CompararTiempos,length=0;
      empleado.movilidadDiaria=0;
      empleado.encontrado=false;
      empleado.estado=0;
      empleado.estadoONE=0;
      empleado.calcular=0;


      //resolve(console.log(empleado));

    });

  
}
    

  /***************************FUNCION PARA CAMBIAR DE ESTADOS ******************************************************/
 //esta función solo se da si el estado pasa de 1 despues de guardar la hora de entrada
  
 function cambioEstado(Empleado,horanowEmple){


	console.log("Estado ONe es: "+Empleado.estadoONE+" de "+Empleado.name);
	var hournow= new Date();
	
	console.log("hora tomada "+hournow);
	console.log("hora empleado "+horanowEmple);
	//var horanow=getToday(hournow);
	//var horanow=CalculoIntervaloAfter(hournow,-3);
	//var horanow=getToday(horanowEmple);
	var horanow=CalculoIntervaloAfter(hournow,-3);
	console.log(horanow);

	

	if (Empleado.estadoONE==0){
// hora debe ser la misma que inicio de movimiento con observar datos
		//if(horanow>"08:35" && horanow<"17:35" ){
			if(horanow>IntervaloHoraOpenOntime && horanow<IntervaloHoraEndAfter ){
			
				Empleado.estado=1;
				
			}
	}
	

	//estadoOne solo cambia despues de guardar la hora de llegada
	else if(Empleado.estadoONE==1){

		//salida al almuerzo
	   //if(horanow>"12:35" && horanow<="12:45"){
		if(horanow>IntervaloHoraStartLunchOntime && horanow<=IntervaloHoraStartLunchAFter2){
		Empleado.estado=2;
	    }
		else if(horanow>=IntervaloHoraEndOntime && horanow<IntervaloHoraCloseBefore){
			// si esque en esas horas del almuerzo no aparece se fuerza llegar a la salida
			//salida del trabajo
			Empleado.estado=4;
				
	}
			
	}
	else if(Empleado.estadoONE==2){
				//regreso de almuerzo
		//else if(horanow>"13:29" && horanow<="13:35"){
			/*else*/ if(horanow>IntervaloHoraEndLunchOntime && horanow<=IntervaloHoraEndOntime){
				//		else if(horanow>IntervaloHoraStartLunchAFter2 && horanow<=IntervaloHoraEndLunchAfter){
							Empleado.estado=3;
								
						}

						else if(horanow>IntervaloHoraEndOntime && horanow<=IntervaloHoraCloseBefore){
			                // si esque en esas horas del almuerzo no aparece se fuerza llegar a la salida
							//salida del trabajo
							Empleado.estado=4;
								
					}

	}
	else if(Empleado.estadoONE==3){
			//salida del trabajo
		//else if(horanow>="17:35"  && horanow<"18:45" ){
			/*else*/ if(horanow>=IntervaloHoraEndOntime && horanow<IntervaloHoraCloseBefore){
			
				//salida del trabajo
				Empleado.estado=4;
					
		}
	}
	// else if(Empleado.estadoONE==4){
	// 	/*else*/ if(horanow>=IntervaloHoraEndAfter && horanow<IntervaloHoraCloseBefore){
			
	// 		//salida de hora Extra
	// 		Empleado.estado=5;			
	//   }
	// }

	else if(Empleado.estadoONE==4){

		//else if(horanow>="18:45"&& horanow<"18:50"){
			/*else*/ if(horanow>=IntervaloHoraCloseBefore && horanow<IntervaloHoraCloseAfter){

				// calculos de todo
				if(Empleado.calcular==0){
					Empleado.estado=5;
					Empleado.calcular+=1;
	
	
				}
				else{
	
					console.log("Ya se realizaron los calculos");
				}
			}
		
	}	
		 
	else{
			console.log("El empleado: "+Empleado.name+" estado: "+Empleado.estadoONE);
		}
	

	
	


  }


  /*************FUNCION PARA REVISAR HORAS******************************** */
  // se revisa la hora a la que se da llegadas, salida al almuerzo, regreso del almuerzo y salida de la empresa

  function revisarHoras(datosLeidos){
	var hora = new Date();
	console.log("hora date: "+hora);

	var horanow=CalculoIntervaloAfter(hora,-3);
    //var horanow=getToday(hora);
	console.log("hora now: "+horanow);
	//console.log(horanow);
    //if(horanow>"08:28" && horanow<="08:30"){
		// console.log("intervalo open before: "+IntervaloHoraOpenBefore +"y el siguiente"+ IntervaloHoraOpenOntime);
		// console.log("intervalo open on time: "+IntervaloHoraOpenOntime +"y el siguiente"+ IntervaloHoraOpenAfter);
		// console.log("intervalo open after: "+IntervaloHoraOpenAfter +"y el siguiente"+ IntervaloHoraStartLunchAFter);
		// console.log("intervalo lunch on time: "+IntervaloHoraStartLunchAFter +"y el siguiente"+ IntervaloHoraEndLunchAfter);
		// console.log("intervalo end lunch: "+IntervaloHoraEndLunchAfter +"y el siguiente"+ IntervaloHoraEndAfter);
		// console.log("intervalo end all on time: "+IntervaloHoraEndAfter +"y el siguiente"+ IntervaloHoraCloseBefore);
		// console.log("intervalo close all on time: "+IntervaloHoraCloseBefore +"y el siguiente"+ IntervaloHoraCloseAfter);
		
		//if(horanow>IntervaloHoraOpenBefore && horanow<=IntervaloHoraOpenOntime){

			if(horanow>IntervaloHoraOpenBefore2 && horanow<=IntervaloHoraOpenBefore){
			console.log("una vez: "+unaVez);
        // funcion de inicio de datos 
        //cargar empleados y macs una vez
        if(unaVez==0){
            IniciodeTodo1().then(()=>{

                llenarEmpleados();
            unaVez++;

            });
			
        } 
    }
    //llamar a observarDatos en cada uno
    //else if(horanow>"08:30" && horanow<="08:35"){
		
		else if(horanow>IntervaloHoraOpenBefore && horanow<IntervaloHoraOpenOntime){
        // funcion de llegada a tiempo
		//let hora= new Date();
		RecorrerEmpleados(HoraOpen);
    }
	//else if(horanow>"08:35" && horanow<="12:35"){
		else if(horanow>=IntervaloHoraOpenOntime && horanow<IntervaloHoraStartLunchOntime){

        // funcion de trabajo hasta el almuerzo
		observarDatos(datosLeidos);
    }
    //else if(horanow>"12:35" && horanow<="13:35"){

		else if(horanow>=IntervaloHoraStartLunchOntime && horanow<IntervaloHoraStartLunchAFter2){

        // funcion de salida al almuerzo
		
		//RecorrerEmpleados(HoraStartLunch);
		observarDatosDos(datosLeidos);

    }
	// //else if(horanow>"12:33" && horanow<="13:27"){

	// 	else if(horanow>IntervaloHoraStartLunchAFter2 && horanow<="10:21"){
    //     // funcion de  almuerzo
	// 	//let hora= new Date();
	// 	RecorrerEmpleados(hora);
    // }
    // //else if(horanow>"13:27" && horanow<="13:33"){

		else if(horanow>=IntervaloHoraStartLunchAFter2 && horanow<IntervaloHoraEndLunchAfter){
        // funcion de regreso de almuerzo
		//let hora= new Date();
		RecorrerEmpleados(HoraEndLunch);
    }
	//else if(horanow>"13:35" && horanow<="17:33"){
		else if(horanow>=IntervaloHoraEndLunchAfter && horanow<IntervaloHoraEndOntime){
        // funcion de trabajo hasta salida
		observarDatos(datosLeidos);
    }
	//else if(horanow>"17:33" && horanow<="17:37"){
    else if(horanow>=IntervaloHoraEndOntime && horanow<IntervaloHoraEndAfter2){

        // funcion de salida del trabajo
		//let hora= new Date();
		RecorrerEmpleados(HoraEnd);
    }
	
	//else if(horanow>"17:37" && horanow<="18:33"){
    else if(horanow>=IntervaloHoraEndAfter2 && horanow<=IntervaloHoraCloseAfter){

        // funcion de hora extra
		observarDatosDos(datosLeidos);
    }
	
    else{

		if (unaVez!=0){

			RecorrerEmpleadosCuatro().then(respuesta=>{
				if(respuesta>1){
					console.log("OK todos guardados");
				}
				else{
					console.log("ERROR no todos guardados");
				}
			});

		}
        // regresar tiempos, posiciones y movilidad a cero al acabar el día
        // arreglo de empleados poner a cero
        //unaVez igualar a Cero
        unaVez=0;
		// guardar en base

		//borrar los valores calculados
		console.log("Recorrer empleados 2");
		RecorrerEmpleadosDos();

    }



  }



  /*******************RECORRER EMPLEADOS ******************/
  //RECORRE EMPLEADOS PARA CAMBIAR EL ESTADO Y REVISARLO
  async function RecorrerEmpleados(tiempo){

	console.log("el tiempo para operar es: "+tiempo);
	for (i = 0; i < MacsEmp.length; i++) {


		await PrevioHorario(MacsEmp[i],tiempo);
		cambioEstado(MacsEmp[i],tiempo);
		revisarEstados(MacsEmp[i]);


	}

}

/*********rECORRER EMPLEADOS 2 ***************/
//PARA REGRESAR VALORES A CERO
async function RecorrerEmpleadosDos(){

	for (i = 0; i < MacsEmp.length; i++) {


	 await RefreshCadaValor(MacsEmp[i]);
	 MacsEmp[i].CompararPosicion.length=0;
	 MacsEmp[i].CompararTiempos.length=0;
	 MacsEmp[i].movilidadDiaria=0;
	 MacsEmp[i].Apname="";
	 MacsEmp[i].time="00:00:00";
	 MacsEmp[i].lat=0.000;
	 MacsEmp[i].long=0.000;
	 MacsEmp[i].x=0.000;
	 MacsEmp[i].y=0.000;
	 MacsEmp[i].time="00:00:00";
	 MacsEmp[i].horaInicio="00:00:00";
	 MacsEmp[i].horaInicioAlmuerzo="00:00:00";
	 MacsEmp[i].horaFinAlmuerzo="00:00:00";
	 MacsEmp[i].horaFin="00:00:00";
	 MacsEmp[i].encontrado=false;
	 MacsEmp[i].estado=0;
	 MacsEmp[i].estadoONE=0;
	 MacsEmp[i].calcular=0;
		

	}

}


/*********rECORRER EMPLEADOS 3 ***************/
//PARA VER QUE EMPLEADOS YA HAN SALIDO DE LA EMPRESA
async function RecorrerEmpleadosTres(){

	//let horaSinMover= new Date();
	let horaSinMover= darHoraConRetraso(new Date());
	for (i = 0; i < MacsEmp.length; i++) {


		if(MacsEmp[i].encontrado==false){

			console.log("el empleado que no se encuentra es: "+MacsEmp[i].name);
			 swValandPopHorarioSinEncontrar(MacsEmp[i],horaSinMover);
	
		}
		else{
			MacsEmp[i].encontrado=false;

		}
			

	}

}


/*********rECORRER EMPLEADOS 3 DOS ***************/
//PARA VER QUE EMPLEADOS YA NO SE ENCUENTRAN
async function RecorrerEmpleadosTresDos(){

	//let horaSinMover= new Date();
	let horaSinMover= darHoraConRetraso(new Date());
	console.log("hora al recorrer: "+horaSinMover);
	for (i = 0; i < MacsEmp.length; i++) {


		if(MacsEmp[i].encontrado==false){

			console.log("el empleado que no se encuentra es: "+MacsEmp[i].name);
			swValandPopHorarioSinEncontrarSalir(MacsEmp[i],MacsEmp[i].CompararTiempos[0]);
			//reviso estados para guardar hora de empleados que ya no estan
			cambioEstado(MacsEmp[i],MacsEmp[i].CompararTiempos[0]);
			revisarEstados(MacsEmp[i]);

	
		}
		else{
			MacsEmp[i].encontrado=false;

		}
			

	}

}


/********************************************************IMPORTANTE************************************************************************************/

/*************************************************RECORRER EMPLEADOS 4 **********************************************/
//MUESTRA LOS VALORES AL FINAL DEL DIA, SE DEBE ALMACENAR ESTOS VALORES EN LA BASE EN ESTE PUNTO
async function RecorrerEmpleadosCuatro(){


	let sumaGuardados=0;

	console.log("se guarda para una cantidad de empleados de: " +MacsEmp.length);

	

	 for (i = 0; i < MacsEmp.length; i++) {


		let horaSalida=MacsEmp[i].CompararTiempos[0];
		let MovimientoTotal=MacsEmp[i].movilidadDiaria;
		//console.log("El empleado "+MacsEmp[i].name+" tiene hora de salida: "+MacsEmp[i].CompararTiempos[0]+" y movilidad Total: "+MacsEmp[i].movilidadDiaria);
		//console.log("El empleado "+MacsEmp[i].name+" tiene hora de salida: "+horaSalida+" y movilidad Total: "+MovimientoTotal);

        console.log("El empleado "+MacsEmp[i].name+" tiene hora de ingreso: "+MacsEmp[i].horaInicio);
		console.log("El empleado "+MacsEmp[i].name+" tiene hora de almuerzo: "+MacsEmp[i].horaInicioAlmuerzo);
		console.log("El empleado "+MacsEmp[i].name+" tiene hora de fin de almuerzo: "+MacsEmp[i].horaFinAlmuerzo);
		console.log("El empleado "+MacsEmp[i].name+" tiene hora de salida: "+MacsEmp[i].horaFin);
		console.log("El empleado: "+MacsEmp[i].name+" tiene una movilidad Total Diaria:  "+MacsEmp[i].movilidadDiaria);
		console.log("El empleado: "+MacsEmp[i].name+" tiene una movilidad Permitida:  "+MacsEmp[i].MovilidadPermitida);


		console.log("Asistencia "+MacsEmp[i].id_Empleado+" "+
		FechaDia+" "+
		MacsEmp[i].horaInicio+" "+
		MacsEmp[i].horaInicioAlmuerzo+" "+
		MacsEmp[i].horaFinAlmuerzo+" "+
		MacsEmp[i].horaFin+" "+
		MacsEmp[i].movilidadDiaria);

		if(UserPos.insetarAsistencia(
			MacsEmp[i].id_Empleado,
			FechaDia,
			MacsEmp[i].horaInicio,
			MacsEmp[i].horaInicioAlmuerzo,
			MacsEmp[i].horaFinAlmuerzo,
			MacsEmp[i].horaFin,
			MacsEmp[i].movilidadDiaria) =="completado"
           ){

			sumaGuardados+=1;


		}

		else{
			console.log("no se guardan");


		}

		// await UserPos.insetarAsistencia(
		// 	MacsEmp[i].id_Empleado,
		// 	FechaDia,
		// 	MacsEmp[i].horaInicio,
		// 	MacsEmp[i].horaInicioAlmuerzo,
		// 	MacsEmp[i].horaFinAlmuerzo,
		// 	MacsEmp[i].horaFin,
		// 	MacsEmp[i].movilidadDiaria);

        

	}


	console.log("se guarda para una cantidad de empleados de: " +sumaGuardados);
	return sumaGuardados;
}







/************** PARA MANEJAR LA HORA CON EL RETRASO DE 3 MINUTOS POR MERAKI *****************/
function darHoraConRetraso(horaActual){
	let year=(horaActual.getYear()-100)+2000;
	let month=(horaActual.getMonth())+1;
	let day=(horaActual.getDate());  
	var horanow=CalculoIntervaloAfter(horaActual,-3);

	let RetrasoHora=new Date(year+'-'+month+'-'+day+' '+horanow);
	console.log("HOra con retraso= "+RetrasoHora);
	return RetrasoHora;
}


/***********************LLENAR MACS*************** */

function llenarMacs(){

	var d = new Date();
	//console.log("nombre: "+andy.name+" mac: "+andy.mac);
	for (i = 0; i < MacsEjemp.length; i++) {


		 console.log("nombre: "+MacsEjemp[i].name+" valor mac: "+MacsEjemp[i].mac);


	// PARA INICIAR SE DEBE INGRESAR EL AREA CORRESPONDIENTE AL EMPLEADO, PERO INGRESAR TAMBIEN LA HORA DE ENTRADA EN EL ARREGLO
		MacsEjemp[i].CompararPosicion.push(MacsEjemp[i].areaEmple);
		//console.log("Length de posiciones: "+MacsEjemp[i].CompararPosicion.length);
		MacsEjemp[i].CompararTiempos.push(d);
		//console.log("Length de tiempo: "+MacsEjemp[i].CompararTiempos.length);
		MacsEmp.push(MacsEjemp[i]);

	}

}


/************************ LLENAR EMPLEADOS *************************/

function llenarEmpleados(){

	console.log("llenando Datos");
	let date1 = new Date();
	let year=(date1.getYear()-100)+2000;
	let month=(date1.getMonth())+1;
	let day=(date1.getDate());  
	console.log(year);
	console.log(month);
	console.log(day);
	
	

	//console.log("nombre: "+andy.name+" mac: "+andy.mac);
	for (i = 0; i < MacsEjemp.length; i++) {


		 console.log("nombre: "+MacsEjemp[i].name+" valor mac: "+MacsEjemp[i].mac);

		 MacsEjemp[i].estadoONE==0;
		 MacsEjemp[i].encontrado==false;

	// PARA INICIAR SE DEBE INGRESAR EL AREA CORRESPONDIENTE AL EMPLEADO, PERO INGRESAR TAMBIEN LA HORA DE ENTRADA EN EL ARREGLO
		MacsEjemp[i].CompararPosicion.push(MacsEjemp[i].areaEmple);
		//console.log("Length de posiciones: "+MacsEjemp[i].CompararPosicion.length);
		let HEntrada = new Date(year+'-'+month+'-'+day+' '+MacsEjemp[i].horaInicio);
	    //console.log("Hora de inicio de actividades: "+HEntrada);

		MacsEjemp[i].time=HEntrada;
		


		MacsEjemp[i].CompararTiempos.push(HEntrada);
		//console.log("Length de tiempo: "+MacsEjemp[i].CompararTiempos.length);
		MacsEmp.push(MacsEjemp[i]);

	}


}


/******************************* INGESAR CADA VALOR **********************/
function IngreCadaValor(Val1,Val2){

	Val1.PosLng.push(Val2.lng);
	Val1.PosLat.push(Val2.lat);
	Val1.PosX.push(Number( Val2.x));
	Val1.PosY.push(Number(Val2.y));
    Val1.time=new Date(Val2.time);
}


/******************************* INGESAR VALOR PUSH **********************/
//INGRESA VALORES EN UN ARREGLO
function IngresarValorPush(Val1,Val2,tiempo){

    console.log("Ingresar valores push: ");
    
    
   Val1.PosLng.push(Val2.long);
   Val1.PosLat.push(Val2.lat);
   Val1.PosX.push(Number( Val2.xval));
   Val1.PosY.push(Number(Val2.yval));
   Val1.time=new Date(tiempo);

}

/******************************* REFRESCAR VALOR **********************/
//REGRESA VALORES A CERO
function RefreshCadaValor(Val1){
	return new Promise((resolve,reject)=>{

		Val1.PosLng.length=0;
		Val1.PosLat.length=0;;
		Val1.PosX.length=0;;
		Val1.PosY.length=0;
		Val1.distancias.length=0;
		
	

		resolve(console.log(Val1.distancias.length));
	});

	 
}

/******************************* AVG **********************/
//SACAR PROMEDIO DE LOS VALORES INGRESADOS
function AvgValores(Val1){

	return new Promise ((resolve,reject)=>{
		var aver;
		aver= Val1.reduce((a, b) => (a + b)) / Val1.length;
		resolve(aver);

	})


}

/******************************* ENCONTRAR AREA **********************/
//SACANDO DISTANCIAS PROMEDIO 

function EncontrarArea(Val1){
	return new Promise((resolve,reject)=>{
		let xsq;
		let ysq;
		let distanc;
		let indexMenor;
		for (n= 0; n < ApDepar.length; n++){
			xsq=((ApDepar[n].xval-Val1.x)**2);
			ysq=((ApDepar[n].yval-Val1.y)**2);	
			distanc=Math.sqrt(xsq+ysq);
			Val1.distancias.push(distanc);
		}
		indexMenor = Val1.distancias.indexOf(Math.min(...Val1.distancias));	
		Val1.APname= ApDepar[indexMenor].name;
	
		resolve(console.log(Val1.name+" se encuentra en el area de: "+Val1.APname));
	});
}


/******************************* ENCONTRAR OVIMIENTO **********************/
//SACANDO DISTANCIAS PROMEDIO 
//primero ver la hora, el primer valor que se tiene siempre va a ser la hora de entrada a la empresa y de posicion es la del Ap de area

async function EncontrarMovim(Val1){
	return new Promise((resolve, reject)=>{
		// si tiene 2 valores se comprueba el actual con el anterior para determinar si se ha movido
	if(IngresoVez==0){
		Val1.horaInicio=getToday(Val1.time);
	}
		Val1.CompararPosicion.push(Val1.APname);
		Val1.CompararTiempos.push(Val1.time);
         console.log("valor de area permitida: "+Val1.areaEmple+" valor obtenido de posicion: "+Val1.APname); 
		//comparar si hubo movimiento
		if(Val1.areaEmple==Val1.CompararPosicion[1] ){
			console.log("dentro de area");
			Swap(Val1);
		}
		//si se ha movido se resta las horas para determinar los minutos
		else{
			console.log("fuera de area");	
			obtenerySwap(Val1);
		}
		resolve(console.log("longitud de valores es 2"));		
	}
	);
}

/***************************OBTENER VALORES Y LUEGO SWAP DE VALORES *****************************/
async function obtenerySwap(Val1){

	await obtenerTiempo(Val1);
	await swValandPop(Val1);
}

/***************************SWAP DE VALORES *****************************/
async function Swap(Val1){

	await swValandPop(Val1);
}

/***************************OBTENER VALORES DE TIEMPO *****************************/
function obtenerTiempo(valtime1){

	return new Promise((resolve,reject)=>{

		let tiempoInstant;
		console.log("tiempo 2: "+valtime1.CompararTiempos[1]);
		console.log("tiempo 1: "+valtime1.CompararTiempos[0]);
	tiempoInstant=((valtime1.CompararTiempos[1].getTime()-valtime1.CompararTiempos[0].getTime())/3600000)*60;
	console.log("diferencia de tiempo de: "+valtime1.name+" es: "+tiempoInstant);
	valtime1.movilidadDiaria+=tiempoInstant;
	console.log("ELEMENTO A CALCULAR ES: "+valtime1.name);
	resolve(console.log("movilidad total en minutos es: "+valtime1.movilidadDiaria));

	}

	);
	
	
}

/***************************OBTENER TIEMPO SI YA NO SE ENCUENTRA *****************************/
function obtenerTiempoSinIr(valtime1){

	return new Promise((resolve,reject)=>{

		let tiempoInstant;
		console.log("tiempo 2: "+valtime1.CompararTiempos[1]);
		console.log("tiempo 1: "+valtime1.CompararTiempos[0]);
	tiempoInstant=((valtime1.CompararTiempos[1].getTime()-valtime1.CompararTiempos[0].getTime())/3600000)*60;
	console.log("diferencia de tiempo de: "+valtime1.name+" es: "+tiempoInstant);
	valtime1.movilidadDiaria+=tiempoInstant;
	console.log("ELEMENTO NO UBICADO ES: "+valtime1.name);
	resolve(console.log("movilidad total en minutos es: "+valtime1.movilidadDiaria));

	}

	);
	
	
}


/***************************SWAP DE VALORES Y POP DE EL VALOR PRIMERO *****************************/
function swValandPop(swval){

	return new Promise((resolve,reject)=>{

		console.log("posicion 0 es: "+swval.CompararPosicion[0]);
		console.log("posicion 1 es: "+swval.CompararPosicion[1]);
		var b = swval.CompararPosicion[1];
		swval.CompararPosicion[0] = b;
		swval.CompararPosicion.pop();
	
	//	console.log("length de areas swapped: "+swval.CompararPosicion.length);
	
		var c = swval.CompararTiempos[1];
		swval.CompararTiempos[0] = c;
		swval.CompararTiempos.pop();
		resolve(console.log("length de tiempos swapped: "+swval.CompararTiempos.length));
	

	});


}

/*************************** PREVIO HORARIO *****************************/
function PrevioHorario(swval,HoraPner){

	return new Promise((resolve,reject)=>{

		var samePos = swval.areaEmple;
		swval.CompararPosicion.push(samePos);

		var b = swval.CompararPosicion[1];

		swval.CompararPosicion[0] = b;
		swval.CompararPosicion.pop();
	
		//console.log("length de areas iguales swapped: "+swval.CompararPosicion.length);
	
		var sameTime=HoraPner;
		swval.CompararTiempos.push(sameTime);

		var c = swval.CompararTiempos[1];
		swval.CompararTiempos[0] = c;
		swval.CompararTiempos.pop();
		resolve(console.log("length de tiempos iguales swapped: "+swval.CompararTiempos.length));
	
	});


}

/***************************SWAP DE VALORES Y POP DE EL VALOR PRIMERO SI NO SE ENCUENTRA LA PERSONA*****************************/
function swValandPopHorarioSinEncontrar(swval,tiempoSinAparecer){

	return new Promise((resolve,reject)=>{

		var samePos = swval.CompararPosicion[0];
		swval.CompararPosicion.push(samePos);

		var b = swval.CompararPosicion[1];

		swval.CompararPosicion[0] = b;
		swval.CompararPosicion.pop();
	
		//console.log("length de areas iguales swapped: "+swval.CompararPosicion.length);
	
		var sameTime=new Date(tiempoSinAparecer);
		swval.CompararTiempos.push(sameTime);

		console.log("valor 0: "+swval.CompararTiempos[0]);
		console.log("valor 1: "+swval.CompararTiempos[1]);

		console.log("operar tiempos");
		obtenerTiempoSinIr(swval);
		var c = swval.CompararTiempos[1];
		swval.CompararTiempos[0] = c;
		swval.CompararTiempos.pop();
		
		//resolve(console.log("length de tiempos iguales swapped: "+swval.CompararTiempos.length));
	

	});


}

/***************************SWAP DE VALORES Y POP DE EL VALOR PRIMERO SI NO SE ENCUENTRA LA PERSONA A LA SALIDA*****************************/
function swValandPopHorarioSinEncontrarSalir(swval,tiempoSinAparecer){

	return new Promise((resolve,reject)=>{

		var samePos = swval.CompararPosicion[0];
		swval.CompararPosicion.push(samePos);

		var b = swval.CompararPosicion[1];

		swval.CompararPosicion[0] = b;
		swval.CompararPosicion.pop();
	
		//console.log("length de areas iguales swapped: "+swval.CompararPosicion.length);
	
		var sameTime=new Date(tiempoSinAparecer);
		swval.CompararTiempos.push(sameTime);

		console.log("valor 0: "+swval.CompararTiempos[0]);
		console.log("valor 1: "+swval.CompararTiempos[1]);

		console.log("No operar tiempos");
		//obtenerTiempoSinIr(swval);
		var c = swval.CompararTiempos[1];
		swval.CompararTiempos[0] = c;
		swval.CompararTiempos.pop();
		
		//resolve(console.log("length de tiempos iguales swapped: "+swval.CompararTiempos.length));
	

	});


}


/**********************************************FUNCION PARA OBSERVAR DATOS Y CALCULAR TODO **********************************************************************************/
async function observarDatos(datos){
	console.log("leer datos");	
	for (i = 0; i < datos.data.observations.length; i++) {		
		for (j= 0; j < MacsEmp.length; j++) {
			if(datos.data.observations[i].clientMac==MacsEmp[j].mac){
                MacsEmp[j].encontrado=true;
				console.log("el empleado: "+MacsEmp[j].name+" con estado encontrado: "+MacsEmp[j].encontrado);
				console.log(datos.data.observations[i].ssid);
			    console.log(datos.data.observations[i].clientMac);
				// indicar donde está
				if(datos.data.observations[i].locations.length==0){
					for (n= 0; n < ApDepar.length; n++){
						if(datos.data.observations[i].latestRecord.nearestApMac==ApDepar[n].mac){
							IngresarValorPush(MacsEmp[j],ApDepar[n],datos.data.observations[i].latestRecord.time);
						}
					}
					}
					else{
						console.log("Ingresando");
						console.log("empleados : "+MacsEmp[j].name);
						// console.log("posiciones length: "+datos.data.observations[i].locations.length)
						for (m= 0; m < datos.data.observations[i].locations.length; m++){
							IngreCadaValor(MacsEmp[j],datos.data.observations[i].locations[m]);
						}
					}
				console.log("AVG valores: ");
					//sacar promedios y presentar 
					MacsEmp[j].lat=await AvgValores(MacsEmp[j].PosLat);
					//console.log("Latitud de: "+MacsEmp[j].name+" es: "+MacsEmp[j].lat);
					MacsEmp[j].lng=await AvgValores(MacsEmp[j].PosLng);
					//console.log("Longitud de: "+MacsEmp[j].name+" es: "+MacsEmp[j].lng);
					MacsEmp[j].x=await AvgValores(MacsEmp[j].PosX);
					//console.log("X de: "+MacsEmp[j].name+" es: "+MacsEmp[j].x);
					MacsEmp[j].y=await AvgValores(MacsEmp[j].PosY);
					console.log("Time de: "+MacsEmp[j].name+" es: "+MacsEmp[j].time);
					await EncontrarArea(MacsEmp[j]);
					await EncontrarMovim(MacsEmp[j]);
					cambioEstado(MacsEmp[j],MacsEmp[j].time);
					revisarEstados(MacsEmp[j]);
                    console.log("REFRESH");
                   await RefreshCadaValor(MacsEmp[j]);
			}
		}
	}
	RecorrerEmpleadosTres();
}

/**********************************************FUNCION PARA OBSERVAR DATOS Y CALCULAR TODO A LA HORA DE SALIDA **********************************************************************************/
// control para hora extra
async function observarDatosDos(datos){

	
	
	for (i = 0; i < datos.data.observations.length; i++) {
		
	
		for (j= 0; j < MacsEmp.length; j++) {

			//console.log("1 persona: "+MacsEmp[j].name);
			if(datos.data.observations[i].clientMac==MacsEmp[j].mac){

                MacsEmp[j].encontrado=true;
				console.log("el empleado: "+MacsEmp[j].name+" con estado encontrado: "+MacsEmp[j].encontrado+" en observar datos dos");
                
				

				// indicar donde está
				if(datos.data.observations[i].locations.length==0){

					// console.log("ap cercano: "+datos.data.observations[i].latestRecord.nearestApMac);
					// console.log("length depars: "+ApDepar.length);


					for (n= 0; n < ApDepar.length; n++){

						if(datos.data.observations[i].latestRecord.nearestApMac==ApDepar[n].mac){
						
							//console.log(MacsEmp[j].name+" en "+ApDepar[n].name);
						

							
							
							
			                  swValandPopHorarioSinEncontrarSalir(MacsEmp[j],datos.data.observations[i].latestRecord.time);
							 
					         cambioEstado(MacsEmp[j],MacsEmp[j].CompararTiempos[0]);
						     revisarEstados(MacsEmp[j]);

						}

					}
	
					}
					else{
		


						console.log("Ingresando after dark");
						console.log("empleados after dark : "+MacsEmp[j].name);
						// console.log("posiciones length: "+datos.data.observations[i].locations.length);

						for (m= 0; m < datos.data.observations[i].locations.length; m++){
							//IngreCadaValor(MacsEmp[j],datos.data.observations[i].locations[m]);

							
							    swValandPopHorarioSinEncontrarSalir(MacsEmp[j],datos.data.observations[i].locations[m].time);
							
								cambioEstado(MacsEmp[j],MacsEmp[j].CompararTiempos[0]);
								revisarEstados(MacsEmp[j]);


						}


						
						

		
					}

			}
        


		}

	}
	RecorrerEmpleadosTresDos();


}


/****************************************************** */
router.get("",async (req,res,next)=>{
    IniciodeTodo();
	IniciodeTodo1();
});




// Meraki asks for us to know the secret
router.get('/control', function(req, res) {
	console.log('Validator = ' + validator);

    if(ValorOriginal==0){

        IniciodeTodo();
    }
    else{
        console.log("Valor original: "+ValorOriginal);
    }

    

	res.status(200).send(validator);
});
//

router.post('/control', jsonParser, function(req, res) {
	console.log("secret serv es:"+secret);
	console.log("secret dash es: "+req.body.secret);
	if (req.body.secret == secret) {
		var jsoned = req.body;
		console.log('Secret verificado');
		let fechaHoy = new Date();
		let DiaHoy=fechaHoy.getDay();
		if(DiaHoy==0 || DiaHoy==6){
			console.log("Es fin de semana");
			console.log("No se toma valores");
		}
		else{
            console.log("Dia Laboral");
			revisarHoras(req.body);
		}
		res.status(201).send();
	} else {
		console.log('Secret was invalid');
		res.status(501).send();
	}
});



module.exports= router;
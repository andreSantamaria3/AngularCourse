const Empleado = require('../models/empleado');
const express=require('express');
const app= express();
app.use(express.json());
//app.use(express.urlencoded());


const postsRoutes= require("./routes/EmpleadoPosts");
const deptRoutes= require("./routes/DepartamentoPosts");
const asistsRoutes= require("./routes/AsistenciaPosts");
const contratsRoutes= require("./routes/ContratoPosts");
const disposRoutes= require("./routes/DispositivoPosts");
const permisoRoutes= require("./routes/PermisoPosts");
const usuarioRoutes= require("./routes/UsuarioPosts");

//mail
const mailRoutes= require("./routes/mailer");

// meraki
const control = require("./routes/controlPosts");



app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers",
    "Origin, X-Requested-With,Content-Type, Accept,Authorization");
    res.setHeader("Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE,OPTIONS");
    next();
});


app.use("/api/posts",postsRoutes);
app.use("/api/depts",deptRoutes);
app.use("/api/asists",asistsRoutes);
app.use("/api/contrats",contratsRoutes);
app.use("/api/dispos",disposRoutes);
app.use("/api/permisos",permisoRoutes);
app.use("/api/users",usuarioRoutes);

//mail
app.use("/api/correo",mailRoutes);

//meraki
app.use("/api/control",control);


module.exports= app;

// para control asistencia


var appTwo = express();
var bodyParser = require('body-parser');
const { array } = require('yargs');

var jsonParser = bodyParser.json();



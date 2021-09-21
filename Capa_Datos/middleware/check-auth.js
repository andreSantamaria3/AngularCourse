const express = require("express");
const router = express.Router();
const jwt= require("jsonwebtoken");


module.exports=(req,res,next)=>{
    try{
        console.log("llegado: "+req.headers.authorization.split(" ")[1]);
    const token=req.headers.authorization.split(" ")[1];    

    console.log("Logrado");
    jwt.verify(token, 'token_secreto_para_validar');
    next();


    }catch(error){
        res.status(401).json({message:"FALLO!!!"});
    }
}
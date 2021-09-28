// const http = require('http');
// const app= require('./backend/app');

// const port= process.env.PORT || 3000;
// app.set('port',port);
// const server=http.createServer(app);

// server.listen(port);

const app = require("./app");
const debug = require("debug")("node-angular");
const http = require("http");
const https= require("https");
const fs = require('fs');

const normalizePort = val => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  debug("Listening on " + bind);
};


//PAra tener https
const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};





const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = https.createServer(options,app);
server.on("error", onError);
server.on("listening", onListening);
server.listen(port);
//






// Para Control de posicion y asistencia

// var portwo = process.env.OVERRIDE_PORT || process.env.PORT || 3333;
// var secret = process.env.SECRET || 'Andres3';
// var validator = process.env.VALIDATOR || '45a1cf7d6e72cc672a7712e40e8aff837288eef7';
// var route = process.env.ROUTE || '/cmx';




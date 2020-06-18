const Client = require('ibmiotf');
// dépendance api express
var express = require('express');
var bodyParser = require("body-parser");
var path = require('path');

// server.use(bodyParser.urlencoded({ extended: true }));
  
// serveur html
var server= express();
server.listen(3000);

server.get('/home', function(req, res) {
  // response.sendFile(path.resolve('../../index.html'))
  console.log(req.body);
  res.render("../index.html");
})



// function getValue() {
//   var temp = document.getElementById('input_temp').nodeValue;
//   console.log(temp);
// }




const deviceCLientConfig = {
  "org" : "fzw136",
  "id" : "alexbg" ,
  "type": "DTC",
  "auth-method" : "token",
  "auth-token": "motdepasse"
};

var deviceClient = new Client.IotfDevice(deviceCLientConfig);
deviceClient.log.setLevel('trace');


deviceClient.connect();

deviceClient.on("connect", function() {
    console.log("---Je suis connecté");
    deviceClient.publish("telemetry","json",'{"Temperature" : 37, "Fréquence-Cardiaque" : 65}');
    deviceClient.publish("status","json",'{ "Etat de sante" : "aucun-signe"}');
    deviceClient.publish("config","json",'{"Departement" : 13, "Medecin" : "Raoult"}');
});




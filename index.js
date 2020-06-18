// Required modules
const Client = require('ibmiotf');
var express = require('express');
var bodyParser = require("body-parser");
var path = require('path');
var app = express();

const deviceCLientConfig = {
  "org": "fzw136",
  "id": "alexbg",
  "type": "DTC",
  "auth-method": "token",
  "auth-token": "motdepasse"
};
var deviceClient = new Client.IotfDevice(deviceCLientConfig);

// Required files
const constants = require('./const');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/home', (req, res) => {
  console.log(req.body);
  return res.render('./index');
})

app.post('/home-post/:userId', (req, res) => {
  console.log('body ?', req.body);
  let userId = req.params.userId;
  if (!userId) {
    return res.json({
      status: 400,
      message: "User id manquant"
    })
  }

  // for (let i = 0; i < constants.config.length; i++) {
  //   if(userId == constants.config[i].id){
  //     deviceClient = new Client.IotfApplication(constants.config[i]);
  //   }
  // }

  let temp = req.body.temp;
  if (!temp) {
    return res.json({
      status: 400,
      message: "Veuillez saisir une temp"
    })
  }

  let fc = req.body.fc;
  if (!fc) {
    return res.json({
      status: 400,
      message: "Veuillez saisir une FC"
    })
  }
  let data = {
    Temperature: temp,
    FrequenceCardiaque: fc
  }

  deviceClient.publishHTTPS("telemetry", "json", data);
  return res.render('./index3', { temp: temp, fc: fc });
});





deviceClient.on("connect", function () {
  console.log("---Je suis connecté");
  // deviceClient.publish("telemetry","json",'{"Temperature" : 37, "Fréquence-Cardiaque" : 65}');
  // deviceClient.publish("status","json",'{ "Etat de sante" : "aucun-signe"}');
  // deviceClient.publish("config","json",'{"Departement" : 13, "Medecin" : "Raoult"}');
});

app.listen(3000 || process.env.PORT, () => {
  console.log('serveur démarré')
  deviceClient.log.setLevel('trace');
});




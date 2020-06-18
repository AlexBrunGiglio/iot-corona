// user 2
var Client = require("ibmiotf");
var appClientConfig = {
  "org": "fzw136",
  "id": "user2",
  "auth-key": "a-fzw136-ksurcowf9e",
  "auth-token": "Sr-ce-ciCPbIyZCO)+",
  "type" : "shared"
};

var appClient = new Client.IotfApplication(appClientConfig);
appClient.log.setLevel('debug');

appClient.connect();

appClient.on("connect", function () {
  console.log("Connecté au broker IBM");
  appClient.subscribeToDeviceEvents("DTC","alexbg","status");

  var myData={'Température' : 37, 'Fréquence-Cardiaque' : 60};
  myData = JSON.stringify(myData);
  appClient.publishDeviceEvent("DTC","user2", "telemetry", "json", myData);
});

appClient.on("deviceEvent", function (deviceType, deviceId, eventType, format, payload) {
  console.log("Device Event from :: "+deviceType+" : "+deviceId+" of event "+eventType+" with payload : "+payload);
});

appClient.on("error", function (err) {
    console.log("Error : "+err);
});

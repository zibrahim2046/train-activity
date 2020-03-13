  // Initialize Firebase
   // Your web app's Firebase configuration
   var firebaseConfig = {
    apiKey: "AIzaSyAnllAREqDW45eVUBfWC8VYpeJSgcd7Cds",
    authDomain: "train-activity-6fd9e.firebaseapp.com",
    databaseURL: "https://train-activity-6fd9e.firebaseio.com",
    projectId: "train-activity-6fd9e",
    storageBucket: "train-activity-6fd9e.appspot.com",
    messagingSenderId: "230206783621",
    appId: "1:230206783621:web:89e6e4eacff1e985a669ec"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var trainData = firebase.database();

  $("#addTrainBtn").on("click",function(){
    
    

    var trainName = $("#trainNameInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var firstTrain = moment($("#firstTrainInput").val().trim(),"HH:mm").subtract(10,"years").format("X");
    var frequency = $("#frequencyInput").val().trim();

   
    var newTrain = {
      name: trainName,
      destination: destination,
      firstTrain: firstTrain,
      frequency: frequency
    }

    trainData.ref().push(newTrain);

   
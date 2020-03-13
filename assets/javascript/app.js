// Initialize Firebase
var config = {
    apiKey: "AIzaSyAnllAREqDW45eVUBfWC8VYpeJSgcd7Cds",
    authDomain: "train-activity-6fd9e.firebaseapp.com",
    databaseURL: "https://train-activity-6fd9e.firebaseio.com",
    projectId: "train-activity-6fd9e",
    storageBucket: "train-activity-6fd9e.appspot.com",
    messagingSenderId: "230206783621",
    appId: "1:230206783621:web:89e6e4eacff1e985a669ec"
};
firebase.initializeApp(config);


var database = firebase.database();
//Current time
$("#currentTime").append(moment().format("hh:mm A"));

// Button for adding trains
$("#addTrainBtn").on("click", function (event) {
    event.preventDefault();
    // Grabs user input
    var empTrainName = $("#trainNameInput").val().trim();
    var empDestination = $("#destinationInput").val().trim();
    var empFirstTrain = moment($("#firstTrainInput").val().trim(), "HH:mm").subtract(10, "years").format("X");
    var empFrequency = $("#frequencyInput").val().trim();

    // Creates local "temporary" object for holding train data
    var newTrain = {
        name: empTrainName,
        destination: empDestination,
        firstTrain: empFirstTrain,
        frequency: empFrequency
    };

    // Uploads train data to the database
    database.ref().push(newTrain);

    // Alert
    alert(newTrain.name + " has been successfully added");

    // Clears all of the text-boxes
    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#firstTrainInput").val("");
    $("#frequencyInput").val("");
});


// Create Firebase event for adding trains to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot) {

    var empTrainName = childSnapshot.val().name;
    var empDestination = childSnapshot.val().destination;
    var empFirstTrain = childSnapshot.val().firstTrain;
    var empFrequency = childSnapshot.val().frequency;

    var tRemainder = moment().diff(moment.unix(empFirstTrain), "minutes") % empFrequency;
    var tMinutes = empFrequency - tRemainder;

    // To calculate the arrival time, add the tMinutes to the currrent time
    var tArrival = moment().add(tMinutes, "m").format("hh:mm A");

    // Create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(empTrainName),
        $("<td>").text(empDestination),
        $("<td>").text(empFrequency),
        $("<td>").text(tArrival),
        $("<td>").text(tMinutes),
    );

    // Append the new row to the table
    $("#trainTable > tbody").append(newRow);
});
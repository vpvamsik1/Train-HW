      var config = {
    apiKey: "AIzaSyBmo1TIN2ash2hr7LX2_YWiAY0wi0JIgOo",
    authDomain: "train-hw-db8eb.firebaseapp.com",
    databaseURL: "https://train-hw-db8eb.firebaseio.com",
    projectId: "train-hw-db8eb",
    storageBucket: "",
    messagingSenderId: "525435537577"
    };
    firebase.initializeApp(config);
    
    var database = firebase.database();

    $("button").on("click", function(){
    
    var name = $("#I1").val();
    var destination = $("#I2").val();
    var frequency = $("#I4").val();
    var firstTrain = $("#I3").val();    

    $("#I1").val(" ");
    $("#I2").val(" ");
    $("#I3").val(" ");
    $("#I4").val(" ");

    var timeConverted = moment(firstTrain, "HH:mm");
    console.log(moment(timeConverted).format("HH:mm"));

    var currentTime = moment();
    console.log("Current time: " + moment(currentTime).format("HH:mm"));

    var differenceInTime = moment().diff(moment(timeConverted), "minutes");
    console.log("Difference in time: " + differenceInTime);

    var remainder = differenceInTime % frequency
    console.log(remainder);

    var minutesTillTrain = frequency - remainder;
    console.log("Minutes till train: " + minutesTillTrain);

    var nextTrain = moment().add(minutesTillTrain, "minutes");
    console.log("Arrival time: " + moment(nextTrain).format("hh:mm a"));

       var trainData = {
        tName: name,
        tDestination: destination,
        tFrequency: frequency,
        tFirstTrain: firstTrain,
        tRemainder: remainder,
        tMinutesTillTrain: minutesTillTrain,
        // tNextTrain: nextTrain
    };

        database.ref().push(trainData);

        console.log(trainData.tName);
        console.log(trainData.tDestination);
        console.log(trainData.tFrequency);
        console.log(trainData.tFirstTrain);
        console.log(trainData.tRemainder);
        console.log(trainData.tMinutesTillTrain);
        console.log(trainData.tNextTrain);

    });

    database.ref().on("child_added", function(childSnapshot) {
        console.log(childSnapshot.val());

          var name = childSnapshot.val().tName;
          var destination = childSnapshot.val().tDestination;
          var frequency = childSnapshot.val().tFrequency;
          var firstTrain = childSnapshot.val().tFirstTrain;
          var minutesTillTrain = childSnapshot.val().tMinutesTillTrain;
        //   var nextTrain = childSnapshot.val().tNextTrain;

          var trainTest = moment().add(minutesTillTrain, "minutes");
          var nextTrain = moment(trainTest).format("hh:mm a")
        

          console.log(name);
          console.log(destination);
          console.log(frequency);
          console.log(firstTrain);
          console.log(minutesTillTrain);
          console.log(nextTrain);

         var newRow = $("<tr>").append(
             $("<td>").html(name),
             $("<td>").html(destination),
             $("<td>").html(frequency),
             $("<td>").html(nextTrain),
             $("<td>").html(minutesTillTrain)   
         )
     

          $("tbody").append(newRow);



    });

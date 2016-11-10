  // Initialize Firebase
  $("th").addClass("text-center");
  
  var config = {
    apiKey: "AIzaSyA32c64d5-e5A23sjM2jrJkEIzeYW-HkNo",
    authDomain: "dol-train-depo.firebaseapp.com",
    databaseURL: "https://dol-train-depo.firebaseio.com",
    storageBucket: "dol-train-depo.appspot.com",
    // messagingSenderId: "605597879599"
  };
  firebase.initializeApp(config);

  var train = "";
  var destination = "";
  var depart = "";
  var run = "";

  //Desired Add-in: Do not allow form submit to work until all fields entered; tell user fields left to complete

var database = firebase.database();

$("#submit").on("click", function(event){
	event.preventDefault();
	// alert("what")
	train = $("#trainInput").val().trim();
	destination = $("#destinationInput").val().trim();
	depart = $("#departInput").val().trim();
	console.log("departure is "+depart);
	run = moment($("#runInput").val().trim(), "mm").format("mm");
	


	database.ref().child("train_data").push({
		train : train,
		destination : destination,
		depart : depart,
		run : run
	});
	// $("form").trigger("reset");
});

database.ref("train_data").on("child_added", function(childSnapshot){
	var currenTime = moment();
	console.log("curent time=",moment(currenTime).format("hh:mm"));
	var deparTime = moment(childSnapshot.val().depart, "hh:mm").subtract(1, "year");
	var runTime = parseInt(childSnapshot.val().run);
	console.log($.type(currenTime)
			+"\n"+$.type(deparTime),moment(deparTime).format("HH:mm")
			+"\n"+runTime);

	var timeDiff = moment().diff(moment(deparTime),"minutes");
	console.log("diff is "+timeDiff);

	var diffRemains = timeDiff % runTime;
	console.log("Here lies "+diffRemains);

	var timeAway = runTime - diffRemains;
	console.log("away "+ timeAway);	
	var nexTrain = moment().add(timeAway, "minutes");
	console.log(nexTrain);


	$("#trainDepo").append("<tr>");
	$("#trainDepo").append("<td>"+childSnapshot.val().train);
	$("#trainDepo").append("<td>"+childSnapshot.val().destination);
	$("#trainDepo").append("<td>"+childSnapshot.val().run);
	$("#trainDepo").append("<td>"+moment(deparTime).format("HH:mm"));
	$("#trainDepo").append("<td>"+moment(nexTrain).format("HH:mm"));
	$("#trainDepo").append("<td>"+timeAway);
	$("td").addClass("text-center");


});


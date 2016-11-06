  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA32c64d5-e5A23sjM2jrJkEIzeYW-HkNo",
    authDomain: "dol-train-depo.firebaseapp.com",
    databaseURL: "https://dol-train-depo.firebaseio.com",
    storageBucket: "",
    messagingSenderId: "605597879599"
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
	run = $("#runInput").val().trim();

	database.ref().push({
		train : train,
		destination : destination,
		depart : depart,
		run : run
	});
	// $("form").trigger("reset");
	// return false;
});

console.log(database.ref());
database.ref().on("child_added", function(){
	$("#trainDepo").append("<tr>");
	$("#trainDepo").append("<td>"+database.ref().train.val());
})
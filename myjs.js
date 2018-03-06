var provider = new firebase.auth.GoogleAuthProvider();
var user;
var selectedFile;


$( document ).ready(function() {
	$("#welcome").hide();
	$("#uploadButton").hide();
	$(".upload-group").hide();
});

function signIn() {
	
	  showWelcomeContainer();
	  // ...
	

};

function showWelcomeContainer() {
	$("#login").hide();
	$("#welcome").show();
	$(".upload-group").show();
	$("#welcomeText").html("Hello, ");
};


$("#file").on("change", function(event) {
	selectedFile = event.target.files[0];
	$("#uploadButton").show();
});

function uploadFile() {
	// Create a root reference
	var filename = selectedFile.name;
	var storageRef = firebase.storage().ref('/Images/' + filename);
	var uploadTask = storageRef.put(selectedFile);

	// Register three observers:
	// 1. 'state_changed' observer, called any time the state changes
	// 2. Error observer, called on failure
	// 3. Completion observer, called on successful completion
	uploadTask.on('state_changed', function(snapshot){
	  // Observe state change events such as progress, pause, and resume
	  // See below for more detail
	 
	}, function(error) {
	  // Handle unsuccessful uploads
	}, function() {
	  // Handle successful uploads on complete
	  // For instance, get the download URL: https://firebasestorage.googleapis.com/...
	  var postKey = firebase.database().ref('Posts/').push().key;
	  var downloadURL = uploadTask.snapshot.downloadURL;
	  var updates = {};

	  document.onload = setTimeout(function () { window.location.reload() }, 3000);
	  var postData = {
	  	url: downloadURL,
			caption: $("#imageCaption").val(), 
			number: $("#number").val(),
	  	
	  	
	  };
	  updates['/Posts/'+postKey] = postData;
	  firebase.database().ref().update(updates);
	});


}





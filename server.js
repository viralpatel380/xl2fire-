	var express = require('express');
	var app = express();
	
	var bodyParser = require('body-parser');
	var multer = require('multer');
	var xlstojson = require("xls-to-json-lc");
	var xlsxtojson = require("xlsx-to-json-lc");
	var firebase = require("firebase");
	require('firebase/database');
	app.listen(3000, () => {
		console.log('App Successful listening on port 3000');
	});
	

	var config = {
		apiKey: "AIzaSyCL4ehybGdwvla03NCF7P8kyNSpZhJ_hoU",
		authDomain: "yobykes-ssm.firebaseapp.com",
		databaseURL: "https://yobykes-ssm.firebaseio.com",
		projectId: "yobykes-ssm",
		storageBucket: "yobykes-ssm.appspot.com",
		messagingSenderId: "859108605869"
	  };
	firebase.initializeApp({
		databaseURL: "https://yobykes-ssm.firebaseio.com"
	});



	app.use(bodyParser.json());

	var storage = multer.diskStorage({
		destination: function (req, file, cb) {
			cb(null, './uploads/')
		},
		filename: function (req, file, cb) {
			var datetimestamp = Date.now();
			cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
		}
	});

	var upload = multer({
		storage: storage,
		fileFilter: function (req, file, callback) {
			if (['xls', 'xlsx', 'jpg'].indexOf(file.originalname.split('.')[file.originalname.split('.').length - 1]) === -1) {
				return callback(new Error('Wrong extension type'));
			}
			callback(null, true);
		}
	}).single('file');



	app.post('/upload', function (req, res) {
		var exceltojson;
		upload(req, res, function (err) {
			if (err) {
				res.json({
					error_code: 1,
					err_desc: err
				});
				return;
			}

			if (!req.file) {

				res.json({
					error_code: 1,
					err_desc: "No file passed"
				});

				return;
			}

			if (req.file.originalname.split('.')[req.file.originalname.split('.').length - 1] === 'xlsx') {
				exceltojson = xlsxtojson;
			} else {
				exceltojson = xlstojson;
			}
			console.log(req.file.path);
			try {
				exceltojson({
					input: req.file.path,
					output: null,
					//   lowerCaseHeaders: true
				}, function (err, result) {
					if (err) {
						return res.json({
							error_code: 1,
							err_desc: err,
							data: null
						});
					}
					res.json({
						result
					});
					// var v = this.result;
					//  var fs = require('fs');

					console.log({
						error_code: 0,
						err_desc: null,
						data: result
					});

					var jsonfile = require('jsonfile');
					jsonfile.writeFile('jsonfile.json', result);
					for (var i = 0; i < result.length; i++) {
						console.log(i);

						var chargerNov = result[i]["charger no"];
						var chargerRatingv = result[i]["charger rating"];
						var cityv = result[i]["city"];
						var colorv = result[i]["color"];
						var controllerNov = result[i]["controller no"];
						var converterNov = result[i]["converter no"];
						var dealerCodev = result[i]["dealer code"];
						var dealerNamev = result[i]["dealer name"];
						var exciseInvoiceNumberv = result[i]["Excise Invoice no"];
						var modelv = result[i]["model"];
						var motorNov = result[i]["motor no"];
						var ownerManualNov = result[i]["owner manual no"];

						var listOfObjects = [];
						listOfObjects.push(result[i]["serial no btry 1"]);
						listOfObjects.push(result[i]["serial no btry 2"]);
						listOfObjects.push(result[i]["serial no btry 3"]);
						listOfObjects.push(result[i]["serial no btry 4"]);
						listOfObjects.push(result[i]["serial no btry 5"]);
						listOfObjects.push(result[i]["serial no btry 6"]);
						listOfObjects.push(result[i]["serial no btry 7"]);
						listOfObjects.push(result[i]["serial no btry 8"]);

						var n = Number(result[i]["time"])
						var n1 = Number(result[i]["type vehicle"])


						


						var serialNoBattery1v = result[i]["serial no btry 1"];
						var serialNoBattery2v = result[i]["serial no btry 2"];
						var serialNoBattery3v = result[i]["serial no btry 3"];
						var serialNoBattery4v = result[i]["serial no btry 4"];
						var serialNoBattery5v = result[i]["serial no btry 5"];
						var serialNoBattery6v = result[i]["serial no btry 6"];
						var serialNoBattery7v = result[i]["serial no btry 7"];
						var serialNoBattery8v = result[i]["serial no btry 8"];
						var soldTimeStampv = result[i]["time"];
						var statev = result[i]["state"];
						var statusv = result[i]["status"];
						var typeVehiclev = result[i]["type vehicle"];
						var vehicleChassisNoCodev = result[i]["chesis no"];
						var vehicleInvoiceDatev = result[i]["invoice date"];
						var vehicleInvoiceNov = result[i]["invoice no"];

						var status;
						
							status = false;

						







						//  console.log(name3);
						//  console.log(name1);
						//  console.log(name2);

						//	JSON.parse( JSON.stringify(name1 ) )
						//var obj = JSON.parse(result[0]);
						firebase.database().ref().child("Vehicle").push().set({

							chargerNo: chargerNov,
							chargerRating: chargerRatingv,
							city: cityv,
							color: colorv,
							controllerNo: controllerNov,
							converterNo: converterNov,
							dealerCode: dealerCodev,
							dealerName: dealerNamev,
							exciseInvoiceNumber: exciseInvoiceNumberv,
							model: modelv,
							motorNo: motorNov,
							ownerManualNo: ownerManualNov,
							serialNoBattery: listOfObjects,
							//  serialNoBattery1 : serialNoBattery1v,
							//  serialNoBattery2 : serialNoBattery2v,
							//  serialNoBattery3 : serialNoBattery3v,
							//  serialNoBattery4 : serialNoBattery4v,
							//  serialNoBattery5 : serialNoBattery5v,
							//  serialNoBattery6 : serialNoBattery6v,
							// serialNoBattery7 : serialNoBattery7v,
							//  serialNoBattery8 : serialNoBattery8v,
							soldTimeStamp: n,
							state: statev,
							status: status,
							typeVehicle: n1,
							vehicleChassisNoCode: vehicleChassisNoCodev,
							vehicleInvoiceDate: vehicleInvoiceDatev,
							vehicleInvoiceNo: vehicleInvoiceNov
						});


					}
				});

			} catch (e) {
				res.json({
					error_code: 1,
					err_desc: "Corupted excel file"
				});
			}
		})

	});


	//var v = this.result;

	//var json = this.result;
	// firebase.database().ref('/posts').on('value', function(snapshot) {
	// 	console.log(snapshotToArray(snapshot));
	// });

	// function snapshotToArray(snapshot) {
	// 	var returnArr = [];
	
	// 	snapshot.forEach(function(childSnapshot) {
	// 		var item = childSnapshot.val();
	// 		item.key = childSnapshot.key;
	
	// 		returnArr.push(item);
	// 	});
	
	// 	return returnArr;
	// 	//console.log(returnArr);
		
	// };
   

	app.get('/', function (req, res) {
	//	res.sendFile('public/index.html' , { root : __dirname});
		res.end("app started");
	});



	app.get('/add', function (req, res) {
		res.sendFile('public/index.html' , { root : __dirname});
	});



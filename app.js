	var express = require('express');
	var app = express();
	var bodyParser = require('body-parser');
	var multer = require('multer');
	var xlstojson = require("xls-to-json-lc");
	var xlsxtojson = require("xlsx-to-json-lc");
	var firebase = require("firebase");
	require('firebase/database');
	var config = {
	    apiKey: "AIzaSyDWTFbwQa6ucCrlgQNV-NJALahbRjQ5H0k",
	    authDomain: "fir-bad72.firebaseapp.com",
	    databaseURL: "https://fir-bad72.firebaseio.com",
	    projectId: "fir-bad72",
	    storageBucket: "fir-bad72.appspot.com",
	    messagingSenderId: "714065987518"
	};

	firebase.initializeApp({
	    databaseURL: "https://fir-bad72.firebaseio.com"
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
					var name1 = result[0].age;
					var name2 = result[0].Name;
					
				//	JSON.parse( JSON.stringify(name1 ) )
			   		//var obj = JSON.parse(result[0]);
				  	firebase.database().ref().child("Vehicle").push().set({
					   
					age : name1,
					name : name2 
					   
				   });


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


	app.get('/', function (req, res) {
	    res.sendFile(__dirname + "/index.html");
	});


	app.listen('3000', function () {
	    console.log('running on 3000...');
	});
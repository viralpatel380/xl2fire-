function begin() {
  // Initialize Firebase
  var config = {  
   apiKey: "AIzaSyCL4ehybGdwvla03NCF7P8kyNSpZhJ_hoU",
    authDomain: "yobykes-ssm.firebaseapp.com",
    databaseURL: "https://yobykes-ssm.firebaseio.com",
    projectId: "yobykes-ssm",
    storageBucket: "yobykes-ssm.appspot.com",
    messagingSenderId: "859108605869"
  };

  firebase.initializeApp(config);

  var refConvalidaciones = firebase.database().ref().child('Vehicle');

  var $formConvalidaciones = $('#form-convalidaciones');
  var $tbodyTablaConvalidaciones = $('#tbody-tabla-convalidaciones');
  var $dealerName = $('#dealerName');
  var $status = $('#status');
  var $vehicleInvoiceNo = $('#vehicleInvoiceNo');
  var $vehicleInvoiceDate = $('#vehicleInvoiceDate');
  var $model = $('#model');
  var $color = $('#color');
  var $botonSubmit = $('#boton-enviar-convalidacion');


  mostrarConvalidaciones();

  function mostrarConvalidaciones() {
    refConvalidaciones.on('value', function(snapshot) {
      var datos = snapshot.val();
      var filasAMostrar = '';

      for (var key in datos) {
        filasAMostrar += '<tr>' +
        '<td>' +
        '<td></td>' +
        
        '<td>' + datos[key].dealerName + '</td>' +
        '<td>' + datos[key].status + '</td>' +
        '<td>' + datos[key].vehicleInvoiceNo + '</td>' +
        '<td>' + datos[key].vehicleInvoiceDate + '</td>' +
        '<td>' + datos[key].model + '</td>' +
        '<td>' + datos[key].color + '</td>' +
        
          '</td>' +
          '</tr>';
      }
      $tbodyTablaConvalidaciones.html(filasAMostrar);
    });
  }

  function action(event) {
    if (event.target.parentElement.tagName === 'BUTTON') {
      if ($(event.target.parentElement).hasClass('borrar')) {
        borrarConvalidacion($(event.target.parentElement).data('convalidacion'));
      } else if ($(event.target.parentElement).hasClass('editar')) {
        editarConvalidacion($(event.target.parentElement).data('convalidacion'));
      }
    }
  }

  function borrarConvalidacion(strKey) {
    refConvalidaciones.child(strKey).remove();
  }

 function editarConvalidacion(strKey) {
     refConvalidacionEditar = refConvalidaciones.child(strKey);

    refConvalidacionEditar.once('value', function(snapshot) {
      var data = snapshot.val();
      $empId.val(data.empId);
      $name.val(data.name);
      $dateOfBirth.val(data.dateOfBirth);
      $designation.val(data.designation);
      $workLocation.val(data.workLocation);
      $gender.val(data.gender);
      $email.val(data.email);
      $currentMobile.val(data.currentMobile);
      $permanentMobile.val(data.permanentMobile);
      $address.val(data.address);
      $divisionType.val(data.divisionType);
      $activeStatus.val(data.activeStatus);
      $citiesAssigned.val(data.citiesAssigned);
        });

    $botonSubmit.val(UPDATE);
    modo = UPDATE;
  }

  function createEditConvalidacion(event) {
    event.preventDefault();

    switch (true) {
    case (modo === CREATE):
      refConvalidaciones.push({
        empId: event.target.empId.value,
        name: event.target.name.value,
        dateOfBirth: event.target.dateOfBirth.value,
        designation: event.target.designation.value,
        workLocation: event.target.workLocation.value,
        gender: event.target.gender.value,
        email: event.target.email.value,
        currentMobile: event.target.currentMobile.value,
        permanentMobile: event.target.permanentMobile.value,
        address: event.target.address.value,
        divisionType: event.target.divisionType.value,
        activeStatus: event.target.activeStatus.value,
        citiesAssigned: event.target.citiesAssigned.value
});
      break;
    case (modo === UPDATE):
      refConvalidacionEditar.update({
        empId: event.target.empId.value,
        name: event.target.name.value,
        dateOfBirth: event.target.dateOfBirth.value,
        designation: event.target.designation.value,
        workLocation: event.target.workLocation.value,
        gender: event.target.gender.value,
        email: event.target.email.value,
        currentMobile: event.target.currentMobile.value,
        permanentMobile: event.target.permanentMobile.value,
        address: event.target.address.value,
        divisionType: event.target.divisionType.value,
        activeStatus: event.target.activeStatus.value,
        citiesAssigned: event.target.citiesAssigned.value
     });

      $botonSubmit.val(CREATE);
      modo = CREATE;
      break;
    }
    $formConvalidaciones[0].reset();
  }
};

$(document).ready(begin);

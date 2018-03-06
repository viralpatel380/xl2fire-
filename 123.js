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

  var refConvalidaciones = firebase.database().ref().child('users/salesPersonNode');

  var $formConvalidaciones = $('#form-convalidaciones');
  var $tbodyTablaConvalidaciones = $('#tbody-tabla-convalidaciones');
  var $empId = $('#empId');
  var $name = $('#name');
  var $dateOfBirth = $('#dateOfBirth');
  var $designation = $('#designation');
  var $workLocation = $('#workLocation');
  var $gender = $('#gender');
  var $email = $('#email');
  var $currentMobile = $('#currentMobile');
  var $permanentMobile = $('#permanentMobile');
  var $address = $('#address');
  var $divisionType = $('#divisionType');
  var $activeStatus = $('#activeStatus');
  var $citiesAssigned = $('#citiesAssigned');
  var $botonSubmit = $('#boton-enviar-convalidacion');

  var CREATE = 'Submit';
  var UPDATE = 'Update';
  var modo = CREATE;
  var refConvalidacionEditar;

  $formConvalidaciones.on('submit', createEditConvalidacion);
  $tbodyTablaConvalidaciones.on('click', action);

  mostrarConvalidaciones();

  function mostrarConvalidaciones() {
    refConvalidaciones.on('value', function(snapshot) {
      var datos = snapshot.val();
      var filasAMostrar = '';

      for (var key in datos) {
        filasAMostrar += '<tr>' +
        '<td>' +
        '<a href="#home">' + 
        '<button data-convalidacion="' + key + '" class="btn btn-primary editar"  >' + 
        '<span class="glyphicon glyphicon-edit"></span>' +
        '</button>' +
        '</a>' +
        '</td>' +
        '<td>' +
        '<button data-convalidacion="' + key + '" class="btn btn-danger borrar">' +
        '<span class="glyphicon glyphicon-trash"></span>' +
        '</button>' +
        '<td></td>' +
        
        '<td>' + datos[key].empId + '</td>' +
        '<td>' + datos[key].name + '</td>' +
        '<td>' + datos[key].dateOfBirth + '</td>' +
        '<td>' + datos[key].designation + '</td>' +
        '<td>' + datos[key].workLocation + '</td>' +
        '<td>' + datos[key].gender + '</td>' +
        '<td>' + datos[key].email + '</td>' +
        '<td>' + datos[key].currentMobile + '</td>' +
        '<td>' + datos[key].permanentMobile + '</td>' +
        '<td>' + datos[key].address + '</td>' +
        '<td>' + datos[key].divisionType + '</td>' +
        '<td>' + datos[key].activeStatus + '</td>' +
        '<td>' + datos[key].citiesAssigned + '</td>' +
     
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

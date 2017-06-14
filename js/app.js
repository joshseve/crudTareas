var api = {
  url: 'https://lab-api-test.herokuapp.com/tasks/'
};

var plantillaIconos=  '<td>' +
          '<span class="glyphicon glyphicon-zoom-in"></span>' +
          '<span class="glyphicon glyphicon-pencil"></span>'+
          '<span class="glyphicon glyphicon-remove-circle"></span>'+
        '</td>';



var $tasksList = $("#tasks-list");

var cargarPagina = function () {
  cargarTareas();
  $("#add-form").submit(agregarTarea);
};

var cargarTareas = function () {
  $.getJSON(api.url, function (tareas) {
    tareas.forEach(crearTarea);

  });
}

var crearTarea = function (tarea) {
  var nombre = tarea.name;
  var estado = tarea.status[0];
  var id=tarea=tarea._id;
  // console.log(id);
  // creamos la fila
  var $tr = $("<tr />");
  //conectar con la data que los id se conecten con los botones
  $tr.attr("data-id", id);

  // creamos la celda del nombre
  var $nombreTd = $("<td />");
  $nombreTd.text(nombre);
  // creamos la celda del estado
  var $estadoTd = $("<td />");
  $estadoTd.text(estado);
  // agregamos las celdas a la fila
  $tr.append($nombreTd);
  $tr.append($estadoTd);
  $tr.append(plantillaIconos);
  // agregamos filas a la tabla
  $tasksList.append($tr);
};

var agregarTarea = function (e) {
  e.preventDefault();
  var nombre = $("#nombre-tarea").val();
  $.post(api.url, {
    name: nombre
  }, function (tarea) {
    crearTarea(tarea);
    $("#myModal").modal("hide");
  });
};

var borrarTarea=function(){
  //con esta linea obtengo el valor del id accediendo al DOM de padres a hijos.
  var id=$(this).parents("tr").data('id');
  console.log(id);
  $.ajax({
    url:api.url+id,
    type:"DELETE",
    success: function(data){
      console.log("borrado");
    }
  });
  //Esta linea sirve para remover del HTML el elemento, pero continua en el SERVIDOR.
  $(this).parents("tr").remove();
}

//en el documento, agrego el "metodo del on" que tiene el evento click,
//en la clase del icon Borrar, haciendo lo que diga la funcion borrarTarea.
$(document).on("click", ".glyphicon-remove-circle", borrarTarea)

$(document).ready(cargarPagina);

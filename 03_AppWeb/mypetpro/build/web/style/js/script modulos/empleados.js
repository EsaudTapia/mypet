var empleados = [];//borramos el contenido del arreglo de empleado que estab en formato json

function alerta() {
    Swal.fire
            ({
                icon: 'success',
                title: 'Hecho',
                text: 'Guardado Exitosamente!'
            });
}

function mostrarTablaEmpleados() {
    $("#btnAdd").prop("disabled", false); //agregar empleado
    var contenido = '';
    $.ajax
            ({
                type: "GET",
                url: "rest/empleado/getAll"
            }).done(function (data) {
        if (data.exception != null) {
            Swal.fire("La operacion no pudo ser completada",
                    data.exception,
                    "error");
        } else if (data.length < 1) {
            contenido = '<tr>' +
                    '<td colspan="12" class="text-center">' +
                    '<img alt="" src="style/media/img/dogsad.png" style="height: 120px;"/><br>' +
                    '<span class="text-danger font-weight-bold">' +
                    'Por el momento no hay empleados en el sistema.' +
                    '</span>' +
                    '</td>' +
                    '</tr>';
            $("#tbodyEmpleados").html(contenido);
            return;
        } else {
            empleados = data;
            for (var i = 0; i < empleados.length; i++) {
                if (empleados[i].persona.estatus === 1) {
                    contenido +=
                            '<tr id="empleado' + i + '">' +
                            '<td id="idEmpleado' + i + '">' + empleados[i].id + '</td>' + //las variables deben ser iguales al modelo de persona y                           
                            '<td id="nombre' + i + '">' + empleados[i].persona.nombre + '</td>' +
                            '<td id="aPaterno' + i + '">' + empleados[i].persona.apellidoPaterno + '</td>' +
                            '<td id="aMaterno' + i + '">' + empleados[i].persona.apellidoMaterno + '</td>' +
                            '<td id="fechaNac' + i + '">' + empleados[i].persona.fechaNacimiento + '</td>' +
                            '<td id="correo' + i + '">' +
                            '<a href="mailto:' + empleados[i].correo + '">' + empleados[i].correo + '</a>' +
                            '</td>' +
                            '<td id="telefono' + i + '">' + empleados[i].persona.tel1 + '</td>' +
                            '<td id="direccion' + i + '">' + empleados[i].persona.calle + " #" + empleados[i].persona.numero + ", " + empleados[i].persona.colonia + ". " + empleados[i].persona.cp + '</td>' +
                            '<td id="estatus' + i + '">' + (empleados[i].estatus = 1 ? '<i class="fal fa-check-square"></i>' : '<i class="fal fa-square"></i>') + '</td>' +
                            '<td>' +
                            '<div class="btn-group">' +
                            '<button class="btn btn-sm btn-warning" onclick="editEmpleado(' + i + ');" data-toggle="modal" data-target="#exampleModal"><i class="fal fa-edit"></i> Editar</button>' +
                            '<button class="btn btn-sm btn-danger"  onclick="deleteEmpleado(' + i + ');"><i class="fal fa-trash-alt"></i> Eliminar</button>' +
                            '</div>' +
                            '</td>' +
                            '</tr>';
                } else {
                    contenido +=
                            '<tr id="empleado' + i + '">' +
                            '<td id="idEmpleado' + i + '">' + empleados[i].id + '</td>' + //variables del modelo en java                              
                            '<td id="nombre' + i + '">' + empleados[i].persona.nombre + '</td>' +
                            '<td id="aPaterno' + i + '">' + empleados[i].persona.apellidoPaterno + '</td>' +
                            '<td id="aMaterno' + i + '">' + empleados[i].persona.apellidoMaterno + '</td>' +
                            '<td id="fechaNac' + i + '">' + empleados[i].persona.fechaNacimiento + '</td>' +
                            '<td id="correo' + i + '">' +
                            '<a href="mailto:' + empleados[i].correo + '">' + empleados[i].correo + '</a>' +
                            '</td>' +
                            '<td id="telefono' + i + '">' + empleados[i].persona.tel1 + '</td>' +
                            '<td id="direccion' + i + '">' + empleados[i].persona.calle + " #" + empleados[i].persona.numero + ", " + empleados[i].persona.colonia + ". " + empleados[i].persona.cp + '</td>' +
                            '<td id="estatus' + i + '">' + (empleados[i].estatus ? '<i class="fal fa-check-square"></i>' : '<i class="fal fa-square"></i>') + '</td>' +
                            '<td>' +
                            '<div class="btn-group">' +
                            '<button class="btn btn-sm btn-warning" onclick="editEmpleado(' + i + ');" data-toggle="modal" data-target="#exampleModal"><i class="fal fa-edit"></i> Editar</button>' +
                            '<button class="btn btn-sm btn-success" onclick="activarEmpleado(' + i + ');"><i class="fal fa-plus"></i> Activar</button>' +
                            '</div>' +
                            '</td>' +
                            '</tr>';
                }
            }
            $("#tbodyEmpleados").html(contenido);
        }
    });
}

function mostrarActivosEmpleados() {
    var contenido = '';
    $.ajax
            ({
                type: "GET",
                url: "rest/empleado/getAll"
            }).done(function (data) {
        if (data.exception != null) {
            Swal.fire("La operacion no pudo ser completada",
                    data.exception,
                    "error");
        } else if (data.length < 1) {
            contenido = '<tr>' +
                    '<td colspan="12" class="text-center">' +
                    '<img alt="" src="style/media/img/dogsad.png" style="height: 120px;"/><br>' +
                    '<span class="text-danger font-weight-bold">' +
                    'Por el momento no tienes productos en tu cat??logo.' +
                    '</span>' +
                    '</td>' +
                    '</tr>';
            $("#tbodyEmpleados").html(contenido);
            return;
        } else {
            empleados = data;
            for (var i = 0; i < empleados.length; i++)
            {
                if (empleados[i].persona.estatus === 1) {
                    contenido +=
                            '<tr id="empleado' + i + '">' +
                            '<td id="idEmpleado' + i + '">' + empleados[i].id + '</td>' + //variables del modelo en java                            
                            '<td id="nombre' + i + '">' + empleados[i].persona.nombre + '</td>' +
                            '<td id="aPaterno' + i + '">' + empleados[i].persona.apellidoPaterno + '</td>' +
                            '<td id="aMaterno' + i + '">' + empleados[i].persona.apellidoMaterno + '</td>' +
                            '<td id="fechaNac' + i + '">' + empleados[i].persona.fechaNacimiento + '</td>' +
                            '<td id="correo' + i + '">' +
                            '<a href="mailto:' + empleados[i].correo + '">' + empleados[i].correo + '</a>' +
                            '</td>' +
                            '<td id="telefono' + i + '">' + empleados[i].persona.tel1 + '</td>' +
                            '<td id="direccion' + i + '">' + empleados[i].persona.calle + " #" + empleados[i].persona.numero + ", " + empleados[i].persona.colonia + ". " + empleados[i].persona.cp + '</td>' +
                             '<td>' + '<i class="fal fa-check-square"></i>' + '</td>' +
                            '<td>' +
                            '<div class="btn-group">' +
                            '<button class="btn btn-sm btn-warning" onclick="editEmpleado(' + i + ');" data-toggle="modal" data-target="#exampleModal"><i class="fal fa-edit"></i> Editar</button>' +
                            '<button class="btn btn-sm btn-danger"  onclick="deleteEmpleado(' + i + ');"><i class="fal fa-trash-alt"></i> Eliminar</button>' +
                            '</div>' +
                            '</div>' +
                            '</td>' +
                            '</tr>';
                }
            }
            $("#tbodyEmpleados").html(contenido);
        }
    });
}

function mostrarInactivosEmpleados()
{
    var contenido = '';
    $.ajax
            ({
                type: "GET",
                url: "rest/empleado/getAll"
            }).done(function (data) {
        if (data.exception != null) {
            Swal.fire("La operacion no pudo ser completada",
                    data.exception,
                    "error");
        } else if (data.length < 1) {
            contenido = '<tr>' +
                    '<td colspan="12" class="text-center">' +
                    '<img alt="" src="style/media/img/dogsad.png" style="height: 120px;"/><br>' +
                    '<span class="text-danger font-weight-bold">' +
                    'Por el momento no tienes productos en tu cat??logo.' +
                    '</span>' +
                    '</td>' +
                    '</tr>';
            $("#tbodyEmpleados").html(contenido);
            return;
        } else {
            empleados = data;
            for (var i = 0; i < empleados.length; i++)
            {
                if (empleados[i].persona.estatus === 0) {
                    contenido +=
                            '<tr id="empleado' + i + '">' +
                            '<td id="idEmpleado' + i + '">' + empleados[i].id + '</td>' + //variables del modelo en java                            
                            '<td id="nombre' + i + '">' + empleados[i].persona.nombre + '</td>' +
                            '<td id="aPaterno' + i + '">' + empleados[i].persona.apellidoPaterno + '</td>' +
                            '<td id="aMaterno' + i + '">' + empleados[i].persona.apellidoMaterno + '</td>' +
                            '<td id="fechaNac' + i + '">' + empleados[i].persona.fechaNacimiento + '</td>' +
                            '<td id="correo' + i + '">' +
                            '<a href="mailto:' + empleados[i].correo + '">' + empleados[i].correo + '</a>' +
                            '</td>' +
                            '<td id="telefono' + i + '">' + empleados[i].persona.tel1 + '</td>' +
                            '<td id="direccion' + i + '">' + empleados[i].persona.calle + " #" + empleados[i].persona.numero + ", " + empleados[i].persona.colonia + ". " + empleados[i].persona.cp + '</td>' +
                            '<td>' + (empleados[i].estatus ? '<i class="fal fa-check-square"></i>' : '<i class="fal fa-square"></i>') + '</td>' +
                            '<td>' +
                            '<div class="btn-group">' +
                            '<button class="btn btn-sm btn-warning" onclick="editEmpleado(' + i + ');" data-toggle="modal" data-target="#exampleModal"><i class="fal fa-edit"></i> Editar</button>' +
                            '<button class="btn btn-sm btn-success" onclick="activarEmpleado(' + i + ');"><i class="fal fa-plus"></i> Activar</button>' +
                            '</div>' +
                            '</td>' +
                            '</tr>';
                }
            }
            $("#tbodyEmpleados").html(contenido);
        }
    });
}

function filtrarEmp() {
    var optFiltro = parseInt($("#selectFiltro").val());
    switch (optFiltro) {
        case 0:
            mostrarTablaEmpleados();
            break;
        case 1:
            mostrarInactivosEmpleados();
            break;
        case 2:
            mostrarActivosEmpleados();

            break;
    }

}

function deleteEmpleado(i)
{
    var id = empleados[i].persona.id;
    var data = {idPersona: id};
    $.ajax
            ({
                type: "POST",
                url: "rest/empleado/delete",
                async: true,
                data: data
            }).done(function (data)
    {
        if (data.exception != null)
        {
            Swal.fire("Error en la eliminaci??n",
                    data.exception,
                    "error");
        } else{
             {
            Swal.fire("Eliminaci??n exitosa",
                    "Registro eliminado correctamente",
                    "success");
            mostrarTablaEmpleados();
        }
        }
       

    });
}

function activarEmpleado(i) {
    var id = empleados[i].persona.id;
    var data = {idPersona: id};
    $.ajax
            ({
                type: "POST",
                url: "rest/empleado/activar",
                async: true,
                data: data
            }).done(function (data)
    {
        if (data.exception != null)
        {
            Swal.fire("Error en la Activacion",
                    data.exception,
                    "error");
        } else
        {
            Swal.fire("Actualizaci??n exitosa",
                    "Registro activado correctamente",
                    "success");
            mostrarTablaEmpleados();
        }

    });
}


$("#btnAdd").click(function ()
{
    $("#exampleModalLabel").addClass("text-success");
    $("#exampleModalLabel").removeClass("text-warning");
    $("#exampleModalLabel").html("Agregar Empleado");
    $("#btnEditEmpleado").hide();
    $("#btnAddEmpleado").show();
    $("#txtIdEmpleado").val(empleados.length + 1);
    $("#txtIdPersona").val(empleados[empleados.length-1 ].persona.id + 1);
    $("#txtNombre").val(null);
    $("#txtIdEmpleado").prop("disabled", true);
    $("#txtApellidoP").val(null);
    $("#txtApellidoM").val(null);
    $("#txtFechaNacE").val(null);
    $("#txtCorreo").val(null);
    $("#txtContrasenia").val(null);
    $("#txtTel").val(null);
    $("#txtCalle").val(null);
    $("#txtNumero").val(null);
    $("#txtColonia").val(null);
    $("#txtCiudadE").val(null);
    $("#txtEstadoE").val(null);
    $("#txtCP").val(null);
    $("#chkEmpleadoActivo").prop("checked", true);
    $("#chkEmpleadoActivo").prop("disabled", true);
    
            
});

function confirmarNuevoEmpleado() {

    var nombre = $("#txtNombre").val();
    var apellidoPaterno = $("#txtApellidoP").val();
    var apellidoMaterno = $("#txtApellidoM").val();
    var fechaNacimiento = $("#txtFechaNacE").val();
    var correo = $("#txtCorreo").val();
    var contrasenia = $("#txtContrasenia").val();
    var tel1 = $("#txtTel").val();
    var calle = $("#txtCalle").val();
    var numero = $("#txtNumero").val();
    var estado = $("#txtEstadoE").val();
    var ciudad = $("#txtCiudadE").val();
    var colonia = $("#txtColonia").val();
    var cp = $("#txtCP").val();

    $.ajax
            ({
                type: "POST",
                url: "rest/empleado/save",
                async: true,
                data:
                        {
                           
                            nombre: nombre,
                            apellidoPaterno: apellidoPaterno,
                            apellidoMaterno: apellidoMaterno,
                            fechaNacimiento: fechaNacimiento,
                            correo: correo,
                            contrasenia: contrasenia,
                            tel1: tel1,
                            calle: calle,
                            numero: numero,
                            colonia: colonia,
                            cp: cp,
                            ciudad: ciudad,
                            estado: estado
                        }
            
    }).done(function (data) {
        if (data.exception != null)
        {
            Swal.fire("Error en el registro",
                    data.exception,
                    "error");
        } else
        {
            mostrarTablaEmpleados();

        }
    });
    mostrarTablaEmpleados();
    mostrarTablaEmpleados();
    alerta();
    mostrarTablaEmpleados();
    mostrarTablaEmpleados();
    
}






function editEmpleado(i)
{
    ocultarContrasenia();
    $("#exampleModalLabel").html("Editar Empleado");
    $("#exampleModalLabel").removeClass("text-success");
    $("#exampleModalLabel").addClass("text-warning");
    $("#chkEmpleadoActivo").prop("disabled", true);
    $("#btnEditEmpleado").show();
    $("#btnAddEmpleado").hide();
    $("#txtIdEmpleado").val(empleados[i].id);
    $("#txtIdPersona").val(empleados[i].persona.id);    
    $("#txtNombre").val(empleados[i].persona.nombre);
    $("#txtApellidoP").val(empleados[i].persona.apellidoPaterno);
    $("#txtApellidoM").val(empleados[i].persona.apellidoMaterno);
    $("#txtFechaNacE").val(empleados[i].persona.fechaNacimiento);
    $("#txtCorreo").val(empleados[i].correo);
    $("#txtContrasenia").val(empleados[i].contrasenia);
    $("#txtTel").val(empleados[i].persona.tel1);
    $("#txtCalle").val(empleados[i].persona.calle);
    $("#txtNumero").val(empleados[i].persona.numero);
    $("#txtCiudadE").val(empleados[i].persona.ciudad);
    $("#txtEstadoE").val(empleados[i].persona.estado);
    $("#txtColonia").val(empleados[i].persona.colonia);
    $("#txtCP").val(empleados[i].persona.cp);

    var estatus = empleados[i].persona.estatus;
    if (estatus === 1) {
        chkEmpleadoActivo.checked = true;
    } else {
        chkEmpleadoActivo.checked = false;
    }
    
}

function guardarEditEmpleado()
{
    var idEmpleado = $("#txtIdEmpleado").val();
    var nombre = $("#txtNombre").val();
    var apellidoPaterno = $("#txtApellidoP").val();
    var apellidoMaterno = $("#txtApellidoM").val();
    var fechaNacimiento = $("#txtFechaNacE").val();
    var correo = $("#txtCorreo").val();
    var contrasenia = $("#txtContrasenia").val();
    var tel1 = $("#txtTel").val();
    var calle = $("#txtCalle").val();
    var numero = $("#txtNumero").val();
    var estado = $("#txtEstadoE").val();
    var ciudad = $("#txtCiudadE").val();
    var colonia = $("#txtColonia").val();
    var cp = $("#txtCP").val();

    $.ajax
            ({
                type: "POST",
                url: "rest/empleado/save",
                async: true,
                data:
                        {
                            idEmpleado: idEmpleado,
                            nombre: nombre,
                            apellidoPaterno: apellidoPaterno,
                            apellidoMaterno: apellidoMaterno,
                            fechaNacimiento: fechaNacimiento,
                            correo: correo,
                            contrasenia: contrasenia,
                            tel1: tel1,
                            calle: calle,
                            numero: numero,
                            colonia: colonia,
                            cp: cp,
                            ciudad: ciudad,
                            estado: estado
                        }
            }).done(function (data)
    {
        if (data.exception != null)
        {
            Swal.fire("Error en la modificaci??n",
                    data.exception,
                    "error");
        } else
        {
            Swal.fire("Modificaci??n exitosa",
                    "Empleado actualizado correctamente",
                    "success");
            mostrarTablaEmpleados();
        }
    });
}


function searchEmpl() {

    var contenido = "";
    var palabra = $("#txtbuscar").val();
    var token = localStorage.getItem("token");

    //alert(palabra);
    var data = {palabra: palabra,
                 token:token};
      $.ajax({
        type: "GET",
        url: "rest/empleado/search",
        async: true,
        data: data
    }).done(function (data)
    {
        
         if (data == null) {
            Swal.fire({
                title: 'sesion caducada',
                text: "se ha cerrado la sesion!",
                icon: 'warning',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'ir,a iniciar sesion !'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "login.html";
                }
            })
        } else if (data.exception != null) {
            Swal.fire("La consulta no se pudo procesar",
                    data.exception,
                    "error");sss
                   
            //Para no dejar vac??a la tabla se comoca una imagen y un mensaje de que o hay informaci??n 
            contenido += "<tr>";
            contenido += "<td colspan='10' class='text-center'>";
            contenido += "<img alt='' src='media/img/dogsad03.jpg' style='height: 256px;' /><br>";
            contenido += "<span class='text-danger font-weight-bold'>Por el momento, no tienes Empleados en tu cat??logo.<span>";
            contenido += "</td>";
            contenido += "<tr>";
            $("#tbodyEmpleados").html(contenido);
            return;
        } else
        {
            empleados = data;
            for (var i = 0; i < empleados.length; i++) {
                if (empleados[i].persona.estatus === 1) {
                    contenido +=
                            '<tr id="empleado' + i + '">' +
                            '<td id="idEmpleado' + i + '">' + empleados[i].id + '</td>' + //las variables deben ser iguales al modelo de persona y                           
                            '<td id="nombre' + i + '">' + empleados[i].persona.nombre + '</td>' +
                            '<td id="aPaterno' + i + '">' + empleados[i].persona.apellidoPaterno + '</td>' +
                            '<td id="aMaterno' + i + '">' + empleados[i].persona.apellidoMaterno + '</td>' +
                            '<td id="fechaNac' + i + '">' + empleados[i].persona.fechaNacimiento + '</td>' +
                            '<td id="correo' + i + '">' +
                            '<a href="mailto:' + empleados[i].correo + '">' + empleados[i].correo + '</a>' +
                            '</td>' +
                            '<td id="telefono' + i + '">' + empleados[i].persona.tel1 + '</td>' +
                            '<td id="direccion' + i + '">' + empleados[i].persona.calle + " #" + empleados[i].persona.numero + ", " + empleados[i].persona.colonia + ". " + empleados[i].persona.cp + '</td>' +
                            '<td id="estatus' + i + '">' + (empleados[i].estatus = 1 ? '<i class="fal fa-check-square"></i>' : '<i class="fal fa-square"></i>') + '</td>' +
                            '<td>' +
                            '<div class="btn-group">' +
                            '<button class="btn btn-sm btn-warning" onclick="editEmpleado(' + i + ');" data-toggle="modal" data-target="#exampleModal"><i class="fal fa-edit"></i> Editar</button>' +
                            '<button class="btn btn-sm btn-danger"  onclick="deleteEmpleado(' + i + ');"><i class="fal fa-trash-alt"></i> Eliminar</button>' +
                            '</div>' +
                            '</td>' +
                            '</tr>';
                } else {
                    contenido +=
                            '<tr id="empleado' + i + '">' +
                            '<td id="idEmpleado' + i + '">' + empleados[i].id + '</td>' + //variables del modelo en java                              
                            '<td id="nombre' + i + '">' + empleados[i].persona.nombre + '</td>' +
                            '<td id="aPaterno' + i + '">' + empleados[i].persona.apellidoPaterno + '</td>' +
                            '<td id="aMaterno' + i + '">' + empleados[i].persona.apellidoMaterno + '</td>' +
                            '<td id="fechaNac' + i + '">' + empleados[i].persona.fechaNacimiento + '</td>' +
                            '<td id="correo' + i + '">' +
                            '<a href="mailto:' + empleados[i].correo + '">' + empleados[i].correo + '</a>' +
                            '</td>' +
                            '<td id="telefono' + i + '">' + empleados[i].persona.tel1 + '</td>' +
                            '<td id="direccion' + i + '">' + empleados[i].persona.calle + " #" + empleados[i].persona.numero + ", " + empleados[i].persona.colonia + ". " + empleados[i].persona.cp + '</td>' +
                            '<td id="estatus' + i + '">' + (empleados[i].estatus ? '<i class="fal fa-check-square"></i>' : '<i class="fal fa-square"></i>') + '</td>' +
                            '<td>' +
                            '<div class="btn-group">' +
                            '<button class="btn btn-sm btn-warning" onclick="editEmpleado(' + i + ');" data-toggle="modal" data-target="#exampleModal"><i class="fal fa-edit"></i> Editar</button>' +
                            '<button class="btn btn-sm btn-success" onclick="activarEmpleado(' + i + ');"><i class="fal fa-plus"></i> Activar</button>' +
                            '</div>' +
                            '</td>' +
                            '</tr>';
                }
            }
            //se agregan los renglones generados a la tabla de mercancia
            $("#tbodyEmpleados").html(contenido);
        }
    });
    $("#txtbuscar").val(null);

}

function imprimir(tblEmpleado){
//   window.print ();
var contenido= document.getElementById(tblEmpleado).innerHTML;

     var contenidoOriginal= document.body.innerHTML;

     document.body.innerHTML = contenido;

     window.print();

     document.body.innerHTML = contenidoOriginal;
}

function mostrarContrasenia()
{
    $("#txtContrasenia").prop("type", "text");
    $("#mostrarPassword").hide();
    $("#ocultarPassword").show();
}

function ocultarContrasenia()
{
    $("#txtContrasenia").prop("type", "password");
    $("#mostrarPassword").show();
    $("#ocultarPassword").hide();
}

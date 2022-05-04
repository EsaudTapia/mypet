var clientes =  [];

function mostrarTablaCliente()
{
    $("#btnAdd").prop("disabled", false);
    var contenido = '';     
    $.ajax
            ({
                type: "GET",
                url: "rest/cliente/getAll"
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
                    'Por el momento no tienes Clientes registrados.' +
                    '</span>' +
                    '</td>' +
                    '</tr>';
            $("#tbodyclientes").html(contenido);
            return;
        } else
        {
           clientes = data;
            for (var i = 0; i < clientes.length; i++) {
                if (clientes[i].persona.estatus === 1) {
                    contenido +=
                            '<tr id="Cliente' + i + '">' +
                            '<td id="id' + i + '">' + clientes[i].idc+ '</td>' +                                         
                            '<td id="nombre' + i + '">' + clientes[i].persona.nombre + '</td>' +
                            '<td id="Apellido Paterno' + i + '">' + clientes[i].persona.apellidoPaterno + '</td>' +
                            '<td id="Apellido Materno' + i + '">' + clientes[i].persona.apellidoMaterno + '</td>' +
                            '<td id="fechaNacimiento' + i + '">' + clientes[i].persona.fechaNacimiento + '</td>' +
                            '<td id="correo' + i + '">' + clientes[i].correo+ '</td>' +
                            '<td id="tel1' + i + '">' + clientes[i].persona.tel1 + '</td>' +                          
                            '<td id="estatus' + i + '">' + (clientes[i].estatus = 1 ? '<i class="fal fa-check-square"></i>' : '<i class="fal fa-square"></i>') + '</td>' +
                            '<td>' +
                            '<div class="btn-group">' +
                            '<button class="btn btn-sm btn-warning" onclick="editCliente(' + i + ');" data-toggle="modal" data-target="#exampleModal"><i class="fal fa-edit"></i> Editar</button>' +
                            '<button class="btn btn-sm btn-danger"  onclick="deleteCliente(' + i + ');"><i class="fal fa-trash-alt"></i> Eliminar</button>' +
                            '</div>' +
                            '</td>' +
                            '</tr>';
                } else {
                    contenido +=
                             '<tr id="Cliente' + i + '">' +
                            '<td id="id' + i + '">' + clientes[i].idc+ '</td>' +                         
                            '<td id="nombre' + i + '">' + clientes[i].persona.nombre + '</td>' +
                            '<td id="Apellido Paterno' + i + '">' + clientes[i].persona.apellidoPaterno + '</td>' +
                            '<td id="Apellido Materno' + i + '">' + clientes[i].persona.apellidoMaterno + '</td>' +
                            '<td id="fechaNacimiento' + i + '">' + clientes[i].persona.fechaNacimiento + '</td>' +
                            '<td id="correo' + i + '">' + clientes[i].correo+ '</td>' +
                            '<td id="tel1' + i + '">' + clientes[i].persona.tel1 + '</td>' +
                            '<td id="estatus' + i + '">' + (clientes[i].estatus ? '<i class="fal fa-check-square"></i>' : '<i class="fal fa-square"></i>') + '</td>' +
                            '<td>' +
                            '<div class="btn-group">' +
                            '<button class="btn btn-sm btn-warning" onclick="editCliente(' + i + ');" data-toggle="modal" data-target="#exampleModal"><i class="fal fa-edit"></i> Editar</button>' +
                            '<button class="btn btn-sm btn-success" onclick="activarCliente(' + i + ');"><i class="fal fa-plus"></i> Activar</button>' +
                            '</div>' +
                            '</td>' +
                            '</tr>';
                }
            }
            $("#tbodyclientes").html(contenido);
        }
    });
}
function mostraInactivo() {
    var contenido = '';
    $.ajax
            ({
                type: "GET",
                url: "rest/cliente/getAll"
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
                    'Por el momento no tienes productos en tu catálogo.' +
                    '</span>' +
                    '</td>' +
                    '</tr>';
            $("#tbodyclientes").html(contenido);
            return;
        } else {

             for (var i = 0; i < clientes.length; i++) {
                if (clientes[i].persona.estatus === 0) {
                    contenido +=
                            '<tr id="Cliente' + i + '">' +
                            '<td id="id' + i + '">' + clientes[i].idc+ '</td>' +                                         
                            '<td id="nombre' + i + '">' + clientes[i].persona.nombre + '</td>' +
                            '<td id="Apellido Paterno' + i + '">' + clientes[i].persona.apellidoPaterno + '</td>' +
                            '<td id="Apellido Materno' + i + '">' + clientes[i].persona.apellidoMaterno + '</td>' +
                            '<td id="fechaNacimiento' + i + '">' + clientes[i].persona.fechaNacimiento + '</td>' +
                            '<td id="correo' + i + '">' + clientes[i].correo+ '</td>' +
                            '<td id="tel1' + i + '">' + clientes[i].persona.tel1 + '</td>' +                          
                             '<td id="estatus' + i + '">' + (clientes[i].estatus ? '<i class="fal fa-check-square"></i>' : '<i class="fal fa-square"></i>') + '</td>' +
                            '<td>' +
                            '<div class="btn-group">' +
                            '<button class="btn btn-sm btn-warning" onclick="editCliente(' + i + ');" data-toggle="modal" data-target="#exampleModal"><i class="fal fa-edit"></i> Editar</button>' +
                            '<button class="btn btn-sm btn-success" onclick="activarCliente(' + i + ');"><i class="fal fa-plus"></i> Activar</button>' +
                            '</div>' +
                            '</td>' +
                            '</tr>';
                }
            }
            $("#tbodyclientes").html(contenido);
        }
    });

}

function mostrarActivos(){
    var contenido = '';
    $.ajax
            ({
                type: "GET",
                url: "rest/cliente/getAll"
            }).done(function (data) {
        if (data.exception != null) {
            Swal.fire("La operacion no pudo ser completada",
                    data.exception,
                    "error");
        } else if (data.length < 1 ) {
            contenido = '<tr>' +
                    '<td colspan="12" class="text-center">' +
                    '<img alt="" src="style/media/img/dogsad.png" style="height: 120px;"/><br>' +
                    '<span class="text-danger font-weight-bold">' +
                    'Por el momento no tienes productos en tu catálogo.' +
                    '</span>' +
                    '</td>' +
                    '</tr>';
            $("#tbodyclientes").html(contenido);
            return;
        } else {            
                for (var i = 0; i < clientes.length; i++) {
                if (clientes[i].persona.estatus === 1) {
                    contenido +=
                            '<tr id="Cliente' + i + '">' +
                            '<td id="id' + i + '">' + clientes[i].idc+ '</td>' +                                         
                            '<td id="nombre' + i + '">' + clientes[i].persona.nombre + '</td>' +
                            '<td id="Apellido Paterno' + i + '">' + clientes[i].persona.apellidoPaterno + '</td>' +
                            '<td id="Apellido Materno' + i + '">' + clientes[i].persona.apellidoMaterno + '</td>' +
                            '<td id="fechaNacimiento' + i + '">' + clientes[i].persona.fechaNacimiento + '</td>' +
                            '<td id="correo' + i + '">' + clientes[i].correo+ '</td>' +
                            '<td id="tel1' + i + '">' + clientes[i].persona.tel1 + '</td>' +                          
                            '<td id="estatus' + i + '">' + (clientes[i].estatus = 1 ? '<i class="fal fa-check-square"></i>' : '<i class="fal fa-square"></i>') + '</td>' +
                            '<td>' +
                            '<div class="btn-group">' +
                            '<button class="btn btn-sm btn-warning" onclick="editCliente(' + i + ');" data-toggle="modal" data-target="#exampleModal"><i class="fal fa-edit"></i> Editar</button>' +
                            '<button class="btn btn-sm btn-danger"  onclick="deleteCliente(' + i + ');"><i class="fal fa-trash-alt"></i> Eliminar</button>' +
                            '</div>' +
                            '</td>' +
                            '</tr>';
                }
            }
            $("#tbodyclientes").html(contenido);
        }
    });
}

function filtrarCli() {
    var optFiltro = parseInt($("#selectFiltro").val());

    switch (optFiltro) {
        case 0:
            mostrarTablaCliente();
        break;
        case 1:
          mostraInactivo();
            break;
        case 2:
          mostrarActivos();
           break;
    }
}


function deleteCliente(i)
{
    var id = clientes[i].persona.id;
    var data = {idPersona: id};
    $.ajax
            ({
                type: "POST",
                url: "rest/cliente/delete",
                async: true,
                data: data
            }).done(function (data)
    {
        if (data.exception != null)
        {
            Swal.fire("Error en la eliminación",
                    data.exception,
                    "error");
        } else
        {
            Swal.fire("Eliminación exitosa",
                    "Registro eliminado correctamente",
                    "success");
            mostrarTablaCliente()();
        }

    });
}

function activarCliente(i) {
    var id = clientes[i].persona.id;
    var data = {idPersona: id};
    $.ajax
            ({
                type: "POST",
                url: "rest/cliente/activar",
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
            Swal.fire("Activacion exitosa",
                    "Registro activo correctamente",
                    "success");
            mostrarTablaCliente();
        }

    });
}

$("#btnAdd").click(function ()
{
    ocultarContrasenia();
    $("#exampleModalLabel").addClass("text-success");
    $("#exampleModalLabel").removeClass("text-warning");
    $("#exampleModalLabel").html("Agregar Cliente");
    $("#btnEditCliente").hide();
    $("#btnAddCliente").show();
    $("#txtidCliente").val(clientes.length + 1);
    $("#txtnumero_Persona").val(clientes[clientes.length-1 ].persona.id + 1);
    $("#txtnombre").val(null);
    $("#txtappellido_pat").val(null);
    $("#txt_Calle").val(null);
    $("#txt_numero").val(null);
    $("#txt_Colonia").val(null);
    $("#txt_CP").val(null);
    $("#txt_Ciudad").val(null);
    $("#txt_Estado").val(null);
    $("#txtappellido_mat").val(null);
    $("#txtFecha_nac").val(null);
    $("#txtcorreo").val(null);
    $("#txtContrasenia").val(null);
    $("#txttelefono").val(null);
    $("#chkClienteActivo").prop("checked", true);
    $("#chkClienteActivo").prop("disabled", true);
});

function confirmarNuevoCliente()
{
    var idProducto=$(0).val();
    var idCliente=$(0).val();
    var nombre=$("#txtnombre").val();
    var apellidoPaterno = $("#txtappellido_pat").val();
    var apellidoMaterno = $("#txtappellido_mat").val();
    var calle= $("#txt_Calle").val();
    var numero= $("#txt_numero").val();
    var colinia= $("#txt_Colonia").val();
    var cp= $("#txt_CP").val();
    var ciudad= $("#txt_Ciudad").val();
    var estado= $("#txt_Estado").val();       
    var fechaNac = $("#txtFecha_nac").val();
    var correo = $("#txtcorreo").val();
    var contrasenia = $("#txtContrasenia").val();
    var tel = $("#txttelefono").val();
    var estatus = $("#chkClienteActivo").val();
        
     $.ajax({
        async: true,
        type: 'POST',
        url: "rest/cliente/save",
        data: {
            idCliente:idCliente,
            id:idProducto,
            nombre: nombre,
            apellidoPaterno: apellidoPaterno,
            apellidoMaterno: apellidoMaterno,
            calle:calle,
            numero:numero,
            colonia:colinia,
            cp:cp,
            ciudad:ciudad,
            estado:estado,            
            fechaNacimiento: fechaNac,
            correo: correo,
            contrasenia: contrasenia,
            tel1: tel,
            estatus: 1
        }
    }).done(function (data)
    {
        if (data.exception != null) {
            Swal.fire("la operacion no pudo ser completada",
                    data.exception,
                    "error");
        } else
        {
            mostrarTablaCliente();
        }
    });
    mostrarTablaCliente();
    mostrarTablaCliente();
    alerta();
    mostrarTablaCliente();
    mostrarTablaCliente();    
}

function editCliente(i)
{
    ocultarContrasenia();
    $("#exampleModalLabel").html("Editar Cliente");
    $("#exampleModalLabel").removeClass("text-success");
    $("#exampleModalLabel").addClass("text-warning");
    $("#btnEditCliente").show();
    $("#btnAddCliente").hide();
    $("#txtidCliente").val(clientes[i].idc);    
    $("#txtnumero_Persona").val(clientes[i].persona.id);
    $("#txtnombre").val(clientes[i].persona.nombre);
    $("#txtappellido_pat").val(clientes[i].persona.apellidoPaterno);
    $("#txtappellido_mat").val(clientes[i].persona.apellidoMaterno);
    $("#txt_Calle").val(clientes[i].persona.calle);
    $("#txt_numero").val(clientes[i].persona.numero);
    $("#txt_Colonia").val(clientes[i].persona.colonia);
    $("#txt_CP").val(clientes[i].persona.cp);
    $("#txt_Ciudad").val(clientes[i].persona.ciudad);
    $("#txt_Estado").val(clientes[i].persona.estado);
    $("#txtFecha_nac").val(clientes[i].persona.fechaNacimiento);
    $("#txtcorreo").val(clientes[i].correo);
    $("#txtContrasenia").val(clientes[i].contrasenia);
    $("#txttelefono").val(clientes[i].persona.tel1);
    $("#chkClienteActivo").prop("disabled", true);
   
    var estatus = clientes[i].persona.estatus;
    if (estatus === 1) {
        chkClienteActivo.checked = true;

    } else {
        chkClienteActivo.checked = false;
    }

    $("#contDinamico").html
            (
                    '<button id="btnEditCliente" type="button" class="btn btn-primary" data-dismiss="modal" onclick="guardarEditCliente(' + i + ');">Guardar</button>'
                    );
}

function guardarEditCliente()
{
    var idCliente = $("#txtidCliente").val();    
    var nombre = $("#txtnombre").val();
    var apellidoPaterno = $("#txtappellido_pat").val();
    var apellidoMaterno = $("#txtappellido_mat").val();
    var fechaNac= $("#txtFecha_nac").val();
    var tel = $("#txttelefono").val();    
    var calle = $("#txt_Calle").val();
    var numero = $("#txt_numero").val();
    var colonia = $("#txt_Colonia").val();
    var cp = $("#txt_CP").val();
    var correo = $("#txtcorreo").val();
    var contrasenia = $("#txtContrasenia").val();
    var ciudad = $("#txt_Ciudad").val();
    var estado = $("#txt_Estado").val();
     $.ajax
            ({
                type: "POST",
                url: "rest/cliente/save",
                async: true,
                data:
                        {
                          idCliente: idCliente,          
                           nombre: nombre,
                           apellidoPaterno: apellidoPaterno,
                           apellidoMaterno: apellidoMaterno,
                           calle:calle,
                           numero:numero,
                           colonia:colonia,
                           cp:cp,
                           ciudad:ciudad,
                           estado:estado,            
                           fechaNacimiento: fechaNac,
                           correo: correo,
                           contrasenia: contrasenia,
                           tel1: tel

                        }
            }).done(function (data)
    {
        if (data.exception != null)
        {
            Swal.fire("Error en la modificación",
                    data.exception,
                    "error");
        } else
        {
            Swal.fire("Modificación exitosa",
                    "Empleado actualizado correctamente",
                    "success");
            mostrarTablaCliente();
        }
    });
  
}

function alerta()
{
    Swal.fire({
        icon: 'success',
        title: 'Hecho',
        text: 'Guardado Exitosamente!'
    });
}

function searchClie() {
   var contenido = "";
   var token = localStorage.getItem("token");
   var palabra = document.getElementById("txtbuscar").value;
   var data = {palabra: palabra,
                token: token};
    $.ajax({
        type: "GET",
        url: "rest/cliente/search",
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
                   
            //En caso de que el servicio nos devuelva una exception esta se manda a imprimir en una alerta
            Swal.fire("La consulta no se pudo procesar",
                    data.exception,
                    "error");
            //Para no dejar vacía la tabla se comoca una imagen y un mensaje de que o hay información 
            contenido += "<tr>";
            contenido += "<td colspan='10' class='text-center'>";
            contenido += "<img alt='' src='media/img/dogsad03.jpg' style='height: 256px;' /><br>";
            contenido += "<span class='text-danger font-weight-bold'>Por el momento, no tienes clientes en tu catálogo.<span>";
            contenido += "</td>";
            contenido += "<tr>";
            $("#tbodyclientes").html(contenido);
            return;
        } else if (data.length < 1)
        {
            //Para no dejar vacía la tabla se comoca una imagen y un mensaje de que o hay información 
            contenido += "<tr>";
            contenido += "<td colspan='10' class='text-center'>";
            contenido += "<img alt='' src='media/img/dogsad03.jpg' style='height: 256px;' /><br>";
            contenido += "<span class='text-danger font-weight-bold'>Por el momento, no tienes clientes en tu catálogo.<span>";
            contenido += "</td>";
            contenido += "<tr>";
            $("#tbodyclientes").html(contenido);
            return;
        } else
        {
            clientes = data;
            for (var i = 0; i < clientes.length; i++) {
                if (clientes[i].persona.estatus === 1) {
                    contenido +=
                            '<tr id="Cliente' + i + '">' +
                            '<td id="id' + i + '">' + clientes[i].idc+ '</td>' +                                         
                            '<td id="nombre' + i + '">' + clientes[i].persona.nombre + '</td>' +
                            '<td id="Apellido Paterno' + i + '">' + clientes[i].persona.apellidoPaterno + '</td>' +
                            '<td id="Apellido Materno' + i + '">' + clientes[i].persona.apellidoMaterno + '</td>' +
                            '<td id="fechaNacimiento' + i + '">' + clientes[i].persona.fechaNacimiento + '</td>' +
                            '<td id="correo' + i + '">' + clientes[i].correo+ '</td>' +
                            '<td id="tel1' + i + '">' + clientes[i].persona.tel1 + '</td>' +                          
                            '<td id="estatus' + i + '">' + (clientes[i].estatus = 1 ? '<i class="fal fa-check-square"></i>' : '<i class="fal fa-square"></i>') + '</td>' +
                            '<td>' +
                            '<div class="btn-group">' +
                            '<button class="btn btn-sm btn-warning" onclick="editCliente(' + i + ');" data-toggle="modal" data-target="#exampleModal"><i class="fal fa-edit"></i> Editar</button>' +
                            '<button class="btn btn-sm btn-danger"  onclick="deleteCliente(' + i + ');"><i class="fal fa-trash-alt"></i> Eliminar</button>' +
                            '</div>' +
                            '</td>' +
                            '</tr>';
                } else {
                    contenido +=
                             '<tr id="Cliente' + i + '">' +
                            '<td id="id' + i + '">' + clientes[i].idc+ '</td>' +                         
                            '<td id="nombre' + i + '">' + clientes[i].persona.nombre + '</td>' +
                            '<td id="Apellido Paterno' + i + '">' + clientes[i].persona.apellidoPaterno + '</td>' +
                            '<td id="Apellido Materno' + i + '">' + clientes[i].persona.apellidoMaterno + '</td>' +
                            '<td id="fechaNacimiento' + i + '">' + clientes[i].persona.fechaNacimiento + '</td>' +
                            '<td id="correo' + i + '">' + clientes[i].correo+ '</td>' +
                            '<td id="tel1' + i + '">' + clientes[i].persona.tel1 + '</td>' +
                            '<td id="estatus' + i + '">' + (clientes[i].estatus ? '<i class="fal fa-check-square"></i>' : '<i class="fal fa-square"></i>') + '</td>' +
                            '<td>' +
                            '<div class="btn-group">' +
                            '<button class="btn btn-sm btn-warning" onclick="editCliente(' + i + ');" data-toggle="modal" data-target="#exampleModal"><i class="fal fa-edit"></i> Editar</button>' +
                            '<button class="btn btn-sm btn-success" onclick="activarCliente(' + i + ');"><i class="fal fa-plus"></i> Activar</button>' +
                            '</div>' +
                            '</td>' +
                            '</tr>';
                }
            }

            //se agregan los renglones generados a la tabla de mercancia
            $("#tbodyclientes").html(contenido);
        }
    });
    $("#txtbuscar").val(null);
}

function imprimir(tblCliente){
//   window.print ();
var contenido= document.getElementById(tblCliente).innerHTML;
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
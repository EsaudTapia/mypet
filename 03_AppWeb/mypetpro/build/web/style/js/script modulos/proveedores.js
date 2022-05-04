var proveedores = [];

function mostrarTablaProveedores() {
    var token = localStorage.getItem("token");
    var data = {token: token};
    $("#btnAddProv").prop("disabled", false);
    var contenido = '';
    $.ajax
            ({
                type: "GET",
                url: "rest/proveedor/getAll",
                data: data

            }).done(function (data) {
        if (data == null) {
            Swal.fire({
                title: 'sesion caducada',
                text: "se ha cerrado la sesion!",
                icon: 'warning',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'ir,A iniciar sesion !'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "login.html";

                }
            })

        } else if (data.exception != null) {
            Swal.fire("La operacion no pudo ser completada",
                    data.exception,
                    "error");
        } else if (data.length < 1) {
            contenido = '<tr>' +
                    '<td colspan="12" class="text-center">' +
                    '<img alt="" src="style/media/img/dogsad.png" style="height: 120px;"/><br>' +
                    '<span class="text-danger font-weight-bold">' +
                    'Por el momento no tienes proveedores en tu catálogo.' +
                    '</span>' +
                    '</td>' +
                    '</tr>';
            $("#tbodyProveedores").html(contenido);
            return;
        } else
        {
            proveedores = data;
            for (var i = 0; i < proveedores.length; i++) {
                if (proveedores[i].persona.estatus === 1)
                {
                    contenido +=
                            '<tr>' +
                            '<td>' + proveedores[i].id + '</td>' +
                            '<td>' + proveedores[i].razonSocial + '</td>' +
                            '<td>' + proveedores[i].rfc + '</td>' +
                            '<td>' + proveedores[i].persona.nombre + '</td>' +
                            '<td>' + proveedores[i].persona.apellidoPaterno + '</td>' +
                            '<td>' + proveedores[i].persona.apellidoMaterno + '</td>' +
                            '<td>' + proveedores[i].persona.calle + " #" + proveedores[i].persona.numero + ", " + proveedores[i].persona.colonia + ". " + proveedores[i].persona.cp + '</td>' +
                            '<td>' + proveedores[i].persona.ciudad + '</td>' +
                            '<td>' + proveedores[i].persona.estado + '</td>' +
                            '<td>' + proveedores[i].persona.tel1 + '</td>' +
                            '<td>' + proveedores[i].persona.tel2 + '</td>' +
                            '<td>' + '<i class="fal fa-check-square"></i>' + '</td>' +
                            '<td>' +
                            '<div class="btn-group">' +
                            '<button class="btn btn-sm btn-warning" onclick="editProveedor(' + i + ');" data-toggle="modal" data-target="#exampleModal"><i class="fal fa-edit"></i> Editar</button>' +
                            '<button class="btn btn-sm btn-danger"  onclick="deleteProveedor(' + i + ');"><i class="fal fa-trash-alt"></i> Eliminar</button>' +
                            '</div>' +
                            '</td>' +
                            '</tr>';
                } else {
                    contenido +=
                            '<tr>' +
                            '<td>' + proveedores[i].id + '</td>' +
                            '<td>' + proveedores[i].razonSocial + '</td>' +
                            '<td>' + proveedores[i].rfc + '</td>' +
                            '<td>' + proveedores[i].persona.nombre + '</td>' +
                            '<td>' + proveedores[i].persona.apellidoPaterno + '</td>' +
                            '<td>' + proveedores[i].persona.apellidoMaterno + '</td>' +
                            '<td>' + proveedores[i].persona.calle + " #" + proveedores[i].persona.numero + ", " + proveedores[i].persona.colonia + ". " + proveedores[i].persona.cp + '</td>' +
                            '<td>' + proveedores[i].persona.ciudad + '</td>' +
                            '<td>' + proveedores[i].persona.estado + '</td>' +
                            '<td>' + proveedores[i].persona.tel1 + '</td>' +
                            '<td>' + proveedores[i].persona.tel2 + '</td>' +
                            '<td>' + '<i class="fal fa-square"></i>' + '</td>' +
                            '<td>' +
                            '<div class="btn-group">' +
                            '<button class="btn btn-sm btn-warning" onclick="editProveedor(' + i + ');" data-toggle="modal" data-target="#exampleModal"><i class="fal fa-edit"></i> Editar</button>' +
                            '<button class="btn btn-sm btn-success" onclick="activarProveedor(' + i + ');"><i class="fal fa-plus"></i> Activar</button>' +
                            '</div>' +
                            '</td>' +
                            '</tr>';
                }
            }
            $("#tbodyProveedores").html(contenido);
        }
    });

}

function filtrarProv() {
    var optFiltro = parseInt($("#selectFiltro").val());
    switch (optFiltro) {
        case 0:
            mostrarTablaProveedores();
            break;
        case 1:
            mostrarProvInactivos();
            break;
        case 2:
            mostrarProvActivos();
            break;
    }
}

function mostrarProvInactivos() {
    var contenido = '';
    var token = localStorage.getItem("token");
    var data = {token: token};
    $.ajax
            ({
                type: "GET",
                url: "rest/proveedor/getAll",
                data: data
            }).done(function (data) {

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
            Swal.fire("La operacion no pudo ser completada",
                    data.exception,
                    "error");
        } else if (data.length < 1) {
            contenido = '<tr>' +
                    '<td colspan="12" class="text-center">' +
                    '<img alt="" src="style/media/img/dogsad.png" style="height: 120px;"/><br>' +
                    '<span class="text-danger font-weight-bold">' +
                    'Por el momento no tienes proveedores en tu catálogo.' +
                    '</span>' +
                    '</td>' +
                    '</tr>';
            $("#tbodyProveedores").html(contenido);
        } else {
            proveedores = data;
            for (var i = 0; i < proveedores.length; i++) {
                if (proveedores[i].persona.estatus === 0)
                {
                    contenido +=
                            '<tr>' +
                            '<td>' + proveedores[i].id + '</td>' +
                            '<td>' + proveedores[i].razonSocial + '</td>' +
                            '<td>' + proveedores[i].rfc + '</td>' +
                            '<td>' + proveedores[i].persona.nombre + '</td>' +
                            '<td>' + proveedores[i].persona.apellidoPaterno + '</td>' +
                            '<td>' + proveedores[i].persona.apellidoMaterno + '</td>' +
                            '<td>' + proveedores[i].persona.calle + " #" + proveedores[i].persona.numero + ", " + proveedores[i].persona.colonia + ". " + proveedores[i].persona.cp + '</td>' +
                            '<td>' + proveedores[i].persona.ciudad + '</td>' +
                            '<td>' + proveedores[i].persona.estado + '</td>' +
                            '<td>' + proveedores[i].persona.tel1 + '</td>' +
                            '<td>' + proveedores[i].persona.tel2 + '</td>' +
                            '<td>' + '<i class="fal fa-square"></i>' + '</td>' +
                            '<td>' +
                            '<div class="btn-group">' +
                            '<button class="btn btn-sm btn-warning" onclick="editProveedor(' + i + ');" data-toggle="modal" data-target="#exampleModal"><i class="fal fa-edit"></i> Editar</button>' +
                            '<button class="btn btn-sm btn-success" onclick="activarProveedor(' + i + ');"><i class="fal fa-plus"></i> Activar</button>' +
                            '</div>' +
                            '</td>' +
                            '</tr>';
                }
            }
            $("#tbodyProveedores").html(contenido);
        }
    });

}

function mostrarProvActivos() {
    var token = localStorage.getItem("token");
    var data = {token: token};
    var contenido = '';
    $.ajax
            ({
                type: "GET",
                url: "rest/proveedor/getAll",
                data: data
            }).done(function (data) {
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
            Swal.fire("La operacion no pudo ser completada",
                    data.exception,
                    "error");
        } else if (data.length < 1) {
            contenido = '<tr>' +
                    '<td colspan="12" class="text-center">' +
                    '<img alt="" src="style/media/img/dogsad.png" style="height: 120px;"/><br>' +
                    '<span class="text-danger font-weight-bold">' +
                    'Por el momento no tienes proveedores en tu catálogo.' +
                    '</span>' +
                    '</td>' +
                    '</tr>';
            $("#tbodyProveedores").html(contenido);
        } else {
            proveedores = data;
            for (var i = 0; i < proveedores.length; i++) {
                if (proveedores[i].persona.estatus === 1)
                {
                    contenido +=
                            '<tr>' +
                            '<td>' + proveedores[i].id + '</td>' +
                            '<td>' + proveedores[i].razonSocial + '</td>' +
                            '<td>' + proveedores[i].rfc + '</td>' +
                            '<td>' + proveedores[i].persona.nombre + '</td>' +
                            '<td>' + proveedores[i].persona.apellidoPaterno + '</td>' +
                            '<td>' + proveedores[i].persona.apellidoMaterno + '</td>' +
                            '<td>' + proveedores[i].persona.calle + " #" + proveedores[i].persona.numero + ", " + proveedores[i].persona.colonia + ". " + proveedores[i].persona.cp + '</td>' +
                            '<td>' + proveedores[i].persona.ciudad + '</td>' +
                            '<td>' + proveedores[i].persona.estado + '</td>' +
                            '<td>' + proveedores[i].persona.tel1 + '</td>' +
                            '<td>' + proveedores[i].persona.tel2 + '</td>' +
                            '<td>' + '<i class="fal fa-check-square"></i>' + '</td>' +
                            '<td>' +
                            '<div class="btn-group">' +
                            '<button class="btn btn-sm btn-warning" onclick="editProveedor(' + i + ');" data-toggle="modal" data-target="#exampleModal"><i class="fal fa-edit"></i> Editar</button>' +
                            '<button class="btn btn-sm btn-danger"  onclick="deleteProveedor(' + i + ');"><i class="fal fa-trash-alt"></i> Eliminar</button>' +
                            '</div>' +
                            '</td>' +
                            '</tr>';
                }
            }
            $("#tbodyProveedores").html(contenido);
        }
    });

}

function deleteProveedor(pos)
{
    var token = localStorage.getItem("token");
    var id = proveedores[pos].persona.id;
    var data = {idPersona: id,
        token: token};
    Swal.fire({
        title: 'Esta seguro?',
        text: "Quieres eliminar este proveedor mi rey?!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'si, borrar!'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax
                    ({
                        type: "POST",
                        url: "rest/proveedor/delete",
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

                } else if (data.exception != null)
                {
                    Swal.fire("Error en la eliminación",
                            data.exception,
                            "error");
                } else
                {

                    mostrarTablaProveedores();
                }

            });
            if (result.isConfirmed) {
                Swal.fire(
                        'Eliminado!',
                        'Este proveedor se elimino correctamente!',
                        'success'
                        )
            }
        }
    })
}

function activarProveedor(pos) {
    var token = localStorage.getItem("token");
    var id = proveedores[pos].persona.id;
    var data = {idPersona: id,
        token: token};

    Swal.fire({
        title: 'Estas seguro',
        text: "¿Quieres activar este provedor mi rey?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si,activar!'
    }).then((result) => {
        if (result.isConfirmed) {

            $.ajax
                    ({
                        type: "POST",
                        url: "rest/proveedor/activar",
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

                } else if (data.exception != null)
                {
                    Swal.fire("Error en la Activacion",
                            data.exception,
                            "error");
                } else
                {

                    mostrarTablaProveedores();
                }
            });
            if (result.isConfirmed) {
                Swal.fire(
                        'Activado!',
                        'Este proveedor se activo correctamente!',
                        'success'
                        )
            }
        }
    })
}

$("#btnAddProv").click(function ()
{
    $("#exampleModalLabel").addClass("text-success");
    $("#exampleModalLabel").removeClass("text-warning");
    $("#exampleModalLabel").html("Agregar Proveedor");
    $("#btnEditProveedor").hide();
    $("#btnAddProveedor").show();
    $("#txtidPersona").val(proveedores[proveedores.length - 1 ].persona.id + 1);
    $("#txtCodigoInterno").val(proveedores.length + 1);
    $("#txtRazonSocial").val(null);
    $("#txtRFC").val(null);
    $("#txtNombre").val(null);
    $("#txtApellidoP").val(null);
    $("#txtApellidoM").val(null);
    $("#txtFecha_nacpr").val(null);
    $("#txtTel1").val(null);
    $("#txtTel2").val(null);
    $("#txtCalle").val(null);
    $("#txtNumero").val(null);
    $("#txtColonia").val(null);
    $("#txtCP").val(null);
    $("#txtCiudad").val(null);
    $("#txtEstado").val(null);
    $("#chkProveedorActivo").prop("checked", true);
    $("#chkProveedorActivo").prop("disabled", true);
});


function confirmarNuevoProveedor() {

    var razonSocial = $("#txtRazonSocial").val();
    var rfc = $("#txtRFC").val();
    var nombre = $("#txtNombre").val();
    var aPaterno = $("#txtApellidoP").val();
    var aMaterno = $("#txtApellidoM").val();
    var fechaNac = $("#txtFecha_nacpr").val();
    var tel1 = $("#txtTel1").val();
    var tel2 = $("#txtTel2").val();
    var calle = $("#txtCalle").val();
    var numero = $("#txtNumero").val();
    var colonia = $("#txtColonia").val();
    var cp = $("#txtCP").val();
    var ciudad = $("#txtCiudad").val();
    var estado = $("#txtEstado").val();

    var token = localStorage.getItem("token");

    $.ajax({
        type: "POST",
        url: "rest/proveedor/save",
        async: true,

        data:
                {
                    nombre: nombre,
                    apellidoPaterno: aPaterno,
                    apellidoMaterno: aMaterno,
                    fechaNacimiento: fechaNac,
                    calle: calle,
                    numero: numero,
                    colonia: colonia,
                    cp: cp,
                    ciudad: ciudad,
                    estado: estado,
                    tel1: tel1,
                    tel2: tel2,
                    razonSocial: razonSocial,
                    rfc: rfc,
                    token: token
                }
    }).done(function (data) {

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
          
        } else if (data.exception != null)
        {
            Swal.fire("Error en el registro",
                    data.exception,
                    "error");
        } else
        {
            Swal.fire("Registro exitoso",
                    "Proveedor registrada correctamente",
                    "success");
            mostrarTablaProveedores();
        }
    });


}

function editProveedor(pos)
{
    $("#exampleModalLabel").html("Editar Proveedor");
    $("#exampleModalLabel").removeClass("text-success");
    $("#exampleModalLabel").addClass("text-warning");
    $("#btnEditProveedor").show();
    $("#btnAddProveedor").hide();
    $("#txtidPersona").val(proveedores[pos].persona.id);
    $("#txtCodigoInterno").val(proveedores[pos].id);
    $("#txtRazonSocial").val(proveedores[pos].razonSocial);
    $("#txtRFC").val(proveedores[pos].rfc);
    $("#txtNombre").val(proveedores[pos].persona.nombre);
    $("#txtApellidoP").val(proveedores[pos].persona.apellidoPaterno);
    $("#txtApellidoM").val(proveedores[pos].persona.apellidoMaterno);
    $("#txtFecha_nacpr").val(proveedores[pos].persona.fechaNacimiento);
    $("#txtTel1").val(proveedores[pos].persona.tel1);
    $("#txtTel2").val(proveedores[pos].persona.tel2);
    $("#txtCalle").val(proveedores[pos].persona.calle);
    $("#txtNumero").val(proveedores[pos].persona.numero);
    $("#txtColonia").val(proveedores[pos].persona.colonia);
    $("#txtCP").val(proveedores[pos].persona.cp);
    $("#txtCiudad").val(proveedores[pos].persona.ciudad);
    $("#txtEstado").val(proveedores[pos].persona.estado);
    $("#chkProveedorActivo").prop("disabled", true);
    $("#chkProveedorActivo").val(proveedores[pos].persona.estatus);
    if (proveedores[pos].persona.estatus === 1) {
        chkProveedorActivo.checked = true;
    } else {
        chkProveedorActivo.checked = false;
    }
}

function guardarEditProveedor()
{
    var idProveedor = $("#txtCodigoInterno").val();
    var razonSocial = $("#txtRazonSocial").val();
    var rfc = $("#txtRFC").val();
    var nombre = $("#txtNombre").val();
    var aPaterno = $("#txtApellidoP").val();
    var aMaterno = $("#txtApellidoM").val();
    var fechanac = $("#txtFecha_nacpr").val();
    var tel1 = $("#txtTel1").val();
    var tel2 = $("#txtTel2").val();
    var calle = $("#txtCalle").val();
    var numero = $("#txtNumero").val();
    var colonia = $("#txtColonia").val();
    var cp = $("#txtCP").val();
    var ciudad = $("#txtCiudad").val();
    var estado = $("#txtEstado").val();

    var token = localStorage.getItem("token");

    $.ajax
            ({
                type: "POST",
                url: "rest/proveedor/save",
                async: true,
                data:
                        {
                            idProveedor: idProveedor,
                            nombre: nombre,
                            apellidoPaterno: aPaterno,
                            apellidoMaterno: aMaterno,
                            fechaNacimiento: fechanac,
                            calle: calle,
                            numero: numero,
                            colonia: colonia,
                            cp: cp,
                            ciudad: ciudad,
                            estado: estado,
                            tel1: tel1,
                            tel2: tel2,
                            razonSocial: razonSocial,
                            rfc: rfc,
                            token: token
                        }
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

        } else if (data.exception != null)
        {
            Swal.fire("Error en el registro",
                    data.exception,
                    "error");
        } else
        {
            Swal.fire("Registro exitoso",
                    "Proveedor actualizado correctamente",
                    "success");
            mostrarTablaProveedores();
        }
    });
}

function searchProv() {
    var token = localStorage.getItem("token");
    var contenido = "";
    var busqueda = $("#txtbuscar").val();

    var data = {palabra: busqueda,
        token: token};
    $.ajax({
        type: "GET",
        url: "rest/proveedor/search",
        data: data,
        async: true
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
            //Para no dejar vacía la tabla se comoca una imagen y un mensaje de que o hay información 
            contenido += "<tr>";
            contenido += "<td colspan='10' class='text-center'>";
            contenido += "<img alt='' src='media/img/dogsad03.jpg' style='height: 256px;' /><br>";
            contenido += "<span class='text-danger font-weight-bold'>Por el momento, no tienes Proveedores en tu catálogo.<span>";
            contenido += "</td>";
            contenido += "<tr>";
            $("#tbodyProveedores").html(contenido);
            return;
        } else if (data.length < 1)
        {
            //Para no dejar vacía la tabla se comoca una imagen y un mensaje de que o hay información 
            contenido += "<tr>";
            contenido += "<td colspan='10' class='text-center'>";
            contenido += "<img alt='' src='media/img/dogsad03.jpg' style='height: 256px;' /><br>";
            contenido += "<span class='text-danger font-weight-bold'>Por el momento, no tienes Proveedores en tu catálogo.<span>";
            contenido += "</td>";
            contenido += "<tr>";
            $("#tbodyProveedores").html(contenido);
            return;
        } else
        {
            proveedores = data;
            for (var i = 0; i < proveedores.length; i++) {
                if (proveedores[i].persona.estatus === 1)
                {
                    contenido +=
                            '<tr>' +
                            '<td>' + proveedores[i].id + '</td>' +
                            '<td>' + proveedores[i].razonSocial + '</td>' +
                            '<td>' + proveedores[i].rfc + '</td>' +
                            '<td>' + proveedores[i].persona.nombre + '</td>' +
                            '<td>' + proveedores[i].persona.apellidoPaterno + '</td>' +
                            '<td>' + proveedores[i].persona.apellidoMaterno + '</td>' +
                            '<td>' + proveedores[i].persona.calle + " #" + proveedores[i].persona.numero + ", " + proveedores[i].persona.colonia + ". " + proveedores[i].persona.cp + '</td>' +
                            '<td>' + proveedores[i].persona.ciudad + '</td>' +
                            '<td>' + proveedores[i].persona.estado + '</td>' +
                            '<td>' + proveedores[i].persona.tel1 + '</td>' +
                            '<td>' + proveedores[i].persona.tel2 + '</td>' +
                            '<td>' + '<i class="fal fa-check-square"></i>' + '</td>' +
                            '<td>' +
                            '<div class="btn-group">' +
                            '<button class="btn btn-sm btn-warning" onclick="editProveedor(' + i + ');" data-toggle="modal" data-target="#exampleModal"><i class="fal fa-edit"></i> Editar</button>' +
                            '<button class="btn btn-sm btn-danger"  onclick="deleteProveedor(' + i + ');"><i class="fal fa-trash-alt"></i> Eliminar</button>' +
                            '</div>' +
                            '</td>' +
                            '</tr>';
                } else {
                    contenido +=
                            '<tr>' +
                            '<td>' + proveedores[i].id + '</td>' +
                            '<td>' + proveedores[i].razonSocial + '</td>' +
                            '<td>' + proveedores[i].rfc + '</td>' +
                            '<td>' + proveedores[i].persona.nombre + '</td>' +
                            '<td>' + proveedores[i].persona.apellidoPaterno + '</td>' +
                            '<td>' + proveedores[i].persona.apellidoMaterno + '</td>' +
                            '<td>' + proveedores[i].persona.calle + " #" + proveedores[i].persona.numero + ", " + proveedores[i].persona.colonia + ". " + proveedores[i].persona.cp + '</td>' +
                            '<td>' + proveedores[i].persona.ciudad + '</td>' +
                            '<td>' + proveedores[i].persona.estado + '</td>' +
                            '<td>' + proveedores[i].persona.tel1 + '</td>' +
                            '<td>' + proveedores[i].persona.tel2 + '</td>' +
                            '<td>' + '<i class="fal fa-square"></i>' + '</td>' +
                            '<td>' +
                            '<div class="btn-group">' +
                            '<button class="btn btn-sm btn-warning" onclick="editProveedor(' + i + ');" data-toggle="modal" data-target="#exampleModal"><i class="fal fa-edit"></i> Editar</button>' +
                            '<button class="btn btn-sm btn-success" onclick="activarProveedor(' + i + ');"><i class="fal fa-plus"></i> Activar</button>' +
                            '</div>' +
                            '</td>' +
                            '</tr>';
                }
            }

            //se agregan los renglones generados a la tabla de mercancia
            $("#tbodyProveedores").html(contenido);
        }
    });
    $("#txtbuscar").val(null);

}

function imprimir(tblEmpleado) {

    var contenido = document.getElementById(tblEmpleado).innerHTML;
    var contenidoOriginal = document.body.innerHTML;

    document.body.innerHTML = contenido;

    window.print();

    document.body.innerHTML = contenidoOriginal;
}


function probar() {
    var token = "dasdas";
    var data = {token: token};
    $.ajax
            ({
                type: "POST",
                url: "rest/pru/tok",
                async: true,
                data: data


            }).done(function (data)
    {
        if (data.exception != null) {

            Swal.fire("Error en la eliminación",
                    data.exception,
                    "error");
        } else {


        }


    });
    alert(JSON.stringify(data));

    if (data.token == "") {
        window.location.href = "login.html";

    } else {


    }
}



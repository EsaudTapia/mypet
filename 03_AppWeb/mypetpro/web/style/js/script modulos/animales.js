var animales = [];


function mostrarTablaAnimal() {
    $("#btnAdd").prop("disabled", false);
    var contenido = '';
    $.ajax
            ({
                type: "GET",
                url: "rest/animal/getAll"
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
            $("#tbodyAnimales").html(contenido);
            return;
        } else
        {
            animales = data;
            for (var i = 0; i < animales.length; i++) {
                if (animales[i].producto.status === 1) {
                    contenido +=
                            '<tr>' +
                            '<td>' + animales[i].producto.nombre + '</td>' +
                            "<td><img id='imgFoto' width='50' height='40' alt='' " +
                            "src='data:image/png;base64," + animales[i].producto.foto + "' /></td>" +
                            '<td>' + animales[i].raza + '</td>' +
                            '<td>' + animales[i].especie + '</td>' +
                            '<td>' + animales[i].FechaNac + '</td>' +
                            '<td>' + animales[i].FechaLlegada + '</td>' +
                            '<td>' + '$' + animales[i].producto.precioCompra + '</td>' +
                            '<td>' + '$' + animales[i].producto.precioVenta + '</td>' +
                            '<td>' + animales[i].producto.existencias + '</td>' +
                            '<td>' + '<i class="fal fa-check-square"></i>' + '</td>' +
                            '<td>' +
                            '<div class="btn-group">' +
                            '<button class="btn btn-sm btn-warning" onclick="editAnimal(' + i + ');" data-toggle="modal" data-target="#exampleModal"><i class="fal fa-edit"></i> Editar</button>' +
                            '<button class="btn btn-sm btn-danger"  onclick="deleteAnimal(' + i + ');"><i class="fal fa-trash-alt"></i> Eliminar</button>' +
                            '</div>' +
                            '</td>' +
                            '</tr>';
                } else {
                    contenido +=
                            '<tr>' +
                            '<td>' + animales[i].producto.nombre + '</td>' +
                            "<td><img id='imgFoto' width='50' height='40' alt='' " +
                            "src='data:image/png;base64," + animales[i].producto.foto + "' /></td>" +
                            '<td>' + animales[i].raza + '</td>' +
                            '<td>' + animales[i].especie + '</td>' +
                            '<td>' + animales[i].FechaNac + '</td>' +
                            '<td>' + animales[i].FechaLlegada + '</td>' +
                            '<td>' + '$' + animales[i].producto.precioCompra + '</td>' +
                            '<td>' + '$' + animales[i].producto.precioVenta + '</td>' +
                            '<td>' + animales[i].producto.existencias + '</td>' +
                            '<td>' + '<i class="fal fa-square"></i>' + '</td>' +
                            '<td>' +
                            '<div class="btn-group">' +
                            '<button class="btn btn-sm btn-warning" onclick="editAnimal(' + i + ');" data-toggle="modal" data-target="#exampleModal"><i class="fal fa-edit"></i> Editar</button>' +
                            '<button class="btn btn-sm btn-success" onclick="activarAnimal(' + i + ');"><i class="fal fa-plus"></i> Activar</button>' +
                            '</div>' +
                            '</td>' +
                            '</tr>';
                }
            }
            $("#tbodyAnimales").html(contenido);
        }
    });
}

function mostrarActivos() {
    var contenido = '';
    $.ajax
            ({
                type: "GET",
                url: "rest/animal/getAll"
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
            $("#tbodyAnimales").html(contenido);
            return;
        } else {
            for (var i = 0; i < animales.length; i++)
            {
                if (animales[i].producto.status === 1) {
                    contenido +=
                            '<tr>' +
                            '<td>' + animales[i].producto.nombre + '</td>' +
                            "<td><img id='imgFoto' width='50' height='40' alt='' " +
                            "src='data:image/png;base64," + animales[i].producto.foto + "' /></td>" +
                            '<td>' + animales[i].raza + '</td>' +
                            '<td>' + animales[i].especie + '</td>' +
                             '<td>' + animales[i].FechaNac + '</td>' +
                            '<td>' + animales[i].FechaLlegada + '</td>' +
                            '<td>' + '$' + animales[i].producto.precioCompra + '</td>' +
                            '<td>' + '$' + animales[i].producto.precioVenta + '</td>' +
                            '<td>' + animales[i].producto.existencias + '</td>' +
                            '<td>' + '<i class="fal fa-check-square"></i>' + '</td>' +
                            '<td>' +
                            '<div class="btn-group">' +
                            '<button class="btn btn-sm btn-warning" onclick="editAnimal(' + i + ');" data-toggle="modal" data-target="#exampleModal"><i class="fal fa-edit"></i> Editar</button>' +
                            '<button class="btn btn-sm btn-danger"  onclick="deleteAnimal(' + i + ');"><i class="fal fa-trash-alt"></i> Eliminar</button>' +
                            '</div>' +
                            '</td>' +
                            '</tr>';
                }
            }
            $("#tbodyAnimales").html(contenido);
        }
    });
}

function mostrarInactivos() {
    var contenido = '';
    $.ajax
            ({
                type: "GET",
                url: "rest/animal/getAll"
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
            $("#tbodyAnimales").html(contenido);
            return;
        } else {

            for (var i = 0; i < animales.length; i++)
            {
                if (animales[i].producto.status === 0) {
                    contenido +=
                            '<tr>' +
                            '<td>' + animales[i].producto.nombre + '</td>' +
                            "<td><img id='imgFoto' width='50' height='40' alt='' " +
                            "src='data:image/png;base64," + animales[i].producto.foto + "' /></td>" +
                            '<td>' + animales[i].raza + '</td>' +
                            '<td>' + animales[i].especie + '</td>' +
                              '<td>' + animales[i].FechaNac + '</td>' +
                            '<td>' + animales[i].FechaLlegada + '</td>' +
                            '<td>' + '$' + animales[i].producto.precioCompra + '</td>' +
                            '<td>' + '$' + animales[i].producto.precioVenta + '</td>' +
                            '<td>' + animales[i].producto.existencias + '</td>' +
                            '<td>' + '<i class="fal fa-square"></i>' + '</td>' +
                            '<td>' +
                            '<div class="btn-group">' +
                            '<button class="btn btn-sm btn-warning" onclick="editAnimal(' + i + ');" data-toggle="modal" data-target="#exampleModal"><i class="fal fa-edit"></i> Editar</button>' +
                            '<button class="btn btn-sm btn-success" onclick="activarAnimal(' + i + ');"><i class="fal fa-plus"></i> Activar</button>' +
                            '</div>' +
                            '</td>' +
                            '</tr>';
                }
            }
            $("#tbodyAnimales").html(contenido);
        }
    });

}

function filtrarAnimal() {
    var optFiltro = parseInt($("#selectFiltro").val());
    var contenido = '';
    switch (optFiltro) {
        case 0:
            mostrarTablaAnimal();
            break;
        case 1:
            mostrarInactivos();
            break;
        case 2:
            mostrarActivos();
            break;
    }
}

function deleteAnimal(i)
{
    var id = animales[i].producto.id;
    var data = {idProducto: id};
    $.ajax
            ({
                type: "POST",
                url: "rest/animal/delete",
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
            mostrarTablaAnimal();
        }

    });
}

function activarAnimal(i) {
    var id = animales[i].producto.id;
    var data = {idProducto: id};
    $.ajax
            ({
                type: "POST",
                url: "rest/animal/activar",
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
            Swal.fire("Actualización exitosa",
                    "Registro activado correctamente",
                    "success");
            mostrarTablaAnimal();
        }

    });
}

$("#btnAdd").click(function ()
{
    $("#exampleModalLabel").addClass("text-success");
    $("#exampleModalLabel").removeClass("text-warning");
    $("#exampleModalLabel").html("Agregar Animal");
    $("#btnEditAnimal").hide();
    $("#btnAddAnimal").show();
    $("#txtFechaNac").val(null);
    $("#txtCodigoInterno").val(animales[animales.length-1 ].producto.id + 1);
    $("#txtCodigoProducto").val(animales.length+ 1);
    $("#txtNombre").val(null);
    $("#txtCodigoProducto").prop("disabled", true);
    $("#txtCodigoInterno").prop("disabled", true);
    $("#txtFechaLlegada").val(null);
    $("#txtRaza").val(null);
    $("#txtEspecie").val(null);
    $("#txtPrecioCompra").val(null);
    $("#txtExistencias").val(null);
    $("#txtBase64").val(null);
    $("#fileImage").val(null);
    $("#espacioimg").removeAttr("src");
    $("#descImg").show();
    $("#chkAnimalActivo").prop("checked", true);
    $("#chkAnimalActivo").prop("disabled", true);
});

function confirmarNuevoAnimal() {
    var fechaNacimiento = $("#txtFechaNac").val();
    var nombre = $("#txtNombre").val();
    var fechaLlegada = $("#txtFechaLlegada").val();
    var raza = $("#txtRaza").val();
    var especie = $("#txtEspecie").val();
    var precioCompra = $("#txtPrecioCompra").val();
    var existencias = $("#txtExistencias").val();
    var foto = $("#txtBase64").val();
    $.ajax
            ({
                type: "POST",
                url: "rest/animal/save",
                async: true,
                data:
                        {
                            nombre: nombre,
                            raza: raza,
                            especie: especie,
                            fechaNacimiento: fechaNacimiento,
                            fechaLlegada: fechaLlegada,
                            precioCompra: precioCompra,
                            existencias: existencias,
                            foto: foto
                        }
            }).done(function (data)
    {
        if (data.exception != null)
        {
            Swal.fire("Error en el registro",
                    data.exception,
                    "error");
        } else
        {
            Swal.fire("Registro exitoso",
                    "Animal registrado correctamente",
                    "success");
            mostrarTablaAnimal();
        }
    });
}

function editAnimal(pos)
{
    $("#exampleModalLabel").html("Editar Animal");
    $("#exampleModalLabel").removeClass("text-success");
    $("#exampleModalLabel").addClass("text-warning");
    $("#chkAnimalActivo").prop("disabled", true);
    $("#espacioimg").removeAttr('src');
    $("#btnEditAnimal").show();
    $("#btnAddAnimal").hide();
    $("#txtFechaNac").val(animales[pos].FechaNac);
    $("#txtCodigoProducto").val(animales[pos].producto.id);
    $("#txtCodigoInterno").val(animales[pos].id);
    $("#txtNombre").val(animales[pos].producto.nombre);
    $("#txtFechaLlegada").val(animales[pos].FechaLlegada);
    $("#txtRaza").val(animales[pos].raza);
    $("#txtEspecie").val(animales[pos].especie);
    $("#txtPrecioCompra").val(animales[pos].producto.precioCompra);
    $("#txtPrecioVenta").val(animales[pos].producto.precioVenta);
    $("#txtExistencias").val(animales[pos].producto.existencias);
    if (animales[pos].producto.foto !== "") {
        $("#descImg").hide();
        $("#espacioimg").attr('src', "data:image/png;base64," + animales[pos].producto.foto);
    } else
    {
        $("#descImg").show();
    }
    $("#fileImage").val(null);
    $("#txtBase64").val(animales[pos].producto.foto);
    var status = animales[pos].producto.status;
    if (status === 1) {
        chkAnimalActivo.checked = true;
    } else {
        chkAnimalActivo.checked = false;
    }
}

function guardarEditAnimal()
{
    var idProducto = $("#txtCodigoProducto").val();
    var idAnimal = $("#txtCodigoInterno").val();
    var nombre = $("#txtNombre").val();
    var raza = $("#txtRaza").val();
    var especie = $("#txtEspecie").val();
    var fechaNacimiento = $("#txtFechaNac").val();
    var fechaLlegada = $("#txtFechaLlegada").val();
    var precioCompra = $("#txtPrecioCompra").val();
    var existencias = $("#txtExistencias").val();
    var foto = $("#txtBase64").val();
    $.ajax
            ({
                type: "POST",
                url: "rest/animal/save",
                async: true,
                data:
                        {
                            idProducto: idProducto,
                            idAnimal: idAnimal,
                            nombre: nombre,
                            raza: raza,
                            especie: especie,
                            fechaNacimiento: fechaNacimiento,
                            fechaLlegada: fechaLlegada,
                            precioCompra: precioCompra,
                            existencias: existencias,
                            foto: foto
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
                    "Animal actualizado correctamente",
                    "success");
            mostrarTablaAnimal();
        }
    });
}

function cargarFotografia(objetoInput) {
    if (objetoInput.files && objetoInput.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e)
        {
            var fotoB64 = e.target.result;
            $("#espacioimg").attr('src', fotoB64);
            $("#txtBase64").val(fotoB64.substring(22, fotoB64.length));
            $("#descImg").hide();
        };

        reader.readAsDataURL(objetoInput.files[0]);
    }
}

function searchAni() {

    var contenido = "";
    var token = localStorage.getItem("token");
    var palabra = document.getElementById("txtbuscar").value;
    alert(palabra);
    var data = {palabra: palabra,
                 token:token};
      $.ajax({
        type: "GET",
        url: "rest/animal/search",
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
            contenido += "<span class='text-danger font-weight-bold'>Por el momento, no tienes productos en tu catálogo.<span>";
            contenido += "</td>";
            contenido += "<tr>";
            $("#tbodyAnimales").html(contenido);
            return;
        } else if (data.length < 1)
        {
            //Para no dejar vacía la tabla se comoca una imagen y un mensaje de que o hay información 
            contenido += "<tr>";
            contenido += "<td colspan='10' class='text-center'>";
            contenido += "<img alt='' src='media/img/dogsad03.jpg' style='height: 256px;' /><br>";
            contenido += "<span class='text-danger font-weight-bold'>Por el momento, no tienes productos en tu catálogo.<span>";
            contenido += "</td>";
            contenido += "<tr>";
            $("#tbodyAnimales").html(contenido);
            return;
        } else
        {
            animales = data;
            for (var i = 0; i < animales.length; i++) {
                if (animales[i].producto.status === 1) {
                    contenido +=
                            '<tr>' +
                            '<td>' + animales[i].producto.nombre + '</td>' +
                            "<td><img id='imgFoto' width='50' height='40' alt='' " +
                            "src='data:image/png;base64," + animales[i].producto.foto + "' /></td>" +
                            '<td>' + animales[i].raza + '</td>' +
                            '<td>' + animales[i].especie + '</td>' +
                            '<td>' + animales[i].FechaNac + '</td>' +
                            '<td>' + animales[i].FechaLlegada + '</td>' +
                            '<td>' + '$' + animales[i].producto.precioCompra + '</td>' +
                            '<td>' + '$' + animales[i].producto.precioVenta + '</td>' +
                            '<td>' + animales[i].producto.existencias + '</td>' +
                            '<td>' + '<i class="fal fa-check-square"></i>' + '</td>' +
                            '<td>' +
                            '<div class="btn-group">' +
                            '<button class="btn btn-sm btn-warning" onclick="editAnimal(' + i + ');" data-toggle="modal" data-target="#exampleModal"><i class="fal fa-edit"></i> Editar</button>' +
                            '<button class="btn btn-sm btn-danger"  onclick="deleteAnimal(' + i + ');"><i class="fal fa-trash-alt"></i> Eliminar</button>' +
                            '</div>' +
                            '</td>' +
                            '</tr>';
                } else {
                    contenido +=
                            '<tr>' +
                            '<td>' + animales[i].producto.nombre + '</td>' +
                            "<td><img id='imgFoto' width='50' height='40' alt='' " +
                            "src='data:image/png;base64," + animales[i].producto.foto + "' /></td>" +
                            '<td>' + animales[i].raza + '</td>' +
                            '<td>' + animales[i].especie + '</td>' +
                            '<td>' + animales[i].FechaNac + '</td>' +
                            '<td>' + animales[i].FechaLlegada + '</td>' +
                            '<td>' + '$' + animales[i].producto.precioCompra + '</td>' +
                            '<td>' + '$' + animales[i].producto.precioVenta + '</td>' +
                            '<td>' + animales[i].producto.existencias + '</td>' +
                            '<td>' + '<i class="fal fa-square"></i>' + '</td>' +
                            '<td>' +
                            '<div class="btn-group">' +
                            '<button class="btn btn-sm btn-warning" onclick="editAnimal(' + i + ');" data-toggle="modal" data-target="#exampleModal"><i class="fal fa-edit"></i> Editar</button>' +
                            '<button class="btn btn-sm btn-success" onclick="activarAnimal(' + i + ');"><i class="fal fa-plus"></i> Activar</button>' +
                            '</div>' +
                            '</td>' +
                            '</tr>';
                }
            }

            //se agregan los renglones generados a la tabla de mercancia
            $("#tbodyAnimales").html(contenido);
        }
    });
    $("#txtbuscar").val(null);

}

function imprimir(tblAnimales){
//   window.print ();
var contenido= document.getElementById(tblAnimales).innerHTML;
     var contenidoOriginal= document.body.innerHTML;

     document.body.innerHTML = contenido;

     window.print();

     document.body.innerHTML = contenidoOriginal;
}



function calcularPrecioVenta() {
    var n1 = $("#txtPrecioCompra").val();
    $("#txtPrecioVenta").val(n1 * 2);
}
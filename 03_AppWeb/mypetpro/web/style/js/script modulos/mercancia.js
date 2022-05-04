var mercancias = [];


function mostrarTablaMercancia() {
    $("#btnAdd").prop("disabled", false);
    var contenido = '';
    $.ajax
            ({
                type: "GET",
                url: "rest/mercancia/getAll"
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
            $("#tbodyMercancia").html(contenido);
            return;
        } else
        {
            mercancias = data;
            for (var i = 0; i < mercancias.length; i++) {
                if (mercancias[i].producto.status === 1) {
                    contenido +=
                            '<tr id="Mercancia' + i + '">' +
                            '<td>' + mercancias[i].codigoBarras + '</td>' +
                            '<td>' + mercancias[i].producto.nombre + '</td>' +
                            "<td><img id='imgFoto' width='50' height='40' alt='' " +
                                "src='data:image/png;base64," + mercancias[i].producto.foto + "' /></td>"+
                            '<td>' + mercancias[i].marca + '</td>' +
                            '<td>' + mercancias[i].modelo + '</td>' +
                            '<td>' + mercancias[i].descripcion + '</td>' +
                            '<td>' + '$' + mercancias[i].producto.precioCompra + '</td>' +
                            '<td>' + '$' + mercancias[i].producto.precioVenta + '</td>' +
                            '<td>' + mercancias[i].producto.existencias + '</td>' +
                            '<td id="estatus' + i + '">' + (mercancias[i].status = 1 ? '<i class="fal fa-check-square"></i>' : '<i class="fal fa-square"></i>') + '</td>' +
                            '<td>' +
                            '<div class="btn-group">' +
                            '<button class="btn btn-sm btn-warning" onclick="editMercancia(' + i + ');" data-toggle="modal" data-target="#exampleModal"><i class="fal fa-edit"></i> Editar</button>' +
                            '<button class="btn btn-sm btn-danger"  onclick="deleteMercancia(' + i + ');"><i class="fal fa-trash-alt"></i> Eliminar</button>' +
                            '</div>' +
                            '</td>' +
                            '</tr>';
                } else {
                    contenido +=
                            '<tr id="Mercancia' + i + '">' +
                            '<td>' + mercancias[i].codigoBarras + '</td>' +
                            '<td>' + mercancias[i].producto.nombre + '</td>' +
                            "<td><img id='imgFoto' width='50' height='40' alt='' " +
                                "src='data:image/png;base64," + mercancias[i].producto.foto + "' /></td>"+
                            '<td>' + mercancias[i].marca + '</td>' +
                            '<td>' + mercancias[i].modelo + '</td>' +
                            '<td>' + mercancias[i].descripcion + '</td>' +
                            '<td>' + '$' + mercancias[i].producto.precioCompra + '</td>' +
                            '<td>' + '$' + mercancias[i].producto.precioVenta + '</td>' +
                            '<td>' + mercancias[i].producto.existencias + '</td>' +
                            '<td id="estatus' + i + '">' + (mercancias[i].status ? '<i class="fal fa-check-square"></i>' : '<i class="fal fa-square"></i>') + '</td>' +
                            '<td>' +
                            '<div class="btn-group">' +
                            '<button class="btn btn-sm btn-warning" onclick="editMercancia(' + i + ');" data-toggle="modal" data-target="#exampleModal"><i class="fal fa-edit"></i> Editar</button>' +
                            '<button class="btn btn-sm btn-success" onclick="activarMercancia(' + i + ');"><i class="fal fa-plus"></i> Activar</button>' +
                            '</div>' +
                            '</td>' +
                            '</tr>';
                }
            }
            $("#tbodyMercancia").html(contenido);
        }
    });
}

function mostrarActivos() {
    var contenido = '';
    $.ajax
            ({
                type: "GET",
                url: "rest/mercancia/getAll"
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
            $("#tbodyMercancia").html(contenido);
            return;
        } else {
            for (var i = 0; i < mercancias.length; i++)
            {
                if (mercancias[i].producto.status === 1) {
                    contenido +=
                            '<tr>' +
                            '<td>' + mercancias[i].codigoBarras + '</td>' +
                            '<td>' + mercancias[i].producto.nombre + '</td>' +
                            "<td><img id='imgFoto' width='50' height='40' alt='' " +
                              "src='data:image/png;base64," + mercancias[i].producto.foto + "' /></td>"+
                            '<td>' + mercancias[i].marca + '</td>' +
                            '<td>' + mercancias[i].modelo + '</td>' +
                            '<td>' + mercancias[i].descripcion + '</td>' +
                            '<td>' + '$' + mercancias[i].producto.precioCompra + '</td>' +
                            '<td>' + '$' + mercancias[i].producto.precioVenta + '</td>' +
                            '<td>' + mercancias[i].producto.existencias + '</td>' +
                            '<td>' + '<i class="fal fa-check-square"></i>' + '</td>' +
                            '<td>' +
                            '<div class="btn-group">' +
                            '<button class="btn btn-sm btn-warning" onclick="editMercancia(' + i + ');" data-toggle="modal" data-target="#exampleModal"><i class="fal fa-edit"></i> Editar</button>' +
                            '<button class="btn btn-sm btn-danger"  onclick="deleteMercancia(' + i + ');"><i class="fal fa-trash-alt"></i> Eliminar</button>' +
                            '</div>' +
                            '</td>' +
                            '</tr>';
                }
            }
            $("#tbodyMercancia").html(contenido);
        }
    });
}

function mostrarInactivos() {
    var contenido = '';
    $.ajax
            ({
                type: "GET",
                url: "rest/mercancia/getAll"
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
            $("#tbodyMercancia").html(contenido);
            return;
        } else {

            for (var i = 0; i < mercancias.length; i++)
            {
                if (mercancias[i].producto.status === 0) {
                    contenido +=
                            '<tr>' +
                            '<td>' + mercancias[i].codigoBarras + '</td>' +
                            '<td>' + mercancias[i].producto.nombre + '</td>' +
                            "<td><img id='imgFoto' width='50' height='40' alt='' " +
                                "src='data:image/png;base64," + mercancias[i].producto.foto + "' /></td>"+
                            '<td>' + mercancias[i].marca + '</td>' +
                            '<td>' + mercancias[i].modelo + '</td>' +
                            '<td>' + mercancias[i].descripcion + '</td>' +
                            '<td>' + '$' + mercancias[i].producto.precioCompra + '</td>' +
                            '<td>' + '$' + mercancias[i].producto.precioVenta + '</td>' +
                            '<td>' + mercancias[i].producto.existencias + '</td>' +
                            '<td>' + '<i class="fal fa-square"></i>' + '</td>' +
                            '<td>' +
                            '<div class="btn-group">' +
                            '<button class="btn btn-sm btn-warning" onclick="editMercancia(' + i + ');" data-toggle="modal" data-target="#exampleModal"><i class="fal fa-edit"></i> Editar</button>' +
                            '<button class="btn btn-sm btn-success" onclick="activarMercancia(' + i + ');"><i class="fal fa-plus"></i> Activar</button>' +
                            '</div>' +
                            '</td>' +
                            '</tr>';
                }
            }
            $("#tbodyMercancia").html(contenido);
        }
    });

}

function filtrarMerc() {
    var optFiltro = parseInt($("#selectFiltro").val());
    var contenido = '';
    switch (optFiltro) {
        case 0:
            mostrarTablaMercancia();
            break;
        case 1:
            mostrarInactivos();
            break;
        case 2:
            mostrarActivos();
            break;
    }
}

function deleteMercancia(i)
{
    var id = mercancias[i].producto.id;
    var data = {idProducto: id};
    $.ajax
            ({
                type: "POST",
                url: "rest/mercancia/delete",
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
            mostrarTablaMercancia();
        }

    });
}

function activarMercancia(i) {
    var id = mercancias[i].producto.id;
    var data = {idProducto: id};
    $.ajax
            ({
                type: "POST",
                url: "rest/mercancia/activar",
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
            mostrarTablaMercancia();
        }

    });
}

$("#btnAdd").click(function ()
{
    $("#exampleModalLabel").addClass("text-success");
    $("#exampleModalLabel").removeClass("text-warning");
    $("#exampleModalLabel").html("Agregar Mercancia");
    $("#btnEditMercancia").hide();
    $("#btnAddMercancia").show();
    $("#txtCodigoBarras").val(null);
    $("#txtCodigoInterno").val(mercancias.length + 1);
    $("#txtCodigoProducto").val(mercancias[mercancias.length - 1].id + 1);
    $("#txtNombre").val(null);
    $("#txtCodigoProducto").prop("disabled", true);
    $("#txtCodigoInterno").prop("disabled", true);
    $("#txtMarca").val(null);
    $("#txtModelo").val(null);
    $("#txtDescripcion").val(null);
    $("#txtPrecioCompra").val(null);
    $("#txtExistencias").val(null);
    $("#txtBase64").val(null);
    $("#fileImage").val(null);
    $("#espacioimg").removeAttr("src");
    $("#descImg").show();
    $("#chkMercanciaActiva").prop("checked", true);
    $("#chkMercanciaActiva").prop("disabled", true);
});

function confirmarNuevaMercancia() {
    var codigoBarras = $("#txtCodigoBarras").val();
    var nombre = $("#txtNombre").val();
    var marca = $("#txtMarca").val();
    var modelo = $("#txtModelo").val();
    var descripcion = $("#txtDescripcion").val();
    var precioCompra = $("#txtPrecioCompra").val();
    var existencias = $("#txtExistencias").val();
    var foto = $("#txtBase64").val();
    $.ajax
            ({
                type: "POST",
                url: "rest/mercancia/save",
                async: true,
                data:
                        {
                            codigoBarras: codigoBarras,
                            nombre: nombre,
                            marca: marca,
                            modelo: modelo,
                            descripcion: descripcion,
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
                    "Mercancia registrada correctamente",
                    "success");
            mostrarTablaMercancia();
        }
    });
}

function editMercancia(pos)
{
    $("#exampleModalLabel").html("Editar Mercancia");
    $("#exampleModalLabel").removeClass("text-success");
    $("#exampleModalLabel").addClass("text-warning");
    $("#chkMercanciaActiva").prop("disabled", true);
    $("#espacioimg").removeAttr('src');
    $("#btnEditMercancia").show();
    $("#btnAddMercancia").hide();
    $("#txtCodigoBarras").val(mercancias[pos].codigoBarras);
    $("#txtCodigoProducto").val(mercancias[pos].producto.id);
    $("#txtCodigoInterno").val(mercancias[pos].id);
    $("#txtNombre").val(mercancias[pos].producto.nombre);
    $("#txtMarca").val(mercancias[pos].marca);
    $("#txtModelo").val(mercancias[pos].modelo);
    $("#txtDescripcion").val(mercancias[pos].descripcion);
    $("#txtPrecioCompra").val(mercancias[pos].producto.precioCompra);
    $("#txtPrecioVenta").val(mercancias[pos].producto.precioVenta);
    $("#txtExistencias").val(mercancias[pos].producto.existencias);
    if (mercancias[pos].producto.foto !== "") {
        $("#descImg").hide();
        $("#espacioimg").attr('src', "data:image/png;base64," + mercancias[pos].producto.foto);
    } 
    else
    {
        $("#descImg").show();
    }
    $("#fileImage").val(null);
    $("#txtBase64").val(mercancias[pos].producto.foto);
    var status = mercancias[pos].producto.status;
    if (status === 1) {
        chkMercanciaActiva.checked = true;
    } else {
        chkMercanciaActiva.checked = false;
    }
}

function guardarEditMercancia()
{
    var idProducto = $("#txtCodigoProducto").val();
    var idMercancia = $("#txtCodigoInterno").val();
    var codigoBarras = $("#txtCodigoBarras").val();
    var nombre = $("#txtNombre").val();
    var marca = $("#txtMarca").val();
    var modelo = $("#txtModelo").val();
    var descripcion = $("#txtDescripcion").val();
    var precioCompra = $("#txtPrecioCompra").val();
    var existencias = $("#txtExistencias").val();
    var foto = $("#txtBase64").val();
    $.ajax
            ({
                type: "POST",
                url: "rest/mercancia/save",
                async: true,
                data:
                        {
                            idProducto: idProducto,
                            idMercancia: idMercancia,
                            codigoBarras: codigoBarras,
                            nombre: nombre,
                            marca: marca,
                            modelo: modelo,
                            descripcion: descripcion,
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
                    "Mercancia actualizada correctamente",
                    "success");
            mostrarTablaMercancia();
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


function searchMer() {
    
    var contenido = "";
    var token = localStorage.getItem("token");
    var palabra = document.getElementById("txtbuscar").value;
    //alert(palabra);
    var data = {palabra: palabra,
                 token:token};
      $.ajax({
        type: "GET",
        url: "rest/mercancia/search",
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
                    $("#tbodyMercancia").html(contenido);
                    return;
                } else
                {
                    //Si se obtuvo información de la BD, esta se vacia en la 
                    ///variable global mercancias
                    mercancias = data;
                    //Recorremos todo el JSON para ir generando la tabla
                     for (var i = 0; i < mercancias.length; i++) {
                if (mercancias[i].producto.status === 1) {
                    contenido +=
                            '<tr id="Mercancia' + i + '">' +
                            '<td>' + mercancias[i].codigoBarras + '</td>' +
                            '<td>' + mercancias[i].producto.nombre + '</td>' +
                            "<td><img id='imgFoto' width='50' height='40' alt='' " +
                                "src='data:image/png;base64," + mercancias[i].producto.foto + "' /></td>"+
                            '<td>' + mercancias[i].marca + '</td>' +
                            '<td>' + mercancias[i].modelo + '</td>' +
                            '<td>' + mercancias[i].descripcion + '</td>' +
                            '<td>' + '$' + mercancias[i].producto.precioCompra + '</td>' +
                            '<td>' + '$' + mercancias[i].producto.precioVenta + '</td>' +
                            '<td>' + mercancias[i].producto.existencias + '</td>' +
                            '<td id="estatus' + i + '">' + (mercancias[i].status = 1 ? '<i class="fal fa-check-square"></i>' : '<i class="fal fa-square"></i>') + '</td>' +
                            '<td>' +
                            '<div class="btn-group">' +
                            '<button class="btn btn-sm btn-warning" onclick="editMercancia(' + i + ');" data-toggle="modal" data-target="#exampleModal"><i class="fal fa-edit"></i> Editar</button>' +
                            '<button class="btn btn-sm btn-danger"  onclick="deleteMercancia(' + i + ');"><i class="fal fa-trash-alt"></i> Eliminar</button>' +
                            '</div>' +
                            '</td>' +
                            '</tr>';
                } else {
                    contenido +=
                            '<tr id="Mercancia' + i + '">' +
                            '<td>' + mercancias[i].codigoBarras + '</td>' +
                            '<td>' + mercancias[i].producto.nombre + '</td>' +
                            "<td><img id='imgFoto' width='50' height='40' alt='' " +
                                "src='data:image/png;base64," + mercancias[i].producto.foto + "' /></td>"+
                            '<td>' + mercancias[i].marca + '</td>' +
                            '<td>' + mercancias[i].modelo + '</td>' +
                            '<td>' + mercancias[i].descripcion + '</td>' +
                            '<td>' + '$' + mercancias[i].producto.precioCompra + '</td>' +
                            '<td>' + '$' + mercancias[i].producto.precioVenta + '</td>' +
                            '<td>' + mercancias[i].producto.existencias + '</td>' +
                            '<td id="estatus' + i + '">' + (mercancias[i].status ? '<i class="fal fa-check-square"></i>' : '<i class="fal fa-square"></i>') + '</td>' +
                            '<td>' +
                            '<div class="btn-group">' +
                            '<button class="btn btn-sm btn-warning" onclick="editMercancia(' + i + ');" data-toggle="modal" data-target="#exampleModal"><i class="fal fa-edit"></i> Editar</button>' +
                            '<button class="btn btn-sm btn-success" onclick="activarMercancia(' + i + ');"><i class="fal fa-plus"></i> Activar</button>' +
                            '</div>' +
                            '</td>' +
                            '</tr>';
                }
            }
                    //se agregan los renglones generados a la tabla de mercancia
                    $("#tbodyMercancia").html(contenido);
                }
            });
             $("#txtbuscar").val(null);
            
}

function imprimir(tblMercancia){
//   window.print ();
var contenido= document.getElementById(tblMercancia).innerHTML;
     var contenidoOriginal= document.body.innerHTML;

     document.body.innerHTML = contenido;

     window.print();

     document.body.innerHTML = contenidoOriginal;
}

function calcularPrecioVenta() {
    var n1 = $("#txtPrecioCompra").val();
    $("#txtPrecioVenta").val(n1*2);
}




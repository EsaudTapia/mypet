var cliente = [];
var empleados = [];
var mercancias = [];
var animales = [];
var contenido = "";

var venta = new Object();
venta.mercancias = [];
venta.mascotas = [];

function buscarClientes()
{
    var token = localStorage.getItem("token");
    var palabra = document.getElementById("txtBCliente").value;
    //alert(palabra);
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

            //Para no dejar vacía la tabla se comoca una imagen y un mensaje de que o hay información 
            contenido = "";
            contenido += "<tr>";
            contenido += "<td colspan='10' class='text-center'>";
            contenido += "<img alt='' src='media/img/dogsad03.jpg' style='height: 256px;' /><br>";
            contenido += "<span class='text-danger font-weight-bold'>Por el momento, no tienes Clientes registrados.<span>";
            contenido += "</td>";
            contenido += "<tr>";
            $("#tbodyclientes").html(contenido);
            return;
        } else if (data.length < 1)
        {
            //Para no dejar vacía la tabla se comoca una imagen y un mensaje de que o hay información 
            contenido = "";
            contenido += "<tr>";
            contenido += "<td colspan='10' class='text-center'>";
            contenido += "<img alt='' src='media/img/dogsad03.jpg' style='height: 256px;' /><br>";
            contenido += "<span class='text-danger font-weight-bold'>Por el momento, no tienes Clientes registrados.<span>";
            contenido += "</td>";
            contenido += "<tr>";
            $("#tbodyclientes").html(contenido);
            return;
        } else
        {
            //Si se obtuvo información de la BD, esta se vacia en la 
            //variable global clientes
            clientes = data;
            contenido = "";
            //Recorremos todo el JSON para ir generando la tabla
            for (var i = 0; i < clientes.length; i++)
            {
                //se arma cada uno de los renglones de la tabla con cada registro
                contenido += "<tr>";
                contenido += "<td>" + (i + 1) + "</td>";
                var nombre = clientes[i].persona.nombre + " " + clientes[i].persona.apellidoPaterno + " " + clientes[i].persona.apellidoMaterno;
                contenido += "<td>" + nombre + "</td>";
                contenido += "<td>" + clientes[i].correo + "</td>";
                contenido += "<td> <button onclick='seleccionarCliente(" + i + ")' class='btn btn-success mx-4''><i class='fa fa-plus-circle'></i></button></td>";
                contenido += "</tr>";
            }
            //se agregan los renglones generados a la tabla de mercancia
            $("#tbodyclientes").html(contenido);
        }
    });
}

function buscarEmpleados()
{
    var token = localStorage.getItem("token");
    var palabra = document.getElementById("txtBEmpleado").value;
    //alert(palabra);
    var data = {palabra: palabra,
        token: token};
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
            //Para no dejar vacía la tabla se comoca una imagen y un mensaje de que o hay información 
            contenido = "";
            contenido += "<tr>";
            contenido += "<td colspan='10' class='text-center'>";
            contenido += "<img alt='' src='media/img/dogsad03.jpg' style='height: 256px;' /><br>";
            contenido += "<span class='text-danger font-weight-bold'>Por el momento, no tienes empleados registrados.<span>";
            contenido += "</td>";
            contenido += "<tr>";
            $("#tbodyempleados").html(contenido);
            return;
        } else if (data.length < 1)
        {
            //Para no dejar vacía la tabla se comoca una imagen y un mensaje de que o hay información 
            contenido = "";
            contenido += "<tr>";
            contenido += "<td colspan='10' class='text-center'>";
            contenido += "<img alt='' src='media/img/dogsad03.jpg' style='height: 256px;' /><br>";
            contenido += "<span class='text-danger font-weight-bold'>Por el momento, no tienes empleados registrados.<span>";
            contenido += "</td>";
            contenido += "<tr>";
            $("#tbodyempleados").html(contenido);
            return;
        } else
        {
            //Si se obtuvo información de la BD, esta se vacia en la 
            //variable global empleados
            empleados = data;
            contenido = "";
            //Recorremos todo el JSON para ir generando la tabla
            for (var i = 0; i < empleados.length; i++)
            {
                //se arma cada uno de los renglones de la tabla con cada registro
                contenido += "<tr>";
                contenido += "<td>" + (i + 1) + "</td>";
                var nombre = empleados[i].persona.nombre + " " + empleados[i].persona.apellidoPaterno + " " + empleados[i].persona.apellidoMaterno;
                contenido += "<td>" + nombre + "</td>";
                contenido += "<td>" + empleados[i].correo + "</td>";
                contenido += "<td> <button onclick='seleccionarEmpleado(" + i + ")' class='btn btn-success mx-4''><i class='fa fa-plus-circle'></i></button></td>";
                contenido += "</tr>";
            }
            //se agregan los renglones generados a la tabla de mercancia
            $("#tbodyempleados").html(contenido);
        }
    });
}



function buscarMercancias()
{
    var token = localStorage.getItem("token");
    var palabra = document.getElementById("txtBMercancia").value;
    var data = {palabra: palabra,
        token: token};
    //alert(palabra);

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
            //Para no dejar vacía la tabla se comoca una imagen y un mensaje de que o hay información 
            contenido = "";
            contenido += "<tr>";
            contenido += "<td colspan='10' class='text-center'>";
            contenido += "<img alt='' src='media/img/dogsad03.jpg' style='height: 256px;' /><br>";
            contenido += "<span class='text-danger font-weight-bold'>Por el momento, no tienes Clientes registrados.<span>";
            contenido += "</td>";
            contenido += "<tr>";
            $("#tbodymercancias").html(contenido);
            return;
        } else if (data.length < 1)
        {
            //Para no dejar vacía la tabla se comoca una imagen y un mensaje de que o hay información 
            contenido = "";
            contenido += "<tr>";
            contenido += "<td colspan='10' class='text-center'>";
            contenido += "<img alt='' src='media/img/dogsad03.jpg' style='height: 256px;' /><br>";
            contenido += "<span class='text-danger font-weight-bold'>Por el momento, no tienes Clientes registrados.<span>";
            contenido += "</td>";
            contenido += "<tr>";
            $("#tbodymercancias").html(contenido);
            return;
        } else
        {
            //Si se obtuvo información de la BD, esta se vacia en la 
            //variable global clientes
            mercancias = data;
            contenido = "";
            //Recorremos todo el JSON para ir generando la tabla
            for (var i = 0; i < mercancias.length; i++)
            {
                //se arma cada uno de los renglones de la tabla con cada registro
                contenido += "<tr>";
                contenido += "<td>" + (i + 1) + "</td>";
                contenido += "<td>" + mercancias[i].producto.nombre + "</td>";
                contenido += "<td>" + 2 * (mercancias[i].producto.precioCompra) + "</td>";
                contenido += "<td>" + mercancias[i].descripcion + "</td>";
                contenido += "<td> <button onclick='seleccionarMercancia(" + i + ")' class='btn btn-success mx-4''><i class='fa fa-plus-circle'></i></button></td>";
                contenido += "</tr>";
            }
            //se agregan los renglones generados a la tabla de mercancia
            $("#tbodymercancias").html(contenido);
        }
    });
}


function buscarMascotas()
{
    var token = localStorage.getItem("token");
    var palabra = document.getElementById("txtBMascota").value;
    //alert(palabra);
    var data = {palabra: palabra,
        token: token};
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
            //Para no dejar vacía la tabla se comoca una imagen y un mensaje de que o hay información 
            contenido = "";
            contenido += "<tr>";
            contenido += "<td colspan='10' class='text-center'>";
            contenido += "<img alt='' src='media/img/dogsad03.jpg' style='height: 256px;' /><br>";
            contenido += "<span class='text-danger font-weight-bold'>Por el momento, no tienes mascotas registrados.<span>";
            contenido += "</td>";
            contenido += "<tr>";
            $("#tbodyMascotas").html(contenido);
            return;
        } else if (data.length < 1)
        {
            //Para no dejar vacía la tabla se comoca una imagen y un mensaje de que o hay información 
            contenido = "";
            contenido += "<tr>";
            contenido += "<td colspan='10' class='text-center'>";
            contenido += "<img alt='' src='media/img/dogsad03.jpg' style='height: 256px;' /><br>";
            contenido += "<span class='text-danger font-weight-bold'>Por el momento, no tienes mascotas registrados.<span>";
            contenido += "</td>";
            contenido += "<tr>";
            $("#tbodyMascotas").html(contenido);
            return;
        } else
        {
            //Si se obtuvo información de la BD, esta se vacia en la 
            //variable global clientes
            animales = data;
            contenido = "";
            //Recorremos todo el JSON para ir generando la tabla
            for (var i = 0; i < animales.length; i++)
            {
                //se arma cada uno de los renglones de la tabla con cada registro
                contenido += "<tr>";
                contenido += "<td>" + (i + 1) + "</td>";
                contenido += "<td>" + animales[i].producto.nombre + "</td>";
                contenido += "<td>" + 2 * (animales[i].producto.precioCompra) + "</td>";
                contenido += "<td>" + animales[i].especie + "</td>";
                contenido += "<td> <button onclick='seleccionarMascota(" + i + ")' class='btn btn-success mx-4''><i class='fa fa-plus-circle'></i></button></td>";
                contenido += "</tr>";
            }
            //se agregan los renglones generados a la tabla de mercancia
            $("#tbodyMascotas").html(contenido);
        }
    });


}


function seleccionarEmpleado(i) {

    //se asigna el objeto empleado seleccionado a la estructura de venta 
    venta.empleado = empleados[i];

    //se obtiene el valor del empleado y se asigna al elemento visual
    var nombre = venta.empleado.persona.nombre + " " +
            venta.empleado.persona.apellidoPaterno + " " +
            venta.empleado.persona.apellidoMaterno;
    $("#txtEmpleadoElegido").val(nombre);

}

function seleccionarCliente(i) {

    //se asigna el objeto empleado seleccionado a la estructura de venta 
    venta.cliente = clientes[i];

    //se obtiene el valor del empleado y se asigna al elemento visual
    var nombre = venta.cliente.persona.nombre + " " +
            venta.cliente.persona.apellidoPaterno + " " +
            venta.cliente.persona.apellidoMaterno;
    $("#txtClienteElegido").val(nombre);

}

function seleccionarMascota(i)
{
//Se genera la lista de mercancias y se asocian a la estructura de venta
    venta.mascotas[venta.mascotas.length] = animales[i];
    mostrarMascotasLista(venta.mascotas);
//obtenerTotal();
}


function mostrarMascotasLista(mascotas)
{
    $("#txtMascotaElegida").html("");
    var contenido = "";
    contenido += "<table>";
    contenido += "<tr>";
    contenido += "<td>Producto Mascota </td>";
    contenido += "<td>Cantidad</td>";
    contenido += "<td>Costo</td>";
    contenido += "</tr>";
    for (var i = 0; i < mascotas.length; i++)
    {
        contenido += "<tr>";
        contenido += "<td>" + mascotas[i].producto.nombre + "</td>";
        contenido += "<td><input type='text' id='cantidadMasc" + i + "' value='1'></td>";
        contenido += "<td>" + 2 * (mascotas[i].producto.precioCompra) + "</td>";
        contenido += "</tr>";
    }
    contenido += "</table>";
    $("#txtMascotaElegida").html(contenido);
}


function seleccionarMercancia(i)
{
//Se genera la lista de mercancias y se asocian a la estructura de venta
    venta.mercancias[venta.mercancias.length] = mercancias[i];
    mostrarMercanciasLista(venta.mercancias);
//obtenerTotal();
}


function mostrarMercanciasLista(mercancias)
{
    $("#txtMercanciaElegida").html("");
    var contenido = "";
    contenido += "<table>";
    contenido += "<tr>";
    contenido += "<td>Producto Mercancia</td>";
    contenido += "<td>Cantidad</td>";
    contenido += "<td>Costo</td>";
    contenido += "</tr>";
    for (var i = 0; i < mercancias.length; i++)
    {
        contenido += "<tr>";
        contenido += "<td>" + mercancias[i].producto.nombre + "</td>";
        contenido += "<td><input type='text' id='cantidadMerc" + i + "' value='1'></td>";
        contenido += "<td>" + (mercancias[i].producto.precioCompra) * 2 + "</td>";
        contenido += "</tr>";
    }
    contenido += "</table>";
    $("#txtMercanciaElegida").html(contenido);
}

function obtenerTotal() {
    var total = 0;
    var i;
    for (i = 0; i < venta.mascotas.length; i++) {

        venta.mascotas[i].producto.existencias = 1;
        total += venta.mascotas[i].producto.precioCompra * 2;

    }
    for (i = 0; i < venta.mercancias.length; i++) {


        venta.mercancias[i].producto.existencias = $("#cantidadMerc" + i + "").val();
        total += venta.mercancias[i].producto.precioCompra * 2 * venta.mercancias[i].producto.existencias;

    }

    $("#txtTotalVenta").html("$" + total);

}

function generarVenta() {
    venta.fechaVenta = new Date().toDateString().substring(0, 9);
    var f = new Date();
    var numAle = Math.floor((Math.random() * 999) + 1);
    var fa = " " + f.getFullYear() + f.getMonth() + f.getDay() + f.getMinutes() + f.getSeconds();
    venta.folio = parseInt(fa);
    venta.estatus = 1;

    var token = localStorage.getItem("token");

    var data = {datoVenta: JSON.stringify(venta), token: token};
   alert(JSON.stringify(data));

    Swal.fire({
        title: 'Estas seguro',
        text: "¿Quieres Guardar la venta mi rey?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si,guardar!'
    }).then((result) => {
        if (result.isConfirmed) {

            $.ajax({
                type: "POST",
                url: "rest/venta/save",
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
                    Swal.fire("Error en el registro",
                            data.exception,
                            "error");
                } else {

                }


            });

            if (result.isConfirmed) {

                Swal.fire(
                        'Venta realizada!',
                        'Folio: ' + venta.folio,
                        'success'
                        )

                cargarModuloVenta();
                mostrarTablaVenta();
            }
            mostrarTablaVenta();
           obtenerTotal();

        }
         mostrarTablaVenta();
    });
     

}


function agregarventa() {

    $("#divContenido").empty();

    $.ajax
            ({
                url: "modulos/ventas.html",
                context: document.body
            })
            .done(function (data)
            {
                $("#divContenido").html(data);

            });
}


function mostrarTablaVenta() {
    $("#btnAdd").prop("disabled", false);
    var contenido = '';
    var token = localStorage.getItem("token");
    var data = {token: token};
    $.ajax
            ({
                type: "GET",
                url: "rest/venta/getAll"
            }).done(function (data) {

        if (data == null) {
            alert(JSON.stringify(data));
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
                    'Por el momento no tienes ventas registradas.' +
                    '</span>' +
                    '</td>' +
                    '</tr>';
            $("#tbodydetalleVenta").html(contenido);
            return;
        } else
        {
            venta = data;
            for (var i = 0; i < venta.length; i++) {
                if (venta[i].estatus === 1) {
                    contenido +=
                            '<tr id="Venta' + i + '">' +
                            '<td id="id' + i + '">' + venta[i].idVenta + '</td>' +
                            '<td id="nombre' + i + '">' + venta[i].folio + '</td>' +
                            '<td id="Apellido Paterno' + i + '">' + venta[i].fechaVenta + '</td>' +
                            '<td id="Apellido Materno' + i + '">' + venta[i].idEmpleado + '</td>' +
                            '<td id="fechaNacimiento' + i + '">' + venta[i].idCliente + '</td>' +
                            '<td id="correo' + i + '">' + venta[i].total + '</td>' +
                            '<td id="estatus' + i + '">' + "Pendiente" + '</td>' +
                            '<td>' +
                            '<div class="btn-group">' +
                            '<button class="btn btn-sm btn-danger"  onclick="cancelarVenta(' + i + ');"><i class="far fa-window-close width:"50" height:"50"></i> Cancelar</button>' +
                            '<button class="btn btn-sm btn-success" onclick="confirmarVenta(' + i + ');"><i class="far fa-check-square"></i> Confirmar</button>' +
                            '</div>' +
                            '</td>' +
                            '</tr>';
                } else if (venta[i].estatus === 0) {
                    contenido +=
                            '<tr id="Venta' + i + '">' +
                            '<td id="id' + i + '">' + venta[i].idVenta + '</td>' +
                            '<td id="nombre' + i + '">' + venta[i].folio + '</td>' +
                            '<td id="Apellido Paterno' + i + '">' + venta[i].fechaVenta + '</td>' +
                            '<td id="Apellido Materno' + i + '">' + venta[i].idEmpleado + '</td>' +
                            '<td id="fechaNacimiento' + i + '">' + venta[i].idCliente + '</td>' +
                            '<td id="correo' + i + '">' + venta[i].total + '</td>' +
                            '<td id="estatus' + i + '">' + "Cancelada" + '</td>' +
                            '<td>' +
                            '<button class="btn btn-sm btn-danger"   disabled><i class="far fa-window-close width:"50" height:"50"></i> Cancelar</button>' +
                            '<button class="btn btn-sm btn-success"  disabled ><i class="far fa-check-square"></i> Confirmar</button>' +
                            '<div class="btn-group">' +
                            '</div>' +
                            '</td>' +
                            '</tr>';
                } else if (venta[i].estatus === 2) {
                    contenido +=
                            '<tr id="Venta' + i + '">' +
                            '<td id="id' + i + '">' + venta[i].idVenta + '</td>' +
                            '<td id="nombre' + i + '">' + venta[i].folio + '</td>' +
                            '<td id="Apellido Paterno' + i + '">' + venta[i].fechaVenta + '</td>' +
                            '<td id="Apellido Materno' + i + '">' + venta[i].idEmpleado + '</td>' +
                            '<td id="fechaNacimiento' + i + '">' + venta[i].idCliente + '</td>' +
                            '<td id="correo' + i + '">' + venta[i].total + '</td>' +
                            '<td id="estatus' + i + '">' + "Realizada" + '</td>' +
                            '<td>' +
                            '<button class="btn btn-sm btn-danger"   disabled ><i class="far fa-window-close width:"50" height:"50"></i> Cancelar</button>' +
                            '<button class="btn btn-sm btn-success"  disabled ><i class="far fa-check-square"></i> Confirmar</button>' +
                            '<div class="btn-group">' +
                            '</div>' +
                            '</td>' +
                            '</tr>';
                }
            }
            $("#tbodydetalleVenta").html(contenido);
        }
    });
}


function searchventa() {

    var contenido = "";
    var busqueda = $("#txtbuscarventa").val();
    var token = localStorage.getItem("token");
    var data = {token: token,
        palabra: busqueda};
    $.ajax({
        type: "GET",
        url: "rest/venta/search",
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
            contenido += "<span class='text-danger font-weight-bold'>Por el momento, no tienes clientes en tu catálogo.<span>";
            contenido += "</td>";
            contenido += "<tr>";
            $("#tbodydetalleVenta").html(contenido);
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
            $("#tbodydetalleVenta").html(contenido);
            return;
        } else
        {
            venta = data;
            for (var i = 0; i < venta.length; i++) {
                if (venta[i].estatus === 1) {
                    contenido +=
                            '<tr id="Venta' + i + '">' +
                            '<td id="id' + i + '">' + venta[i].idVenta + '</td>' +
                            '<td id="nombre' + i + '">' + venta[i].folio + '</td>' +
                            '<td id="Apellido Paterno' + i + '">' + venta[i].fechaVenta + '</td>' +
                            '<td id="Apellido Materno' + i + '">' + venta[i].idEmpleado + '</td>' +
                            '<td id="fechaNacimiento' + i + '">' + venta[i].idCliente + '</td>' +
                            '<td id="correo' + i + '">' + venta[i].total + '</td>' +
                            '<td id="estatus' + i + '">' + "Pendiente" + '</td>' +
                            '<td>' +
                            '<div class="btn-group">' +
                            '<button class="btn btn-sm btn-danger"  onclick="cancelarVenta(' + i + ');"  ><i class="far fa-window-close width:"50" height:"50"></i> Cancelar</button>' +
                            '<button class="btn btn-sm btn-success" onclick="confirmarVenta(' + i + ');"  ><i class="far fa-check-square"></i> Confirmar</button>' +
                            '</div>' +
                            '</td>' +
                            '</tr>';
                } else if (venta[i].estatus === 0) {
                    contenido +=
                            '<tr id="Venta' + i + '">' +
                            '<td id="id' + i + '">' + venta[i].idVenta + '</td>' +
                            '<td id="nombre' + i + '">' + venta[i].folio + '</td>' +
                            '<td id="Apellido Paterno' + i + '">' + venta[i].fechaVenta + '</td>' +
                            '<td id="Apellido Materno' + i + '">' + venta[i].idEmpleado + '</td>' +
                            '<td id="fechaNacimiento' + i + '">' + venta[i].idCliente + '</td>' +
                            '<td id="correo' + i + '">' + venta[i].total + '</td>' +
                            '<td id="estatus' + i + '">' + "Cancelada" + '</td>' +
                            '<td>' +
                            '<div class="btn-group">' +
                            '<button class="btn btn-sm btn-danger"   disabled ><i class="far fa-window-close width:"50" height:"50"></i> Cancelar</button>' +
                            '<button class="btn btn-sm btn-success"  disabled ><i class="far fa-check-square"></i> Confirmar</button>' +
                            '</div>' +
                            '</td>' +
                            '</tr>';
                } else if (venta[i].estatus === 2) {
                    contenido +=
                            '<tr id="Venta' + i + '">' +
                            '<td id="id' + i + '">' + venta[i].idVenta + '</td>' +
                            '<td id="nombre' + i + '">' + venta[i].folio + '</td>' +
                            '<td id="Apellido Paterno' + i + '">' + venta[i].fechaVenta + '</td>' +
                            '<td id="Apellido Materno' + i + '">' + venta[i].idEmpleado + '</td>' +
                            '<td id="fechaNacimiento' + i + '">' + venta[i].idCliente + '</td>' +
                            '<td id="correo' + i + '">' + venta[i].total + '</td>' +
                            '<td id="estatus' + i + '">' + "Cancelada" + '</td>' +
                            '<td>' +
                            '<div class="btn-group">' +
                            '<button class="btn btn-sm btn-danger"  disabled ><i class="far fa-window-close width:"50" height:"50"></i> Cancelar</button>' +
                            '<button class="btn btn-sm btn-success"  disabled ><i class="far fa-check-square"></i> Confirmar</button>' +
                            '</div>' +
                            '</td>' +
                            '</tr>';

                }
            }

            //se agregan los renglones generados a la tabla de mercancia
            $("#tbodydetalleVenta").html(contenido);
        }
    });
    $("#txtbuscarventa").val(null);
}

function cancelarVenta(i) {
    var token = localStorage.getItem("token");
    var id = venta[i].idVenta;
    var data = {idVenta: id, token: token};
    Swal.fire({
        title: 'Esta seguro?',
        text: "Quieres cancelar la compra mi rey?!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'si,cancelar!'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax
                    ({
                        type: "POST",
                        url: "rest/venta/cancel",
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
                } else {

                    mostrarTablaVenta();
                }

            });
            if (result.isConfirmed) {
                Swal.fire(
                        'Cancelado!',
                        'Esta venta se cancelo correctamente!',
                        'success'
                        )
            }
        }
    })
}

function confirmarVenta(i) {
    var token = localStorage.getItem("token");
    var id = venta[i].idVenta;
    var data = {idVenta: id, token: token};
    Swal.fire({
        title: 'Esta seguro?',
        text: "Quieres confirmar la venta mi rey?!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar!'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax
                    ({
                        type: "POST",
                        url: "rest/venta/confirmar",
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
                } else {

                    mostrarTablaVenta();
                }

            });
            if (result.isConfirmed) {
                Swal.fire(
                        'Realizada!',
                        'Esta venta se confirmo correctamente!',
                        'success'
                        )
            }
        }
    })
}






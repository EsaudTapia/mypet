

function mostrarMercanciaAlCliente() {
    var contenido = '';
    $.ajax
            ({
                type: "GET",
                url: "rest/productoAlcliente/getAllMer"
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
                    'Por el momento no tenemos productos en catálogo.' +
                    '</span>' +
                    '</td>' +
                    '</tr>';
            $("#divmercanciacliente").html(contenido);
            return;
        } else {
            mercancias = data;
            for (var i = 0; i < mercancias.length; i++) {
                if (mercancias[i].producto.status === 1) {
                    contenido +=
                            '<div  class="card col-sm-4" id="productoMercancia' + i + '">' +
                            '<div class="card border-dark">' +
                            '<div class="card-header text-white" style="background-color:#0c231e"> ' +
                            ' <h5 id="nomproductoM" class="text-center" >' + mercancias[i].producto.nombre + '</h5>' +
                            '</div>' +
                            '<div id="dtscliente" class="card-body text-center">' +
                            "<img id='imgFoto' width='180' height='200' alt='' " +
                            "src='data:image/png;base64," + mercancias[i].producto.foto + "' />" +
                            ' <div class="modal-footer"> ' +
                            '<span id="contDinamico">' + '</span>' +
                            '</div>' +
                            '<h5 id="marcaproductoM" class=" text-danger" >' + "Nombre: " + mercancias[i].marca + '</h5>' +
                            '<h5 id="precioproductoM" class="text-center" >' + "Nombre: " + mercancias[i].producto.precioVenta + '</h5>' +
                            '<button class="btn btn-sm btn-success" onclick="comprarmercancia(' + i + ');" data-toggle="modal" data-target="#exampleModal"><i class="fas fa-shopping-basket"></i> Comprar</button>' +
                            '</div>' +
                            '</div>' +
                            '</div>';

                }
            }
            $("#divmercanciacliente").html(contenido);

        }
    });

    $("#idtitulo").html("Productos Mercancia");
}


function mostrarMascotaAlCliente() {
    var contenido = '';
    $.ajax
            ({
                type: "GET",
                url: "rest/productoAlcliente/getAllMas"
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
                    'Por el momento no tenemos Mascota en catálogo.' +
                    '</span>' +
                    '</td>' +
                    '</tr>';
            $("#divmercanciacliente").html(contenido);
            return;
        } else {
            animales = data;
            for (var i = 0; i < animales.length; i++) {
                if (animales[i].producto.status === 1) {
                    contenido +=
                            '<div  class="card col-sm-6" id="productoMascota' + i + '">' +
                            '<div class="card border-dark">' +
                            '<div class="card-header text-white" style="background-color:#0c231e"> ' +
                            ' <h5 id="nomproductoMas" class="text-center" >' + animales[i].producto.nombre + '</h5>' +
                            '</div>' +
                            '<div id="dtsmas" class="card-body text-center">' +
                            "<img id='imgFoto' width='180' height='200' alt='' " +
                            "src='data:image/png;base64," + animales[i].producto.foto + "' />" +
                            ' <div class="modal-footer"> ' +
                            '<span id="contDinamicomasc">' + '</span>' +
                            '</div>' +
                            '<h5 id="idRaza" class=" text-danger" >' + "Raza: " + animales[i].raza + '</h5>' +
                            '<h5 id="idfechanac" class="text-center" >' + "Fecha de nacimiento: " + animales[i].FechaNac + '</h5>' +
                            '<button class="btn btn-sm btn-primary" onclick="comprarmercancia(' + i + ');" data-toggle="modal" data-target="#exampleModal"><i class="fas fa-shopping-basket"></i> Adoptar</button>' +
                            '</div>' +
                            '</div>' +
                            '</div>';

                }
            }
            $("#divmercanciacliente").html(contenido);

        }
    });

    $("#idtitulo").html("Productos Mascota");


}


function searchprod() {

var contenido = "";
        var busqueda = $("#txtbuscadorC").val();
        var data = {palabra : busqueda};
        $.ajax({
        type: "GET",
                url: "rest/productoAlcliente/search",
                data: data,
                async: true
        }).done(function (data)
        {
           
        if (data.exception != null)
                {
                    
//Para no dejar vacía la tabla se comoca una imagen y un mensaje de que o hay información 
                contenido += "<tr>";
                        contenido += "<td colspan='10' class='text-center'>";
                        contenido += "<span class='text-danger font-weight-bold'>Por el momento, no tienes productos en tu catálogo.<span>";
                        contenido += "</td>";
                        contenido += "<tr>";
                        $("#divmercanciacliente").html(contenido);
                        return;
                        } else if (data.length < 1)
                {
//Para no dejar vacía la tabla se comoca una imagen y un mensaje de que o hay información 
                contenido += "<tr>";
                        contenido += "<td colspan='10' class='text-center'>";
                        contenido += "<span class='text-danger font-weight-bold'>Por el momento, no tienes productos en tu catálogo.<span>";
                        contenido += "</td>";
                        contenido += "<tr>";
                        $("#divmercanciacliente").html(contenido);
                        return;
                        } else {
         mercancias = data;
         animales=data;
        for (var i = 0; i < mercancias.length; i++) {                                          
        if (mercancias[i].producto.status === 1 && mercancias[i].marca !=null ) {  
        contenido +=
                '<div  class="card col-sm-4" id="productoMercancia' + i + '">' +
                '<div class="card border-dark">' +
                '<div class="card-header text-white" style="background-color:#0c231e"> ' +
                ' <h5 id="nomproductoM" class="text-center" >' + mercancias[i].producto.nombre + '</h5>' +
                '</div>' +
                '<div id="dtscliente" class="card-body text-center">' +
                "<img id='imgFoto' width='180' height='200' alt='' " +
                "src='data:image/png;base64," + mercancias[i].producto.foto + "' />" +
                ' <div class="modal-footer"> ' +
                '<span id="contDinamico">' + '</span>' +
                '</div>' +
                '<h5 id="marcaproductoM" class=" text-danger" >' + "Marca: " + mercancias[i].marca + '</h5>' +
                '<h5 id="precioproductoM" class="text-center" >' + "Precio: " + mercancias[i].producto.precioVenta + '</h5>' +
                '<button class="btn btn-sm btn-success" onclick="comprarmercancia(' + i + ');" data-toggle="modal" data-target="#exampleModal"><i class="fas fa-shopping-basket"></i> Comprar</button>' +
                '</div>' +
                '</div>' +
                '</div>';                                    
        }else { 
        
            if (mercancias[i].producto.status === 1 ){
               
            contenido +=
                            '<div  class="card col-sm-4" id="productoMascota' + i + '">' +
                            '<div class="card border-dark">' +
                            '<div class="card-header text-white" style="background-color:#0c231e"> ' +
                            ' <h5 id="nomproductoMas" class="text-center" >' + animales[i].producto.nombre + '</h5>' +
                            '</div>' +
                            '<div id="dtsmas" class="card-body text-center">' +
                            "<img id='imgFoto' width='180' height='200' alt='' " +
                            "src='data:image/png;base64," + animales[i].producto.foto + "' />" +
                            ' <div class="modal-footer"> ' +
                            '<span id="contDinamicomasc">' + '</span>' +
                            '</div>' +
                            '<h5 id="idRaza" class=" text-danger" >' + "Raza: " + mercancias[i].raza + '</h5>' +
                            '<h5 id="idPrecio" class="text-center" >' + "Fecha de nacimiento: " +  mercancias[i].FechaNac + '</h5>' +
                            '<button class="btn btn-sm btn-primary" onclick="comprarmercancia(' + i + ');" data-toggle="modal" data-target="#exampleModal"><i class="fas fa-shopping-basket"></i> adoptar</button>' +
                            '</div>' +
                            '</div>' +
                            '</div>';
                }
            }                    
        }
                         
       
        
//se agregan los renglones generados a la tabla de mercancia           
        $("#divmercanciacliente").html(contenido);
                }                        
        });
        
        $("#txtbuscadorC").value("");
        }




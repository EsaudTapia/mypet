//carga modulos

function cargarModuloEmpleados()
{
    
    $("#tituloScreen").html("Empleados");
    $("#empleados").addClass("seleccion");
    $("#proveedores").removeClass("seleccion");
    $("#animales").removeClass("seleccion");
    $("#clientes").removeClass("seleccion");
    $("#productos").removeClass("seleccion");
    $("#compras").removeClass("seleccion");
    $("#ventas").removeClass("seleccion");
    $("#divContenido").removeClass("divAlto");
    $.ajax
            ({
                url: "modulos/empleados.html",
                context: document.body
            })
            .done(function (data)
            {
                $("#divContenido").html(data);
                mostrarTablaEmpleados();
            });

}

function cargarModuloClientes()
{
    $("#tituloScreen").html("Clientes");
    $("#empleados").removeClass("seleccion");
    $("#proveedores").removeClass("seleccion");
    $("#animales").removeClass("seleccion");
    $("#clientes").addClass("seleccion");
    $("#productos").removeClass("seleccion");
    $("#compras").removeClass("seleccion");
    $("#ventas").removeClass("seleccion");
    $("#divContenido").removeClass("divAlto");
    $.ajax
            ({
                url: "modulos/clientes.html",
                context: document.body
            })
            .done(function (data)
            {
                $("#divContenido").html(data);
                mostrarTablaCliente();
            });
}

function cargarModuloProveedores()
{
    $("#tituloScreen").html("Proveedores");
    $("#empleados").removeClass("seleccion");
    $("#proveedores").addClass("seleccion");
    $("#animales").removeClass("seleccion");
    $("#clientes").removeClass("seleccion");
    $("#productos").removeClass("seleccion");
    $("#compras").removeClass("seleccion");
    $("#ventas").removeClass("seleccion");
    $("#divContenido").removeClass("divAlto");
    $.ajax
            ({
                url: "modulos/proveedores.html",
                context: document.body
            })
            .done(function (data)
            {
                $("#divContenido").html(data);
                mostrarTablaProveedores();
            });
}

function cargarModuloMascotas()
{
    $("#tituloScreen").html("Animales");
    $("#empleados").removeClass("seleccion");
    $("#proveedores").removeClass("seleccion");
    $("#animales").addClass("seleccion");
    $("#clientes").removeClass("seleccion");
    $("#productos").removeClass("seleccion");
    $("#compras").removeClass("seleccion");
    $("#ventas").removeClass("seleccion");
    $("#divContenido").removeClass("divAlto");
    $.ajax
            ({
                url: "modulos/animales.html",
                context: document.body
            })
            .done(function (data)
            {
                $("#divContenido").html(data);
                mostrarTablaAnimal();
            });
}

function cargarModuloMercancia()
{
    $("#tituloScreen").html("Mercancia");
    $("#empleados").removeClass("seleccion");
    $("#proveedores").removeClass("seleccion");
    $("#animales").removeClass("seleccion");
    $("#clientes").removeClass("seleccion");
    $("#productos").addClass("seleccion");
    $("#compras").removeClass("seleccion");
    $("#ventas").removeClass("seleccion");
    $("#divContenido").removeClass("divAlto");
    $.ajax
            ({
                url: "modulos/mercancia.html",
                context: document.body
            })
            .done(function (data)
            {
                $("#divContenido").html(data);
                mostrarTablaMercancia();
            });
}

function cargarModuloVenta()
{
    $("#tituloScreen").html("Ventas");
    $("#empleados").removeClass("seleccion");
    $("#proveedores").removeClass("seleccion");
    $("#animales").removeClass("seleccion");
    $("#clientes").removeClass("seleccion");
    $("#productos").removeClass("seleccion");
    $("#animales").removeClass("seleccion");
    $("#compras").removeClass("seleccion");
    $("#ventas").addClass("seleccion");
    
    $("#divContenido").removeClass("divAlto");
    $.ajax
            ({
                url: "modulos/detalleventa.html",
                context: document.body
            })
            .done(function (data)
            {
                $("#divContenido").html(data);
                  mostrarTablaVenta();
            });
}


function cargarModuloCompra()
{
    $("#tituloScreen").html("Compras");
    $("#empleados").removeClass("seleccion");
    $("#proveedores").removeClass("seleccion");
    $("#animales").removeClass("seleccion");
    $("#clientes").removeClass("seleccion");
    $("#productos").removeClass("seleccion");
    $("#animales").removeClass("seleccion");
    $("#clientes").removeClass("seleccion");
    $("#ventas").removeClass("seleccion");
    $("#compras").addClass("seleccion");
    $("#divContenido").removeClass("divAlto");
    $.ajax
            ({
                url: "modulos/detalleCompra.html",
                context: document.body
            })
            .done(function (data)
            {
                $("#divContenido").html(data);
                 mostrarTablaCompra();
            });
            
}
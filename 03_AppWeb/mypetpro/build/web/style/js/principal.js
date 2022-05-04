/* global localStorge */

//function validarEmplLogin() {
//    var correo = $("#txtEmail").val();
//    var contrasenia = $("#txtPassword").val();
//    $.ajax({
//        async: true,
//        type: 'POST',
//        url: "rest/login/in",
//        data: {
//            correo: correo,
//            contrasenia: contrasenia
//        }
//    }).done(function (data) {
//        alerta(JSON.stringify(data));
//       
//    });
//}

function validarEmplLogin()
{
    //Leemos los valores de las cajas de texto y los guardamos en variables:   
    //var nombre = document.getElementById("txtUsuario").value;
    var nombre = $("#txtEmail").val();
    //var contrasenia = document.getElementById("txtPassword").value;
    var contrasenia = $("#txtPassword").val();

    var data = {nombre: nombre, contrasenia: contrasenia};
    //alert(JSON.stringify(data));

    $.ajax({
        type: "POST",
        url: "rest/login/in",
        data: data,
        async: true
    }).done(
            function (data)
            {
                // alert(JSON.stringify(data));
                if (data.idc != null)
                {
                    var cliente = data;
                    var nombre = cliente.persona.nombre + " "
                            + cliente.persona.apellidoPaterno + " "
                            + cliente.persona.apellidoMaterno;
                    var tipo = "CLIENTE";
                    var token = cliente.token;
                    Swal.fire({
                        title: 'Usuario correcto',
                        text: "Bienvenido " + nombre + " " + tipo,
                        icon: 'success',
                        confirmButtonColor: '#3085d6'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            //Nombre de la varialbe de almacenamiento, valor o contenido de la variable
                            //localStorage.getItem("nombre");  //Nombre de la variable que quiero obtener
                            localStorage.setItem("nombre", nombre);
                            localStorage.setItem("tipo", tipo);
                            localStorage.setItem("id", cliente.idc);
                            localStorage.setItem("token", token);
                            window.location.href = "inicio.html";
                        }
                    });
                } else if (data.id != null){

                    var empleado = data;
                    var nombre = empleado.persona.nombre + " "
                            + empleado.persona.apellidoPaterno + " "
                            + empleado.persona.apellidoMaterno;
                    var tipo = "EMPLEADO";                   
                    var token = empleado.token;
                    Swal.fire({
                        title: 'Usuario correcto',
                        text: "Bienvenido " + nombre + " " + tipo,
                        icon: 'success',
                        confirmButtonColor: '#3085d6'
                    }).then((result) => {

                        localStorage.setItem("nombre", nombre);
                        localStorage.setItem("tipo", tipo);
                        localStorage.setItem("id", empleado.id);
                        window.location.href = "admin.html";
                        localStorage.setItem("token", token);
                    
                    });
                } else {
                    {

                        Swal.fire({
                            icon: 'error',
                            title: 'Usuario y/o contraseña incorrectos !',
                            text: 'intenta otra vez'
                        });
                    }
                
            }

            });
          
          

}
//url
function validarAccesosadmin() {
    var tipo = localStorage.getItem("tipo");
    var nom = localStorage.getItem("nombre");
    if (tipo === "EMPLEADO") {
        $("#sesisonnom").html(nom + " | ");

    } else if (tipo === "CLIENTE") {
        localStorage.setItem("nombre", " ");
        localStorage.setItem("tipo", " ");
        localStorage.setItem("id", " ");
        window.location.href = "login.html";
        Swal.fire({
            icon: 'error',
            title: 'no ha iniciado sesion!',
            text: 'intenta otra vez'
        });
    } else {
        window.location.href = "login.html";
        Swal.fire({
            icon: 'error',
            title: 'no ha iniciado sesion!',
            text: 'intenta otra vez'
        });
    }



}

//URL
function validarAccesoscliente() {  
    var tipo = localStorage.getItem("tipo");
    var nom = localStorage.getItem("nombre");
    if (tipo === "CLIENTE") {
        $("#sesisonnom").html(nom + " | ");

    } else if (tipo === "EMPLEADO") {
        localStorage.setItem("nombre", " ");
        localStorage.setItem("tipo", " ");
        localStorage.setItem("id", " ");
        window.location.href = "login.html";
        Swal.fire({
            icon: 'error',
            title: 'no ha iniciado sesion!',
            text: 'intenta otra vez'
        });

    } else {
        window.location.href = "login.html";
        Swal.fire({
            icon: 'error',
            title: 'no ha iniciado sesion!',
            text: 'intenta otra vez'
        });
    }

}




//base de datos y localstorage
function  cierrasesionempleado() {    
    var id = localStorage.getItem("id");
    var data = {idEmpleado: id};
    $.ajax
            ({
                type: "POST",
                url: "rest/login/salirEm",
                async: true,
                data: data
            }).done(function (data)
    {
        if (data.exception != null)
        {

        } else {
            localStorage.setItem("nombre", " ");
            localStorage.setItem("tipo", " ");
            localStorage.setItem("id", " ");
            localStorage.setItem("token", " ");
            window.location.href = "index.html";
        }

    });

}


//base de datos y localstorage

function  cierrasesioncliente() {
    var id = localStorage.getItem("id");
    var data = {idCliente: id};
    $.ajax
            ({
                type: "POST",
                url: "rest/login/salirCl",
                async: true,
                data: data
            }).done(function (data)
    {
        if (data.exception != null)
        {

        } else {
            localStorage.setItem("nombre", " ");
            localStorage.setItem("tipo", " ");
            localStorage.setItem("id", " ");
            localStorage.setItem("token", " ");
            window.location.href = "index.html";
        }

    });

}



//carga conocenos
function cargarModuloConocenos()
{
    $.ajax
            ({
                url: "conocenos.html",
                context: document.body
            })
            .done(function (data)
            {
                $("#divContenido").html(data);
            });
}
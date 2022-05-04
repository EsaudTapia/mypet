


function normalizar(texto){// unificar la informacion 
   
    texto=texto.replace("Á","A");
    texto=texto.replace("É","E");
    texto=texto.replace("Í","I");
    texto=texto.replace("Ó","O");
    texto=texto.replace("Ú","U");       
    texto=texto.replace("á","a");
    texto=texto.replace("é","e");
    texto=texto.replace("í","i");
    texto=texto.replace("ó","o");
    texto=texto.replace("ú","u");
    
return texto;
}

function limpiar(texto){
    var i;
    for ( i = 0; i < texto.length; i++) {
        texto=texto.replace(")","");
        texto=texto.replace("(","");
        texto=texto.replace(")","");
        texto=texto.replace("'","");
        texto=texto.replace("*","");
        texto=texto.replace("{","");
        texto=texto.replace("}","");                
    }
}



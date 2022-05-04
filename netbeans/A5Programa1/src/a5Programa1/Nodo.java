/****************************************************************************/
/*Nombre Nodo                                                               */
/*Versión: 1.0                                                              */
/* Nombre: Yohac esaud Tapia Hernandez                                      */
/* Fecha: 01/11/2020                                                        */
/* Descripción:Sirve para establecer el almacenamiento de la estructura     */
/** *************************************************************************/

package a5Programa1;
import a5Programa1.Nodo;

public class Nodo {
    private double dato; //Representara los numeros dentro del .txt
    private Nodo siguienteNodo;//Para apuntar a la siguiente direccion de memoria
    private Nodo anteriorNodo;//Para apuntar a la anterior direccion de memoria

    
    
    public Nodo(){ //constructor
        siguienteNodo = null; //comience en null (vacio)
        anteriorNodo =null;//comience en null (vacio)
    }

    //codigo generado de forma automatica
    public double getDato() {
        return dato;
    }

    public void setDato(double dato) {
        this.dato = dato;
    }

    public Nodo getSiguienteNodo() {
        return siguienteNodo;
    }

    public void setSiguienteNodo(Nodo siguienteNodo) {
        this.siguienteNodo = siguienteNodo;
    }

    public Nodo getAnteriorNodo() {
        return anteriorNodo;
    }

    public void setAnteriorNodo(Nodo anteriorNodo) {
        this.anteriorNodo = anteriorNodo;
    }
}

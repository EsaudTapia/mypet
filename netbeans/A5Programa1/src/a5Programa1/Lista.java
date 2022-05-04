/** ************************************************************************* */
/*Nombre Lista                                                              */
 /*Versión: 1.0                                                              */
 /* Nombre: Yohac esaud Tapia Hernandez                                      */
 /* Fecha: 01/11/2020                                                        */
 /* Descripción:Es la estructura para generar una lista                      */
 /*  de la muestra de datos proviniente de un .txt                           */
/** ************************************************************************ */

package a5Programa1;

public class Lista {

    private Nodo inicio; // representa el inicio de la lista
    private Nodo fin;// Representa el fin de la lista
    private int tam; //Representa el tamaño de la lista

    public Lista() {
        inicio = null;//puede ser vacia(No contener Nodos)
        fin = null;//puede ser vacia(No contener Nodos)
        tam = 0;//puede ser vacia(No contener Nodos)
    }
    
/*********************************************** ******************/
/* En esta seccion se genera el acomodo de la lista               */                                                                                                          
/*********************************************** ******************/
    
    public void agregaralFin(Nodo n) { //agrega un elemento mas al final de la lista
        if (inicio == null) {
            inicio = n;//cabeza de la lista
            fin = n;
            tam = 1;
        } else {
            fin.setSiguienteNodo(n);//ingresamos un nuevo valor
            n.setAnteriorNodo(fin);// movemos y guardamos al final del nodo por que ya existen valores
            fin = n;
            tam++;//Acumula y guarda tamaño
        }
    }

    public int size() { //Revisa el tamño de la lista
        return tam;
    }

    public Nodo get(int index) { //obtiene los datos de la muestra que la lista obtuvo 
        if (index >= 0 && index < size()) { 
            Nodo n = inicio;
            for (int i = 0; i < index; i++) {// avanza para poder obtenr los datos
                n = n.getSiguienteNodo();// obtiene los  datos  
            }
            return n; 
        } else {
            return null;
        }
    }
}

/** *********************************************************************** */
/*Nombre  DatosSet                                                          */
 /*Versión: 1.0                                                             */
 /* Nombre: Yohac esaud Tapia Hernandez                                     */
 /* Fecha: 10/11/2020                                                       */
 /* Descripción: Se encarga de estructurar los datos y los toma para generar*/
 /* la desviacion estandar y media                                          */
/** *********************************************************************** */

package a5Programa1;

public class DatosSet {

    private Lista lista; // variable tipo lista que sirve para usar objetos y metodos  tipo Listas

    public DatosSet() { 
        lista = new Lista();
    }

    public void add(double value) {// nos servira para ir gusrdando los datos y usando a la vez la clase Lista
        Nodo n = new Nodo(); //objeto tipo Nodo para usar la propiedades de la misma clase
        n.setDato(value);  // Se obtien el valor del dato
        lista.agregaralFin(n);// nos ayudara usar el metodo agregaralFin y que se agregue el dato en la posicion que  corresponde
    }

    public int size() {// Verifica el tamaño de la lista con la ayuda del metodo de Lista
        return lista.size();
    }
    
 /*********************************************** ******************/
/* En esta seccion se genera la media                             */                                       
/*********************************************** ******************/

    public double media() throws Exception { //generara la media  
        int n = lista.size(); // obtiene el tamaño y se lo da a n(numero de muestra)
        if (n > 0) { 
            Nodo nodo = null; // no hay nodos en la lista
            double suma = 0.0;
            for (int i = 0; i < n; i++) { //ayudara a sumar los datos de la muestra
                nodo = lista.get(i);// solicita datos con la ayuda de get de la clase Lista
                suma += nodo.getDato();// acumula y se suman los datos y se asigna a suma
            }
            return suma / n; 
        } else {
            throw new Exception("Lista vacía");
        }
    }

 /*********************************************** ******************/
/* En esta seccion se genera la desviacion estandar                */
/*                                                                 */                                         
/*********************************************** ******************/
    
    public double desvest() throws Exception { // calcula la desviacion estandar 
        int n = lista.size(); //Revisa el tamaño
        double promedio = media();// Solicita los valores del metodo media
        
        if (n > 1) {
            Nodo nodo = null;
            double suma = 0.0;
            for (int i = 0; i < n; i++) {
                nodo = lista.get(i);// Optiene lista
                suma += Math.pow(nodo.getDato() - promedio, 2);// resta la media y los datos y los potencia a la 2            
            }
            
            return Math.sqrt(suma / (n - 1));//regresa la division y raiz cuadrada
        } else {
            throw new Exception("Datos no suficientes para calcular Desviacion .");
        }
    }
}

/** *****************************************************************/
/*Nombre  MainA5Programa1                                           */
 /*Versión: 1.0                                                     */
 /* Nombre: Yohac esaud Tapia Hernandez                             */
 /* Fecha: 01/11/2020                                               */
 /* Descripción: iniciador y vista del programa                     */
/** *****************************************************************/

package a5Programa1;
import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.text.DecimalFormat;
import java.util.Scanner;
import java.util.*;

public class MainA5Programa1 {
    
/*********************************************** ******************/
/* En esta seccion se genera la vista y se toma lo nesesario      */
/*  para crear la lista                                           */                                         
/*********************************************** ******************/
    
    public static void main(String[] args) throws IOException {     
        Lista lis=new Lista(); // creando una lista vacia
        DatosSet datos = new DatosSet(); // creamos un objeto para usar los metos de esta clase
        DecimalFormat df = new DecimalFormat("#.##");// dar el formato solicitado em los requerimientos
        double valor;//Guardar los datos del .txt y usarlos para calcular 
        try {
            BufferedReader bf = new BufferedReader(new FileReader("Muestra.txt"));// lee el archivo .txt
            String sCadena;// guardaremos los datos del .txt para mostrarlos           
            while ((sCadena = bf.readLine())!=null) {   // De la lectura de datos  se los da a sCadena             
                System.out.println(sCadena);         // Muestra los datos
             }
            
            Scanner entrada = new Scanner(new FileReader("Muestra.txt"));// lee los datos del archivo
            
            while (entrada.hasNext()) {// Genera el ingreso de todos los datos del .txt para hacer los calculos
                valor = entrada.nextDouble();
                datos.add(valor);// Agrega datos a lista
            }            
        } catch (InputMismatchException ime) { // se presenta al detectar error en archivo
            System.err.println("Error en datos de archivo de entrada");
            
        } catch (FileNotFoundException fnfe) {// se presenta al detectar error en archivo
            System.err.println("Archivo de entrada no encontrado");
        }
        
        try {                     
            System.out.println("Promedio: " + (df.format( datos.media())));//se imprime el resultado con el formato solicitado
            System.out.println("Desviacion estandar: " + (df.format(datos.desvest())));//se imprime el resultado con el formato solicitado
            
        } catch (Exception ex) {
            System.err.println("Error al tratar de calcular datos estadísticos"); // sirve por si hay un error  al intentar calcular
        }
    }
}

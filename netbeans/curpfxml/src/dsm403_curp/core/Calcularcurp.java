/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dsm403_curp.core;

/**
 *
 * @author PC
 */
public class Calcularcurp {

    private final String[] vocales = {"A", "E", "I", "O", "U"};
    private final String[] consonantes = {"B", "C", "D", "F", "G", "H", "J", "K", "L", "M", "N","Ñ", "P", "Q", "R", "S", "T", "V", "W", "X", "Y", "Z"};
    public static String[] grosmal = {"PEDO", "PENE", "PUTA", "PUTO", "PEDA", "CACA", "RATA", "POPO", "PITO"};
    public static String[] grosbien = {"PXDO", "PXNE", "PXTA", "PXTO", "PXDA", "CXCA", "RXTA", "PXPO", "PXTO"};
    
    
    public String obtenerVocal(String apellido) {
        String vocal = "X";
        for (int n = 1; n < apellido.length(); n++) {
            for (String vocalAux : vocales) {
                String aux = "" + apellido.charAt(n);
                if (aux.equals(vocalAux)) {
                    vocal = aux;
                    return vocal;
                }
            }
        }
        return vocal;
    }

    public String JoseYMaria(String nombre) {
        String jose = "JOSE";
        String maria = "MARIA";
        int i = nombre.indexOf(jose);
        System.out.println("i " + i);
        if (nombre.indexOf(jose) >= 0) {
            return nombre.replace(jose, "").trim();
        }
        if (nombre.indexOf(jose) >= 0) {
            return nombre.replace(maria, "").trim();
        }

        return nombre;
    }

    public static String obtenerGenero(int genero) {
        do {
            if (genero == 1) {
                return "H";
            } else if (genero == 2) {
                break;
            }
        } while (genero != 1 && genero != 2);

        return "M";
    }

    public String obtenerConstante(String apellido) {

        String constante = "X";
        for (int n = 1; n < apellido.length(); n++) {
            for (String vocalAux : consonantes) {
                String aux = "" + apellido.charAt(n);
                if (aux.equals(vocalAux)) {
                    System.out.println(" " + aux);
                    constante = aux;
                    return constante;
                }
            }
        }
        return constante;
    }
    public static String obtenerEstado(int estado)
    {
        switch(estado)
        {
            case 1: return "AS";
            case 2: return "BC";
            case 3: return "BS";
            case 4: return "CC";
            case 5: return "CL";
            case 6: return "CM";
            case 7: return "CS";
            case 8: return "CH";
            case 9: return "DF";
            case 10: return "DG";
            case 11: return "GT";
            case 12: return "GR";
            case 13: return "HG";
            case 14: return "JC";
            case 15: return "MC";
            case 16: return "MN";
            case 17: return "MS";
            case 18: return "NT";
            case 19: return "NL";
            case 20: return "OC";
            case 21: return "PL";
            case 22: return "QT";
            case 23: return "QR";
            case 24: return "SP";
            case 25: return "SL";
            case 26: return "SR";
            case 27: return "TC";
            case 28: return "TS";
            case 29: return "TL";
            case 30: return "VZ";
            case 31: return "YN";
            case 32: return "ZS";       
            case 33: return "NE";
    }
        return "NE";
        
    }
     public static String remplazarX(String cadena){
       
        String replaceAll = cadena.replaceAll("Ñ","X");
     
       return replaceAll;
         }
      public static String esgroseria(String curp){
        for(int i = 0;i < grosmal.length;i++)
            curp = curp.replaceAll(grosmal[i], grosbien[i]);
        return curp;
    }
      
         
}

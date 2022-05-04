package org.univcod.mypet.model;

/**
 *
 * @author alexesp
 */
public class Animal {
    int id;
    Producto producto; //contencion
    String raza;
    String especie;
    String FechaNac;
    String FechaLlegada;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Producto getProducto() {
        return producto;
    }

    public void setProducto(Producto producto) {
        this.producto = producto;
    }

    public String getRaza() {
        return raza;
    }

    public void setRaza(String raza) {
        this.raza = raza;
    }

    public String getEspecie() {
        return especie;
    }

    public void setEspecie(String especie) {
        this.especie = especie;
    }

    public String getFechaNac() {
        return FechaNac;
    }

    public void setFechaNac(String FechaNac) {
        this.FechaNac = FechaNac;
    }

    public String getFechaLlegada() {
        return FechaLlegada;
    }

    public void setFechaLlegada(String FechaLlegada) {
        this.FechaLlegada = FechaLlegada;
    }
}
package org.univcod.mypet.model;

/**
 *
 * @author alexesp
 */
public class Producto {

    private int id;
    private String nombre;
    private double precioCompra;
    private double precioVenta;
    private String foto;
    private int status;
    private int existencias;

    public int getId() {
        return id;

    }

    public String getNombre() {
        return nombre;

    }

    public double getPrecioCompra() {
        return precioCompra;

    }

    public double getPrecioVenta() {
        return precioVenta;

    }

    public String getFoto() {
        return foto;
    }

    public int getStatus() {
        return status;

    }

    public void setId(int id) {
        this.id = id;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public void setPrecioCompra(double precioCompra) {
        this.precioCompra = precioCompra;
    }

    public void setPrecioVenta(double precioVenta) {
        this.precioVenta = precioCompra*2;
    }

    public void setFoto(String foto) {
        this.foto = foto;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public int getExistencias() {
        return existencias;
    }

    public void setExistencias(int existencias) {
        this.existencias = existencias;
    }

}

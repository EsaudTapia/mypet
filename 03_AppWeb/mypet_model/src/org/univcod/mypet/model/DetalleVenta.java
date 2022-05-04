/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.univcod.mypet.model;

/**
 *
 * @author PC
 */
public class DetalleVenta {
    private int idDetalleVenta;
    private int  idVenta;
    private Producto producto;
    private float costoVenta;
    private int cantidad;

    public DetalleVenta() {
    }

    public DetalleVenta(int idDetalleVenta, int idVenta, Producto producto, float costoVenta, int cantidad) {
        this.idDetalleVenta = idDetalleVenta;
        this.idVenta = idVenta;
        this.producto = producto;
        this.costoVenta = costoVenta;
        this.cantidad = cantidad;
    }      
       
    public int getIdDetalleVenta() {
        return idDetalleVenta;
    }

    public void setIdDetalleVenta(int idDetalleVenta) {
        this.idDetalleVenta = idDetalleVenta;
    }

    public int getIdVenta() {
        return idVenta;
    }

    public void setIdVenta(int idVenta) {
        this.idVenta = idVenta;
    }

    public Producto getProducto() {
        return producto;
    }

    public void setProducto(Producto producto) {
        this.producto = producto;
    }

    public float getCostoVenta() {
        return costoVenta;
    }

    public void setCostoVenta(float costoVenta) {
        this.costoVenta = costoVenta;
    }

    public int getCantidad() {
        return cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }
    
    
    
    
    



}

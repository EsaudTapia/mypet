/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.univcod.mypet.model;

import java.util.List;

/**
 *
 * @author PC
 */
public class Compra {
    private int idCompra;
    private String fechaCompra;
    private int folio;
    private int estatus;
    private Proveedor proveedor;
    private Empleado empleado;
    private List<Animal> mascotas;// Mascota es Animal
    private List<Mercancia> mercancias;

    public Compra() {
    }            

    public Compra(int idCompra, String fechaCompra, int folio, int estatus, Proveedor proveedor, Empleado empleado, List<Animal> mascotas, List<Mercancia> mercancias) {
        this.idCompra = idCompra;
        this.fechaCompra = fechaCompra;
        this.folio = folio;
        this.estatus = estatus;
        this.proveedor = proveedor;
        this.empleado = empleado;
        this.mascotas = mascotas;
        this.mercancias = mercancias;
    }
    
    

    public int getIdCompra() {
        return idCompra;
    }

    public void setIdCompra(int idCompra) {
        this.idCompra = idCompra;
    }

    public String getFechaCompra() {
        return fechaCompra;
    }

    public void setFechaCompra(String fechaCompra) {
        this.fechaCompra = fechaCompra;
    }

    public int getFolio() {
        return folio;
    }

    public void setFolio(int folio) {
        this.folio = folio;
    }

    public int getEstatus() {
        return estatus;
    }

    public void setEstatus(int estatus) {
        this.estatus = estatus;
    }

    public Proveedor getProveedor() {
        return proveedor;
    }

    public void setProveedor(Proveedor proveedor) {
        this.proveedor = proveedor;
    }

    public Empleado getEmpleado() {
        return empleado;
    }

    public void setEmpleado(Empleado empleado) {
        this.empleado = empleado;
    }

    public List<Animal> getMascotas() {
        return mascotas;
    }

    public void setMascotas(List<Animal> mascotas) {
        this.mascotas = mascotas;
    }

    public List<Mercancia> getMercancias() {
        return mercancias;
    }

    public void setMercancias(List<Mercancia> mercancias) {
        this.mercancias = mercancias;
    }
    
    
    
}



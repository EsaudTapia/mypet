/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.univcod.mypet.model;

import java.util.List;

/**
 *
 * @author DavidRdz
 */
public class Venta {

    private int idVenta;
    private String fechaVenta;
    private int folio;
    private int estatus;
    private Cliente cliente;
    private Empleado empleado;
    private List<Animal> mascotas;// Mascota es Animal
    private List<Mercancia> mercancias;
    
    
    public Venta(){
        
    }

    public Venta(int idVenta, String fechaVenta, int folio, int estatus, Cliente cliente, Empleado empleado, List<Animal> mascotas, List<Mercancia> mercancias) {
        this.idVenta = idVenta;
        this.fechaVenta = fechaVenta;
        this.folio = folio;
        this.estatus = estatus;
        this.cliente = cliente;
        this.empleado = empleado;
        this.mascotas = mascotas;
        this.mercancias = mercancias;
    }

   

    public int getIdVenta() {
        return idVenta;
    }

    public String getFechaVenta() {
        return fechaVenta;
    }

    public int getFolio() {
        return folio;
    }

    public int getEstatus() {
        return estatus;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public Empleado getEmpleado() {
        return empleado;
    }

    public List<Animal> getMascotas() {
        return mascotas;
    }

    public List<Mercancia> getMercancias() {
        return mercancias;
    }

    public void setIdVenta(int idVenta) {
        this.idVenta = idVenta;
    }

    public void setFechaVenta(String fechaVenta) {
        this.fechaVenta = fechaVenta;
    }

    public void setFolio(int folio) {
        this.folio = folio;
    }

    public void setEstatus(int estatus) {
        this.estatus = estatus;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public void setEmpleado(Empleado empleado) {
        this.empleado = empleado;
    }

    public void setMascotas(List<Animal> mascotas) {
        this.mascotas = mascotas;
    }

    public void setMercancias(List<Mercancia> mercancias) {
        this.mercancias = mercancias;
    }

    
}

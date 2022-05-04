/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.univcod.mypet.controller;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import org.univcod.mypet.db.ConexionMySQL;
import org.univcod.mypet.model.Animal;
import org.univcod.mypet.model.Mercancia;
import org.univcod.mypet.model.Producto;
import org.univcod.mypet.model.Productoparacliente;

/**
 *
 * @author PC
 */
public class ControllerProductosAlCliente {
    
    public List<Productoparacliente> searchm(String s) throws Exception {

        String query = "select*from productosAlcliente where nombre like '%"+s+"%' or especie like '%"+s+"';";
        

        ConexionMySQL connMySQL = new ConexionMySQL();
        Connection conn = connMySQL.open();

        PreparedStatement pstmt = conn.prepareStatement(query);

        ResultSet rs = pstmt.executeQuery();

        List<Productoparacliente> Productoparacliente = new ArrayList<>();
       
        
        while (rs.next() != false) {
            Producto p = new Producto();
            p.setId(rs.getInt("idProducto"));
            p.setExistencias(rs.getInt("existencias"));
            p.setFoto(rs.getString("foto"));
            p.setNombre(rs.getString("nombre"));
            p.setPrecioCompra(rs.getFloat("precioCompra"));
            p.setStatus(rs.getInt("estatus"));
           
            Productoparacliente pc = new Productoparacliente();
            pc.setId(rs.getInt("idAnimal"));
            pc.setRaza(rs.getString("raza"));
            pc.setEspecie(rs.getString("especie"));
            pc.setFechaNac(rs.getString("fechaNacimiento"));
            pc.setFechaLlegada(rs.getString("fechaLlegada"));                 
            pc.setId(rs.getInt("idMercancia"));
            pc.setCodigoBarras(rs.getString("codigoBarras"));
            pc.setDescripcion(rs.getString("descripcion"));
            pc.setMarca(rs.getString("marca"));
            pc.setModelo(rs.getString("modelo"));
            pc.setProducto(p);
           
            Productoparacliente.add(pc);                                           
            
            
            
            
        }
        rs.close();
        pstmt.close();
        connMySQL.close();
        return Productoparacliente;
    }             

    
    
}




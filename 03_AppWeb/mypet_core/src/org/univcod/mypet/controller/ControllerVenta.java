/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.univcod.mypet.controller;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import org.univcod.mypet.db.ConexionMySQL;
import org.univcod.mypet.model.Animal;
import org.univcod.mypet.model.Mercancia;
import org.univcod.mypet.model.Venta;
import org.univcod.mypet.model.Producto;
import org.univcod.mypet.model.VentaResumen;



/**
 *
 * @author
 */
public class ControllerVenta {

    public int insert(Venta v) throws Exception {
//SQL para insertar en la tabla venta:
        String sqlVenta = "INSERT INTO venta (fechaVenta, folio, estatus, idCliente, idEmpleado) "
                + "VALUES(CURDATE(), ?, ?, ?, ?)";

        //SQL para insertar en la tabla detalle_venta:
        String sqlDetalleVenta = "INSERT INTO detalle_venta (idVenta, idProducto, costoVenta, cantidad) VALUES(?, ?, ?, ?)";
        
        
        //SQL para actualizar las existencias del producto 
        String sqlUpdate="UPDATE producto SET existencias=existencias-? WHERE idProducto=?";
                       
        //Objetos de conexion con MySQL:
        ConexionMySQL connMySQL = new ConexionMySQL();
        Connection conn = connMySQL.open();

        //Muy importante: Debemos poner el control transaccional
        //de forma "manual" en la conexion con MySQL antes de hacer algo:
        conn.setAutoCommit(false);

        //PreparedStatement para insertar en venta:
        PreparedStatement pstmtV = conn.prepareStatement(sqlVenta, PreparedStatement.RETURN_GENERATED_KEYS);
        
        //PreparedStatement para insertar en detalle_venta:
        PreparedStatement pstmtDV = conn.prepareStatement(sqlDetalleVenta, PreparedStatement.RETURN_GENERATED_KEYS);
        
         //PreparedStatement para modificar las existencias del producto
        PreparedStatement pstmtUP = conn.prepareStatement(sqlUpdate);

        
        //Aquí recuperaremos el ID de la venta generado:
        ResultSet rs = null;

        //Iniciamos la transaccion en el bloque try-catch:
        try {
            //Llenamos los datos de venta:
            // pstmtV.setString(1, v.getFechaVenta());  //Lo cambiamos por la fecha actual tomada de BD
            pstmtV.setInt(1, v.getFolio()); //Ver como se genera el folio de la venta
            pstmtV.setInt(2, v.getEstatus());
            pstmtV.setInt(3, v.getCliente().getIdc());
            pstmtV.setInt(4, v.getEmpleado().getId());

            //Insertamos en la tabla venta:
            pstmtV.executeUpdate();

            //Recuperamos el ID generado:
            rs = pstmtV.getGeneratedKeys();

            //Revisamos que sí tenemos un ID de venta:
            if (rs.next()) {
                //Recuperamos el ID y lo guardamos 
                //en nuestro objeto de tipo Venta:
                v.setIdVenta(rs.getInt(1));
                  //Ahora vamos a ir insertando cada mercancia que tengamos
                //en la tabla detalle_venta:
                
                for(Mercancia m : v.getMercancias())
                {
                    //Detalle de Venta
                    pstmtDV.setInt(1, v.getIdVenta());
                    pstmtDV.setInt(2, m.getProducto().getId());
                    pstmtDV.setDouble(3, 2*m.getProducto().getPrecioCompra()); 
                    pstmtDV.setInt(4, m.getProducto().getExistencias()); //Se usa este campo para la cantidad vendida
                    pstmtDV.executeUpdate();
                    //Actualización de las existencias
                    //Ahora vamos a ir insertando cada mascota que tengamos
                    //en la tabla detalle_venta:    
                    
                    pstmtUP.setInt(1, m.getProducto().getExistencias());
                    pstmtUP.setInt(2,m.getProducto().getId());
                    pstmtUP.executeUpdate();
                }
                
                //Ahora vamos a ir insertando cada mascota que tengamos
                //en la tabla detalle_venta:
                for(Animal a : v.getMascotas()){
                    pstmtDV.setInt(1, v.getIdVenta());
                    pstmtDV.setInt(2, a.getProducto().getId());
                    pstmtDV.setDouble(3,2* a.getProducto().getPrecioCompra());
                    pstmtDV.setInt(4, a.getProducto().getExistencias());
                    pstmtDV.executeUpdate();
                    
                    
                    pstmtUP.setInt(1, a.getProducto().getExistencias());
                    pstmtUP.setInt(2,a.getProducto().getId());
                    pstmtUP.executeUpdate();
                }
                
             
              


                //Si llegamos a este punto, significa que todo salio bien,
                //entonces, ahora sí, persistimos definitivamente 
                //la transaccion:
                conn.commit();

            }

        } catch (Exception ex) {
            ex.printStackTrace();

            //Si algo salió mal, deshacemos la transaccion:
            conn.rollback();
        }

        //Una vez terminado todo (correctamente o con errores),
        //regresamos el modo transaccional a "automatico":
        conn.setAutoCommit(true);

        //Regresamos el ID de la venta que acabamos de generar:
        return v.getIdVenta();
    }
    
    
    public List<VentaResumen> getAll() throws Exception
    {
        String sql = "SELECT * FROM v_ventas";        
        ConexionMySQL connMySQL = new ConexionMySQL();
        Connection conn = connMySQL.open();
        PreparedStatement pstmt = conn.prepareStatement(sql);
        ResultSet rs = pstmt.executeQuery();
        List<VentaResumen> ventas = new ArrayList<>();
        VentaResumen vr = null;
        
        while(rs.next())
        {
            vr = fillVentaResumen(rs);
            ventas.add(vr);
        }
            
        rs.close();
        pstmt.close();
        connMySQL.close();
        
        return ventas;
    }
    
    public List<VentaResumen> getAllByIdCliente(int idCliente) throws Exception
    {
        String sql = "SELECT * FROM v_ventas WHERE idCliente = " + idCliente;        
        ConexionMySQL connMySQL = new ConexionMySQL();
        Connection conn = connMySQL.open();
        PreparedStatement pstmt = conn.prepareStatement(sql);
        ResultSet rs = pstmt.executeQuery();
        List<VentaResumen> ventas = new ArrayList<>();
        VentaResumen vr = null;
        
        while(rs.next())
        {
            vr = fillVentaResumen(rs);
            ventas.add(vr);
        }
            
        rs.close();
        pstmt.close();
        connMySQL.close();
        
        return ventas;
    }
    
    public Venta getById(int idVenta) throws Exception
    {
        ConexionMySQL connMySQL = new ConexionMySQL();
        Connection conn = connMySQL.open();        
        Venta v = new Venta();
        
        v.setIdVenta(idVenta);
        v.setMercancias(getVentaMercancia(conn, idVenta));
        v.setMascotas(getVentaMascota(conn, idVenta));
        
        connMySQL.close();
        
        return v;
    }
    
    private VentaResumen fillVentaResumen(ResultSet rs) throws Exception
    {
        VentaResumen vr = new VentaResumen();
        
        vr.setIdVenta(rs.getInt("idVenta"));
        vr.setIdEmpleado(rs.getInt("idEmpleado"));
        vr.setIdCliente(rs.getInt("idCliente"));
        vr.setFechaVenta(rs.getString("fechaVenta"));
        vr.setFolio(rs.getInt("folio"));
        vr.setEstatus(rs.getInt("estatus"));
        vr.setTotal(rs.getFloat("total"));
        
        return vr;
    }
    
    private List<Mercancia> getVentaMercancia(Connection conn, int idVenta) throws Exception
    {
        String sql = "SELECT * FROM v_venta_detalle_mercancia WHERE idVenta = " + idVenta;
        PreparedStatement pstmt = conn.prepareStatement(sql);
        ResultSet rs = pstmt.executeQuery();
        List<Mercancia> mercancias = new ArrayList<>();
        Mercancia m = null;
        Producto p = null;
        
        while(rs.next())
        {
            p = new Producto();
            p.setId(rs.getInt("idProducto"));
            p.setNombre(rs.getString("nombre"));
            p.setExistencias(rs.getInt("cantidad"));            
            p.setPrecioVenta(rs.getFloat("costoVenta"));
            
            m = new Mercancia();
            m.setId(rs.getInt("idMercancia"));
            m.setDescripcion(rs.getString("descripcion"));
            m.setModelo(rs.getString("modelo"));
            m.setProducto(p);
            
            mercancias.add(m);
        }
        
        rs.close();
        pstmt.close();
        
        return mercancias;
    }
    
    private List<Animal> getVentaMascota(Connection conn, int idVenta) throws Exception
    {
        String sql = "SELECT * FROM v_venta_detalle_mercancia WHERE idVenta = " + idVenta;
        PreparedStatement pstmt = conn.prepareStatement(sql);
        ResultSet rs = pstmt.executeQuery();
        List<Animal> mascotas = new ArrayList<>();
        Animal m = null;
        Producto p = null;
        
        while(rs.next())
        {
            p = new Producto();
            p.setId(rs.getInt("idProducto"));
            p.setNombre(rs.getString("nombre"));
            p.setExistencias(rs.getInt("cantidad"));            
            p.setPrecioVenta(rs.getFloat("costoVenta"));
            
            m = new Animal();
            m.setId(rs.getInt("idAnimal"));
            m.setRaza(rs.getString("raza"));
            m.setEspecie(rs.getString("especie"));
            m.setFechaNac(rs.getString("fechaNacimiento"));
            m.setFechaLlegada(rs.getString("fechaLlegada"));
            m.setProducto(p);
            
            mascotas.add(m);
        }
        
        rs.close();
        pstmt.close();
        
        return mascotas;
    }
    
     public List<VentaResumen> search(String s) throws Exception {

        String query = "SELECT * FROM v_ventas WHERE folio ="+s;

        ConexionMySQL connMySQL = new ConexionMySQL();
        Connection conn = connMySQL.open();

        PreparedStatement pstmt = conn.prepareStatement(query);

        ResultSet rs = pstmt.executeQuery();

        List<VentaResumen> VentaResumen = new ArrayList<>();
        while (rs.next() != false) {
           
             VentaResumen svr = new VentaResumen();
        
        svr.setIdVenta(rs.getInt("idVenta"));
        svr.setIdEmpleado(rs.getInt("idEmpleado"));
        svr.setIdCliente(rs.getInt("idCliente"));
        svr.setFechaVenta(rs.getString("fechaVenta"));
        svr.setFolio(rs.getInt("folio"));
        svr.setEstatus(rs.getInt("estatus"));
        svr.setTotal(rs.getFloat("total"));
        VentaResumen.add(svr);
       
        }
        rs.close();
        pstmt.close();
        connMySQL.close();
        return VentaResumen;
    }
     
     
     public void cancel(int id) throws Exception {
        // Definimos la consulta SQL:

        String sql = "UPDATE venta SET estatus = 0 WHERE idVenta = " + id;
        String sql2= "UPDATE cancelarventa set existencias= existencias+cantidad where idVenta="+id;
        // Generamos un objeto de conexion con MySQL:
        ConexionMySQL connMySQL = new ConexionMySQL();

        // Abrimos la conexion con MySQL:
        Connection conn = connMySQL.open();

        // Generamos el objeto que nos permitira ejecutar la sentencia SQL:
        Statement stmt = conn.createStatement();

        // Ejecutamos la instruccion SQL:
        stmt.executeUpdate(sql);
        stmt.executeUpdate(sql2);

        // Cerramos los objetos de conexion con la BD:
        stmt.close();

        connMySQL.close();

    }
     
     public void confirmar(int id) throws Exception {
        // Definimos la consulta SQL:

        String sql = "UPDATE venta SET estatus = 2 WHERE idVenta = " + id;

        // Generamos un objeto de conexion con MySQL:
        ConexionMySQL connMySQL = new ConexionMySQL();

        // Abrimos la conexion con MySQL:
        Connection conn = connMySQL.open();

        // Generamos el objeto que nos permitira ejecutar la sentencia SQL:
        Statement stmt = conn.createStatement();

        // Ejecutamos la instruccion SQL:
        stmt.executeUpdate(sql);

        // Cerramos los objetos de conexion con la BD:
        stmt.close();

        connMySQL.close();

    }
    
    

}


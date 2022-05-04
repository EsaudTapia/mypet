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
import java.util.List;
import org.univcod.mypet.db.ConexionMySQL;
import org.univcod.mypet.model.Animal;
import org.univcod.mypet.model.Compra;
import org.univcod.mypet.model.CompraResumen;
import org.univcod.mypet.model.Mercancia;
import org.univcod.mypet.model.Producto;


/**
 *
 * @author PC
 */
public class ControllerCompra {
       public int insert(Compra c) throws Exception {
//SQL para insertar en la tablaoUnitario:
        String sqlCompra = "INSERT INTO compra (fechaCompra, folio, estatus, idProveedor, idEmpleado) "
                + "VALUES(CURDATE(), ?, ?, ?, ?)";

        //SQL para insertar en la tabla detalleoUnitario:
        String sqlDetalleCompra = "INSERT INTO detalle_compra (idCompra, idProducto, costoUnitario, cantidad) VALUES(?, ?, ?, ?)";
        
        
        //SQL para actualizar las existencias del producto 
        String sqlUpdate="UPDATE producto SET existencias=existencias+? WHERE idProducto=?";
                       
        //Objetos de conexion con MySQL:
        ConexionMySQL connMySQL = new ConexionMySQL();
        Connection conn = connMySQL.open();

        //Muy importante: Debemos poner el control transaccional
        //de forma "manual" en la conexion con MySQL antes de hacer algo:
        conn.setAutoCommit(false);

        //PreparedStatement para insertar enoUnitario:
        PreparedStatement pstmtC = conn.prepareStatement(sqlCompra, PreparedStatement.RETURN_GENERATED_KEYS);
        
        //PreparedStatement para insertar en detalleoUnitario:
        PreparedStatement pstmtDC = conn.prepareStatement(sqlDetalleCompra, PreparedStatement.RETURN_GENERATED_KEYS);
        
         //PreparedStatement para modificar las existencias del producto
        PreparedStatement pstmtUP = conn.prepareStatement(sqlUpdate);

        
        //Aquí recuperaremos el ID de laoUnitario generado:
        ResultSet rs = null;

        //Iniciamos la transaccion en el bloque try-catch:
        try {
            //Llenamos los datos deoUnitario:
            // pstmtV.setString(1, v.getFechoUnitario());  //Lo cambiamos por la fecha actual tomada de BD
            pstmtC.setInt(1, c.getFolio()); //Ver como se genera el folio de laoUnitario
            pstmtC.setInt(2, c.getEstatus());
            pstmtC.setInt(3, c.getProveedor().getId());
            pstmtC.setInt(4, c.getEmpleado().getId());

            //Insertamos en la tablaoUnitario:
            pstmtC.executeUpdate();

            //Recuperamos el ID generado:
            rs = pstmtC.getGeneratedKeys();

            //Revisamos que sí tenemos un ID deoUnitario:
            if (rs.next()) {
                //Recuperamos el ID y lo guardamos 
                //en nuestro objeto de tipooUnitario:
                c.setIdCompra(rs.getInt(1));
                  //Ahora vamos a ir insertando cada mercancia que tengamos
                //en la tabla detalleoUnitario:
                
                for(Mercancia m : c.getMercancias())
                {
                    //Detalle deoUnitario
                    pstmtDC.setInt(1, c.getIdCompra());
                    pstmtDC.setInt(2, m.getProducto().getId());
                    pstmtDC.setDouble(3, m.getProducto().getPrecioCompra()); 
                    pstmtDC.setInt(4, m.getProducto().getExistencias()); //Se usa este campo para la cantidad vendida
                    pstmtDC.executeUpdate();
                    //Actualización de las existencias
                    //Ahora vamos a ir insertando cada mascota que tengamos
                    //en la tabla detalleoUnitario:    
                    
                    pstmtUP.setInt(1, m.getProducto().getExistencias());
                    pstmtUP.setInt(2,m.getProducto().getId());
                    pstmtUP.executeUpdate();
                }
                
                //Ahora vamos a ir insertando cada mascota que tengamos
                //en la tabla detalleoUnitario:
                for(Animal a : c.getMascotas()){
                    pstmtDC.setInt(1, c.getIdCompra());
                    pstmtDC.setInt(2, a.getProducto().getId());
                    pstmtDC.setDouble(3,a.getProducto().getPrecioCompra());
                    pstmtDC.setInt(4, a.getProducto().getExistencias());
                    pstmtDC.executeUpdate();
                    
                    
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

        //Regresamos el ID de laoUnitario que acabamos de generar:
        return c.getIdCompra();
    }
    
    
    public List<CompraResumen> getAll() throws Exception
    {
        String sql = "SELECT * FROM v_compra";        
        ConexionMySQL connMySQL = new ConexionMySQL();
        Connection conn = connMySQL.open();
        PreparedStatement pstmt = conn.prepareStatement(sql);
        ResultSet rs = pstmt.executeQuery();
        List<CompraResumen> compra = new ArrayList<>();
        CompraResumen vr = null;
        
        while(rs.next())
        {
            vr = fillCompraResumen(rs);
            compra.add(vr);
        }
            
        rs.close();
        pstmt.close();
        connMySQL.close();
        
        return compra;
    }
    
    public List<CompraResumen> getAllByIdProveedor(int idProveedor) throws Exception
    {
        String sql = "SELECT * FROM v_compra WHERE idProveedor = " + idProveedor;        
        ConexionMySQL connMySQL = new ConexionMySQL();
        Connection conn = connMySQL.open();
        PreparedStatement pstmt = conn.prepareStatement(sql);
        ResultSet rs = pstmt.executeQuery();
        List<CompraResumen> compra = new ArrayList<>();
        CompraResumen cr = null;
        
        while(rs.next())
        {
            cr = fillCompraResumen(rs);
            compra.add(cr);
        }
            
        rs.close();
        pstmt.close();
        connMySQL.close();
        
        return compra;
    }
    
    public Compra getById(int idCompra) throws Exception
    {
        ConexionMySQL connMySQL = new ConexionMySQL();
        Connection conn = connMySQL.open();        
        Compra c = new Compra();
        
        c.setIdCompra(idCompra);
        c.setMercancias(getCompraMercancia(conn, idCompra));
        c.setMascotas(getCompraMascota(conn, idCompra));
        
        connMySQL.close();
        
        return c;
    }
    
    private CompraResumen fillCompraResumen(ResultSet rs) throws Exception
    {
        CompraResumen Cr = new CompraResumen();
        
        Cr.setIdCompra(rs.getInt("idCompra"));
        Cr.setIdEmpleado(rs.getInt("idEmpleado"));
        Cr.setIdProveedor(rs.getInt("idProveedor"));
        Cr.setFechaCompra(rs.getString("fechaCompra"));
        Cr.setFolio(rs.getInt("folio"));
        Cr.setEstatus(rs.getInt("estatus"));
        Cr.setTotal(rs.getFloat("total"));
        
        return Cr;
    }
    
    private List<Mercancia> getCompraMercancia(Connection conn, int idCompra) throws Exception
    {
        String sql = "SELECT * FROM v_compra_detalle_mercancia WHERE idCompra = " + idCompra;
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
            p.setPrecioCompra(rs.getFloat("costoUnitario"));
            
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
    
    private List<Animal> getCompraMascota(Connection conn, int idCompra) throws Exception
    {
        String sql = "SELECT * FROM v_compra_detalle_mercancia WHERE idCompra = " + idCompra;
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
            p.setPrecioCompra(rs.getFloat("costoUnitario"));
            
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
    
     public List<CompraResumen> search(String s) throws Exception {

        String query = "SELECT * FROM v_compra WHERE folio ="+s;

        ConexionMySQL connMySQL = new ConexionMySQL();
        Connection conn = connMySQL.open();

        PreparedStatement pstmt = conn.prepareStatement(query);

        ResultSet rs = pstmt.executeQuery();

        List<CompraResumen> CompraResumen = new ArrayList<>();
        while (rs.next() != false) {
           
             CompraResumen scr = new CompraResumen();
        
        scr.setIdCompra(rs.getInt("idCompra"));
        scr.setIdEmpleado(rs.getInt("idEmpleado"));
        scr.setIdProveedor(rs.getInt("idProveedor"));
        scr.setFechaCompra(rs.getString("fechaCompra"));
        scr.setFolio(rs.getInt("folio"));
        scr.setEstatus(rs.getInt("estatus"));
        scr.setTotal(rs.getFloat("total"));
        CompraResumen.add(scr);
       
        }
        rs.close();
        pstmt.close();
        connMySQL.close();
        return CompraResumen;
    }
     
     
     public void cancel(int id) throws Exception {
        // Definimos la consulta SQL:

        String sql = "UPDATE compra SET estatus = 0 WHERE idCompra = " + id;
        
        String sql2="UPDATE cancelarcompra set existencias= existencias-cantidad where idCompra="+id;

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

        String sql = "UPDATE compra SET estatus = 2 WHERE idCompra = " + id;

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

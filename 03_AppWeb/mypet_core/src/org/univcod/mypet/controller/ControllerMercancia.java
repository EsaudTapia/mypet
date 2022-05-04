package org.univcod.mypet.controller;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.Types;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import org.univcod.mypet.model.Mercancia;
import org.univcod.mypet.model.Producto;
import org.univcod.mypet.db.ConexionMySQL;

/**
 *
 * @author alexesp
 */
public class ControllerMercancia {

    public int insert(Mercancia m) throws Exception {
        // Definimos la instruccion SQL dentro de un String Java:

        String sql = "{call insertProductoMercancia(?, ?, ?, ?, "
                + //Datos de Producto
                "?, ?, ?, ?, "
                + //Datos de Mercancia
                "?, ?)}"; //Valores de retorno

        // Nos conectamos a la BD:
        ConexionMySQL connMySQL = new ConexionMySQL();

        Connection conn = connMySQL.open();

        // Utilizando la conexion con MySQL, creamos un objeto que nos permita
        // invocar el Stored Procedure que hara la insercion en las tablas
        // producto y mercancia:
        CallableStatement cstmt = conn.prepareCall(sql);

        //Llenamos los datos del Producto de acuerdo con los parámetros que pide
        //el Stored Procedure:
        cstmt.setString(1, m.getProducto().getNombre());

        cstmt.setInt(2, m.getProducto().getExistencias());

        cstmt.setDouble(3, m.getProducto().getPrecioCompra());

        cstmt.setString(4, m.getProducto().getFoto());

        cstmt.setString(5, m.getCodigoBarras());

        cstmt.setString(6, m.getDescripcion());

        cstmt.setString(7, m.getModelo());

        cstmt.setString(8, m.getMarca());

        //Registramos los parámetros de salida:
        cstmt.registerOutParameter(9, Types.INTEGER);

        cstmt.registerOutParameter(10, Types.INTEGER);

        //Ejecutamos la consulta:
        cstmt.execute();

        //Recuperamos los ID's generados:
        m.getProducto().setId(cstmt.getInt(9));

        m.setId(cstmt.getInt(10));

        //Establecemos el Precio de Venta de acuerdo con las reglas de negocio:
        m.getProducto().setPrecioVenta(m.getProducto().getPrecioCompra() * 2);

        //Cerramos los objetos de BD:
        cstmt.close();

        connMySQL.close();

        //Devolvemos el ID de la Mercancia generado:
        return m.getId();

    }

    public void update(Mercancia m) throws Exception {
        String sql = "{call updateProductoMercancia(?, ?, "
                + //ID de Producto y Mercancia
                "?, ?, ?, "
                + //Datos de Producto
                "?, ?, ?, ?, "
                + //Datos de Mercancia
                "?)}"; //Dato de la foto que nos faltaba

        ConexionMySQL connMySQL = new ConexionMySQL();

        Connection conn = connMySQL.open();

        CallableStatement cstmt = conn.prepareCall(sql);

        //Llenamos los datos del Producto de acuerdo con los parámetros que pide
        //el Stored Procedure:
        cstmt.setInt(1, m.getProducto().getId());

        cstmt.setInt(2, m.getId());

        cstmt.setString(3, m.getProducto().getNombre());

        cstmt.setInt(4, m.getProducto().getExistencias());

        cstmt.setDouble(5, m.getProducto().getPrecioCompra());

        cstmt.setString(6, m.getCodigoBarras());

        cstmt.setString(7, m.getDescripcion());

        cstmt.setString(8, m.getModelo());

        cstmt.setString(9, m.getMarca());

        cstmt.setString(10, m.getProducto().getFoto());

        //Ejecutamos la consulta:
        cstmt.execute();

        //Cerramos los objetos de BD:
        cstmt.close();

        connMySQL.close();

    }

    public void delete(int id) throws Exception {
        // Definimos la consulta SQL:

        String sql = "UPDATE producto SET estatus = 0 WHERE idProducto = " + id;

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
    
    
    public void activar(int id) throws Exception {
        // Definimos la consulta SQL:

        String sql = "UPDATE producto SET estatus =1 WHERE idProducto = " + id;

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
    
    

//    public Mercancia findById(int id) throws Exception {
//        
//
//    }

    public List<Mercancia> getall(String filtro) throws Exception {
// Definimos la consulta SQL:

        String sql = "SELECT * FROM v_mercancias VM";

        //Abrimos una conexion con MySQL:
        ConexionMySQL connMySQL = new ConexionMySQL();

        Connection conn = connMySQL.open();

        // Generamos un objeto que nos permita ejecutar la consulta
        // de manera segura, a diferencia de un Statement:
        PreparedStatement pstmt = conn.prepareStatement(sql);

        // Ejecutamos la consulta y obtenemos sus resultados:
        ResultSet rs = pstmt.executeQuery();

        // Declaramos una lista dinamica para guardar los objetos que
        // generaremos al recorrer los resultados devueltos por la BD:
        List<Mercancia> mercancias = new ArrayList<>();

        Mercancia m = null;

        //Recorremos el conjunto de registros devuelto por la BD:
        while (rs.next()){ 
        

            //Obtenemos un objeto de tipo Mercancia con los datos que se
            //encuentran en el registro actual, devuelto por la BD:
            m = fill(rs);

            //Agregamos el objeto a la lista:
            mercancias.add(m);
        }
        

        //Devolvemos la lista de objetos consultados:
        return mercancias;
    }

    public Mercancia fill(ResultSet rs) throws Exception {
        Mercancia m = new Mercancia();

        Producto p = new Producto();

        //Llenamos los datos de Producto:
        p.setId(rs.getInt("idProducto"));

        p.setExistencias(rs.getInt("existencias"));

        p.setNombre(rs.getString("nombre"));

        p.setPrecioCompra(rs.getDouble("precioCompra"));

        p.setPrecioVenta(rs.getDouble("precioVenta"));

        p.setStatus(rs.getInt("estatus"));
        
        p.setFoto(rs.getString("foto"));

        m.setId(rs.getInt("idMercancia"));

        m.setCodigoBarras(rs.getString("codigoBarras"));

        m.setDescripcion(rs.getString("descripcion"));

        m.setMarca(rs.getString("marca"));

        m.setModelo(rs.getString("modelo"));

        m.setProducto(p);

        return m;
    }
    
public List<Mercancia> search(String s) throws Exception {

        String query = "SELECT * FROM v_mercancias WHERE nombre like'%" + s + "%'";

        ConexionMySQL connMySQL = new ConexionMySQL();
        Connection conn = connMySQL.open();

        PreparedStatement pstmt = conn.prepareStatement(query);

        ResultSet rs = pstmt.executeQuery();

        List<Mercancia> mercancias = new ArrayList<>();

        while (rs.next() != false) {
            Producto p = new Producto();
            p.setId(rs.getInt("idProducto"));
            p.setExistencias(rs.getInt("existencias"));
            p.setFoto(rs.getString("foto"));
            p.setNombre(rs.getString("nombre"));
            p.setPrecioCompra(rs.getFloat("precioCompra"));
            p.setStatus(rs.getInt("estatus"));

            Mercancia m = new Mercancia();
            m.setId(rs.getInt("idMercancia"));
            m.setCodigoBarras(rs.getString("codigoBarras"));
            m.setDescripcion(rs.getString("descripcion"));
            m.setMarca(rs.getString("marca"));
            m.setModelo(rs.getString("modelo"));
            m.setProducto(p);

            mercancias.add(m);
        }
        rs.close();
        pstmt.close();
        connMySQL.close();
        return mercancias;
    }

}

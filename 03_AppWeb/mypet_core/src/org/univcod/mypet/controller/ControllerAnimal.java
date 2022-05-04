package org.univcod.mypet.controller;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.Types;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import org.univcod.mypet.model.Animal;
import org.univcod.mypet.model.Producto;
import org.univcod.mypet.db.ConexionMySQL;

/**
 *
 * @author alexesp
 */
public class ControllerAnimal {

    public int insert(Animal a) throws Exception {
        // Definimos la instruccion SQL dentro de un String Java:

        String sql = "{call insertProductoAnimal(?, ?, ?, ?, "
                + //Datos de Producto
                "?, ?, ?, ?, "
                + //Datos de Animal
                "?, ?)}"; //Valores de retorno

        // Nos conectamos a la BD:
        ConexionMySQL connMySQL = new ConexionMySQL();

        Connection conn = connMySQL.open();

        // Utilizando la conexion con MySQL, creamos un objeto que nos permita
        // invocar el Stored Procedure que hara la insercion en las tablas
        // producto y animal:
        CallableStatement cstmt = conn.prepareCall(sql);

        //Llenamos los datos del Producto de acuerdo con los parámetros que pide
        //el Stored Procedure:
        cstmt.setString(1, a.getProducto().getNombre());

        cstmt.setInt(2, a.getProducto().getExistencias());

        cstmt.setDouble(3, a.getProducto().getPrecioCompra());

        cstmt.setString(4, a.getProducto().getFoto());

        cstmt.setString(5, a.getRaza());

        cstmt.setString(6, a.getEspecie());

        cstmt.setString(7, a.getFechaNac());

        cstmt.setString(8, a.getFechaLlegada());

        //Registramos los parámetros de salida:
        cstmt.registerOutParameter(9, Types.INTEGER);

        cstmt.registerOutParameter(10, Types.INTEGER);

        //Ejecutamos la consulta:
        cstmt.execute();

        //Recuperamos los ID's generados:
        a.getProducto().setId(cstmt.getInt(9));

        a.setId(cstmt.getInt(10));

        //Establecemos el Precio de Venta de acuerdo con las reglas de negocio:
        a.getProducto().setPrecioVenta(a.getProducto().getPrecioCompra() * 2);

        //Cerramos los objetos de BD:
        cstmt.close();

        connMySQL.close();

        //Devolvemos el ID del Animal generado:
        return a.getId();

    }

    public void update(Animal a) throws Exception {
        String sql = "{call updateProductoAnimal(?, ?, "
                + //ID de Producto y Animal
                "?, ?, ?, "
                + //Datos de Producto
                "?, ?, ?, ?, "
                + //Datos de Animal
                "?)}"; //Dato de la foto que nos faltaba

        ConexionMySQL connMySQL = new ConexionMySQL();

        Connection conn = connMySQL.open();

        CallableStatement cstmt = conn.prepareCall(sql);

        //Llenamos los datos del Producto de acuerdo con los parámetros que pide
        //el Stored Procedure:
        cstmt.setInt(1, a.getProducto().getId());

        cstmt.setInt(2, a.getId());

        cstmt.setString(3, a.getProducto().getNombre());

        cstmt.setInt(4, a.getProducto().getExistencias());

        cstmt.setDouble(5, a.getProducto().getPrecioCompra());

        cstmt.setString(6, a.getRaza());

        cstmt.setString(7, a.getEspecie());

        cstmt.setString(8, a.getFechaNac());

        cstmt.setString(9, a.getFechaLlegada());

        cstmt.setString(10, a.getProducto().getFoto());

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

    public List<Animal> getall(String filtro) throws Exception {
// Definimos la consulta SQL:

        String sql = "SELECT * FROM v_animales";

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
        List<Animal> animales = new ArrayList<>();

        Animal a = null;

        //Recorremos el conjunto de registros devuelto por la BD:
        while (rs.next()) {

            //Obtenemos un objeto de tipo animal con los datos que se
            //encuentran en el registro actual, devuelto por la BD:
            a = fill(rs);

            //Agregamos el objeto a la lista:
            animales.add(a);
        }

        //Devolvemos la lista de objetos consultados:
        return animales;
    }

    public Animal fill(ResultSet rs) throws Exception {
        Animal a = new Animal();

        Producto p = new Producto();

        //Llenamos los datos de Producto:
        p.setId(rs.getInt("idProducto"));

        p.setExistencias(rs.getInt("existencias"));

        p.setNombre(rs.getString("nombre"));

        p.setPrecioCompra(rs.getDouble("precioCompra"));

        p.setPrecioVenta(rs.getDouble("precioVenta"));

        p.setStatus(rs.getInt("estatus"));

        p.setFoto(rs.getString("foto"));

        a.setId(rs.getInt("idAnimal"));

        a.setRaza(rs.getString("raza"));

        a.setEspecie(rs.getString("especie"));

        a.setFechaNac(rs.getString("fechaNacimiento"));

        a.setFechaLlegada(rs.getString("fechaLlegada"));

        a.setProducto(p);

        return a;
    }

    public List<Animal> search(String s) throws Exception {

        String query = "SELECT * FROM v_animales WHERE especie like'%" + s + "%'";

        ConexionMySQL connMySQL = new ConexionMySQL();
        Connection conn = connMySQL.open();

        PreparedStatement pstmt = conn.prepareStatement(query);

        ResultSet rs = pstmt.executeQuery();

        List<Animal> animales = new ArrayList<>();

        while (rs.next() != false) {
            Producto p = new Producto();
            p.setId(rs.getInt("idProducto"));
            p.setExistencias(rs.getInt("existencias"));
            p.setFoto(rs.getString("foto"));
            p.setNombre(rs.getString("nombre"));
            p.setPrecioCompra(rs.getFloat("precioCompra"));
            p.setStatus(rs.getInt("estatus"));

            Animal a = new Animal();
            a.setId(rs.getInt("idAnimal"));
            a.setRaza(rs.getString("raza"));
            a.setEspecie(rs.getString("especie"));
            a.setFechaNac(rs.getString("fechaNacimiento"));
            a.setFechaLlegada(rs.getString("fechaLlegada"));
            a.setProducto(p);
                        
            animales.add(a);
            
            
            
        }
        rs.close();
        pstmt.close();
        connMySQL.close();
        return animales;
    }

}

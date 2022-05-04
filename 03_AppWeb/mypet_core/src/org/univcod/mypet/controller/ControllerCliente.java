package org.univcod.mypet.controller;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import org.univcod.mypet.db.ConexionMySQL;
import org.univcod.mypet.model.Cliente;
import org.univcod.mypet.model.Persona;

/**
 *
 * @author alexesp
 */
public class ControllerCliente {

    public int insert(Cliente c) throws Exception {
        // Definimos la instruccion SQL dentro de un String Java:

        String sql = "{call insertCliente(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, "
                + //Datos de Persona
                "?, ?, "
                + //Datos de Cliente
                "?, ?)}"; //Valores de retorno

        // Nos conectamos a la BD:
        ConexionMySQL connMySQL = new ConexionMySQL();

        Connection conn = connMySQL.open();

        // Utilizando la conexion con MySQL, creamos un objeto que nos permita
        // invocar el Stored Procedure que hara la insercion en las tablas
        // producto y mercancia:
        CallableStatement cstmt = conn.prepareCall(sql);

        //Llenamos los datos de Persona de acuerdo con los parámetros que pide
        //el Stored Procedure:
        cstmt.setString(1, c.getPersona().getNombre());

        cstmt.setString(2, c.getPersona().getApellidoPaterno());

        cstmt.setString(3, c.getPersona().getApellidoMaterno());

        cstmt.setString(4, c.getPersona().getFechaNacimiento());

        cstmt.setString(5, c.getPersona().getCalle());

        cstmt.setString(6, c.getPersona().getNumero());

        cstmt.setString(7, c.getPersona().getColonia());

        cstmt.setInt(8, c.getPersona().getCp());

        cstmt.setString(9, c.getPersona().getCiudad());

        cstmt.setString(10, c.getPersona().getEstado());

        cstmt.setString(11, c.getPersona().getTel1());

        cstmt.setString(12, c.getPersona().getTel2());

        cstmt.setString(13, c.getCorreo());

        cstmt.setString(14, c.getContrasenia());

        //Registramos los parámetros de salida:
        cstmt.registerOutParameter(15, Types.INTEGER);

        cstmt.registerOutParameter(16, Types.INTEGER);

        //Ejecutamos la consulta:
        cstmt.execute();

        //Recuperamos los ID's generados:
        c.getPersona().setId(cstmt.getInt(15));

        c.setIdc(cstmt.getInt(16));

        //Cerramos los objetos de BD:
        cstmt.close();

        connMySQL.close();

        //Devolvemos el ID de la Mercancia generado:
        return c.getIdc();

    }

    public void update(Cliente c) throws Exception {
        String sql = "{call updateCliente(?, "
                + //ID de Producto y Mercancia
                "?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,  "
                + //Datos de Producto
                "?, "
                + //Datos de Cliente
                "?)}"; //Dato de la foto que nos faltaba
        ConexionMySQL connMySQL = new ConexionMySQL();

        Connection conn = connMySQL.open();

        CallableStatement cstmt = conn.prepareCall(sql);

        //Llenamos los datos del Producto de acuerdo con los parámetros que pide
        //el Stored Procedure:       
        cstmt.setInt(1, c.getIdc());

        cstmt.setString(2, c.getPersona().getNombre());

        cstmt.setString(3, c.getPersona().getApellidoPaterno());

        cstmt.setString(4, c.getPersona().getApellidoMaterno());

        cstmt.setString(5, c.getPersona().getFechaNacimiento());

        cstmt.setString(6, c.getPersona().getCalle());

        cstmt.setString(7, c.getPersona().getNumero());

        cstmt.setString(8, c.getPersona().getColonia());

        cstmt.setInt(9, c.getPersona().getCp());

        cstmt.setString(10, c.getPersona().getCiudad());

        cstmt.setString(11, c.getPersona().getEstado());

        cstmt.setString(12, c.getPersona().getTel1());

        cstmt.setString(13, c.getPersona().getTel2());

        cstmt.setString(14, c.getCorreo());

        cstmt.setString(15, c.getContrasenia());

        //Ejecutamos la consulta:
        cstmt.execute();

        //Cerramos los objetos de BD:
        cstmt.close();

        connMySQL.close();

    }

    public void delete(int id) throws Exception {
        // Definimos la consulta SQL:

        String sql = "UPDATE persona SET estatus = 0 WHERE idPersona = " + id;

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

        String sql = "UPDATE persona SET estatus =1 WHERE idpersona = " + id;

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

    public List<Cliente> getall(String filtro) throws Exception {
// Definimos la consulta SQL:

        String sql = "SELECT * FROM v_clientes ";

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
        List<Cliente> Clientes = new ArrayList<>();

        Cliente c = null;

        //Recorremos el conjunto de registros devuelto por la BD:
        while (rs.next()) {

            //Obtenemos un objeto de tipo cliente con los datos que se
            //encuentran en el registro actual, devuelto por la BD:
            c = fill(rs);

            //Agregamos el objeto a la lista:
            Clientes.add(c);
        }

        //Devolvemos la lista de objetos consultados:
        return Clientes;
    }

    public Cliente fill(ResultSet rs) throws Exception {
        Cliente c = new Cliente();

        Persona p = new Persona();

        //Llenamos los datos de Producto:
        p.setId(rs.getInt("idPersona"));

        p.setNombre(rs.getString("nombre"));

        p.setApellidoPaterno(rs.getString("apellidoPaterno"));

        p.setApellidoMaterno(rs.getString("apellidoMaterno"));

        p.setCalle(rs.getString("calle"));

        p.setNumero(rs.getString("numero"));

        p.setColonia(rs.getString("colonia"));

        p.setCiudad(rs.getString("ciudad"));

        p.setCp(rs.getInt("cp"));

        p.setEstado(rs.getString("estado"));

        p.setFechaNacimiento(rs.getString("fechaNacimiento"));

        p.setTel1(rs.getString("tel1"));

        p.setTel2(rs.getString("tel2"));

        p.setEstatus(rs.getInt("estatus"));

        c.setIdc(rs.getInt("idCliente"));

        c.setCorreo(rs.getString("correo"));

        c.setContrasenia(rs.getString("contrasenia"));

        c.setPersona(p);

        return c;
    }

    public List<Cliente> search(String s) throws Exception {

        String query = "SELECT * FROM v_clientes WHERE nombre like'%" + s + "%'";

        ConexionMySQL connMySQL = new ConexionMySQL();
        Connection conn = connMySQL.open();

        PreparedStatement pstmt = conn.prepareStatement(query);

        ResultSet rs = pstmt.executeQuery();

        List<Cliente> Clientes = new ArrayList<>();
        while (rs.next() != false) {
            Persona p = new Persona();
            p.setId(rs.getInt("idPersona"));

            p.setNombre(rs.getString("nombre"));

            p.setApellidoPaterno(rs.getString("apellidoPaterno"));

            p.setApellidoMaterno(rs.getString("apellidoMaterno"));

            p.setCalle(rs.getString("calle"));

            p.setNumero(rs.getString("numero"));

            p.setColonia(rs.getString("colonia"));

            p.setCiudad(rs.getString("ciudad"));

            p.setCp(rs.getInt("cp"));

            p.setEstado(rs.getString("estado"));

            p.setFechaNacimiento(rs.getString("fechaNacimiento"));

            p.setTel1(rs.getString("tel1"));

            p.setTel2(rs.getString("tel2"));

            p.setEstatus(rs.getInt("estatus"));

            Cliente c = new Cliente();
            c.setIdc(rs.getInt("idCliente"));

            c.setCorreo(rs.getString("correo"));

            c.setContrasenia(rs.getString("contrasenia"));

            c.setPersona(p);

            Clientes.add(c);

        }
        rs.close();
        pstmt.close();
        connMySQL.close();
        return Clientes;
    }

}

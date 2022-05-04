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
import org.univcod.mypet.model.Empleado;
import org.univcod.mypet.model.Persona;
import org.univcod.mypet.model.Proveedor;

/**
 *
 * @author alexesp
 */
public class ControllerProveedor {

    public int insert(Proveedor p) throws Exception {
        // Definimos la instruccion SQL dentro de un String Java:

        String sql = "{call insertProveedor(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, "
                + //Datos de Persona
                "?, ?, "
                + //Datos de Proveedor
                "?, ?)}"; //Valores de retorno

        // Nos conectamos a la BD:
        ConexionMySQL connMySQL = new ConexionMySQL();

        Connection conn = connMySQL.open();

        // Utilizando la conexion con MySQL, creamos un objeto que nos permita
        // invocar el Stored Procedure que hara la insercion en las tablas
        // persona y proveedor:
        CallableStatement cstmt = conn.prepareCall(sql);

        //Llenamos los datos de Persona de acuerdo con los parámetros que pide
        //el Stored Procedure:
        cstmt.setString(1, p.getPersona().getNombre());

        cstmt.setString(2, p.getPersona().getApellidoPaterno());

        cstmt.setString(3, p.getPersona().getApellidoMaterno());

        cstmt.setString(4, p.getPersona().getFechaNacimiento());

        cstmt.setString(5, p.getPersona().getCalle());

        cstmt.setString(6, p.getPersona().getNumero());

        cstmt.setString(7, p.getPersona().getColonia());

        cstmt.setInt(8, p.getPersona().getCp());

        cstmt.setString(9, p.getPersona().getCiudad());

        cstmt.setString(10, p.getPersona().getEstado());

        cstmt.setString(11, p.getPersona().getTel1());

        cstmt.setString(12, p.getPersona().getTel2());

        cstmt.setString(13, p.getRfc());

        cstmt.setString(14, p.getRazonSocial());

        //Registramos los parámetros de salida:
        cstmt.registerOutParameter(15, Types.INTEGER);

        cstmt.registerOutParameter(16, Types.INTEGER);

        //Ejecutamos la consulta:
        cstmt.execute();

        //Recuperamos los ID's generados:
        p.getPersona().setId(cstmt.getInt(15));

        p.setId(cstmt.getInt(16));

        //Cerramos los objetos de BD:
        cstmt.close();

        connMySQL.close();

        //Devolvemos el ID del Proveedor generado:
        return p.getId();

    }

    public void update(Proveedor p) throws Exception {
        String sql = "{call updateProveedor(?, "
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
        cstmt.setInt(1, p.getId());

        cstmt.setString(2, p.getPersona().getNombre());

        cstmt.setString(3, p.getPersona().getApellidoPaterno());

        cstmt.setString(4, p.getPersona().getApellidoMaterno());

        cstmt.setString(5, p.getPersona().getFechaNacimiento());

        cstmt.setString(6, p.getPersona().getCalle());

        cstmt.setString(7, p.getPersona().getNumero());

        cstmt.setString(8, p.getPersona().getColonia());

        cstmt.setInt(9, p.getPersona().getCp());

        cstmt.setString(10, p.getPersona().getCiudad());

        cstmt.setString(11, p.getPersona().getEstado());

        cstmt.setString(12, p.getPersona().getTel1());

        cstmt.setString(13, p.getPersona().getTel2());

        cstmt.setString(14, p.getRfc());

        cstmt.setString(15, p.getRazonSocial());

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

        String sql = "UPDATE persona SET estatus = 1 WHERE idPersona = " + id;

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

    public List<Proveedor> getall(String filtro) throws Exception {
// Definimos la consulta SQL:

        String sql = "SELECT * FROM v_proveedores";

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
        List<Proveedor> proveedores = new ArrayList<>();

        Proveedor p = null;

        //Recorremos el conjunto de registros devuelto por la BD:
        while (rs.next()) {

            //Obtenemos un objeto de tipo Mercancia con los datos que se
            //encuentran en el registro actual, devuelto por la BD:
            p = fill(rs);

            //Agregamos el objeto a la lista:
            proveedores.add(p);
        }

        //Devolvemos la lista de objetos consultados:
        return proveedores;
    }

    public Proveedor fill(ResultSet rs) throws Exception {
        Proveedor prov = new Proveedor();

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

        prov.setId(rs.getInt("idProveedor"));

        prov.setRfc(rs.getString("rfc"));

        prov.setRazonSocial(rs.getString("razonSocial"));

        prov.setPersona(p);

        return prov;
    }

    public List<Proveedor> search(String s) throws Exception {

        String query = "SELECT * FROM v_proveedores WHERE razonSocial like'%" + s + "%'";

        ConexionMySQL connMySQL = new ConexionMySQL();
        Connection conn = connMySQL.open();

        PreparedStatement pstmt = conn.prepareStatement(query);

        ResultSet rs = pstmt.executeQuery();

        List<Proveedor> Proveedores = new ArrayList<>();
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

            Proveedor prov = new Proveedor();

            prov.setId(rs.getInt("idProveedor"));

            prov.setRfc(rs.getString("rfc"));

            prov.setRazonSocial(rs.getString("razonSocial"));

            prov.setPersona(p);

            Proveedores.add(prov);

        }
        rs.close();
        pstmt.close();
        connMySQL.close();
        return Proveedores;
    }
    
   
}

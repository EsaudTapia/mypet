package org.univcod.mypet.controller;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import org.univcod.mypet.db.ConexionMySQL;
import org.univcod.mypet.model.Cliente;
import org.univcod.mypet.model.Empleado;
import org.univcod.mypet.model.Persona;

/**
 *
 * @author PC
 */
public class ControllerLogin {

    public Empleado login(String correo, String contrasenia) throws Exception {
        Empleado e = new Empleado();

        String query = "SELECT empleado.idEmpleado, persona.nombre, persona.apellidoPaterno, persona.apellidoMaterno"
                + " FROM persona INNER JOIN empleado ON persona.idPersona=empleado.idPersona"
                + " WHERE empleado.correo='" + correo + "' && empleado.contrasenia='" + contrasenia + "';";

        ConexionMySQL objC = new ConexionMySQL();
        Connection con = objC.open();

        Statement stmt = con.createStatement();
        ResultSet rs = stmt.executeQuery(query);

        while (rs.next()) {
            Persona persona = new Persona();
            persona.setNombre(rs.getString("nombre"));
            persona.setApellidoPaterno(rs.getString("apellidoPaterno"));
            persona.setApellidoMaterno(rs.getString("apellidoMaterno"));
            e.setPersona(persona);
            e.setId(rs.getInt("idEmpleado"));
            e.setCorreo(correo);
            e.setContrasenia(contrasenia);                    
            e.setToken();
            
        }

        rs.close();
        stmt.close();
        con.close();
        objC.close();

        return e;
    }

    public Cliente loginc(String correo, String contrasenia) throws Exception {
        Cliente c = new Cliente();
        String query = "SELECT cliente.idCliente, persona.nombre, persona.apellidoPaterno, persona.apellidoMaterno, cliente.contrasenia, cliente.correo"
                + " FROM persona INNER JOIN cliente ON persona.idPersona=cliente.idPersona"
                + " WHERE cliente.correo='" + correo + "' && cliente.contrasenia='" + contrasenia + "';";

        ConexionMySQL objC = new ConexionMySQL();
        Connection con = objC.open();

        Statement stmt = con.createStatement();
        ResultSet rs = stmt.executeQuery(query);

        while (rs.next()) {
            Persona persona = new Persona();
            persona.setNombre(rs.getString("nombre"));
            persona.setApellidoPaterno(rs.getString("apellidoPaterno"));
            persona.setApellidoMaterno(rs.getString("apellidoMaterno"));
            c.setPersona(persona);
            c.setIdc(rs.getInt("idCliente"));                        
            c.setCorreo(correo);
            c.setContrasenia(contrasenia);                    
            c.setToken();
                        

        }

        rs.close();
        stmt.close();
        con.close();
        objC.close();

        return c;
    }
    
    public void tokenCliente(Cliente c) throws Exception{
        String sql ="{call tokencliente(?,"+"?)}";
        ConexionMySQL connMySQL = new ConexionMySQL();
        Connection conn = connMySQL.open();      
        CallableStatement cstmt = conn.prepareCall(sql);
        
        cstmt.setInt(1, c.getIdc());
        cstmt.setString(2, c.getToken());        
        cstmt.execute();  
        //Cerramos los objetos de BD:
        cstmt.close();
        connMySQL.close();
    }
    
    
    public void tokenEmpleado(Empleado e) throws Exception{
        String sql ="{call tokenempleado(?,"+"?)}";
        ConexionMySQL connMySQL = new ConexionMySQL();
        Connection conn = connMySQL.open();      
        CallableStatement cstmt = conn.prepareCall(sql);
        
        cstmt.setInt(1, e.getId());
        cstmt.setString(2, e.getToken());        
        cstmt.execute();  
        //Cerramos los objetos de BD:
        cstmt.close();
        connMySQL.close();
    }
    
    public void deletetokenEm(int idEmpleado) throws Exception{
         // Definimos la consulta SQL:

        String sql = "UPDATE empleado SET token =null WHERE idempleado = " + idEmpleado;

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
    
    public void deletetokencl(int idCliente) throws Exception{
         // Definimos la consulta SQL:

        String sql = "UPDATE cliente SET token =null WHERE idCliente = " + idCliente;

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
    
    public Cliente validartokenC(String token) throws Exception{
         // Definimos la consulta SQL:
        String sql = "select*from Personas_Cliente_Empleado where token_Cliente = '"+ token+"'";
        ConexionMySQL objC = new ConexionMySQL();
        Connection con = objC.open();

        Statement stmt = con.createStatement();
        ResultSet rs = stmt.executeQuery(sql);
        Cliente c = new Cliente();
       
        while (rs.next()) {                      
        c.setTokenBD(rs.getString("token_Cliente"));                        
        }

        rs.close();
        stmt.close();
        con.close();
        objC.close();
                        
       return c;
                               
    }
    
      public Empleado validartokenE(String token) throws Exception{
         // Definimos la consulta SQL:
        String sql = "SELECT*FROM personas_cliente_empleado where token_Empleado = '"+ token+"'";
        ConexionMySQL objC = new ConexionMySQL();
        Connection con = objC.open();

        Statement stmt = con.createStatement();
        ResultSet rs = stmt.executeQuery(sql);
        Empleado e = new Empleado();      
        while (rs.next()) {                      
        e.setId(rs.getInt("idEmpleado"));                        
        }

        rs.close();
        stmt.close();
        con.close();
        objC.close();
                        
       return e;
                               
    }
    

}

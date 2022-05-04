package org.univcod.mypet.rest;

import com.google.gson.Gson;
import java.util.ArrayList;
import java.util.List;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import org.univcod.mypet.controller.ControllerEmpleado;
import org.univcod.mypet.controller.ControllerLogin;
import org.univcod.mypet.model.Empleado;
import org.univcod.mypet.model.Persona;

/**
 *
 * @author chris
 */
@Path("empleado")
public class RestEmpleado {

    @Path("save")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response save(@FormParam("idEmpleado") @DefaultValue("0") int idEmpleado,
            @FormParam("idPersona") @DefaultValue("0") int idPersona,
            @FormParam("nombre") @DefaultValue("") String nombre,
            @FormParam("apellidoPaterno") @DefaultValue("") String apellidoPaterno,
            @FormParam("apellidoMaterno") @DefaultValue("") String apellidoMaterno,
            @FormParam("fechaNacimiento") @DefaultValue("") String fechaNacimiento,
            @FormParam("calle") @DefaultValue("") String calle,
            @FormParam("estatus") @DefaultValue("1") int estatus,
            @FormParam("numero") @DefaultValue("") String numero,
            @FormParam("colonia") @DefaultValue("") String colonia,
            @FormParam("cp") @DefaultValue("0") int cp,
            @FormParam("ciudad") @DefaultValue("") String ciudad,
            @FormParam("estado") @DefaultValue("") String estado,
            @FormParam("tel1") @DefaultValue("") String tel1,
            @FormParam("tel2") @DefaultValue("") String tel2,
            @FormParam("correo") @DefaultValue("") String correo,
            @FormParam("contrasenia") @DefaultValue("") String contrasenia) {
        String out = "";
        Persona p = new Persona();
        Empleado em = new Empleado();
        ControllerEmpleado ce = new ControllerEmpleado();
        // Llenamos los datos del objeto de tipo Persona:

        p.setNombre(nombre);
        p.setApellidoPaterno(apellidoPaterno);
        p.setApellidoMaterno(apellidoMaterno);
        p.setFechaNacimiento(fechaNacimiento);
        p.setCalle(calle);
        p.setNumero(numero);
        p.setColonia(colonia);
        p.setCp(cp);
        p.setCiudad(ciudad);
        p.setEstado(estado);
        p.setEstatus(estatus);
        p.setTel1(tel1);
        p.setTel2(tel2);

        // Llenamos los datos del objeto de tipo Empleado:
        em.setId(idEmpleado);
        em.setCorreo(correo);
        em.setContrasenia(contrasenia);
        
        em.setPersona(p);

        try {
            // Revisamos si el Persona NO tiene un ID:
            if (em.getId() == 0) {
                ce.insert(em); //Insertamos al empleado en la BD
            } else {
                p.setId(em.getId());
                ce.update(em); // Actualizamos la cliente en la BD
                out = new Gson().toJson(em);
            }
           

           
        } catch (Exception e) {
            e.printStackTrace();
            out = "{\"exception\":\"" + e.toString() + "\"}";
        }

        return Response.status(Response.Status.OK).entity(out).build();
    }

    @Path("delete")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response delete(@FormParam("idPersona") @DefaultValue("0") int idPersona) {
        String out = "";
        ControllerEmpleado ce = new ControllerEmpleado();
        try {
            ce.delete(idPersona);

            out = "{\"result\":\"OK\"}";
        } catch (Exception e) {
            e.printStackTrace();

            out = "{\"exception\":\"" + e.toString() + "\"}";
        }

        return Response.status(Response.Status.OK).entity(out).build();
    }
    
    @Path("activar")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response activar(@FormParam("idPersona") @DefaultValue("0") int idPersona)
    {
        String out = "";
        ControllerEmpleado ce= new ControllerEmpleado();
        try
        {
            ce.activar(idPersona);
            
            out = "{\"result\":\"OK\"}";
        } 
        catch (Exception e)
        {
            e.printStackTrace();
            
            out = "{\"exception\":\"" + e.toString() + "\"}";
        }
                
        return Response.status(Response.Status.OK).entity(out).build();
    }

    @Path("getAll")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAll(@QueryParam("filtro") @DefaultValue("") String filtro) {
        String out = "";
        ControllerEmpleado ce = new ControllerEmpleado();
        List<Empleado> empleados = new ArrayList<>();
        try {
            empleados = ce.getall(filtro);

            out = new Gson().toJson(empleados);
        } catch (Exception e) {
            e.printStackTrace();

            out = "{\"exception\":\"" + e.toString() + "\"}";
        }

        return Response.status(Response.Status.OK).entity(out).build();
    }
    
    @Path("search")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response search(@QueryParam("palabra") @DefaultValue("") String p,
            @QueryParam("token") @DefaultValue("") String token) {
        ControllerEmpleado cm = new ControllerEmpleado();
        List<Empleado> Empleados = new ArrayList<>();
        String out = "";

       try {

            Empleado tokenvalidadoE = new Empleado();
            ControllerLogin cLI = new ControllerLogin();
            tokenvalidadoE = cLI.validartokenE(token);
            String tokencorrecto = "";
            if (tokenvalidadoE.getId() != 0) {

                try {
                    Empleados = cm.search(p);
                    if (!Empleados.isEmpty()) {
                        out = new Gson().toJson(Empleados);
                    } else {
                        out = "{\"error\":\"No hay datos\"}";
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                    out = "{\"exception\":\"" + e.toString() + "\"}";
                }

                return Response.status(Response.Status.OK).entity(out).build();
            } else {
                tokencorrecto = new Gson().toJson(tokenvalidadoE.getTokenBD());
                return Response.status(Response.Status.OK).entity(tokencorrecto).build();
            }
        } catch (Exception e) {
            e.printStackTrace();

            out = "{\"exception\":\"" + e.toString() + "\"}";
        }

        return Response.status(Response.Status.OK).entity(out).build();
    }
    
    
}

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
import org.univcod.mypet.controller.ControllerCliente;
import org.univcod.mypet.controller.ControllerLogin;
import org.univcod.mypet.model.Cliente;
import org.univcod.mypet.model.Empleado;
import org.univcod.mypet.model.Persona;

/**
 *
 * @author alexesp
 */
@Path("cliente")
public class RestCliente {

    @Path("save")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response save(@FormParam("idCliente") @DefaultValue("0") int idCliente,
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
        Cliente c = new Cliente();
        ControllerCliente cl = new ControllerCliente();

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

        // Llenamos los datos del objeto de tipo Cliente:
        c.setIdc(idCliente);
        c.setCorreo(correo);
        c.setContrasenia(contrasenia);
        c.setPersona(p);

        try {
            // Revisamos si el Persona NO tiene un ID:
            if (c.getIdc() == 0) {
                cl.insert(c); //Insertamos la cliente en la BD
            } else {
                p.setId(c.getIdc());
                cl.update(c); // Actualizamos la cliente en la BD                        
                out = new Gson().toJson(c);
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
        ControllerCliente cl = new ControllerCliente();
        try {
            cl.delete(idPersona);

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
    public Response activar(@FormParam("idPersona") @DefaultValue("0") int idPersona) {
        String out = "";
        ControllerCliente cl = new ControllerCliente();
        try {
            cl.activar(idPersona);

            out = "{\"result\":\"OK\"}";
        } catch (Exception e) {
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
        ControllerCliente cl = new ControllerCliente();
        List<Cliente> Clientes = new ArrayList<>();
        try {
            Clientes = cl.getall(filtro);

            out = new Gson().toJson(Clientes);
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
        ControllerCliente cm = new ControllerCliente();
        List<Cliente> Clientes = new ArrayList<>();
        String out = "";

       try {

            Empleado tokenvalidadoE = new Empleado();
            ControllerLogin cLI = new ControllerLogin();
            tokenvalidadoE = cLI.validartokenE(token);
            String tokencorrecto = "";
            if (tokenvalidadoE.getId() != 0) {

                try {
                    Clientes = cm.search(p);
                    if (!Clientes.isEmpty()) {
                        out = new Gson().toJson(Clientes);
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

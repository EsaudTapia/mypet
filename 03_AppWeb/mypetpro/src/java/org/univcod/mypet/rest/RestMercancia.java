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
import javax.ws.rs.core.Application;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import org.univcod.mypet.controller.ControllerLogin;
import org.univcod.mypet.controller.ControllerMercancia;
import org.univcod.mypet.model.Empleado;
import org.univcod.mypet.model.Mercancia;
import org.univcod.mypet.model.Producto;

/**
 *
 * @author alexesp
 */
@Path("mercancia")
public class RestMercancia  extends Application{
    @Path("save")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response save(@FormParam("idMercancia") @DefaultValue("0") int idMercancia,
                         @FormParam("idProducto") @DefaultValue("0") int idProducto,
                         @FormParam("nombre") @DefaultValue("") String nombre,
                         @FormParam("existencias") @DefaultValue("0") int existencias,
                         @FormParam("precioCompra") @DefaultValue("0") double precioCompra,                         
                         @FormParam("status") @DefaultValue("1") int status,
                         @FormParam("codigoBarras") @DefaultValue("") String codigoBarras,
                         @FormParam("descripcion") @DefaultValue("") String descripcion,
                         @FormParam("modelo") @DefaultValue("") String modelo,
                         @FormParam("marca") @DefaultValue("") String marca,
                         @FormParam("foto") @DefaultValue("") String foto)
    {
        String out = "";
        Producto p = new Producto();
        Mercancia m = new Mercancia();
        ControllerMercancia cm = new ControllerMercancia();
        
        // Llenamos los datos del objeto de tipo Producto:
        p.setId(idProducto);
        p.setNombre(nombre);
        p.setExistencias(existencias);
        p.setPrecioCompra(precioCompra);
        p.setFoto(foto);
        p.setStatus(status);
        p.setFoto(foto);
        
        // Llenamos los datos del objeto de tipo Mercancia:
        m.setId(idMercancia);
        m.setCodigoBarras(codigoBarras);
        m.setDescripcion(descripcion);
        m.setModelo(modelo);
        m.setMarca(marca);
        
        m.setProducto(p);
        
        try
        {
            // Revisamos si el producto NO tiene un ID:
            if (m.getProducto().getId() == 0)
                cm.insert(m); //Insertamos la mercancia en la BD
            else
                cm.update(m); // Actualizamos la mercancia en la BD
                        
            out = new Gson().toJson(m);
        } 
        catch (Exception e)
        {
            e.printStackTrace();            
            out = "{\"exception\":\"" + e.toString() + "\"}";
        }
                
        return Response.status(Response.Status.OK).entity(out).build();
    }
    
    @Path("delete")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response delete(@FormParam("idProducto") @DefaultValue("0") int idProducto)
    {
        String out = "";
        ControllerMercancia cm = new ControllerMercancia();
        try
        {
            cm.delete(idProducto);
            
            out = "{\"result\":\"OK\"}";
        } 
        catch (Exception e)
        {
            e.printStackTrace();
            
            out = "{\"exception\":\"" + e.toString() + "\"}";
        }
                
        return Response.status(Response.Status.OK).entity(out).build();
    }
    
    @Path("activar")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response activar(@FormParam("idProducto") @DefaultValue("0") int idProducto)
    {
        String out = "";
        ControllerMercancia cm = new ControllerMercancia();
        try
        {
            cm.activar(idProducto);
            
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
    public Response getAll(@QueryParam("filtro") @DefaultValue("") String filtro)
    {
        String out = "";
        ControllerMercancia cm = new ControllerMercancia();
        List<Mercancia> mercancias = new ArrayList<>();
        try
        {
            mercancias = cm.getall(filtro);
                                    
            out = new Gson().toJson(mercancias);
        } 
        catch (Exception e)
        {
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
        ControllerMercancia cm = new ControllerMercancia();
        List<Mercancia> mercancias = new ArrayList<>();
        String out = "";

         try {

            Empleado tokenvalidadoE = new Empleado();
            ControllerLogin cLI = new ControllerLogin();
            tokenvalidadoE = cLI.validartokenE(token);
            String tokencorrecto = "";
            if (tokenvalidadoE.getId() != 0) {

                try {
                    mercancias = cm.search(p);
                    if (!mercancias.isEmpty()) {
                        out = new Gson().toJson(mercancias);
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
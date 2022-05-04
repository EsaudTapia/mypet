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
import org.univcod.mypet.controller.ControllerAnimal;
import org.univcod.mypet.controller.ControllerLogin;
import org.univcod.mypet.model.Animal;
import org.univcod.mypet.model.Empleado;
import org.univcod.mypet.model.Producto;

/**
 *
 * @author alexesp
 */
 @Path("animal")
public class RestAnimal  extends Application{
    @Path("save")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response save(@FormParam("idAnimal") @DefaultValue("0") int idAnimal,
                         @FormParam("idProducto") @DefaultValue("0") int idProducto,
                         @FormParam("nombre") @DefaultValue("") String nombre,
                         @FormParam("existencias") @DefaultValue("0") int existencias,
                         @FormParam("precioCompra") @DefaultValue("0") double precioCompra,                         
                         @FormParam("status") @DefaultValue("1") int status,
                         @FormParam("raza") @DefaultValue("") String raza,
                         @FormParam("especie") @DefaultValue("") String especie,
                         @FormParam("fechaNacimiento") @DefaultValue("") String fechaNacimiento,
                         @FormParam("fechaLlegada") @DefaultValue("") String fechaLlegada,
                         @FormParam("foto") @DefaultValue("") String foto)
    {
        String out;
        Producto p = new Producto();
        Animal a = new Animal();
        ControllerAnimal ca = new ControllerAnimal();
        
        // Llenamos los datos del objeto de tipo Producto:
        p.setId(idProducto);
        p.setNombre(nombre);
        p.setExistencias(existencias);
        p.setPrecioCompra(precioCompra);
        p.setFoto(foto);
        p.setStatus(status);
        p.setFoto(foto);
        
        // Llenamos los datos del objeto de tipo Animal:
        a.setId(idAnimal);
        a.setRaza(raza);
        a.setEspecie(especie);
        a.setFechaNac(fechaNacimiento);
        a.setFechaLlegada(fechaLlegada);
        
        a.setProducto(p);
        
        try
        {
            // Revisamos si el producto NO tiene un ID:
            if (a.getProducto().getId() == 0)
                ca.insert(a); //Insertamos la mercancia en la BD
            else
                ca.update(a); // Actualizamos la mercancia en la BD
                        
            out = new Gson().toJson(a);
        } 
        catch (Exception e)
        {
            out = "{\"exception\":\"" + e.toString() + "\"}";
        }
                
        return Response.status(Response.Status.OK).entity(out).build();
    }
    
    @Path("delete")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response delete(@FormParam("idProducto") @DefaultValue("0") int idProducto)
    {
        String out;
        ControllerAnimal ca = new ControllerAnimal();
        try
        {
            ca.delete(idProducto);
            
            out = "{\"result\":\"OK\"}";
        } 
        catch (Exception e)
        {            
            out = "{\"exception\":\"" + e.toString() + "\"}";
        }
                
        return Response.status(Response.Status.OK).entity(out).build();
    }
    
    @Path("activar")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response activar(@FormParam("idProducto") @DefaultValue("0") int idProducto)
    {
        String out;
        ControllerAnimal ca = new ControllerAnimal();
        try
        {
            ca.activar(idProducto);
            
            out = "{\"result\":\"OK\"}";
        } 
        catch (Exception e)
        {
            out = "{\"exception\":\"" + e.toString() + "\"}";
        }
                
        return Response.status(Response.Status.OK).entity(out).build();
    }
    
    @Path("getAll")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAll(@QueryParam("filtro") @DefaultValue("") String filtro)
    {
        String out;
        ControllerAnimal ca = new ControllerAnimal();
        List<Animal> animales;
        try
        {
            animales = ca.getall(filtro);
                                    
            out = new Gson().toJson(animales);
        } 
        catch (Exception e)
        {            
            out = "{\"exception\":\"" + e.toString() + "\"}";
        }
                
        return Response.status(Response.Status.OK).entity(out).build();
    }


 @Path("search")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response search(@QueryParam("palabra") @DefaultValue("") String p,
                           @QueryParam("token") @DefaultValue("") String token) {
        ControllerAnimal cm = new ControllerAnimal();
        List<Animal> animales = new ArrayList<>();
        String out = "";

          try {

            Empleado tokenvalidadoE = new Empleado();
            ControllerLogin cLI = new ControllerLogin();
            tokenvalidadoE = cLI.validartokenE(token);
            String tokencorrecto = "";
            if (tokenvalidadoE.getId() != 0) {

                try {
                    animales = cm.search(p);
                    if (!animales.isEmpty()) {
                        out = new Gson().toJson(animales);
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
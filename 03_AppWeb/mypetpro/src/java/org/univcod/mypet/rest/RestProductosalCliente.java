/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.univcod.mypet.rest;

import com.google.gson.Gson;
import java.util.ArrayList;
import java.util.List;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import org.univcod.mypet.controller.ControllerAnimal;
import org.univcod.mypet.controller.ControllerMercancia;
import org.univcod.mypet.controller.ControllerProductosAlCliente;
import org.univcod.mypet.model.Animal;
import org.univcod.mypet.model.Mercancia;
import org.univcod.mypet.model.Productoparacliente;

/**
 *
 * @author PC
 */
@Path("productoAlcliente")
public class RestProductosalCliente {
    @Path("search")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response search(@QueryParam("palabra") @DefaultValue("") String p) {
        ControllerProductosAlCliente cm = new ControllerProductosAlCliente();
        List<Productoparacliente> mercancias = new ArrayList<>();
       
        String out = "";
        String out2 = "";      

        try {
            mercancias = cm.searchm(p);
            
            if (!(mercancias.isEmpty())) {
                out = new Gson().toJson(mercancias);                                    
            } else {
                out = null;
            }
        } catch (Exception e) {
            out = "{​​\"exception\":\"" + e.toString() + "\"}​​";
        }                      
        return Response.status(Response.Status.OK).entity(out).build();
    }
    
    @Path("getAllMer")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllMer(@QueryParam("filtro") @DefaultValue("") String filtro)
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
    
    @Path("getAllMas")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllMas(@QueryParam("filtro") @DefaultValue("") String filtro)
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
    
    
}
 
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
import org.univcod.mypet.controller.ControllerVenta;
import org.univcod.mypet.model.Empleado;
import org.univcod.mypet.model.Venta;
import org.univcod.mypet.model.VentaResumen;

/**
 *
 * @author DavidRdz
 */
@Path("venta")
public class RESTVenta extends Application {

    @POST
    @Path("save")
    @Produces(MediaType.APPLICATION_JSON)
    public Response save(@FormParam("datoVenta") @DefaultValue("{​​}​​") String datoVenta,
            @FormParam("token") @DefaultValue("") String token) {

        String out = "";
        ControllerVenta cv = new ControllerVenta();
        Venta v = null;

        try {

            Empleado tokenvalidadoE = new Empleado();
            ControllerLogin cLI = new ControllerLogin();
            tokenvalidadoE = cLI.validartokenE(token);
            String tokencorrecto = "";

            if (tokenvalidadoE.getId() != 0) {
                try {
                    v = new Gson().fromJson(datoVenta, Venta.class);
                    cv.insert(v);
                    out = "{​​\"result\":" + v.getIdVenta()+ "}​​";
                } catch (Exception e) {
                    e.printStackTrace();
                    out = "{​​\"exception\":\"" + e.toString() + "\"}​​";
                }
                return Response.status(Response.Status.OK).entity(out).build();
            } else {
                tokencorrecto = new Gson().toJson(tokenvalidadoE.getToken());
                return Response.status(Response.Status.OK).entity(tokencorrecto).build();
            }

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
        ControllerVenta dv = new ControllerVenta();
        List<VentaResumen> detalleventa = new ArrayList<>();
        try {
            detalleventa = dv.getAll();

            out = new Gson().toJson(detalleventa);
        } catch (Exception e) {
            e.printStackTrace();

            out = "{\"exception\":\"" + e.toString() + "\"}";
        }

        return Response.status(Response.Status.OK).entity(out).build();
    }

    @Path("cancel")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response delete(@FormParam("idVenta") @DefaultValue("0") int idVenta,
                           @FormParam("token") @DefaultValue("") String token) {
        
        String out="";
        try {

            Empleado tokenvalidadoE = new Empleado();
            ControllerLogin cLI = new ControllerLogin();
            tokenvalidadoE = cLI.validartokenE(token);
            String tokencorrecto = "";
            if (tokenvalidadoE.getId() != 0) {
                ControllerVenta ctrlv = new ControllerVenta();
                try {
                    ctrlv.cancel(idVenta);

                    out = "{\"result\":\"OK\"}";
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

    @Path("confirmar")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response confirmar(@FormParam("idVenta") @DefaultValue("0") int idVenta,
                              @FormParam("token") @DefaultValue("") String token) {
        String out = "";
        try {

            Empleado tokenvalidadoE = new Empleado();
            ControllerLogin cLI = new ControllerLogin();
            tokenvalidadoE = cLI.validartokenE(token);
            String tokencorrecto = "";
            if (tokenvalidadoE.getId() != 0) {
                ControllerVenta cV = new ControllerVenta();
                try {
                    cV.confirmar(idVenta);

                    out = "{\"result\":\"OK\"}";
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

    @Path("search")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response search(@QueryParam("palabra") @DefaultValue("") String p,
                           @QueryParam("token") @DefaultValue("") String token ) {
        ControllerVenta dv = new ControllerVenta();
        List<VentaResumen> ventaResumen = new ArrayList<>();
        String out = "";

          try {

            Empleado tokenvalidadoE = new Empleado();
            ControllerLogin cLI = new ControllerLogin();
            tokenvalidadoE = cLI.validartokenE(token);
            String tokencorrecto = "";
            if (tokenvalidadoE.getId() != 0) {

                try {
                    ventaResumen = dv.search(p);
                    if (!ventaResumen.isEmpty()) {
                        out = new Gson().toJson(ventaResumen);
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

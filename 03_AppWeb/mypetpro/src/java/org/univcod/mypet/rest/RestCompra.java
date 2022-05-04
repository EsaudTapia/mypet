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
import org.univcod.mypet.controller.ControllerCompra;
import org.univcod.mypet.controller.ControllerLogin;

import org.univcod.mypet.model.Compra;
import org.univcod.mypet.model.CompraResumen;
import org.univcod.mypet.model.Empleado;

;

/**
 *
 * @author PC
 */
@Path("compra")
public class RestCompra extends Application {

    @POST
    @Path("save")
    @Produces(MediaType.APPLICATION_JSON)
    public Response save(@FormParam("datoCompra") @DefaultValue("{​​}​​") String datoCompra,
            @FormParam("token") @DefaultValue("") String token) {

        String out = "";
        ControllerCompra cd = new ControllerCompra();
        Compra c = null;

        try {

            Empleado tokenvalidadoE = new Empleado();
            ControllerLogin cLI = new ControllerLogin();
            tokenvalidadoE = cLI.validartokenE(token);
            String tokencorrecto = "";

            if (tokenvalidadoE.getId() != 0) {
                try {
                    c = new Gson().fromJson(datoCompra, Compra.class);
                    cd.insert(c);
                    out = "{​​\"result\":" + c.getIdCompra() + "}​​";
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
    public Response getAll(@QueryParam("filtro") @DefaultValue("") String filtro,
            @QueryParam("token") @DefaultValue("") String token) {
        String out = "";
        ControllerCompra dv = new ControllerCompra();
        List<CompraResumen> detallecompra = new ArrayList<>();

        try {
            Empleado tokenvalidadoE = new Empleado();
            ControllerLogin cLI = new ControllerLogin();
            tokenvalidadoE = cLI.validartokenE(token);
            String tokencorrecto = "";
            if (tokenvalidadoE.getId() != 0) {
                try {
                    detallecompra = dv.getAll();

                    out = new Gson().toJson(detallecompra);
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

    @Path("cancel")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response delete(@FormParam("idCompra") @DefaultValue("0") int idCompra,
            @FormParam("token") @DefaultValue("") String token) {

        String out = "";
        try {

            Empleado tokenvalidadoE = new Empleado();
            ControllerLogin cLI = new ControllerLogin();
            tokenvalidadoE = cLI.validartokenE(token);
            String tokencorrecto = "";
            if (tokenvalidadoE.getId() != 0) {
                ControllerCompra ctrlc = new ControllerCompra();
                try {
                    ctrlc.cancel(idCompra);

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
    public Response confirmar(@FormParam("idCompra") @DefaultValue("0") int idCompra,
            @FormParam("token") @DefaultValue("") String token) {
        String out = "";
        try {

            Empleado tokenvalidadoE = new Empleado();
            ControllerLogin cLI = new ControllerLogin();
            tokenvalidadoE = cLI.validartokenE(token);
            String tokencorrecto = "";
            if (tokenvalidadoE.getId() != 0) {
                ControllerCompra cd = new ControllerCompra();
                try {
                    cd.confirmar(idCompra);

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
            @QueryParam("token") @DefaultValue("") String token) {
        ControllerCompra dv = new ControllerCompra();
        List<CompraResumen> CompraResumen = new ArrayList<>();
        String out = "";

        try {

            Empleado tokenvalidadoE = new Empleado();
            ControllerLogin cLI = new ControllerLogin();
            tokenvalidadoE = cLI.validartokenE(token);
            String tokencorrecto = "";
            if (tokenvalidadoE.getId() != 0) {

                try {
                    CompraResumen = dv.search(p);
                    if (!CompraResumen.isEmpty()) {
                        out = new Gson().toJson(CompraResumen);
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

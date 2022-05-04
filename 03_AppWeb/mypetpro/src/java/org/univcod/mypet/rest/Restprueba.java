/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.univcod.mypet.rest;

import com.google.gson.Gson;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import org.univcod.mypet.controller.ControllerLogin;
import org.univcod.mypet.controller.ControllerProveedor;
import org.univcod.mypet.model.Cliente;
import org.univcod.mypet.model.Empleado;
import org.univcod.mypet.model.Persona;
import org.univcod.mypet.model.Proveedor;

/**
 *
 * @author PC
 */
 @Path("pru")
public class Restprueba {
    @Path("tok")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response tok(@FormParam("idProveedor") @DefaultValue("0") int idProveedor,
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
            @FormParam("rfc") @DefaultValue("") String rfc,
            @FormParam("razonSocial") @DefaultValue("") String razonSocial,
            @FormParam("token") @DefaultValue("") String token) throws Exception {
       
       String out="";
         try {
        Cliente tokenvalidadoC = new Cliente();
        Empleado tokenvalidadoE = new Empleado();
        ControllerLogin cLI = new ControllerLogin();
        tokenvalidadoE = cLI.validartokenE(token);
           
        if (tokenvalidadoE.getTokenBD() != token) {
             Persona p = new Persona();
            Proveedor prov = new Proveedor();
            ControllerProveedor ctrlProv = new ControllerProveedor();

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
            prov.setId(idProveedor);
            prov.setRfc(rfc);
            prov.setRazonSocial(razonSocial);
            prov.setPersona(p);

            try {
                // Revisamos si el Persona NO tiene un ID:
                if (prov.getId() == 0) {
                    ctrlProv.insert(prov); //Insertamos la cliente en la BD
                } else {
                    p.setId(prov.getId());
                }
                ctrlProv.update(prov); // Actualizamos la cliente en la BD

                out = new Gson().toJson(prov);
            } catch (Exception e) {
                e.printStackTrace();
                out = "{\"exception\":\"" + e.toString() + "\"}";
            }

            return Response.status(Response.Status.OK).entity(out).build();
        
        }else{           
            out = new Gson().toJson(tokenvalidadoE);
        }
            
        } catch (Exception e) {
            out = "{​​\"exception\":\"" + e.toString() + "\"}​​";
        }
        return Response.status(Response.Status.OK).entity(out).build();
    }
 }
 

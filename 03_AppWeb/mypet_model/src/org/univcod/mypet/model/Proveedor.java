package org.univcod.mypet.model;

/**
 *
 * @author alexesp
 */
public class Proveedor {
    int id;
    String rfc;
    String razonSocial;
    Persona persona;//contencion

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getRfc() {
        return rfc;
    }

    public void setRfc(String rfc) {
        this.rfc = rfc;
    }

    public String getRazonSocial() {
        return razonSocial;
    }

    public void setRazonSocial(String razonSocial) {
        this.razonSocial = razonSocial;
    }

    public Persona getPersona() {
        return persona;
    }

    public void setPersona(Persona persona) {
        this.persona = persona;
    }    
}
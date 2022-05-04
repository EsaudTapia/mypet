/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dsm403_curp.gui;

import com.sun.javafx.tk.Toolkit.*;
import java.awt.Toolkit;
import java.net.URL;

import java.util.ResourceBundle;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.control.Button;
import javafx.scene.control.ComboBox;
import javafx.scene.control.RadioButton;
import javafx.scene.control.TextField;
import javafx.scene.input.KeyEvent;
import dsm403_curp.core.Calcularcurp;
import java.util.Locale;
import javafx.beans.value.ObservableValue;
import javafx.scene.control.Alert;
import javafx.scene.control.Label;




/**
 *
 * @author PC
 */
public class MainController implements Initializable {

    @FXML
    private ComboBox cmbDia;
    @FXML
    private ComboBox cmbMes;
    @FXML
    private RadioButton rbtnHombre;
    @FXML
    private RadioButton rbtnMujer;
    @FXML
    private TextField txtNombre;
    @FXML
    private TextField txtNombre2;
    @FXML
    private TextField txtApellidoMaterno;
    @FXML
    private TextField txtApellidoPaterno;
    @FXML
    private TextField txtAnio;
    @FXML
    private ComboBox cmbEstados;

    @FXML
    private Button btnBorrar;
    @FXML
    private Button btnGenerar;

    @FXML
    private Label lbcurp;
    
    @FXML
    private Label lbpasos;
    
    @FXML
    private Label lbindama;
    
    @FXML
    private Label lbindnom;
    
    @FXML
    private Label lbindnom2;
    
    @FXML
    private Label lbindapa;
    
    @FXML
    private Label lbindanio;
    
        
    @FXML
    void generar(ActionEvent event) {
        StringBuilder calcularCURP = new StringBuilder();
        Calcularcurp ov = new Calcularcurp();
        calcularCURP.append(txtApellidoPaterno.getText().substring(0, 1));
        calcularCURP.append(ov.obtenerVocal(txtApellidoPaterno.getText()));
        if (txtApellidoMaterno.getText().length()==0) {                                
            calcularCURP.append("X");

        }else{       
           calcularCURP.append(txtApellidoMaterno.getText().substring(0, 1));
           
        }       
        calcularCURP.append(ov.JoseYMaria(txtNombre.getText()).substring(0, 1));
        
       
        calcularCURP.append(txtAnio.getText().substring(2, 4));
        calcularCURP.append(cmbMes.getSelectionModel().getSelectedItem());
        calcularCURP.append(cmbDia.getSelectionModel().getSelectedItem());
        int genero = 0;

        if (rbtnHombre.isSelected()) {
            genero = 1;
        }
        if (rbtnMujer.isSelected()) {
            genero = 2;
        }

        calcularCURP.append(ov.obtenerGenero(genero));
        int estado2 = (int) cmbEstados.getSelectionModel().getSelectedIndex() + 1;

        

        calcularCURP.append(ov.obtenerEstado(estado2));

        calcularCURP.append(ov.obtenerConstante(txtApellidoPaterno.getText()));
        if (txtApellidoMaterno.getText().length()==0) {          
           calcularCURP.append("X");
            
        }else{
             calcularCURP.append(ov.obtenerConstante(txtApellidoMaterno.getText()));
            
        }
       
        calcularCURP.append(ov.obtenerConstante(ov.JoseYMaria(txtNombre.getText())));
        calcularCURP.append("00");
        String curp=calcularCURP.toString();
        curp=(Calcularcurp.remplazarX(curp));
        curp=(Calcularcurp.esgroseria(curp));
        lbpasos.setText("            Paso 2");      
        lbcurp.setText(" CURP lista:"+curp);
        
         Alert alert = new Alert(Alert.AlertType.INFORMATION);
            alert.setHeaderText("Su CURP es:");
            alert.setTitle("Universo del codigo");
            alert.setContentText(curp);
            alert.showAndWait();
            
           
    }
    
    

    @FXML
    public void controlFormato(KeyEvent event) {     
        Object evet = event.getSource();   
        

          txtNombre.textProperty().addListener((ov, oldValue, newValue) -> {      
                  txtNombre.setText(newValue.toUpperCase()); 

        });           
        txtNombre2.textProperty().addListener((ov, oldValue, newValue) -> {              
            txtNombre2.setText(newValue.toUpperCase()); 

        }); 
            
        txtApellidoPaterno.textProperty().addListener((ov, oldValue, newValue) -> {     
            txtApellidoPaterno.setText(newValue.toUpperCase()); 

        }); 
        txtApellidoMaterno.textProperty().addListener((ov, oldValue, newValue) -> {     
            txtApellidoMaterno.setText(newValue.toUpperCase()); 

        }); 
            

        if (evet.equals(txtAnio)) {
            if (txtAnio.getCharacters().length() ==4 ) {                
                event.consume();
                
                txtAnio.setStyle("-fx-border-color:red");                    
                Toolkit.getDefaultToolkit().beep();
                lbindanio.setStyle("-fx-text-fill:red"); 
                lbindanio.setText("El limite es 4 digitos");
                
            }else{
                lbindanio.setStyle("-fx-text-fill:blue");  
                lbindanio.setText("ingresando datos...");
                txtAnio.setStyle("-fx-border-color:blue");     
            }           
            if (!Character.isDigit(event.getCharacter().charAt(0))) {
                event.consume();
                txtAnio.setStyle("-fx-border-color:red");    
                Toolkit.getDefaultToolkit().beep();
                lbindanio.setStyle("-fx-text-fill:red");  
                lbindanio.setText("Caracter erroneo");
            }else if (txtAnio.getCharacters().length() >2){
                 txtAnio.setStyle("-fx-border-color:green");
                 lbindanio.setStyle("-fx-text-fill:green");  
                 lbindanio.setText("Correcto");
            }         
        }
        
        if (evet.equals(txtNombre)) {            
            if(txtNombre.getCharacters().length()>=4){
                txtNombre.setStyle("-fx-border-color:green");
                lbindnom.setText("Correcto");
                lbindnom.setStyle("-fx-text-fill:green"); 
            }else{
                lbindnom.setStyle("-fx-text-fill:blue"); 
                lbindnom.setText("ingresando datos...");
                txtNombre.setStyle("-fx-border-color:blue"); 
            }
            if (!Character.isLetter(event.getCharacter().charAt(0)) && !event.getCharacter().equals(" ")) {
                event.consume();
                lbindnom.setStyle("-fx-text-fill:red"); 
                lbindnom.setText("Formato incorrecto");
                txtNombre.setStyle("-fx-border-color:red"); 
                Toolkit.getDefaultToolkit().beep();
               
            }
                                               
           
        }
            
            
        
        
                
        
         if (evet.equals(txtNombre2)) {            
            if(txtNombre2.getCharacters().length()>=4 ){
                txtNombre2.setStyle("-fx-border-color:green");
                lbindnom2.setText("Correcto");
                lbindnom2.setStyle("-fx-text-fill:green"); 
            }else{
                lbindnom2.setStyle("-fx-text-fill:blue"); 
                lbindnom2.setText("ingresando datos...");
                txtNombre2.setStyle("-fx-border-color:blue"); 
            }
            if (!Character.isLetter(event.getCharacter().charAt(0)) && !event.getCharacter().equals(" ")) {
                event.consume();
                lbindnom2.setStyle("-fx-text-fill:red"); 
                lbindnom2.setText("Formato incorrecto");
                txtNombre2.setStyle("-fx-border-color:red"); 
                Toolkit.getDefaultToolkit().beep();
               
            }
                                               
           
        }
    
         if (evet.equals(txtApellidoPaterno)) {            
            if(txtApellidoPaterno.getCharacters().length()>=4 ){
                txtApellidoPaterno.setStyle("-fx-border-color:green");
                lbindapa.setText("Correcto");
                lbindapa.setStyle("-fx-text-fill:green"); 
            }else{
                lbindapa.setStyle("-fx-text-fill:blue"); 
                lbindapa.setText("ingresando datos...");
                txtApellidoPaterno.setStyle("-fx-border-color:blue"); 
            }
            if (!Character.isLetter(event.getCharacter().charAt(0)) && !event.getCharacter().equals(" ")) {
                event.consume();
                lbindapa.setStyle("-fx-text-fill:red"); 
                lbindapa.setText("Formato incorrecto");
                txtApellidoPaterno.setStyle("-fx-border-color:red"); 
                Toolkit.getDefaultToolkit().beep();
               
            }
                                               
           
        }
   
          if (evet.equals(txtApellidoMaterno)) {            
            if(txtApellidoMaterno.getCharacters().length()>=4 ){
                txtApellidoMaterno.setStyle("-fx-border-color:green");
                lbindama.setText("Correcto");
                lbindama.setStyle("-fx-text-fill:green"); 
            }else{
                lbindama.setStyle("-fx-text-fill:blue"); 
                lbindama.setText("ingresando datos...");
                txtApellidoMaterno.setStyle("-fx-border-color:blue"); 
            }
            if (!Character.isLetter(event.getCharacter().charAt(0)) && !event.getCharacter().equals(" ")) {
                event.consume();
                lbindama.setStyle("-fx-text-fill:red"); 
                lbindama.setText("Formato incorrecto");
                txtApellidoMaterno.setStyle("-fx-border-color:red"); 
                Toolkit.getDefaultToolkit().beep();               
            }                                                          
        }
    }
  
    @FXML
    void borrar(ActionEvent event) {
        txtNombre.setText("");
        txtNombre2.setText("");
        txtApellidoPaterno.setText("");
        txtApellidoMaterno.setText("");
        txtAnio.setText(null);
        cmbDia.getSelectionModel().clearSelection();
        cmbMes.getSelectionModel().clearSelection();
        cmbEstados.getSelectionModel().clearSelection();
        rbtnHombre.setSelected(false);
        rbtnMujer.setSelected(false);
        lbpasos.setText("            Paso 1");      
        lbcurp.setText(" llene todos los campos");
        txtAnio.setStyle("-fx-border-color:#939698"); 
        txtNombre.setStyle("-fx-border-color:#939698");
        txtNombre2.setStyle("-fx-border-color:#939698");
        txtApellidoPaterno.setStyle("-fx-border-color:#939698");
        txtApellidoMaterno.setStyle("-fx-border-color:#939698");
        lbindnom.setText(null);
        lbindnom2.setText(null);
        lbindapa.setText(null);
        lbindama.setText(null);
        lbindanio.setText(null);
     
    }
    

    ObservableList<String> dias = FXCollections.observableArrayList("01", "02", "03", "04", "04", "05",
            "06", "07", "08", "09", "10",
            "11", "12", "13", "14", "15", "16",
            "17", "18", "19", "20", "21", "22",
            "23", "24", "25", "26", "27", "28",
            "29", "30", "31");

    ObservableList<String> mes = FXCollections.observableArrayList("01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12");

    ObservableList<String> estados = FXCollections.observableArrayList("Aguascalientes", "Baja California", "Baja California Sur", "Campeche",
            "Coahuila", "Colima", "Chiapas", "Chihuahua", "Distrito Federal", "Durango",
            "Guanajuato", "Guerrero", "Hidalgo", "Jalisco", "México", "Michoacán", "Morelos",
            "Nayarit", "Nuevo León", "Oaxaca", "Puebla", "Queretaro", "Quintana Roo",
            "San Luis Potosi", "Sinaloa", "Sonora", "Tabasco", "Tamaulipas", "Tlaxcala",
            "Veracruz", "Yucatán", "Zacatecas", "Nacido en el extranjero");
    
    
    

    @Override
    public void initialize(URL location, ResourceBundle resources) {
        cmbDia.setItems(dias);
        cmbMes.setItems(mes);
        cmbEstados.setItems(estados);
       

    }

}

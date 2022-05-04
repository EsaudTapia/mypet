/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.utl.hospital.gui;

import java.awt.Button;
import java.net.URL;
import java.util.ResourceBundle;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.control.ComboBox;
import javafx.scene.control.RadioButton;
import javafx.scene.control.TableColumn;
import javafx.scene.control.TextField;
import javafx.scene.control.ToggleGroup;

/**
 *
 * @author PC
 */
public class PrincipalController  implements Initializable{
    
    @FXML
    private TextField txtNombre;

    @FXML
    private TextField txtApellidoP;

    @FXML
    private TextField txtApellidoM;

    @FXML
    private TextField txtEdad;

    @FXML
    private RadioButton rbtnHombre;

    @FXML
    private ToggleGroup groupSexo;

    @FXML
    private RadioButton rbtnMujer;

    @FXML
    private Button btnGuardar;

    @FXML
    private RadioButton rbtnAleNo;

    @FXML
    private ToggleGroup grupoAlergias;

    @FXML
    private RadioButton rbtnAlesi;

    @FXML
    private RadioButton rbtnEnfCNo;

    @FXML
    private ToggleGroup groupEnfermedades;

    @FXML
    private RadioButton rbtnEnfCSi;

    @FXML
    private TextField txtPeso;

    @FXML
    private TextField txtEstatura;

    @FXML
    private ComboBox cmbTsanguineo;

    @FXML
    private Button btnCancelar;

    @FXML
    private TableColumn<?, ?> colId;

    @FXML
    private TableColumn<?, ?> colNom;

    @FXML
    private TableColumn<?, ?> colApeP;

    @FXML
    private TableColumn<?, ?> colApeM;

    @FXML
    private TableColumn<?, ?> colEdad;

    @FXML
    private TableColumn<?, ?> colSexo;

    @FXML
    private TableColumn<?, ?> colPeso;

    @FXML
    private TableColumn<?, ?> colEstatura;

    @FXML
    private TableColumn<?, ?> colAlergias;

    @FXML
    private TableColumn<?, ?> colDescAlergias;

    @FXML
    private TableColumn<?, ?> colEnf;

    @FXML
    private TableColumn<?, ?> colDescEnf;

    @FXML
    private TableColumn<?, ?> colRH;
    
    

    
     ObservableList<String> sanguineo = FXCollections.observableArrayList("A+", "A-", "B+", "B-", "O+", "O-","AB+", "AB-");

    @Override
    public void initialize(URL location, ResourceBundle resources) {
        cmbTsanguineo.setItems(sanguineo);
    }
}

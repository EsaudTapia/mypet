/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.utl.hospital.main;

import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.stage.Stage;




/**
 *
 * @author PC
 */
public class Main extends Application{
  Parent root;
  
  @Override
      public void start(Stage primaryStage) throws Exception {
        root = FXMLLoader.load(getClass().getResource("/org/utl/hospital/gui/fxml/Principal.fxml"));
        Scene scene = new Scene(root);              
        primaryStage.setScene(scene);
        primaryStage.show();
      

    }
    

        
    }



/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dsm403_curp.main;

import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.stage.Stage;
import dsm403_curp.main.Main;

/**
 *
 * @author PC
 */
public class Main extends Application {
     Parent root; //sera nuestro objeto en el que se carguen los  paneles de fxxml
    @Override
    public void start(Stage primaryStage) throws Exception {
        root = FXMLLoader.load(getClass().getResource("/dsm403_curp/gui/fxml/main_window.fxml"));
        Scene scene = new Scene(root);
        primaryStage.setMinWidth(680);
        primaryStage.setMinHeight(980); 
       
        primaryStage.setScene(scene);
        primaryStage.show();
      

    }
}

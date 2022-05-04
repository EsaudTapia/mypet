-- MySQL dump 10.13  Distrib 5.7.12, for Win32 (AMD64)
--
-- Host: 127.0.0.1    Database: mypet
-- ------------------------------------------------------
-- Server version	5.5.5-10.1.37-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping routines for database 'mypet'
--
/*!50003 DROP PROCEDURE IF EXISTS `insertCliente` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `insertCliente`( /*Parametros de entrada*/
                                IN var_nombre VARCHAR(50),
                                IN var_apellidoPaterno VARCHAR(40),
                                IN var_apellidoMaterno VARCHAR(40),
                                IN var_fechaNacimiento VARCHAR(11),
                                IN var_calle VARCHAR(40),
                                IN var_numero VARCHAR(20),
                                IN var_colonia VARCHAR(40),
                                IN var_cp INT,
                                IN var_ciudad VARCHAR(40),
                                IN var_estado VARCHAR(40),
                                IN var_tel1 VARCHAR(20),
                                IN var_tel2 VARCHAR(20),
                                IN var_correo VARCHAR(50), 
                                IN var_contrasenia	VARCHAR(50),
                                /* Parametros de Retorno */
								OUT var_idPersona INT,
								OUT var_idCliente INT
                                )
BEGIN
			-- Insertamos los datos de la tabla persona:
            INSERT INTO persona (	nombre, apellidoPaterno, apellidoMaterno, fechaNacimiento,
									calle, numero, colonia, cp, ciudad, estado, tel1, tel2) 
            VALUES (				var_nombre, var_apellidoPaterno, var_apellidoMaterno, 
									var_fechaNacimiento, 
                                    var_calle, var_numero, var_colonia, 
                                    var_cp, var_ciudad, var_estado, var_tel1, var_tel2);
                                    
			-- Recuperamos el ID generado para persona:
			SET var_idPersona = LAST_INSERT_ID();
            
            -- Insertamos los datos de la tabla cliente:
            INSERT INTO cliente ( 	idPersona, correo, contrasenia)
            VALUES (				var_idPersona, var_correo, var_contrasenia);
            
            -- Recuperamos el ID generado para cliente:
			SET var_idCliente = LAST_INSERT_ID();
            
    END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insertEmpleado` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `insertEmpleado`( /*Parametros de entrada*/
                                IN var_nombre VARCHAR(50),
                                IN var_apellidoPaterno VARCHAR(40),
                                IN var_apellidoMaterno VARCHAR(40),
                                IN var_fechaNacimiento VARCHAR(11),
                                IN var_calle VARCHAR(40),
                                IN var_numero VARCHAR(20),
                                IN var_colonia VARCHAR(40),
                                IN var_cp INT,
                                IN var_ciudad VARCHAR(40),
                                IN var_estado VARCHAR(40),
                                IN var_tel1 VARCHAR(20),
                                IN var_tel2 VARCHAR(20),
                                IN var_correo VARCHAR(50), 
                                IN var_contrasenia	VARCHAR(50),
                                /* Parametros de Retorno */
								OUT var_idPersona INT,
								OUT var_idEmpleado INT
                                )
BEGIN
			-- Insertamos los datos de la tabla persona:
            INSERT INTO persona (nombre, apellidoPaterno, 
                                 apellidoMaterno, fechaNacimiento,
								 calle, numero, colonia, cp, ciudad, 
                                 estado, tel1, tel2) 
            VALUES (var_nombre, 
                    var_apellidoPaterno, var_apellidoMaterno, 
				     var_fechaNacimiento,
                    var_calle, var_numero, var_colonia, var_cp, 
                    var_ciudad, var_estado, var_tel1, var_tel2);
                                    
			-- Recuperamos el ID generado para persona:
			SET var_idPersona = LAST_INSERT_ID();
            
            -- Insertamos los datos de la tabla empleado:
            INSERT INTO empleado ( 	idPersona, correo, contrasenia)
            VALUES (				var_idPersona, var_correo, var_contrasenia);
            
            -- Recuperamos el ID generado para empleado:
			SET var_idEmpleado = LAST_INSERT_ID();
            
    END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insertProductoAnimal` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `insertProductoAnimal`( 		/*Parametros de entrada*/
											IN var_nombre VARCHAR(50),
											IN var_existencias INT,
                                            IN var_precioCompra DOUBLE,
                                            IN var_foto LONGTEXT,
                                            IN var_raza VARCHAR(50),
                                            IN var_especie VARCHAR(50),
                                            IN var_fechaNacimiento VARCHAR(50),
											IN var_fechaLlegada VARCHAR(50),
											/* Parametros de Retorno */
											OUT var_idProducto INT,
                                            OUT var_idAnimal INT
										)
BEGIN
		-- Insertamos los datos de la tabla producto:
		INSERT INTO producto ( 	nombre, existencias, precioCompra,foto)
        VALUES( 				var_nombre, var_existencias, var_precioCompra, var_foto);
        
        -- Recuperamos el ID generado para producto:
			SET var_idProducto = LAST_INSERT_ID();
            
		-- Insertamos los datos de la tabla animal:
		INSERT INTO animal(	idProducto, raza, especie, fechaNacimiento, fechaLlegada)
        VALUES ( 			var_idProducto, var_raza, var_especie, var_fechaNacimiento, var_fechaLlegada);
        
        -- Recuperamos el ID generado para animal:
			SET var_idAnimal = LAST_INSERT_ID();
    END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insertProductoMercancia` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `insertProductoMercancia`( 	/*Parametros de entrada*/
											IN var_nombre VARCHAR(50),
											IN var_existencias INT,
                                            IN var_precioCompra DOUBLE,
                                            IN var_foto LONGTEXT,
                                            IN var_codigoBarras VARCHAR(30),
                                            IN var_descripcion VARCHAR(200),
                                            IN var_modelo VARCHAR(30),
                                            IN var_marca VARCHAR(30),
											/* Parametros de Retorno */
											OUT var_idProducto INT,
                                            OUT var_idMercancia INT
										)
BEGIN
		-- Insertamos los datos de la tabla producto:
		INSERT INTO producto ( 	nombre, existencias, precioCompra, foto)
        VALUES( 				var_nombre, var_existencias, var_precioCompra, var_foto);
        
        -- Recuperamos el ID generado para producto:
			SET var_idProducto = LAST_INSERT_ID();
            
		-- Insertamos los datos de la tabla mercancia:
		INSERT INTO mercancia ( idProducto, codigoBarras, descripcion, modelo, marca)
        VALUES ( 				var_idProducto, var_codigoBarras, var_descripcion, 
                                var_modelo, var_marca);
        
        -- Recuperamos el ID generado para mercancia:
			SET var_idMercancia = LAST_INSERT_ID();
    END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insertProveedor` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `insertProveedor`( /*Parametros de entrada */
                                IN var_nombre VARCHAR(50),
                                IN var_apellidoPaterno VARCHAR(40),
                                IN var_apellidoMaterno VARCHAR(40),
                                IN var_fechaNacimiento VARCHAR(40),
                                IN var_calle VARCHAR(40),
                                IN var_numero VARCHAR(20),
                                IN var_colonia VARCHAR(40),
                                IN var_cp INT,
                                IN var_ciudad VARCHAR(40),
                                IN var_estado VARCHAR(40),
                                IN var_tel1 VARCHAR(40),
                                IN var_tel2 VARCHAR(40),
                                IN var_rfc VARCHAR(30),
                                IN var_razonSocial VARCHAR(80),
                                /* Parametros de Retorno */
                                OUT var_idRepresentanteProv INT,
                                OUT var_idProveedor INT
                                )
BEGIN
        -- Insertamos los datos de la tabla persona:
            INSERT INTO persona(nombre, 
                                apellidoPaterno, apellidoMaterno,
                                fechaNacimiento,
                                calle, numero, colonia, cp, ciudad, 
                                estado, tel1, tel2) 
            VALUES (var_nombre, 
                    var_apellidoPaterno, var_apellidoMaterno,
                    var_fechaNacimiento,
                    var_calle, var_numero, var_colonia, 
                    var_cp, var_ciudad, var_estado, var_tel1, var_tel2);
                                    
            -- Recuperamos el ID generado para persona:
            SET var_idRepresentanteProv = LAST_INSERT_ID();
            
            -- Insertamos los datos de la tabla proveedor:
            INSERT INTO proveedor(  rfc, razonSocial, idRepresentante)
            VALUES (var_rfc, var_razonSocial, var_idRepresentanteProv);
            
            -- Recuperamos el ID generado para proveedor:
            SET var_idProveedor = LAST_INSERT_ID();
    END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `tokencliente` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `tokencliente`(in var_idCliente int, in var_token varchar (100))
BEGIN
update  cliente set token=var_token where idCliente=var_idCliente;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `tokenempleado` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `tokenempleado`(in var_idCEmpleado int, in var_token varchar (100))
BEGIN
update  empleado set token=var_token where idEmpleado=var_idCEmpleado;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `updateCliente` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `updateCliente`( /*Parametros de entrada*/
								IN var_idCliente INT,
                                IN var_nombre VARCHAR(50),
                                IN var_apellidoPaterno VARCHAR(40),
                                IN var_apellidoMaterno VARCHAR(40),
                                IN var_fechaNacimiento VARCHAR(11),
                                IN var_calle VARCHAR(40),
                                IN var_numero VARCHAR(20),
                                IN var_colonia VARCHAR(40),
                                IN var_cp INT,
                                IN var_ciudad VARCHAR(40),
                                IN var_estado VARCHAR(40),
                                IN var_tel1 VARCHAR(20),
                                IN var_tel2 VARCHAR(20),
                                IN var_correo VARCHAR(50), 
                                IN var_contrasenia	VARCHAR(50)			
                                )
BEGIN
			-- Actualizamos los datos de la tabla persona:
            UPDATE persona SET	
								nombre = var_nombre,
                                apellidoPaterno = var_apellidoPaterno,
                                apellidoMaterno = var_apellidoMaterno,
                                fechaNacimiento = var_fechaNacimiento,
								calle = var_calle,
                                numero = var_numero,
                                colonia = var_colonia,
                                cp = var_cp,
                                ciudad = var_ciudad,
                                estado = var_estado,
                                tel1 = var_tel1,
                                tel2 = var_tel2
                                
            WHERE idPersona = (SELECT idPersona FROM cliente WHERE idCliente = var_idCliente);
            
            
            -- Actualizamos los datos de la tabla cliente:
            UPDATE cliente SET 	
                                correo = var_correo,
                                contrasenia = var_contrasenia
			WHERE idCliente = var_idCliente;
            
    END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `updateEmpleado` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `updateEmpleado`( /*Parametros de entrada*/
								IN var_idEmpleado INT,
                                IN var_nombre VARCHAR(50),
                                IN var_apellidoPaterno VARCHAR(40),
                                IN var_apellidoMaterno VARCHAR(40),
                                IN var_fechaNacimiento VARCHAR(11),
                                IN var_calle VARCHAR(40),
                                IN var_numero VARCHAR(20),
                                IN var_colonia VARCHAR(40),
                                IN var_cp INT,
                                IN var_ciudad VARCHAR(40),
                                IN var_estado VARCHAR(40),
                                IN var_tel1 VARCHAR(20),
                                IN var_tel2 VARCHAR(20),
                                IN var_correo VARCHAR(50), 
                                IN var_contrasenia	VARCHAR(50)
                                )
BEGIN
			-- Actualizamos los datos de la tabla persona:
            UPDATE persona SET
								nombre = var_nombre, 
                                apellidoPaterno = var_apellidoPaterno,
                                apellidoMaterno = var_apellidoMaterno,
                                fechaNacimiento = var_fechaNacimiento,
                                calle = var_calle,
                                numero = var_numero,
                                colonia = var_colonia, 
                                cp = var_cp, 
                                ciudad = var_ciudad, 
                                estado = var_estado, 
                                tel1 = var_tel1, 
                                tel2 = var_tel2
			WHERE idPersona = (SELECT idPersona FROM empleado where idEmpleado = var_idEmpleado);
            
            -- Actualizamos los datos de la tabla empleado:
            UPDATE empleado SET
								correo = var_correo,
                                contrasenia = var_contrasenia
			WHERE idEmpleado = var_idEmpleado;
    END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `updateProductoAnimal` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `updateProductoAnimal`( 	/*Parametros de entrada*/
											IN var_idProducto INT,
                                            IN var_idAnimal INT,
											IN var_nombre VARCHAR(50),
											IN var_existencias INT,
                                            IN var_precioCompra DOUBLE,
                                            IN var_raza VARCHAR(50),
                                            IN var_especie VARCHAR(50),
                                            IN var_fechaNacimiento VARCHAR(50),
											IN var_fechaLlegada VARCHAR(50),	
                                            IN var_foto LONGTEXT
										)
BEGIN
		-- Actualizamos los datos de la tabla producto:
		UPDATE producto SET 
							nombre = var_nombre, 
                            existencias = var_existencias,
                            precioCompra =var_precioCompra,
                            foto = var_foto
		WHERE idProducto = var_idProducto;
            
		-- Actualizamos los datos de la tabla animal:
		UPDATE animal SET 
							raza = var_raza, 
                            especie = var_especie, 
                            fechaNacimiento = var_fechaNacimiento,
                            fechaLlegada = var_fechaLlegada
        WHERE idAnimal = var_idAnimal;
   
    END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `updateProductoMercancia` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `updateProductoMercancia`( 	/*Parametros de entrada*/
											IN var_idProducto INT,
                                            IN var_idMercancia INT,
											IN var_nombre VARCHAR(50),
											IN var_existencias INT,
                                            IN var_precioCompra DOUBLE,
                                            IN var_codigoBarras VARCHAR(30),
                                            IN var_descripcion VARCHAR(200),
                                            IN var_modelo VARCHAR(30),
                                            IN var_marca VARCHAR(30),
                                            IN var_foto LONGTEXT											
										)
BEGIN
		-- Actualizamos los datos de la tabla producto:
		UPDATE producto SET 
							nombre = var_nombre, 
                            existencias = var_existencias,
                            precioCompra =var_precioCompra,
                            foto = var_foto
		WHERE idProducto = var_idProducto;
            
		-- Actualizamos los datos de la tabla mercancia:
		UPDATE mercancia SET 
							codigoBarras = var_codigoBarras, 
                            descripcion = var_descripcion, 
                            modelo = var_modelo,
                            marca = var_marca 
        WHERE idMercancia = var_idMercancia;
    END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `updateProveedor` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `updateProveedor`( /*Parametros de entrada */
                                IN var_idProveedor INT,
                                IN var_nombre VARCHAR(50),
                                IN var_apellidoPaterno VARCHAR(40),
                                IN var_apellidoMaterno VARCHAR(40),
                                IN var_fechaNacimiento VARCHAR(40),
                                IN var_calle VARCHAR(40),
                                IN var_numero VARCHAR(20),
                                IN var_colonia VARCHAR(40),
                                IN var_cp INT,
                                IN var_ciudad VARCHAR(40),
                                IN var_estado VARCHAR(40),
                                IN var_tel1 VARCHAR(20),
                                IN var_tel2 VARCHAR(20),
                                IN var_rfc VARCHAR(30),
                                IN var_razonSocial VARCHAR(80)                              
                                )
BEGIN
        -- Modificamos los datos de la tabla persona quien es el Representante:
            UPDATE persona SET
                                nombre = var_nombre,
                                apellidoPaterno = var_apellidoPaterno,
                                apellidoMaterno = var_apellidoMaterno,
                                fechaNacimiento = var_fechaNacimiento,
                                calle = var_calle,
                                numero = var_numero,
                                colonia = var_colonia,
                                cp = var_cp,
                                ciudad = var_ciudad, 
                                estado = var_estado,
                                tel1 = var_tel1,
                                tel2 = var_tel2
            WHERE idPersona = (SELECT idRepresentante FROM proveedor WHERE idProveedor = var_idProveedor);
                      
            -- Modificamos los datos de la tabla proveedor:
            UPDATE proveedor SET    
                                rfc = var_rfc, 
                                razonSocial = var_razonSocial
            WHERE idProveedor = var_idProveedor;
    END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-02-11 14:53:42

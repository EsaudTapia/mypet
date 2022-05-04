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
-- Temporary view structure for view `personas_cliente_empleado`
--

DROP TABLE IF EXISTS `personas_cliente_empleado`;
/*!50001 DROP VIEW IF EXISTS `personas_cliente_empleado`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `personas_cliente_empleado` AS SELECT 
 1 AS `idPersona`,
 1 AS `nombre`,
 1 AS `apellidoPaterno`,
 1 AS `apellidoMaterno`,
 1 AS `fechaNacimiento`,
 1 AS `calle`,
 1 AS `numero`,
 1 AS `colonia`,
 1 AS `cp`,
 1 AS `ciudad`,
 1 AS `estado`,
 1 AS `tel1`,
 1 AS `tel2`,
 1 AS `estatus`,
 1 AS `idEmpleado`,
 1 AS `correo_Empleado`,
 1 AS `contrasenia_Empleado`,
 1 AS `token_Empleado`,
 1 AS `idCliente`,
 1 AS `correo_Cliente`,
 1 AS `contrasenia_Cliente`,
 1 AS `token_Cliente`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `productosalcliente`
--

DROP TABLE IF EXISTS `productosalcliente`;
/*!50001 DROP VIEW IF EXISTS `productosalcliente`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `productosalcliente` AS SELECT 
 1 AS `idProducto`,
 1 AS `nombre`,
 1 AS `existencias`,
 1 AS `precioCompra`,
 1 AS `foto`,
 1 AS `estatus`,
 1 AS `idMercancia`,
 1 AS `codigoBarras`,
 1 AS `descripcion`,
 1 AS `modelo`,
 1 AS `marca`,
 1 AS `idAnimal`,
 1 AS `raza`,
 1 AS `especie`,
 1 AS `fechaNacimiento`,
 1 AS `fechaLlegada`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `v_animales`
--

DROP TABLE IF EXISTS `v_animales`;
/*!50001 DROP VIEW IF EXISTS `v_animales`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `v_animales` AS SELECT 
 1 AS `idProducto`,
 1 AS `nombre`,
 1 AS `existencias`,
 1 AS `precioCompra`,
 1 AS `foto`,
 1 AS `estatus`,
 1 AS `precioVenta`,
 1 AS `idAnimal`,
 1 AS `raza`,
 1 AS `especie`,
 1 AS `fechaNacimiento`,
 1 AS `fechaLlegada`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `v_clientes`
--

DROP TABLE IF EXISTS `v_clientes`;
/*!50001 DROP VIEW IF EXISTS `v_clientes`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `v_clientes` AS SELECT 
 1 AS `idPersona`,
 1 AS `nombre`,
 1 AS `apellidoPaterno`,
 1 AS `apellidoMaterno`,
 1 AS `fechaNacimiento`,
 1 AS `calle`,
 1 AS `numero`,
 1 AS `colonia`,
 1 AS `cp`,
 1 AS `ciudad`,
 1 AS `estado`,
 1 AS `tel1`,
 1 AS `tel2`,
 1 AS `estatus`,
 1 AS `idCliente`,
 1 AS `correo`,
 1 AS `contrasenia`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `v_empleados`
--

DROP TABLE IF EXISTS `v_empleados`;
/*!50001 DROP VIEW IF EXISTS `v_empleados`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `v_empleados` AS SELECT 
 1 AS `idPersona`,
 1 AS `nombre`,
 1 AS `apellidoPaterno`,
 1 AS `apellidoMaterno`,
 1 AS `fechaNacimiento`,
 1 AS `calle`,
 1 AS `numero`,
 1 AS `colonia`,
 1 AS `cp`,
 1 AS `ciudad`,
 1 AS `estado`,
 1 AS `tel1`,
 1 AS `tel2`,
 1 AS `estatus`,
 1 AS `idEmpleado`,
 1 AS `correo`,
 1 AS `contrasenia`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `v_mercancias`
--

DROP TABLE IF EXISTS `v_mercancias`;
/*!50001 DROP VIEW IF EXISTS `v_mercancias`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `v_mercancias` AS SELECT 
 1 AS `idProducto`,
 1 AS `nombre`,
 1 AS `existencias`,
 1 AS `precioCompra`,
 1 AS `foto`,
 1 AS `estatus`,
 1 AS `precioVenta`,
 1 AS `idMercancia`,
 1 AS `codigoBarras`,
 1 AS `descripcion`,
 1 AS `modelo`,
 1 AS `marca`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `v_proveedores`
--

DROP TABLE IF EXISTS `v_proveedores`;
/*!50001 DROP VIEW IF EXISTS `v_proveedores`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `v_proveedores` AS SELECT 
 1 AS `idPersona`,
 1 AS `idProveedor`,
 1 AS `nombre`,
 1 AS `apellidoPaterno`,
 1 AS `apellidoMaterno`,
 1 AS `fechaNacimiento`,
 1 AS `calle`,
 1 AS `numero`,
 1 AS `colonia`,
 1 AS `cp`,
 1 AS `ciudad`,
 1 AS `estado`,
 1 AS `tel1`,
 1 AS `tel2`,
 1 AS `RFC`,
 1 AS `razonSocial`,
 1 AS `estatus`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `personas_cliente_empleado`
--

/*!50001 DROP VIEW IF EXISTS `personas_cliente_empleado`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `personas_cliente_empleado` AS select `p`.`idPersona` AS `idPersona`,`p`.`nombre` AS `nombre`,`p`.`apellidoPaterno` AS `apellidoPaterno`,`p`.`apellidoMaterno` AS `apellidoMaterno`,`p`.`fechaNacimiento` AS `fechaNacimiento`,`p`.`calle` AS `calle`,`p`.`numero` AS `numero`,`p`.`colonia` AS `colonia`,`p`.`cp` AS `cp`,`p`.`ciudad` AS `ciudad`,`p`.`estado` AS `estado`,`p`.`tel1` AS `tel1`,`p`.`tel2` AS `tel2`,`p`.`estatus` AS `estatus`,`e`.`idEmpleado` AS `idEmpleado`,`e`.`correo` AS `correo_Empleado`,`e`.`contrasenia` AS `contrasenia_Empleado`,`e`.`token` AS `token_Empleado`,`c`.`idCliente` AS `idCliente`,`c`.`correo` AS `correo_Cliente`,`c`.`contrasenia` AS `contrasenia_Cliente`,`c`.`token` AS `token_Cliente` from ((`persona` `p` left join `empleado` `e` on((`e`.`idPersona` = `p`.`idPersona`))) left join `cliente` `c` on((`c`.`idPersona` = `p`.`idPersona`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `productosalcliente`
--

/*!50001 DROP VIEW IF EXISTS `productosalcliente`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `productosalcliente` AS select `p`.`idProducto` AS `idProducto`,`p`.`nombre` AS `nombre`,`p`.`existencias` AS `existencias`,`p`.`precioCompra` AS `precioCompra`,`p`.`foto` AS `foto`,`p`.`estatus` AS `estatus`,`m`.`idMercancia` AS `idMercancia`,`m`.`codigoBarras` AS `codigoBarras`,`m`.`descripcion` AS `descripcion`,`m`.`modelo` AS `modelo`,`m`.`marca` AS `marca`,`a`.`idAnimal` AS `idAnimal`,`a`.`raza` AS `raza`,`a`.`especie` AS `especie`,`a`.`fechaNacimiento` AS `fechaNacimiento`,`a`.`fechaLlegada` AS `fechaLlegada` from ((`producto` `p` left join `mercancia` `m` on((`m`.`idProducto` = `p`.`idProducto`))) left join `animal` `a` on((`a`.`idProducto` = `p`.`idProducto`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_animales`
--

/*!50001 DROP VIEW IF EXISTS `v_animales`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_animales` AS select `p`.`idProducto` AS `idProducto`,`p`.`nombre` AS `nombre`,`p`.`existencias` AS `existencias`,`p`.`precioCompra` AS `precioCompra`,`p`.`foto` AS `foto`,`p`.`estatus` AS `estatus`,(`p`.`precioCompra` * 2) AS `precioVenta`,`a`.`idAnimal` AS `idAnimal`,`a`.`raza` AS `raza`,`a`.`especie` AS `especie`,`a`.`fechaNacimiento` AS `fechaNacimiento`,`a`.`fechaLlegada` AS `fechaLlegada` from (`animal` `a` join `producto` `p` on((`a`.`idProducto` = `p`.`idProducto`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_clientes`
--

/*!50001 DROP VIEW IF EXISTS `v_clientes`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_clientes` AS select `p`.`idPersona` AS `idPersona`,`p`.`nombre` AS `nombre`,`p`.`apellidoPaterno` AS `apellidoPaterno`,`p`.`apellidoMaterno` AS `apellidoMaterno`,`p`.`fechaNacimiento` AS `fechaNacimiento`,`p`.`calle` AS `calle`,`p`.`numero` AS `numero`,`p`.`colonia` AS `colonia`,`p`.`cp` AS `cp`,`p`.`ciudad` AS `ciudad`,`p`.`estado` AS `estado`,`p`.`tel1` AS `tel1`,`p`.`tel2` AS `tel2`,`p`.`estatus` AS `estatus`,`c`.`idCliente` AS `idCliente`,`c`.`correo` AS `correo`,`c`.`contrasenia` AS `contrasenia` from (`cliente` `c` join `persona` `p` on((`c`.`idPersona` = `p`.`idPersona`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_empleados`
--

/*!50001 DROP VIEW IF EXISTS `v_empleados`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_empleados` AS select `p`.`idPersona` AS `idPersona`,`p`.`nombre` AS `nombre`,`p`.`apellidoPaterno` AS `apellidoPaterno`,`p`.`apellidoMaterno` AS `apellidoMaterno`,`p`.`fechaNacimiento` AS `fechaNacimiento`,`p`.`calle` AS `calle`,`p`.`numero` AS `numero`,`p`.`colonia` AS `colonia`,`p`.`cp` AS `cp`,`p`.`ciudad` AS `ciudad`,`p`.`estado` AS `estado`,`p`.`tel1` AS `tel1`,`p`.`tel2` AS `tel2`,`p`.`estatus` AS `estatus`,`c`.`idEmpleado` AS `idEmpleado`,`c`.`correo` AS `correo`,`c`.`contrasenia` AS `contrasenia` from (`empleado` `c` join `persona` `p` on((`c`.`idPersona` = `p`.`idPersona`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_mercancias`
--

/*!50001 DROP VIEW IF EXISTS `v_mercancias`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_mercancias` AS select `p`.`idProducto` AS `idProducto`,`p`.`nombre` AS `nombre`,`p`.`existencias` AS `existencias`,`p`.`precioCompra` AS `precioCompra`,`p`.`foto` AS `foto`,`p`.`estatus` AS `estatus`,(`p`.`precioCompra` * 2) AS `precioVenta`,`m`.`idMercancia` AS `idMercancia`,`m`.`codigoBarras` AS `codigoBarras`,`m`.`descripcion` AS `descripcion`,`m`.`modelo` AS `modelo`,`m`.`marca` AS `marca` from (`mercancia` `m` join `producto` `p` on((`m`.`idProducto` = `p`.`idProducto`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_proveedores`
--

/*!50001 DROP VIEW IF EXISTS `v_proveedores`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_proveedores` AS select `p`.`idPersona` AS `idPersona`,`prov`.`idProveedor` AS `idProveedor`,`p`.`nombre` AS `nombre`,`p`.`apellidoPaterno` AS `apellidoPaterno`,`p`.`apellidoMaterno` AS `apellidoMaterno`,`p`.`fechaNacimiento` AS `fechaNacimiento`,`p`.`calle` AS `calle`,`p`.`numero` AS `numero`,`p`.`colonia` AS `colonia`,`p`.`cp` AS `cp`,`p`.`ciudad` AS `ciudad`,`p`.`estado` AS `estado`,`p`.`tel1` AS `tel1`,`p`.`tel2` AS `tel2`,`prov`.`rfc` AS `RFC`,`prov`.`razonSocial` AS `razonSocial`,`p`.`estatus` AS `estatus` from (`proveedor` `prov` join `persona` `p` on((`prov`.`idRepresentante` = `p`.`idPersona`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-02-11 14:36:16

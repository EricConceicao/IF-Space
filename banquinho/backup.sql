-- MariaDB dump 10.19  Distrib 10.4.22-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: ifspace
-- ------------------------------------------------------
-- Server version	10.4.22-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comentarios`
--

DROP TABLE IF EXISTS `comentarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comentarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuariosId` int(11) NOT NULL,
  `postagensId` int(11) NOT NULL,
  `comentario` text NOT NULL,
  `data` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `usuariosId` (`usuariosId`),
  KEY `postagensId` (`postagensId`),
  CONSTRAINT `comentarios_ibfk_1` FOREIGN KEY (`usuariosId`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `comentarios_ibfk_2` FOREIGN KEY (`postagensId`) REFERENCES `postagens` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comentarios`
--

LOCK TABLES `comentarios` WRITE;
/*!40000 ALTER TABLE `comentarios` DISABLE KEYS */;
/*!40000 ALTER TABLE `comentarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `curtidas`
--

DROP TABLE IF EXISTS `curtidas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `curtidas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuariosId` int(11) NOT NULL,
  `postagensId` int(11) NOT NULL,
  `data` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `usuariosId` (`usuariosId`),
  KEY `postagensId` (`postagensId`),
  CONSTRAINT `curtidas_ibfk_1` FOREIGN KEY (`usuariosId`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `curtidas_ibfk_2` FOREIGN KEY (`postagensId`) REFERENCES `postagens` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `curtidas`
--

LOCK TABLES `curtidas` WRITE;
/*!40000 ALTER TABLE `curtidas` DISABLE KEYS */;
/*!40000 ALTER TABLE `curtidas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `postagens`
--

DROP TABLE IF EXISTS `postagens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `postagens` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuariosId` int(11) NOT NULL,
  `autor` varchar(50) NOT NULL,
  `titulo` varchar(50) NOT NULL,
  `texto` text DEFAULT NULL,
  `dataCriacao` timestamp NOT NULL DEFAULT current_timestamp(),
  `anexos` varchar(255) DEFAULT NULL,
  `likes` int(11) DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `usuariosId` (`usuariosId`),
  CONSTRAINT `postagens_ibfk_1` FOREIGN KEY (`usuariosId`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `postagens`
--

LOCK TABLES `postagens` WRITE;
/*!40000 ALTER TABLE `postagens` DISABLE KEYS */;
INSERT INTO `postagens` VALUES (1,1,'Bob Esponja','Meu perfil está prontoooo!','Só falta terminar eu terminar meu hambúrguer','2023-06-26 18:37:43','',0),(2,2,'Larry Alfinete','Eu sou o dão Sujão!','Aceite, Bob Esponja.','2023-06-26 18:51:33','',0),(3,4,'Gary','Miau','MiauMiau Miau Miau, Miau MiauMiau Miaaaaaaaaaaaau.','2023-06-26 19:35:28','',0);
/*!40000 ALTER TABLE `postagens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seguir`
--

DROP TABLE IF EXISTS `seguir`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `seguir` (
  `seguidorId` int(11) NOT NULL,
  `seguidoId` int(11) NOT NULL,
  `data` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` enum('seguindo','parou de seguir') DEFAULT 'seguindo',
  KEY `seguidorId` (`seguidorId`),
  KEY `seguidoId` (`seguidoId`),
  CONSTRAINT `seguir_ibfk_1` FOREIGN KEY (`seguidorId`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `seguir_ibfk_2` FOREIGN KEY (`seguidoId`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seguir`
--

LOCK TABLES `seguir` WRITE;
/*!40000 ALTER TABLE `seguir` DISABLE KEYS */;
INSERT INTO `seguir` VALUES (2,1,'2023-06-26 18:42:59','seguindo'),(3,2,'2023-06-26 19:32:30','seguindo'),(3,1,'2023-06-26 19:32:33','seguindo'),(4,1,'2023-06-26 19:34:55','seguindo');
/*!40000 ALTER TABLE `seguir` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `senha` varchar(64) NOT NULL,
  `pNome` varchar(25) NOT NULL,
  `sNome` varchar(25) NOT NULL,
  `nick` varchar(50) DEFAULT NULL,
  `foto` varchar(255) DEFAULT 'padrao.png',
  `banner` varchar(255) DEFAULT 'banner.jpg',
  `dataNasc` date NOT NULL,
  `curso` varchar(100) DEFAULT NULL,
  `hobby` varchar(100) DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `telefone` varchar(14) DEFAULT NULL,
  `chave` varchar(64) NOT NULL,
  `dataCriacao` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `nick` (`nick`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'bob@gmail.com','$2b$10$V3uiL6DlfPH2YkeiiD0ox.5gFasJ.iOJnwA92YWS7wh.X2maWN./q','Bob','Esponja Calça Quadrada','Bob Esponja','uploads\\fotos-de-perfil\\1\\2023-06-26-15-23-bob-esponja.jpeg','banner.jpg','1999-05-01','Aulas de pilotagem da Sra.Puff','Caçar água viva, lutar caratê, soprar bolhas de sabão','Estou pronto!',NULL,'3b94f5576eb4ee7f3a661547c8d137874258c950f42f408280f9dc3ca66e507f','2023-06-26 18:08:54'),(2,'estrela@gmail.com','$2b$10$r.GLeWdz7coxT3jwfiFCDe/F49kzzUE46RT5jn2mPBM6vWwPxIBUu','Patrick','Estrela','Larry Alfinete','uploads\\fotos-de-perfil\\2\\2023-06-26-15-40-patrick.png','banner.jpg','1999-05-01','Absolutamente nada','Comer sorvete ','Hmmmmmmmmmmmmmmmmmmmm...',NULL,'3e52cc5ee872953afd4d1a52ae07481bc0880aec1985ecd033606efd21bda232','2023-06-26 18:10:05'),(3,'lixo@gmail.com','$2b$10$Ad1eXZygkGLHFr3COGGnK.jHjqnvDZPngsazOWHDT2Wf67DXqDBf6','Garrafa','Plástica','Garrafão imortal','uploads\\fotos-de-perfil\\3\\2023-06-26-16-12-plastico.jpg','banner.jpg','1862-01-01',NULL,'Boiar na água','Sujo tudo mesmo.',NULL,'80f868eecef2185a601cfb435f47eb53a05c9b27dc5148786e29d9dd03ea4bd4','2023-06-26 18:19:45'),(4,'miau@gmail.com','$2b$10$qVl1WSzxoaA6TveIWa9Baua3KS0T66FfEhlUs2sinF7PPUquDdqQW','Garold','Wilson.Jr','Gary','uploads\\fotos-de-perfil\\4\\2023-06-26-16-33-gary.png','banner.jpg','1999-05-01',NULL,'Literatura, música','Miau, miau miau miau. Miau...',NULL,'26dcb7e6391dfcaab02cdae8b0df81ee08d55546d5c2b07044650412cdede4bb','2023-06-26 18:20:48');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-26 16:57:53

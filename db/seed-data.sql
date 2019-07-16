CREATE DATABASE  IF NOT EXISTS `personality_test` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `personality_test`;
-- MySQL dump 10.13  Distrib 8.0.16, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: personality_test
-- ------------------------------------------------------
-- Server version	8.0.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `question`
--

DROP TABLE IF EXISTS `question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `question` (
  `question_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `num` tinyint(3) unsigned NOT NULL,
  `text` text NOT NULL,
  `dimension` char(2) NOT NULL,
  `direction` binary(1) NOT NULL,
  `meaning` char(1) NOT NULL,
  PRIMARY KEY (`question_id`),
  UNIQUE KEY `num_UNIQUE` (`num`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question`
--

LOCK TABLES `question` WRITE;
/*!40000 ALTER TABLE `question` DISABLE KEYS */;
INSERT INTO `question` VALUES (1,1,'You find it takes effort to introduce yourself to other people.','EI',_binary '1','I'),(2,2,'You consider yourself more practical than creative.','SN',_binary '0','S'),(3,3,'Winning a debate matters less to you than making sure no one gets upset.','TF',_binary '1','F'),(4,4,'You get energized going to social events that involve many interactions.','EI',_binary '0','E'),(5,5,'You often spend time exploring unrealistic and impractical yet intriguing ideas.','SN',_binary '1','N'),(6,6,'Deadlines seem to you to be of relative rather than absolute importance.','JP',_binary '1','P'),(7,7,'Logic is usually more important than heart when it comes to making important decisions.','TF',_binary '0','T'),(8,8,'Your home and work environments are quite tidy.','JP',_binary '0','J'),(9,9,'You do not mind being at the center of attention.','EI',_binary '0','E'),(10,10,'Keeping your options open is more important than having a to-do list.','JP',_binary '1','P');
/*!40000 ALTER TABLE `question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `question_response`
--

DROP TABLE IF EXISTS `question_response`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `question_response` (
  `question_response_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `response_id` int(11) unsigned NOT NULL,
  `question_id` int(11) unsigned NOT NULL,
  `value` tinyint(1) unsigned NOT NULL,
  PRIMARY KEY (`question_response_id`),
  KEY `fk_response_id_idx` (`response_id`),
  KEY `fk_question_id_idx` (`question_id`),
  CONSTRAINT `fk_question_id` FOREIGN KEY (`question_id`) REFERENCES `question` (`question_id`),
  CONSTRAINT `fk_response_id` FOREIGN KEY (`response_id`) REFERENCES `response` (`response_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question_response`
--

LOCK TABLES `question_response` WRITE;
/*!40000 ALTER TABLE `question_response` DISABLE KEYS */;
/*!40000 ALTER TABLE `question_response` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `response`
--

DROP TABLE IF EXISTS `response`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `response` (
  `response_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  PRIMARY KEY (`response_id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `response`
--

LOCK TABLES `response` WRITE;
/*!40000 ALTER TABLE `response` DISABLE KEYS */;
/*!40000 ALTER TABLE `response` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-07-14 13:29:11

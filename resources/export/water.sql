-- phpMyAdmin SQL Dump
-- version 4.1.12
-- http://www.phpmyadmin.net
--
-- Host: localhost:8889
-- Generation Time: Dec 10, 2014 at 02:57 AM
-- Server version: 5.5.34
-- PHP Version: 5.5.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `water`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `uid` int(11) unsigned NOT NULL,
  `pid` int(10) unsigned NOT NULL,
  `item` int(11) DEFAULT NULL,
  PRIMARY KEY (`uid`,`pid`),
  KEY `pid` (`pid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `pid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `tid` int(11) NOT NULL,
  `brand` varchar(20) NOT NULL,
  `price` float NOT NULL,
  `src` varchar(20) NOT NULL,
  PRIMARY KEY (`pid`),
  KEY `tid` (`tid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=23 ;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`pid`, `tid`, `brand`, `price`, `src`) VALUES
(1, 1, 'Perrier', 54, 'perrier.jpeg'),
(2, 1, 'Volvic', 45, 'volvic.jpeg'),
(3, 1, 'Borjomi', 68, 'borjomi.jpeg'),
(4, 1, 'Evian', 62, 'evian.jpeg'),
(5, 1, 'Mattoni', 45, 'mattoni.jpeg'),
(6, 2, 'Aquazeal Blue', 62, 'aquazealblue.jpeg'),
(7, 2, 'Fiji', 88, 'fiji.jpeg'),
(8, 2, 'Voss', 120, 'voss.jpeg'),
(9, 2, 'Iskilde', 86, 'iskilde.jpeg'),
(10, 3, 'Viva', 18, 'viva.jpeg'),
(11, 3, 'Essentia', 86, 'essentia.jpeg'),
(12, 3, 'Wilkins', 21, 'wilkins.jpeg'),
(13, 3, 'Tru', 88, 'tru.jpeg'),
(14, 3, 'Summit', 18, 'summit.jpeg'),
(15, 4, 'Malvern', 63, 'malvern.jpeg'),
(16, 4, 'Ozarka', 90, 'ozarka.jpeg'),
(17, 4, 'Panama Blue', 67, 'panamablue.jpeg'),
(18, 4, 'Zephyrhills', 87, 'zephyrhills.jpeg'),
(19, 5, 'Cadia', 53, 'cadia.jpeg'),
(20, 5, 'Canadian Gold', 72, 'canadiangold.jpeg'),
(21, 5, 'Badoit', 64, 'badoit.jpeg'),
(22, 5, 'San Pellegrino', 54, 'sanpellegrino.jpeg');

-- --------------------------------------------------------

--
-- Table structure for table `type`
--

CREATE TABLE `type` (
  `tid` int(11) NOT NULL,
  `name` varchar(20) DEFAULT NULL,
  `description` text,
  PRIMARY KEY (`tid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `type`
--

INSERT INTO `type` (`tid`, `name`, `description`) VALUES
(1, 'Mineral Water', 'Mineral Water is natural water containing not less than 250 parts per million total dissolved solids. Mineral water is distinguished from other types of bottled water by its constant level and relative proportions of mineral and trace elements at the point of emergence from the source. No minerals can be added to this product.'),
(2, 'Artesian Water', 'Artesian Water/Artesian Well Water is water from a well that taps a confined aquifer (a water-bearing underground layer of rock or sand) in which the water level stands at some height above the top of the aquifer.'),
(3, 'Purified Water', 'Purified Water is water that has been produced by distillation, deionization, reverse osmosis, or other suitable processes while meeting the definition of purified water in the United States Pharmacopoeia. Other suitable product names for bottled water treated by one of the above processes include "distilled water" if it is produced by distillation, "deionized water" if it is produced by deionization, or "reverse osmosis water" if the process used is reverse osmosis.'),
(4, 'Spring Water', 'Spring Water is water derived from an underground formation from which water flows naturally to the surface of the earth. Spring water must be collected only at the spring or through a borehole tapping the underground formation feeding the spring. Spring water collected with the use of an external force must be from the same underground stratum as the spring, must have all the physical properties before treatment, and must be of the same composition and quality as the water that flows naturally to the surface of the earth.'),
(5, 'Sparkling Water', 'Sparkling Bottled Water is water that, after treatment and possible replacement with carbon dioxide, contains the same amount of carbon dioxide that it had as it emerged from the source. Sparkling bottled waters may be labeled as "sparkling drinking water," "sparkling mineral water," "sparkling spring water," etc.');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `uid` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(32) NOT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`uid`, `first_name`, `last_name`, `email`, `password`) VALUES
(1, 'Brandi', 'Quijano', 'bm.quijano7@gmail.com', '18dabc7a78d0951752b7ae5fea3e7a48');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`pid`) REFERENCES `product` (`pid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`tid`) REFERENCES `type` (`tid`) ON DELETE CASCADE ON UPDATE CASCADE;

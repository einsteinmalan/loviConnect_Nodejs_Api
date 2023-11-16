SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

CREATE DATABASE IF NOT EXISTS `lovichat` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `lovichat`;

CREATE TABLE IF NOT EXISTS `blocks` (
  `id_block` CHAR(36) NOT NULL PRIMARY KEY ,
  `id_user` int(11) NOT NULL,
  `id_sender` int(11) NOT NULL,
  `block_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `chatrooms` (
  `id_chatroom` int(11) NOT NULL PRIMARY KEY,
  `id_user_1` CHAR(36) NOT NULL ,
  `id_user_2` CHAR(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `fakes` (
  `id_fake` CHAR(36) NOT NULL PRIMARY KEY ,
  `id_fake` CHAR(36) NOT NULL,
  `id_user` CHAR(36) NOT NULL,
  `id_sender` CHAR(36) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `interests` (
  `id` CHAR(36) NOT NULL PRIMARY KEY ,
  `id_interest` CHAR(36) NOT NULL ,
  `interest` varchar(50) NOT NULL,
  KEY `id_interest` (`id_interest`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

-- RATHER: (What user don't like the most)
INSERT INTO `interests` (`id_interest`, `interest`) VALUES
(1, 'Dishonesty'),
(2, 'Poor communication'),
(3, 'Constant criticism'),
(4, 'Jealousy'),
(5, 'Ignoring boundaries'),
(6, 'Unwillingness to compromise'),
(7, 'Being manipulative'),
(8, 'Bad personal hygiene'),
(9, 'Financial irresponsibility'),
(10, 'Excessive dependency'),
(11, 'Anger issue'),
(12, 'Irresponsibility'),
(13, 'Disrespecting'),
(14, 'Being abusive');
(15, 'Unwillingness to try new things');
(16, 'Refusal to compromise');
(17, 'Self-centeredness');
(18, 'Nagging');
(19, 'Ignoring emotional needs');
(20, 'Always seeking validation');
(21, 'Being glued to devices');
(22, 'Belittling people'),
(23, 'Forgetting important dates'),
(24, 'Childish attitude'),
(25, 'selfishness'),
(26, 'Telling lies'),
(27, 'Being deceitful'),
(28, 'Stinginess'),
(29, 'Cheating'),
(30,'Immaturity'),
(31, 'Unforgiveness'),
(32, 'Being vengeful'),
(33, 'Illiteracy'),
(34, 'Not good in bed'),
(35, 'High libido'),
(36, 'Low libido'), 
(37, 'High body count'),
(38, 'Poligamy/poliandry'),
(39, 'Oral sex'),
(40, 'Anal sex'),
(41, 'Lack of love for pets'),


CREATE TABLE IF NOT EXISTS `likes` (
  `id_likes` CHAR(36) NOT NULL PRIMARY KEY ,
  `id_user` CHAR(36) NOT NULL,
  `id_sender` CHAR(36) NOT NULL,
  `like_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `messages` (
  `id_message` CHAR(36) NOT NULL PRIMARY KEY ,
  `id_chatroom` CHAR(36) NOT NULL,
  `id_sender` CHAR(36) NOT NULL PRIMARY KEY ,
  `id_user` CHAR(36) NOT NULL,
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `message` varchar(1000) NOT NULL,
  `readed` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `notifications` (
  `id_notif` CHAR(36) NOT NULL PRIMARY KEY ,
  `id_user` CHAR(36) DEFAULT NULL,
  `id_sender` CHAR(36) NOT NULL,
  `notification` varchar(25) NOT NULL,
    `type` ENUM("Personal", "System") NOT NULL DEFAULT "Personal",
  `notif_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `readed` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `pics` (
  `id_pic` CHAR(36) NOT NULL PRIMARY KEY ,
  `id_user` CHAR(36) NOT NULL,
  `path` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `profiles` (
  `id_profile` CHAR(36) NOT NULL PRIMARY KEY ,
  `id_user` CHAR(36) NOT NULL,
  `gender` varchar(25) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `sex_prefer` varchar(25) DEFAULT 'bi',
  `biography` varchar(10000) DEFAULT NULL,
  `location_lat` float NOT NULL,
  `location_lon` float NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `fame` int(11) NOT NULL DEFAULT '0',
  `city` varchar(255) DEFAULT 'Paris'
) ENGINE=InnoDB AUTO_INCREMENT=1797 DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `users` (
  `id_user` CHAR(36) NOT NULL PRIMARY KEY ,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `active` tinyint(1) DEFAULT '0',
  `active_link` varchar(255) DEFAULT NULL,
  `ini_pwd_link` varchar(255) DEFAULT NULL,
  `online` tinyint(1) NOT NULL DEFAULT '0',
  `last_login` datetime DEFAULT NULL,
  `creation_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `active_link` (`active_link`),
  UNIQUE KEY `ini_pwd_link` (`ini_pwd_link`)
) ENGINE=InnoDB AUTO_INCREMENT=1798 DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `users_interests` (
  `id` CHAR(36) NOT NULL PRIMARY KEY ,
  `id_user` CHAR(36) NOT NULL,
  `id_interest` CHAR(36) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2869 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `random_calls` (
  `id` CHAR(36) NOT NULL PRIMARY KEY ,
  `user_id` CHAR(36) NOT NULL,
  `called_id` CHAR(36) NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
) ENGINE=InnoDB AUTO_INCREMENT=2869 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `invite_datings` (
  `id` CHAR(36) NOT NULL PRIMARY KEY ,
  `user_id` CHAR(36) NOT NULL,
  `invited_id` CHAR(36) NOT NULL,
  `is_active` INT(1) NOT NULL DEFAULT 0;
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
) ENGINE=InnoDB AUTO_INCREMENT=2869 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `random_call_quotas` (
  `id` CHAR(36) NOT NULL PRIMARY KEY ,
  `user_id` CHAR(36) NOT NULL,
  `quota_left` INT(11) NOT NULL DEFAULT 0,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
) ENGINE=InnoDB AUTO_INCREMENT=2869 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `invite_datings_quotas` (
  `id` CHAR(36) NOT NULL PRIMARY KEY ,
  `user_id` CHAR(36) NOT NULL,
  `quota_left` INT(11) NOT NULL DEFAULT 0,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
) ENGINE=InnoDB AUTO_INCREMENT=2869 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `booster` (
  `id` CHAR(36) NOT NULL PRIMARY KEY ,
  `user_id` CHAR(36) NOT NULL,
  `type` ENUM("boost", "super_boost") NOT NULL DEFAULT "boost",
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
) ENGINE=InnoDB AUTO_INCREMENT=2869 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `user_settings` (
  `id` CHAR(36) NOT NULL PRIMARY KEY ,
  `user_id` CHAR(36) NOT NULL,
  `receive_push` ENUM("Yes", "No") NOT NULL DEFAULT "Yes",
  `allow_random_call` ENUM("Yes", "No") NOT NULL DEFAULT "Yes",
  `allow_blind_date` ENUM("Yes", "No") NOT NULL DEFAULT "Yes",
  `hibernate_account` ENUM("Yes", "No") NOT NULL DEFAULT "No",
  `go_incognito` ENUM("Yes", "No") NOT NULL DEFAULT "No",
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
) ENGINE=InnoDB AUTO_INCREMENT=2869 DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `personality_test` (
  `id` CHAR(36) NOT NULL PRIMARY KEY ,
  `user_id` CHAR(36) NOT NULL,
  `test`  TEXT NOT NULL DEFAULT "",
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
) ENGINE=InnoDB AUTO_INCREMENT=2869 DEFAULT CHARSET=utf8;




COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

/*!4001 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

CREATE DATABASE IF NOT EXISTS `lovichat` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `lovichat`;

CREATE TABLE IF NOT EXISTS `blocks` (
  `id_block` CHAR(36) NOT NULL PRIMARY KEY ,
  `id_user`  CHAR(36) NOT NULL,
  `id_sender`  CHAR(36) NOT NULL,
  `block_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `sys_blocks` (
  `id` CHAR(36) NOT NULL PRIMARY KEY ,
  `id_user`  CHAR(36) NOT NULL,
  `reason` TEXT 
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `chatrooms` (
  `id_chatroom`  CHAR(36) NOT NULL PRIMARY KEY,
  `id_user_1` CHAR(36) NOT NULL ,
  `id_user_2` CHAR(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `fake_profile` (
  `id` CHAR(36) NOT NULL PRIMARY KEY ,
  `id_user` CHAR(36) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `fakes` (
  `id_fake` CHAR(36) NOT NULL PRIMARY KEY ,
  `id_user` CHAR(36) NOT NULL,
  `id_sender` CHAR(36) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `interests` (
  `id` INT NOT NULL PRIMARY KEY ,
  `interest` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- RATHER: (What user don't like the most)
INSERT INTO `interests` (`id`, `interest`) VALUES
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
(14, 'Being abusive'),
(15, 'Unwillingness to try new things'),
(16, 'Refusal to compromise'),
(17, 'Self-centeredness'),
(18, 'Nagging'),
(19, 'Ignoring emotional needs'),
(20, 'Always seeking validation'),
(21, 'Being glued to devices'),
(22, 'Belittling people'),
(23, 'Forgetting important dates'),
(24, 'Childish attitude'),
(25, 'Selfishness'),
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
(41, 'Lack of love for pets');


CREATE TABLE IF NOT EXISTS `likes` (
  `id_likes` CHAR(36) NOT NULL PRIMARY KEY ,
  `id_user` CHAR(36) NOT NULL,
  `id_sender` CHAR(36) NOT NULL,
  `like_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `messages` (
  `id_message` CHAR(36) NOT NULL PRIMARY KEY ,
  `id_chatroom` CHAR(36) NOT NULL,
  `id_sender` CHAR(36) NOT NULL ,
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
  `type` ENUM('Personal', 'System') NOT NULL DEFAULT 'Personal',
  `notif_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `readed` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `pics` (
  `id_pic` CHAR(36) NOT NULL PRIMARY KEY ,
  `id_user` CHAR(36) NOT NULL,
  `pic_number` tinyint(1) DEFAULT NULL,
  `path` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `galleries` (
  `id` CHAR(36) NOT NULL PRIMARY KEY ,
  `id_user` CHAR(36) NOT NULL,
  `type` ENUM('image', 'video') DEFAULT 'image',
  `image` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `pics_verification` (
  `id_pic` CHAR(36) NOT NULL PRIMARY KEY ,
  `id_user` CHAR(36) NOT NULL,
  `path` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `profiles` (
  `id` CHAR(36) NOT NULL PRIMARY KEY ,
  `id_user` CHAR(36) NOT NULL,
  `gender` ENUM('male', 'female','transgender') DEFAULT 'male' ,
  `sexuality` ENUM('heterosexual', 'homosexual','bisexual') DEFAULT 'heterosexual',
  `birthday` date DEFAULT NULL,
  `biography` varchar(500) DEFAULT NULL,
  `location_lat` float DEFAULT NULL,
  `location_lon` float DEFAULT NULL,
  `job` varchar(255) DEFAULT NULL,
  `relationship_status` ENUM('single','engaged', 'in-relationship','married', 'divorcee', 'complicated') NOT NULL DEFAULT 'single',
  `looking_for` ENUM('friendship', 'relationship','fun') NOT NULL DEFAULT 'friendship',
  `religion` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `fame` int(11) NOT NULL DEFAULT '0',
  `city` varchar(255) DEFAULT NULL,
  `country_name` varchar(255) DEFAULT NULL,
  `country_code` varchar(10) DEFAULT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `admins` (
  `id` CHAR(36) NOT NULL PRIMARY KEY ,
  `user_id` CHAR(36) NOT NULL,
  `type`  ENUM('super_admin', 'admin', 'moderator', 'accountant') NOT NULL DEFAULT "admin",
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `supports`
--

CREATE TABLE IF NOT EXISTS `supports` (
  `id` char(36) NOT NULL,
  `user_id` char(36) NOT NULL,
  `ticket_type_id` char(36) NOT NULL,
  `complaints` text NOT NULL,
   `reply` text DEFAULT NULL ,
  `status` enum('pending','in-progress','resolved','cancelled') DEFAULT 'pending',
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------


CREATE TABLE IF NOT EXISTS `users` (
  `id` CHAR(36) NOT NULL PRIMARY KEY ,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `zodiac_sign` varchar(255) DEFAULT NULL,
  `profile_completed` tinyint(1) NOT NULL DEFAULT '0',
  `active` tinyint(1) DEFAULT '0',
  `is_blocked` tinyint(1) NOT NULL DEFAULT '0',
  `active_link` varchar(255) DEFAULT NULL,
  `ini_pwd_link` varchar(255) DEFAULT NULL,
  `online` tinyint(1) NOT NULL DEFAULT '1',
  `last_login` datetime DEFAULT NULL,
  `is_verified` tinyint(1) NOT NULL DEFAULT '0',
  `creation_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `active_link` (`active_link`),
  UNIQUE KEY `ini_pwd_link` (`ini_pwd_link`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `personality_test_questions` (
  `id` CHAR(36) NOT NULL PRIMARY KEY ,
  `question` VARCHAR(255) NOT NULL,
  `type` VARCHAR(25) NOT NULL,
  `data-type` VARCHAR(25) NOT NULL,
  `choices`  json NOT NULL,
  `version`  VARCHAR(25) NOT NULL DEFAULT '1.0.0',
  `gender` ENUM('man', 'woman') DEFAULT 'man',
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `user_personality_test` (
  `id` CHAR(36) NOT NULL PRIMARY KEY ,
  `user_id` CHAR(36) NOT NULL,
  `content`  json,
  `version`  VARCHAR(25) NOT NULL DEFAULT '1.0.0',
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `users_interests` (
  `id` CHAR(36) NOT NULL PRIMARY KEY ,
  `id_user` CHAR(36) NOT NULL,
  `id_interest` CHAR(36) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `random_calls` (
  `id` CHAR(36) NOT NULL PRIMARY KEY ,
  `user_id` CHAR(36) NOT NULL,
  `called_id` CHAR(36) NOT NULL,
  `status` ENUM('completed', 'rejected', 'cancelled', 'failed') DEFAULT 'failed',
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `invite_datings` (
  `id` CHAR(36) NOT NULL PRIMARY KEY ,
  `user_id` CHAR(36) NOT NULL,
  `invited_id` CHAR(36) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 0,
   `is_completed` tinyint(1) NOT NULL DEFAULT 0,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `random_call_quotas` (
  `id` CHAR(36) NOT NULL PRIMARY KEY ,
  `user_id` CHAR(36) NOT NULL,
  `quota_left` INT(11) NOT NULL DEFAULT 0,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `invite_datings_quotas` (
  `id` CHAR(36) NOT NULL PRIMARY KEY ,
  `user_id` CHAR(36) NOT NULL,
  `quota_left` INT(11) NOT NULL DEFAULT 0,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `booster` (
  `id` CHAR(36) NOT NULL PRIMARY KEY ,
  `user_id` CHAR(36) NOT NULL,
  `type` ENUM('boost', 'super_boost') NOT NULL DEFAULT 'boost',
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `user_settings` (
  `id` CHAR(36) NOT NULL PRIMARY KEY ,
  `user_id` CHAR(36) NOT NULL,
  `receive_push` ENUM('Yes', 'No') NOT NULL DEFAULT 'Yes',
  `activate_astrology` ENUM('Yes', 'No') NOT NULL DEFAULT 'Yes',
  `allow_random_call` ENUM('Yes', 'No') NOT NULL DEFAULT 'Yes',
  `allow_blind_date` ENUM('Yes', 'No') NOT NULL DEFAULT 'Yes',
  `hibernate_account` ENUM('Yes', 'No') NOT NULL DEFAULT 'No',
  `go_incognito` ENUM('Yes', 'No') NOT NULL DEFAULT 'No',
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `user_filters` (
  `id` CHAR(36) NOT NULL PRIMARY KEY ,
  `user_id` CHAR(36) NOT NULL,
  `gender` ENUM('male', 'female', 'both') NOT NULL DEFAULT "male",
  `sexuality` ENUM('heterosexual', 'homosexual','bisexual'),
  `age_start` INT(2) NOT NULL DEFAULT 18,
  `age_limit` INT(2) NOT NULL DEFAULT 60,
  `interest` ENUM('relationship', 'friendship', 'fun', 'any') NOT NULL DEFAULT 'any',
  `location` VARCHAR(255) DEFAULT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `versus_wins` (
  `id` CHAR(36) NOT NULL PRIMARY KEY ,
  `win_id` CHAR(36) NOT NULL,
  `chooser_id` CHAR(36) NOT NULL,
  `lost_id`  CHAR(36) NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `pro_users` (
  `id` CHAR(36) NOT NULL PRIMARY KEY ,
  `user_id` VARCHAR(36) NOT NULL DEFAULT "1.0.0",
  `duration`  ENUM('month','semester', 'year') NOT NULL ,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/* CREATE TABLE IF NOT EXISTS `versus_losts` (
  `id` CHAR(36) NOT NULL PRIMARY KEY ,
  `user_id` CHAR(36) NOT NULL,
  `chooser_id` CHAR(36) NOT NULL,
  `win_id` CHAR(36) NOT NULL,,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8; */

CREATE TABLE IF NOT EXISTS `admin_settings` (
  `id` CHAR(36) NOT NULL PRIMARY KEY ,
  `app_version` VARCHAR(36) NOT NULL DEFAULT "1.0.0",
  `maintenance_active`  tinyint(1) NOT NULL DEFAULT "0",
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



-- blocks
ALTER TABLE `blocks`
  ADD CONSTRAINT `blocks_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;


-- sys_blocks
ALTER TABLE `sys_blocks`
  ADD CONSTRAINT `sys_blocks_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- chatrooms
ALTER TABLE `chatrooms`
  ADD CONSTRAINT `chatrooms_ibfk_1` FOREIGN KEY (`id_user_1`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `chatrooms_ibfk_2` FOREIGN KEY (`id_user_2`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

  -- Likes
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`id_sender`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

  -- messages
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`id_sender`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;  

-- notifications
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`id_sender`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;  

-- pics
ALTER TABLE `pics`
  ADD CONSTRAINT `pics_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;    

-- galleries
ALTER TABLE `galleries`
  ADD CONSTRAINT `galleries_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;    

-- pics_verification
ALTER TABLE `pics_verification`
  ADD CONSTRAINT `pics_verification_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;   

-- profiles
ALTER TABLE `profiles`
  ADD CONSTRAINT `pprofiles_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE; 

-- admins
ALTER TABLE `admins`
  ADD CONSTRAINT `admins_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE; 

-- support
ALTER TABLE `supports`
  ADD CONSTRAINT `supports_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE; 

-- users_interests
ALTER TABLE `users_interests`
  ADD CONSTRAINT `users_interests_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;  

 -- user_personality_test
ALTER TABLE `user_personality_test`
  ADD CONSTRAINT `user_personality_test_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;   

 -- random_calls
ALTER TABLE `random_calls`
  ADD CONSTRAINT `random_calls_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;   


 -- invite_datings
ALTER TABLE `invite_datings`
  ADD CONSTRAINT `invite_datings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;   


 -- random_call_quotas
ALTER TABLE `random_call_quotas`
  ADD CONSTRAINT `random_call_quotas_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;   

 -- invite_datings_quotas
ALTER TABLE `invite_datings_quotas`
  ADD CONSTRAINT `invite_datings_quotas_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;    


-- booster
ALTER TABLE `booster`
  ADD CONSTRAINT `booster_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;    

-- user_settings
ALTER TABLE `user_settings`
  ADD CONSTRAINT `user_settings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;    

-- user_filters
ALTER TABLE `user_filters`
  ADD CONSTRAINT `user_filters_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE; 

-- versus_wins
ALTER TABLE `versus_wins`
  ADD CONSTRAINT `versus_wins_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;   

-- versus_losts
ALTER TABLE `versus_losts`
  ADD CONSTRAINT `versus_losts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;  



COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

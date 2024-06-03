-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Jan 15, 2024 at 08:20 AM
-- Server version: 5.7.39
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `lovichat`
--



CREATE TABLE  `blocks` (
  `id_block` CHAR(36) NOT NULL PRIMARY KEY ,
  `id_user`  CHAR(36) NOT NULL,
  `id_sender`  CHAR(36) NOT NULL,
  `block_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE  `sys_blocks` (
  `id` CHAR(36) NOT NULL PRIMARY KEY ,
  `id_user`  CHAR(36) NOT NULL,
  `reason` TEXT 
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE  `chatrooms` (
  `id_chatroom`  CHAR(36) NOT NULL PRIMARY KEY,
  `id_user_1` CHAR(36) NOT NULL ,
  `id_user_2` CHAR(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE  `fake_profile` (
  `id` CHAR(36) NOT NULL PRIMARY KEY ,
  `id_user` CHAR(36) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE  `fakes` (
  `id_fake` CHAR(36) NOT NULL PRIMARY KEY ,
  `id_user` CHAR(36) NOT NULL,
  `id_sender` CHAR(36) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE  `interests` (
  `id` INT NOT NULL PRIMARY KEY ,
  `interest` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- RATHER: (What user don't like the most)
INSERT INTO `interests` (`id`, `interest`) VALUES
(1, 'Dishonesty'),
(2, 'Poor communication'),
(3, 'Constant criticism'),
(4, 'Excessive Jealousy'),
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




CREATE TABLE  `likes` (
  `id_likes` CHAR(36) NOT NULL PRIMARY KEY ,
  `id_user` CHAR(36) NOT NULL,
  `id_sender` CHAR(36) NOT NULL,
  `like_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE  `messages` (
  `id_message` CHAR(36) NOT NULL PRIMARY KEY ,
  `id_chatroom` CHAR(36) NOT NULL,
  `id_sender` CHAR(36) NOT NULL ,
  `id_user` CHAR(36) NOT NULL,
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `message` varchar(1000) NOT NULL,
  `readed` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE  `notifications` (
  `id_notif` CHAR(36) NOT NULL PRIMARY KEY ,
  `id_user` CHAR(36) DEFAULT NULL,
  `id_sender` CHAR(36) NOT NULL,
  `notification` varchar(25) NOT NULL,
  `type` ENUM('Personal', 'System') NOT NULL DEFAULT 'Personal',
  `notif_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `read` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE  `pics` (
  `id_pic` CHAR(36) NOT NULL PRIMARY KEY ,
  `id_user` CHAR(36) NOT NULL,
  `pic_number` tinyint(1) DEFAULT NULL,
  `path` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE  `galleries` (
  `id` CHAR(36) NOT NULL PRIMARY KEY ,
  `id_user` CHAR(36) NOT NULL,
  `type` ENUM('image', 'video') DEFAULT 'image',
  `image` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE  `pics_verification` (
  `id_pic` CHAR(36) NOT NULL PRIMARY KEY ,
  `id_user` CHAR(36) NOT NULL,
  `path` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE  `profiles` (
  `id` CHAR(36) NOT NULL PRIMARY KEY ,
  `id_user` CHAR(36) NOT NULL,
  `gender` ENUM('male', 'female','transgender') DEFAULT 'male' ,
  `sexuality` ENUM('heterosexual', 'homosexual','bisexual') DEFAULT 'heterosexual',
  `birthday` date DEFAULT NULL,
  `biography` varchar(500) DEFAULT NULL,
  `my_contribution` varchar(500) DEFAULT NULL,
  `my_expectation` varchar(500) DEFAULT NULL,
  `location_lat` float DEFAULT NULL,
  `location_lon` float DEFAULT NULL,
  `zodiac_sign` varchar(255) DEFAULT NULL,
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

CREATE TABLE  `admins` (
  `id` CHAR(36) NOT NULL PRIMARY KEY ,
  `user_id` CHAR(36) NOT NULL,
  `type`  ENUM('super_admin', 'admin', 'moderator', 'accountant') NOT NULL DEFAULT "admin",
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `ticket_type`
--

CREATE TABLE  `ticket_type` (
  `id` char(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `reply`
--

CREATE TABLE  `replies` (
  `id` char(36) NOT NULL,
  `user_id` char(36) NOT NULL,
  `support_id` char(36) NOT NULL,
   `reply` text DEFAULT NULL ,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- --------------------------------------------------------

--
-- Table structure for table `supports`
--

CREATE TABLE  `supports` (
  `id` char(36) NOT NULL,
  `user_id` char(36) NOT NULL,
  `ticket_type_id` char(36) NOT NULL,
  `complaints` text NOT NULL,
  `status` enum('pending','in-progress','resolved','cancelled') DEFAULT 'pending',
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------


CREATE TABLE  `users` (
  `id` CHAR(36) NOT NULL PRIMARY KEY ,
  `phone` varchar(255) NOT NULL,
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
  `otp` VARCHAR(6) DEFAULT NULL,
  `creation_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `refreshTokenId` varchar(255) DEFAULT NULL,
  /* UNIQUE KEY `email` (`email`),
  UNIQUE KEY `active_link` (`active_link`),
  UNIQUE KEY `ini_pwd_link` (`ini_pwd_link`) */
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ------------------------------------------------------------
--       User sessions
-- -------------------------------------------------------------

CREATE TABLE `sessions` (
  `id` CHAR(36) NOT NULL PRIMARY KEY ,
  `user_id` INT NOT NULL,
  `refresh_token` VARCHAR(255) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



-- -------------------------------------------------------------
--        Personality Test Questions
-- -------------------------------------------------------------

CREATE TABLE  `personality_test_questions` (
  `id` CHAR(36) NOT NULL PRIMARY KEY ,
  `question` VARCHAR(255) NOT NULL,
  `type` VARCHAR(25) NOT NULL,
  `data-type` VARCHAR(25) NOT NULL,
  `choices`  text NOT NULL,
  `version`  VARCHAR(25) NOT NULL DEFAULT '1.0.0',
  `gender` ENUM('Male', 'Female') DEFAULT 'Male',
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE  `user_personality_test` (
  `id` CHAR(36) NOT NULL PRIMARY KEY ,
  `user_id` CHAR(36) NOT NULL,
  `content`  text,
  `version`  VARCHAR(25) NOT NULL DEFAULT '1.0.0',
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE  `users_interests` (
  `id` CHAR(36) NOT NULL PRIMARY KEY ,
  `id_user` CHAR(36) NOT NULL,
  `id_interest` CHAR(36) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

CREATE TABLE  `random_calls` (
  `id` CHAR(36) NOT NULL PRIMARY KEY ,
  `user_id` CHAR(36) NOT NULL,
  `called_id` CHAR(36) NOT NULL,
  `status` ENUM('completed', 'rejected', 'cancelled', 'failed') DEFAULT 'failed',
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE  `invite_datings` (
  `id` CHAR(36) NOT NULL PRIMARY KEY ,
  `user_id` CHAR(36) NOT NULL,
  `invited_id` CHAR(36) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 0,
   `is_completed` tinyint(1) NOT NULL DEFAULT 0,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

CREATE TABLE  `random_call_quotas` (
  `id` CHAR(36) NOT NULL PRIMARY KEY ,
  `user_id` CHAR(36) NOT NULL,
  `quota_left` INT(11) NOT NULL DEFAULT 0,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

CREATE TABLE  `invite_datings_quotas` (
  `id` CHAR(36) NOT NULL PRIMARY KEY ,
  `user_id` CHAR(36) NOT NULL,
  `quota_left` INT(11) NOT NULL DEFAULT 0,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

CREATE TABLE  `booster` (
  `id` CHAR(36) NOT NULL PRIMARY KEY ,
  `user_id` CHAR(36) NOT NULL,
  `type` ENUM('boost', 'super_boost') NOT NULL DEFAULT 'boost',
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

CREATE TABLE  `user_settings` (
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


CREATE TABLE  `user_filters` (
  `id` CHAR(36) NOT NULL PRIMARY KEY,
  `user_id` CHAR(36) NOT NULL,
  `gender` ENUM('male', 'female', 'both') NOT NULL DEFAULT "male",
  `sexuality` ENUM('heterosexual', 'homosexual','bisexual'),
  `age_start` INT(2) NOT NULL DEFAULT 18,
  `age_limit` INT(2) NOT NULL DEFAULT 60,
  `interest` ENUM('relationship', 'friendship', 'fun', 'any') NOT NULL DEFAULT 'any',
  `location` VARCHAR(255) DEFAULT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE  `versus_wins` (
  `id` CHAR(36) NOT NULL PRIMARY KEY ,
  `win_id` CHAR(36) NOT NULL,
  `chooser_id` CHAR(36) NOT NULL,
  `lost_id`  CHAR(36) NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE  `pro_users` (
  `id` CHAR(36) NOT NULL PRIMARY KEY ,
  `user_id` VARCHAR(36) NOT NULL DEFAULT "1.0.0",
  `duration`  ENUM('month','semester', 'year') NOT NULL ,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/* CREATE TABLE  `versus_losts` (
  `id` CHAR(36) NOT NULL PRIMARY KEY ,
  `user_id` CHAR(36) NOT NULL,
  `chooser_id` CHAR(36) NOT NULL,
  `win_id` CHAR(36) NOT NULL,,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8; */

CREATE TABLE  `admin_settings` (
  `id` CHAR(36) NOT NULL PRIMARY KEY ,
  `app_version` VARCHAR(36) NOT NULL DEFAULT "1.0.0",
  `maintenance_active`  tinyint(1) NOT NULL DEFAULT "0",
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- FUNCTION CalculateZodiacCompatibility TO CALCULATE COMPATIBILITY
DELIMITER //
CREATE FUNCTION CalculateZodiacCompatibility(sign1 VARCHAR(255), sign2 VARCHAR(255)) RETURNS INT
BEGIN
  DECLARE compatibility INT;

  -- Your zodiac compatibility logic goes here
  -- For simplicity, let's assume there's a predefined compatibility map
  -- SELECT CalculateZodiacCompatibility('Aries', 'Taurus') AS compatibility;
  CASE sign1
    WHEN 'Aries' THEN
      CASE sign2
        WHEN 'Aries' THEN SET compatibility = 80;
        WHEN 'Taurus' THEN SET compatibility = 50;
        WHEN 'Gemini' THEN SET compatibility = 60;
        WHEN 'Cancer' THEN SET compatibility = 30;
        WHEN 'Leo' THEN SET compatibility = 70;
        WHEN 'Virgo' THEN SET compatibility = 40;
        WHEN 'Libra' THEN SET compatibility = 60;
        WHEN 'Scorpio' THEN SET compatibility = 30;
        WHEN 'Sagittarius' THEN SET compatibility = 70;
        WHEN 'Capricorn' THEN SET compatibility = 40;
        WHEN 'Aquarius' THEN SET compatibility = 60;
        WHEN 'Pisces' THEN SET compatibility = 50;
        -- Add mappings for other zodiac signs
        ELSE SET compatibility = 0;
      END CASE;
    WHEN 'Taurus' THEN
      CASE sign2
        WHEN 'Aries' THEN SET compatibility = 50;
        WHEN 'Taurus' THEN SET compatibility = 70;
        WHEN 'Gemini' THEN SET compatibility = 40;
        WHEN 'Cancer' THEN SET compatibility = 60;
        WHEN 'Leo' THEN SET compatibility = 30;
        WHEN 'Virgo' THEN SET compatibility = 70;
        WHEN 'Libra' THEN SET compatibility = 50;
        WHEN 'Scorpio' THEN SET compatibility = 60;
        WHEN 'Sagittarius' THEN SET compatibility = 30;
        WHEN 'Capricorn' THEN SET compatibility = 70;
        WHEN 'Aquarius' THEN SET compatibility = 50;
        WHEN 'Pisces' THEN SET compatibility = 40;
        -- Add mappings for other zodiac signs
        ELSE SET compatibility = 0;
      END CASE;
    WHEN 'Gemini' THEN
      CASE sign2
        WHEN 'Aries' THEN SET compatibility = 60;
        WHEN 'Taurus' THEN SET compatibility = 40;
        WHEN 'Gemini' THEN SET compatibility = 70;
        WHEN 'Cancer' THEN SET compatibility = 50;
        WHEN 'Leo' THEN SET compatibility = 60;
        WHEN 'Virgo' THEN SET compatibility = 30;
        WHEN 'Libra' THEN SET compatibility = 70;
        WHEN 'Scorpio' THEN SET compatibility = 40;
        WHEN 'Sagittarius' THEN SET compatibility = 60;
        WHEN 'Capricorn' THEN SET compatibility = 30;
        WHEN 'Aquarius' THEN SET compatibility = 50;
        WHEN 'Pisces' THEN SET compatibility = 70;
        -- Add mappings for other zodiac signs
        ELSE SET compatibility = 0;
      END CASE;
    WHEN 'Cancer' THEN
      CASE sign2
        WHEN 'Aries' THEN SET compatibility = 30;
        WHEN 'Taurus' THEN SET compatibility = 60;
        WHEN 'Gemini' THEN SET compatibility = 50;
        WHEN 'Cancer' THEN SET compatibility = 70;
        WHEN 'Leo' THEN SET compatibility = 40;
        WHEN 'Virgo' THEN SET compatibility = 60;
        WHEN 'Libra' THEN SET compatibility = 30;
        WHEN 'Scorpio' THEN SET compatibility = 70;
        WHEN 'Sagittarius' THEN SET compatibility = 40;
        WHEN 'Capricorn' THEN SET compatibility = 60;
        WHEN 'Aquarius' THEN SET compatibility = 70;
        WHEN 'Pisces' THEN SET compatibility = 50;
        -- Add mappings for other zodiac signs
        ELSE SET compatibility = 0;
      END CASE;
    WHEN 'Leo' THEN
      CASE sign2
        WHEN 'Aries' THEN SET compatibility = 70;
        WHEN 'Taurus' THEN SET compatibility = 30;
        WHEN 'Gemini' THEN SET compatibility = 60;
        WHEN 'Cancer' THEN SET compatibility = 40;
        WHEN 'Leo' THEN SET compatibility = 70;
        WHEN 'Virgo' THEN SET compatibility = 50;
        WHEN 'Libra' THEN SET compatibility = 60;
        WHEN 'Scorpio' THEN SET compatibility = 30;
        WHEN 'Sagittarius' THEN SET compatibility = 70;
        WHEN 'Capricorn' THEN SET compatibility = 40;
        WHEN 'Aquarius' THEN SET compatibility = 50;
        WHEN 'Pisces' THEN SET compatibility = 60;
        -- Add mappings for other zodiac signs
        ELSE SET compatibility = 0;
      END CASE;
    WHEN 'Virgo' THEN
      CASE sign2
        WHEN 'Aries' THEN SET compatibility = 40;
        WHEN 'Taurus' THEN SET compatibility = 70;
        WHEN 'Gemini' THEN SET compatibility = 30;
        WHEN 'Cancer' THEN SET compatibility = 60;
        WHEN 'Leo' THEN SET compatibility = 50;
        WHEN 'Virgo' THEN SET compatibility = 70;
        WHEN 'Libra' THEN SET compatibility = 40;
        WHEN 'Scorpio' THEN SET compatibility = 60;
        WHEN 'Sagittarius' THEN SET compatibility = 50;
        WHEN 'Capricorn' THEN SET compatibility = 70;
        WHEN 'Aquarius' THEN SET compatibility = 60;
        WHEN 'Pisces' THEN SET compatibility = 30;
        -- Add mappings for other zodiac signs
        ELSE SET compatibility = 0;
      END CASE;
    WHEN 'Libra' THEN
      CASE sign2
        WHEN 'Aries' THEN SET compatibility = 60;
        WHEN 'Taurus' THEN SET compatibility = 50;
        WHEN 'Gemini' THEN SET compatibility = 70;
        WHEN 'Cancer' THEN SET compatibility = 30;
        WHEN 'Leo' THEN SET compatibility = 60;
        WHEN 'Virgo' THEN SET compatibility = 40;
        WHEN 'Libra' THEN SET compatibility = 70;
        WHEN 'Scorpio' THEN SET compatibility = 50;
        WHEN 'Sagittarius' THEN SET compatibility = 60;
        WHEN 'Capricorn' THEN SET compatibility = 40;
        WHEN 'Aquarius' THEN SET compatibility = 70;
        WHEN 'Pisces' THEN SET compatibility = 50;
        -- Add mappings for other zodiac signs
        ELSE SET compatibility = 0;
      END CASE;
    WHEN 'Scorpio' THEN
      CASE sign2
        WHEN 'Aries' THEN SET compatibility = 30;
        WHEN 'Taurus' THEN SET compatibility = 60;
        WHEN 'Gemini' THEN SET compatibility = 40;
        WHEN 'Cancer' THEN SET compatibility = 70;
        WHEN 'Leo' THEN SET compatibility = 30;
        WHEN 'Virgo' THEN SET compatibility = 60;
        WHEN 'Libra' THEN SET compatibility = 50;
        WHEN 'Scorpio' THEN SET compatibility = 70;
        WHEN 'Sagittarius' THEN SET compatibility = 30;
        WHEN 'Capricorn' THEN SET compatibility = 60;
        WHEN 'Aquarius' THEN SET compatibility = 50;
        WHEN 'Pisces' THEN SET compatibility = 60;
        -- Add mappings for other zodiac signs
        ELSE SET compatibility = 0;
      END CASE;
    WHEN 'Sagittarius' THEN
      CASE sign2
        WHEN 'Aries' THEN SET compatibility = 70;
        WHEN 'Taurus' THEN SET compatibility = 30;
        WHEN 'Gemini' THEN SET compatibility = 60;
        WHEN 'Cancer' THEN SET compatibility = 40;
        WHEN 'Leo' THEN SET compatibility = 70;
        WHEN 'Virgo' THEN SET compatibility = 50;
        WHEN 'Libra' THEN SET compatibility = 60;
        WHEN 'Scorpio' THEN SET compatibility = 30;
        WHEN 'Sagittarius' THEN SET compatibility = 70;
        WHEN 'Capricorn' THEN SET compatibility = 40;
        WHEN 'Aquarius' THEN SET compatibility = 50;
        WHEN 'Pisces' THEN SET compatibility = 60;
        -- Add mappings for other zodiac signs
        ELSE SET compatibility = 0;
      END CASE;
    WHEN 'Capricorn' THEN
      CASE sign2
        WHEN 'Aries' THEN SET compatibility = 40;
        WHEN 'Taurus' THEN SET compatibility = 70;
        WHEN 'Gemini' THEN SET compatibility = 30;
        WHEN 'Cancer' THEN SET compatibility = 60;
        WHEN 'Leo' THEN SET compatibility = 40;
        WHEN 'Virgo' THEN SET compatibility = 70;
        WHEN 'Libra' THEN SET compatibility = 40;
        WHEN 'Scorpio' THEN SET compatibility = 60;
        WHEN 'Sagittarius' THEN SET compatibility = 40;
        WHEN 'Capricorn' THEN SET compatibility = 70;
        WHEN 'Aquarius' THEN SET compatibility = 30;
        WHEN 'Pisces' THEN SET compatibility = 60;
        -- Add mappings for other zodiac signs
        ELSE SET compatibility = 0;
      END CASE;
    WHEN 'Aquarius' THEN
      CASE sign2
        WHEN 'Aries' THEN SET compatibility = 60;
        WHEN 'Taurus' THEN SET compatibility = 50;
        WHEN 'Gemini' THEN SET compatibility = 50;
        WHEN 'Cancer' THEN SET compatibility = 70;
        WHEN 'Leo' THEN SET compatibility = 50;
        WHEN 'Virgo' THEN SET compatibility = 60;
        WHEN 'Libra' THEN SET compatibility = 70;
        WHEN 'Scorpio' THEN SET compatibility = 50;
        WHEN 'Sagittarius' THEN SET compatibility = 50;
        WHEN 'Capricorn' THEN SET compatibility = 30;
        WHEN 'Aquarius' THEN SET compatibility = 70;
        WHEN 'Pisces' THEN SET compatibility = 50;
        -- Add mappings for other zodiac signs
        ELSE SET compatibility = 0;
      END CASE;
    WHEN 'Pisces' THEN
      CASE sign2
        WHEN 'Aries' THEN SET compatibility = 30;
        WHEN 'Taurus' THEN SET compatibility = 30;
        WHEN 'Gemini' THEN SET compatibility = 80;
        WHEN 'Cancer' THEN SET compatibility = 30;
        WHEN 'Leo' THEN SET compatibility = 60;
        WHEN 'Virgo' THEN SET compatibility = 40;
        WHEN 'Libra' THEN SET compatibility = 40;
        WHEN 'Scorpio' THEN SET compatibility = 80;
        WHEN 'Sagittarius' THEN SET compatibility = 40;
        WHEN 'Capricorn' THEN SET compatibility = 60;
        WHEN 'Aquarius' THEN SET compatibility = 80;
        WHEN 'Pisces' THEN SET compatibility = 70;
        -- Add mappings for other zodiac signs
        ELSE SET compatibility = 0;
      END CASE;                                                            
    -- Add cases for other zodiac signs
    ELSE SET compatibility = 0;
  END CASE;

  RETURN compatibility;
END //
DELIMITER ;




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
  ADD CONSTRAINT `versus_wins_ibfk_1` FOREIGN KEY (`chooser_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;   





COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

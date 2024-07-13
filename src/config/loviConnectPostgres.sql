-- Table: users
CREATE TABLE users (
  id UUID PRIMARY KEY,
  phone VARCHAR(255) NOT NULL,
  fullname VARCHAR(255) NOT NULL,
  zodiac_sign VARCHAR(255),
  profile_completed BOOLEAN NOT NULL DEFAULT FALSE,
  active BOOLEAN DEFAULT FALSE,
  is_blocked BOOLEAN NOT NULL DEFAULT FALSE,
  active_link VARCHAR(255),
  ini_pwd_link VARCHAR(255),
  online BOOLEAN NOT NULL DEFAULT TRUE,
  last_login TIMESTAMP,
  is_verified BOOLEAN NOT NULL DEFAULT FALSE,
  otp VARCHAR(6),
  creation_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  refreshTokenId VARCHAR(255)
);

-- Table: profiles
CREATE TABLE profiles (
  id UUID PRIMARY KEY,
  id_user UUID NOT NULL,
  gender VARCHAR(255) DEFAULT 'male',
  sexuality VARCHAR(255) DEFAULT 'heterosexual',
  birthday DATE,
  biography VARCHAR(500),
  my_contribution VARCHAR(500),
  my_expectation VARCHAR(500),
  location_lat DOUBLE PRECISION,
  location_lon DOUBLE PRECISION,
  zodiac_sign VARCHAR(255),
  job VARCHAR(255),
  relationship_status VARCHAR(255) NOT NULL DEFAULT 'single',
  looking_for VARCHAR(255) NOT NULL DEFAULT 'friendship',
  religion VARCHAR(255),
  avatar VARCHAR(255),
  fame INTEGER NOT NULL DEFAULT 0,
  city VARCHAR(255),
  country_name VARCHAR(255),
  country_code VARCHAR(10)
);

-- Table: blocks
CREATE TABLE blocks (
  id_block UUID PRIMARY KEY,
  id_user UUID NOT NULL,
  id_sender UUID NOT NULL,
  block_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Table: sys_blocks
CREATE TABLE sys_blocks (
  id UUID PRIMARY KEY,
  id_user UUID NOT NULL,
  reason TEXT
);

-- Table: chatrooms
CREATE TABLE chatrooms (
  id_chatroom UUID PRIMARY KEY,
  id_user_1 UUID NOT NULL,
  id_user_2 UUID NOT NULL
);

-- Table: fake_profile
CREATE TABLE fake_profile (
  id UUID PRIMARY KEY,
  id_user UUID NOT NULL,
  create_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Table: fakes
CREATE TABLE fakes (
  id_fake UUID PRIMARY KEY,
  id_user UUID NOT NULL,
  id_sender UUID NOT NULL,
  create_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Table: interests
CREATE TABLE interests (
  id SERIAL PRIMARY KEY,
  interest VARCHAR(50) NOT NULL
);

-- Table: likes
CREATE TABLE likes (
  id_likes UUID PRIMARY KEY,
  id_user UUID NOT NULL,
  id_sender UUID NOT NULL,
  like_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Table: messages
CREATE TABLE messages (
  id_message UUID PRIMARY KEY,
  id_chatroom UUID NOT NULL,
  id_sender UUID NOT NULL,
  id_user UUID NOT NULL,
  time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  message VARCHAR(1000) NOT NULL,
  readed BOOLEAN DEFAULT FALSE
);

-- Table: notifications
CREATE TABLE notifications (
  id_notif UUID PRIMARY KEY,
  id_user UUID,
  id_sender UUID NOT NULL,
  notification VARCHAR(25) NOT NULL,
  type VARCHAR(255) NOT NULL DEFAULT 'Personal',
  notif_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  read BOOLEAN DEFAULT FALSE
);

-- Table: pics
CREATE TABLE pics (
  id_pic UUID PRIMARY KEY,
  id_user UUID NOT NULL,
  pic_number INTEGER,
  type VARCHAR(255) NOT NULL,
  path VARCHAR(50) NOT NULL
);

-- Table: galleries
CREATE TABLE galleries (
  id UUID PRIMARY KEY,
  id_user UUID NOT NULL,
  type VARCHAR(255) DEFAULT 'image',
  image TEXT NOT NULL
);

-- Table: pics_verification
CREATE TABLE pics_verification (
  id_pic UUID PRIMARY KEY,
  id_user UUID NOT NULL,
  path VARCHAR(50) NOT NULL
);

-- Table: admins
CREATE TABLE admins (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL,
  type VARCHAR(255) NOT NULL DEFAULT 'admin',
  date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Table: ticket_type
CREATE TABLE ticket_type (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Table: replies
CREATE TABLE replies (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL,
  support_id UUID NOT NULL,
  reply TEXT,
  date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Table: supports
CREATE TABLE supports (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL,
  ticket_type_id UUID NOT NULL,
  complaints TEXT NOT NULL,
  status VARCHAR(255) DEFAULT 'pending',
  date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Table: personality_test_questions
CREATE TABLE personality_test_questions (
  id UUID PRIMARY KEY,
  question VARCHAR(255) NOT NULL,
  type VARCHAR(25) NOT NULL,
  "data-type" VARCHAR(25) NOT NULL,
  choices TEXT NOT NULL,
  version VARCHAR(25) NOT NULL DEFAULT '1.0.0',
  gender VARCHAR(255) DEFAULT 'Male',
  date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Table: user_personality_test
CREATE TABLE user_personality_test (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL,
  content TEXT,
  version VARCHAR(25) NOT NULL DEFAULT '1.0.0',
  date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Table: users_interests
CREATE TABLE users_interests (
  id UUID PRIMARY KEY,
  id_user UUID NOT NULL,
  id_interest UUID NOT NULL
);

-- Table: random_calls
CREATE TABLE random_calls (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL,
  called_id UUID NOT NULL,
  status VARCHAR(255) DEFAULT 'failed',
  date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Table: invite_datings
CREATE TABLE invite_datings (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL,
  invited_id UUID NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT FALSE,
  is_completed BOOLEAN NOT NULL DEFAULT FALSE,
  date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Table: random_call_quotas
CREATE TABLE random_call_quotas (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL,
  quota_left INTEGER NOT NULL DEFAULT 0,
  date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Table: invite_dating_quotas
CREATE TABLE invite_dating_quotas (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL,
  quota_left INTEGER NOT NULL DEFAULT 0,
  date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Table: booster
CREATE TABLE booster (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL,
  type VARCHAR(255) NOT NULL DEFAULT 'boost',
  date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Table: user_settings
CREATE TABLE user_settings (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL,
  receive_push VARCHAR(255) NOT NULL DEFAULT 'Yes',
  activate_astrology VARCHAR(255) NOT NULL DEFAULT 'Yes',
  allow_random_call VARCHAR(255) NOT NULL DEFAULT 'Yes',
  allow_blind_date VARCHAR(255) NOT NULL DEFAULT 'Yes',
  hibernate_account VARCHAR(255) NOT NULL DEFAULT 'No',
  go_incognito VARCHAR(255) NOT NULL DEFAULT 'No',
  date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Table: user_filters
CREATE TABLE user_filters (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL,
  gender VARCHAR(255) NOT NULL DEFAULT 'male',
  sexuality VARCHAR(255),
  age_start INTEGER NOT NULL DEFAULT 18,
  age_limit INTEGER NOT NULL DEFAULT 60,
  interest VARCHAR(255) NOT NULL DEFAULT 'any',
  location VARCHAR(255),
  date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Table: versus_wins
CREATE TABLE versus_wins (
  id UUID PRIMARY KEY,
  win_id UUID NOT NULL,
  chooser_id UUID NOT NULL,
  lost_id UUID NOT NULL,
  date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Table: pro_users
CREATE TABLE pro_users (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL,
  duration VARCHAR(255) NOT NULL,
  date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Table: admin_settings
CREATE TABLE admin_settings (
  id UUID PRIMARY KEY,
  app_version VARCHAR(36) NOT NULL DEFAULT '1.0.0',
  maintenance_active BOOLEAN NOT NULL DEFAULT FALSE,
  date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- FUNCTION CalculateZodiacCompatibility TO CALCULATE COMPATIBILITY
CREATE OR REPLACE FUNCTION CalculateZodiacCompatibility(sign1 VARCHAR(255), sign2 VARCHAR(255)) RETURNS INT LANGUAGE plpgsql AS $$
DECLARE
  compatibility INT;
BEGIN
  -- Your zodiac compatibility logic goes here
  -- For simplicity, let's assume there's a predefined compatibility map
  -- SELECT CalculateZodiacCompatibility('Aries', 'Taurus') AS compatibility;
  CASE sign1
    WHEN 'Aries' THEN
      CASE sign2
        WHEN 'Aries' THEN compatibility := 80;
        WHEN 'Taurus' THEN compatibility := 50;
        WHEN 'Gemini' THEN compatibility := 60;
        WHEN 'Cancer' THEN compatibility := 30;
        WHEN 'Leo' THEN compatibility := 70;
        WHEN 'Virgo' THEN compatibility := 40;
        WHEN 'Libra' THEN compatibility := 60;
        WHEN 'Scorpio' THEN compatibility := 30;
        WHEN 'Sagittarius' THEN compatibility := 70;
        WHEN 'Capricorn' THEN compatibility := 40;
        WHEN 'Aquarius' THEN compatibility := 60;
        WHEN 'Pisces' THEN compatibility := 50;
        -- Add mappings for other zodiac signs
        ELSE compatibility := 0;
      END CASE;
    WHEN 'Taurus' THEN
      CASE sign2
        WHEN 'Aries' THEN compatibility := 50;
        WHEN 'Taurus' THEN compatibility := 70;
        WHEN 'Gemini' THEN compatibility := 40;
        WHEN 'Cancer' THEN compatibility := 60;
        WHEN 'Leo' THEN compatibility := 30;
        WHEN 'Virgo' THEN compatibility := 70;
        WHEN 'Libra' THEN compatibility := 50;
        WHEN 'Scorpio' THEN compatibility := 60;
        WHEN 'Sagittarius' THEN compatibility := 30;
        WHEN 'Capricorn' THEN compatibility := 70;
        WHEN 'Aquarius' THEN compatibility := 50;
        WHEN 'Pisces' THEN compatibility := 40;
        -- Add mappings for other zodiac signs
        ELSE compatibility := 0;
      END CASE;
    WHEN 'Gemini' THEN
      CASE sign2
        WHEN 'Aries' THEN compatibility := 60;
        WHEN 'Taurus' THEN compatibility := 40;
        WHEN 'Gemini' THEN compatibility := 70;
        WHEN 'Cancer' THEN compatibility := 50;
        WHEN 'Leo' THEN compatibility := 60;
        WHEN 'Virgo' THEN compatibility := 30;
        WHEN 'Libra' THEN compatibility := 70;
        WHEN 'Scorpio' THEN compatibility := 40;
        WHEN 'Sagittarius' THEN compatibility := 60;
        WHEN 'Capricorn' THEN compatibility := 30;
        WHEN 'Aquarius' THEN compatibility := 50;
        WHEN 'Pisces' THEN compatibility := 70;
        -- Add mappings for other zodiac signs
        ELSE compatibility := 0;
      END CASE;
    WHEN 'Cancer' THEN
      CASE sign2
        WHEN 'Aries' THEN compatibility := 30;
        WHEN 'Taurus' THEN compatibility := 60;
        WHEN 'Gemini' THEN compatibility := 50;
        WHEN 'Cancer' THEN compatibility := 70;
        WHEN 'Leo' THEN compatibility := 40;
        WHEN 'Virgo' THEN compatibility := 60;
        WHEN 'Libra' THEN compatibility := 30;
        WHEN 'Scorpio' THEN compatibility := 70;
        WHEN 'Sagittarius' THEN compatibility := 40;
        WHEN 'Capricorn' THEN compatibility := 60;
        WHEN 'Aquarius' THEN compatibility := 70;
        WHEN 'Pisces' THEN compatibility := 50;
        -- Add mappings for other zodiac signs
        ELSE compatibility := 0;
      END CASE;
    WHEN 'Leo' THEN
      CASE sign2
        WHEN 'Aries' THEN compatibility := 70;
        WHEN 'Taurus' THEN compatibility := 30;
        WHEN 'Gemini' THEN compatibility := 60;
        WHEN 'Cancer' THEN compatibility := 40;
        WHEN 'Leo' THEN compatibility := 70;
        WHEN 'Virgo' THEN compatibility := 50;
        WHEN 'Libra' THEN compatibility := 60;
        WHEN 'Scorpio' THEN compatibility := 30;
        WHEN 'Sagittarius' THEN compatibility := 70;
        WHEN 'Capricorn' THEN compatibility := 40;
        WHEN 'Aquarius' THEN compatibility := 50;
        WHEN 'Pisces' THEN compatibility := 60;
        -- Add mappings for other zodiac signs
        ELSE compatibility := 0;
      END CASE;
    WHEN 'Virgo' THEN
      CASE sign2
        WHEN 'Aries' THEN compatibility := 40;
        WHEN 'Taurus' THEN compatibility := 70;
        WHEN 'Gemini' THEN compatibility := 30;
        WHEN 'Cancer' THEN compatibility := 60;
        WHEN 'Leo' THEN compatibility := 50;
        WHEN 'Virgo' THEN compatibility := 70;
        WHEN 'Libra' THEN compatibility := 40;
        WHEN 'Scorpio' THEN compatibility := 60;
        WHEN 'Sagittarius' THEN compatibility := 50;
        WHEN 'Capricorn' THEN compatibility := 70;
        WHEN 'Aquarius' THEN compatibility := 60;
        WHEN 'Pisces' THEN compatibility := 30;
        -- Add mappings for other zodiac signs
        ELSE compatibility := 0;
      END CASE;
    WHEN 'Libra' THEN
      CASE sign2
        WHEN 'Aries' THEN compatibility := 60;
        WHEN 'Taurus' THEN compatibility := 50;
        WHEN 'Gemini' THEN compatibility := 70;
        WHEN 'Cancer' THEN compatibility := 30;
        WHEN 'Leo' THEN compatibility := 60;
        WHEN 'Virgo' THEN compatibility := 40;
        WHEN 'Libra' THEN compatibility := 70;
        WHEN 'Scorpio' THEN compatibility := 50;
        WHEN 'Sagittarius' THEN compatibility := 60;
        WHEN 'Capricorn' THEN compatibility := 40;
        WHEN 'Aquarius' THEN compatibility := 70;
        WHEN 'Pisces' THEN compatibility := 50;
        -- Add mappings for other zodiac signs
        ELSE compatibility := 0;
      END CASE;
    WHEN 'Scorpio' THEN
      CASE sign2
        WHEN 'Aries' THEN compatibility := 30;
        WHEN 'Taurus' THEN compatibility := 60;
        WHEN 'Gemini' THEN compatibility := 40;
        WHEN 'Cancer' THEN compatibility := 70;
        WHEN 'Leo' THEN compatibility := 30;
        WHEN 'Virgo' THEN compatibility := 60;
        WHEN 'Libra' THEN compatibility := 50;
        WHEN 'Scorpio' THEN compatibility := 70;
        WHEN 'Sagittarius' THEN compatibility := 30;
        WHEN 'Capricorn' THEN compatibility := 60;
        WHEN 'Aquarius' THEN compatibility := 50;
        WHEN 'Pisces' THEN compatibility := 60;
        -- Add mappings for other zodiac signs
        ELSE compatibility := 0;
      END CASE;
    WHEN 'Sagittarius' THEN
      CASE sign2
        WHEN 'Aries' THEN compatibility := 70;
        WHEN 'Taurus' THEN compatibility := 30;
        WHEN 'Gemini' THEN compatibility := 60;
        WHEN 'Cancer' THEN compatibility := 40;
        WHEN 'Leo' THEN compatibility := 70;
        WHEN 'Virgo' THEN compatibility := 50;
        WHEN 'Libra' THEN compatibility := 60;
        WHEN 'Scorpio' THEN compatibility := 30;
        WHEN 'Sagittarius' THEN compatibility := 70;
        WHEN 'Capricorn' THEN compatibility := 40;
        WHEN 'Aquarius' THEN compatibility := 50;
        WHEN 'Pisces' THEN compatibility := 60;
        -- Add mappings for other zodiac signs
        ELSE compatibility := 0;
      END CASE;
    WHEN 'Capricorn' THEN
      CASE sign2
        WHEN 'Aries' THEN compatibility := 40;
        WHEN 'Taurus' THEN compatibility := 70;
        WHEN 'Gemini' THEN compatibility := 30;
        WHEN 'Cancer' THEN compatibility := 60;
        WHEN 'Leo' THEN compatibility := 40;
        WHEN 'Virgo' THEN compatibility := 70;
        WHEN 'Libra' THEN compatibility := 40;
        WHEN 'Scorpio' THEN compatibility := 60;
        WHEN 'Sagittarius' THEN compatibility := 40;
        WHEN 'Capricorn' THEN compatibility := 70;
        WHEN 'Aquarius' THEN compatibility := 30;
        WHEN 'Pisces' THEN compatibility := 60;
        -- Add mappings for other zodiac signs
        ELSE compatibility := 0;
      END CASE;
    WHEN 'Aquarius' THEN
      CASE sign2
        WHEN 'Aries' THEN compatibility := 60;
        WHEN 'Taurus' THEN compatibility := 50;
        WHEN 'Gemini' THEN compatibility := 50;
        WHEN 'Cancer' THEN compatibility := 70;
        WHEN 'Leo' THEN compatibility := 50;
        WHEN 'Virgo' THEN compatibility := 60;
        WHEN 'Libra' THEN compatibility := 70;
        WHEN 'Scorpio' THEN compatibility := 50;
        WHEN 'Sagittarius' THEN compatibility := 50;
        WHEN 'Capricorn' THEN compatibility := 30;
        WHEN 'Aquarius' THEN compatibility := 70;
        WHEN 'Pisces' THEN compatibility := 50;
        -- Add mappings for other zodiac signs
        ELSE compatibility := 0;
      END CASE;
    WHEN 'Pisces' THEN
      CASE sign2
        WHEN 'Aries' THEN compatibility := 30;
        WHEN 'Taurus' THEN compatibility := 30;
        WHEN 'Gemini' THEN compatibility := 80;
        WHEN 'Cancer' THEN compatibility := 30;
        WHEN 'Leo' THEN compatibility := 60;
        WHEN 'Virgo' THEN compatibility := 40;
        WHEN 'Libra' THEN compatibility := 40;
        WHEN 'Scorpio' THEN compatibility := 80;
        WHEN 'Sagittarius' THEN compatibility := 40;
        WHEN 'Capricorn' THEN compatibility := 60;
        WHEN 'Aquarius' THEN compatibility := 80;
        WHEN 'Pisces' THEN compatibility := 70;
        -- Add mappings for other zodiac signs
        ELSE compatibility := 0;
      END CASE;
    -- Add cases for other zodiac signs
    ELSE compatibility := 0;
  END CASE;

  RETURN compatibility;
END;
$$;

-- Foreign Key Constraints
ALTER TABLE blocks
  ADD CONSTRAINT blocks_fk_user FOREIGN KEY (id_user) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT blocks_fk_sender FOREIGN KEY (id_sender) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE sys_blocks
  ADD CONSTRAINT sys_blocks_fk_user FOREIGN KEY (id_user) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE chatrooms
  ADD CONSTRAINT chatrooms_fk_user1 FOREIGN KEY (id_user_1) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT chatrooms_fk_user2 FOREIGN KEY (id_user_2) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE likes
  ADD CONSTRAINT likes_fk_user FOREIGN KEY (id_user) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT likes_fk_sender FOREIGN KEY (id_sender) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE messages
  ADD CONSTRAINT messages_fk_user FOREIGN KEY (id_user) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT messages_fk_sender FOREIGN KEY (id_sender) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE notifications
  ADD CONSTRAINT notifications_fk_sender FOREIGN KEY (id_sender) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE pics
  ADD CONSTRAINT pics_fk_user FOREIGN KEY (id_user) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE galleries
  ADD CONSTRAINT galleries_fk_user FOREIGN KEY (id_user) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE pics_verification
  ADD CONSTRAINT pics_verification_fk_user FOREIGN KEY (id_user) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE profiles
  ADD CONSTRAINT profiles_fk_user FOREIGN KEY (id_user) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE admins
  ADD CONSTRAINT admins_fk_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE supports
  ADD CONSTRAINT supports_fk_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE users_interests
  ADD CONSTRAINT users_interests_fk_user FOREIGN KEY (id_user) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE user_personality_test
  ADD CONSTRAINT user_personality_test_fk_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE random_calls
  ADD CONSTRAINT random_calls_fk_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE invite_datings
  ADD CONSTRAINT invite_datings_fk_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE random_call_quotas
  ADD CONSTRAINT random_call_quotas_fk_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE invite_dating_quotas
  ADD CONSTRAINT invite_dating_quotas_fk_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE booster
  ADD CONSTRAINT booster_fk_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE user_settings
  ADD CONSTRAINT user_settings_fk_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE user_filters
  ADD CONSTRAINT user_filters_fk_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE versus_wins
  ADD CONSTRAINT versus_wins_fk_chooser FOREIGN KEY (chooser_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE;

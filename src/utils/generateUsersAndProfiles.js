// utils/generateUsersAndProfiles.js
const { Sequelize } = require("sequelize");
const faker = require("faker");
const User = require("../models/user");
const Profile = require("../models/profile");
const FakeProfile = require("../models/fakeProfile");
const { getZodiacSign } = require("./zodiacSign");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    logging: false,
  },
);

async function generateUsersAndProfiles() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    for (let i = 0; i < 10000; i++) {
      const gender = faker.random.arrayElement(["male", "female"]);
      const birthday = faker.date.between("1955-01-01", "2005-12-31");
      const zodiac_sign = getZodiacSign(birthday);

      const user = await User.create({
        phone: faker.phone.phoneNumber(),
        fullname: faker.name.findName(null, null, gender),
        zodiac_sign,
        profile_completed: true,
        active: true,
        is_blocked: false,
        online: faker.random.boolean(),
        last_login: faker.date.recent(),
        is_verified: faker.random.boolean(),
      });

      await Profile.create({
        id_user: user.id,
        gender,
        sexuality: faker.random.arrayElement([
          "heterosexual",
          "homosexual",
          "bisexual",
        ]),
        birthday,
        biography: faker.lorem.paragraph(),
        my_contribution: faker.lorem.sentence(),
        my_expectation: faker.lorem.sentence(),
        location_lat: faker.address.latitude(),
        location_lon: faker.address.longitude(),
        zodiac_sign,
        job: faker.name.jobTitle(),
        relationship_status: faker.random.arrayElement([
          "single",
          "engaged",
          "in-relationship",
          "married",
          "divorcee",
          "complicated",
        ]),
        looking_for: faker.random.arrayElement([
          "friendship",
          "relationship",
          "fun",
        ]),
        religion: faker.random.arrayElement([
          "Christianity",
          "Islam",
          "Hinduism",
          "Buddhism",
          "Atheism",
          "Other",
        ]),
        avatar: faker.image.avatar(),
        fame: faker.random.number({ min: 0, max: 100 }),
        city: faker.address.city(),
        country_name: faker.address.country(),
        country_code: faker.address.countryCode(),
      });

      await FakeProfile.create({
        id_user: user.id,
      });

      if (i % 100 === 0) {
        console.log(`Generated ${i} users, profiles, and fake profiles`);
      }
    }

    console.log(
      "10000 users, profiles, and fake profiles have been generated successfully.",
    );
    await sequelize.close();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

module.exports = generateUsersAndProfiles;

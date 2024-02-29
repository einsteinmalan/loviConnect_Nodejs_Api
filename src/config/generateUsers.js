//const faker = require("faker");
const { faker } = require("@faker-js/faker");
const randomInt = require("random-int");
const randomFloat = require("random-float");
const randomItem = require("random-item");
const connection = require("./database");
const bcrypt = require("bcrypt");
const request = require("request");
const uuid = require("uuid");

export async function generateUser() {
  for (let j = 0; j < 1000; j++) {
    let user = {
      fullname: faker.person.firstName() + " " + faker.person.lastName(),
      email: faker.internet.email({ firstName: fullname }),
      password: bcrypt.hashSync("12345678", 10),
      zodiac_sign: faker.person.zodiacSign(),
      creation_date: faker.date.between({
        from: "2024-01-01T00:00:00.000Z",
        to: "2024-03-01T00:00:00.000Z",
      }),
      is_verified: "1",
      active: "1",
      online: randomItem([0, 1]),
    };
    let result = null;
    let resultProfile = null;
    const id = uuid.v4();
    try {
      result = await connection.query("INSERT IGNORE INTO users SET ?", user);
      try {
        resultProfile = await connection.query(
          "INSERT IGNORE INTO profiles (id, id_user) value (?, ?)",
          [id, result.insertId],
        );
      } catch (err) {
        throw new Error(err);
      }
    } catch (err) {
      throw new Error(err);
    }
    let profile = {
      id_user: resultProfile.insertId,
      gender: randomItem(["male", "female"]),
      sexuality: randomItem(["heterosexual", "homosexual", "bisexual"]),
      biography:
        `Hi, i am ${user.firstname} ${user.lastname}. ` + faker.person.bio(),
      location_lat: faker.location.latitude(),
      location_lon: faker.location.longitude(),
      birthday: faker.date.birthdate({ min: 18, max: 65, mode: "age" }),
      sex_prefer: randomItem(["straight", "gay", "bi"]),
      job: faker.person.jobTitle(),
      relationship_status: randomItem([
        "single",
        "engaged",
        "in-relationship",
        "married",
        "divorcee",
        "complicated",
      ]),
      looking_for: randomItem(["friendship", "relationship", "fun"]),
      religion: randomItem([
        "Christianity",
        "Islam",
        "Hinduism",
        "Buddhism",
        "Judaism",
        "Shintoism",
        "Rastafarianism",
        "Scientology",
        "Animism",
        "Other",
      ]),
      avatar: faker.image.avatarLegacy(),
      city: faker.location.city(),
      country_name: faker.location.country(),
      country_code: faker.location.countryCode("alpha-2"),
      fame: randomInt(0, 500),
      //location_lat: randomFloat(46, 51),
      //location_lon: randomFloat(-0.9, 8),
    };
    try {
      await connection.query("UPDATE profiles set ? WHERE id_user = ?", [
        profile,
        result.insertId,
      ]);
    } catch (err) {
      throw new Error(err);
    }
    let gender = null;
    profile.gender === "male" ? (gender = "man") : (gender = "woman");
    request(
      `https://source.unsplash.com/random/640x480?${gender}`,
      async (err, res) => {
        let avatar = res.request.uri.href;
        try {
          await connection.query(
            "UPDATE profiles set avatar=? WHERE id_user = ?",
            [avatar, result.insertId],
          );
        } catch (err) {
          throw new Error(err);
        }
      },
    );
    let interests = [];
    let random;
    for (let i = 0; i < 10; i++) {
      const id = uuid.v4();
      random = randomInt(1, 41);
      if (!interests.includes(random)) {
        interests.push(random);
        try {
          await connection.query(
            "INSERT IGNORE INTO users_interests (id, id_user, id_interest) VALUES (?,?,?)",
            [id, result.insertId, random],
          );
        } catch (err) {
          throw new Error(err);
        }
      }
    }
  }
}

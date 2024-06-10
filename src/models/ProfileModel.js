const connection = require("../config/database");
const uuid = require("uuid");
const id = uuid.v4();

export async function createProfile(
  userId,
  gender,
  sexuality,
  birthday,
  biography,
  locationLat,
  locationLon,
  job,
  relationshipStatus,
  lookingFor,
  religion,
  avatar,
  fame,
  city,
  countryName,
  countryCode,
) {
  try {
    await connection.query(
      "INSERT INTO profiles (id,id_user, gender, sexuality, birthday, biography, location_lat, location_lon, job, " +
        "relationship_status, looking_for, religion, avatar, fame, city, country_name, country_code) " +
        "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        id,
        userId,
        gender,
        sexuality,
        birthday,
        biography,
        locationLat,
        locationLon,
        job,
        relationshipStatus,
        lookingFor,
        religion,
        avatar,
        fame,
        city,
        countryName,
        countryCode,
      ],
      (error, result) => {
        if (error) {
          return { error: error };
        } else {
          return id;
        }
      },
    );
    //return id;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getProfileById(profileId) {
  try {
    const result = await connection.query(
      "SELECT * FROM profiles WHERE id = ?",
      [profileId],
      (error, result) => {
        if (error) {
          return { error: error };
        } else {
          return result[0];
        }
      },
    );
    //return result[0];
  } catch (error) {
    throw new Error(error);
  }
}

export async function getAllProfilesByUserId(userId) {
  try {
    const result = await connection.query(
      "SELECT * FROM profiles WHERE id_user = ?",
      [userId],
      (error, result) => {
        if (error) {
          return { error: error };
        } else {
          return result;
        }
      },
    );
    //return result;
  } catch (error) {
    throw new Error(error);
  }
}

export async function updateProfileById(
  profileId,
  newUserId,
  newGender,
  newSexuality,
  newBirthday,
  newBiography,
  newLocationLat,
  newLocationLon,
  newJob,
  newRelationshipStatus,
  newLookingFor,
  newReligion,
  newAvatar,
  newFame,
  newCity,
  newCountryName,
  newCountryCode,
) {
  try {
    await connection.query(
      "UPDATE profiles SET id_user = ?, gender = ?, sexuality = ?, birthday = ?, biography = ?, " +
        "location_lat = ?, location_lon = ?, job = ?, relationship_status = ?, looking_for = ?, religion = ?, " +
        "avatar = ?, fame = ?, city = ?, country_name = ?, country_code = ? " +
        "WHERE id = ?",
      [
        newUserId,
        newGender,
        newSexuality,
        newBirthday,
        newBiography,
        newReligion,
        newAvatar,
        newFame,
        newCity,
        newCountryName,
        newCountryCode,
        profileId,
      ],
      (error, result) => {
        if (error) {
          return { error: error };
        } else {
          return result;
        }
      },
    );
  } catch (error) {
    throw new Error(error);
  }
}

export async function deleteProfileById(profileId) {
  try {
    await connection.query(
      "DELETE FROM profiles WHERE id = ?",
      [profileId],
      (error, result) => {
        if (error) {
          return { error: error };
        } else {
          return result;
        }
      },
    );
  } catch (error) {
    throw new Error(error);
  }
}

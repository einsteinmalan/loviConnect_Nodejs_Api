const connection = require("../config/database");
const uuid = require("uuid");
const id = uuid.v4();

export async function createUserFilters(
  userId,
  gender = "male",
  sexuality,
  ageStart = 18,
  ageLimit = 60,
  interest = "any",
  location = null,
) {
  try {
    await connection.query(
      "INSERT INTO user_filters (id, user_id, gender, sexuality, age_start, age_limit, interest, location) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [id, userId, gender, sexuality, ageStart, ageLimit, interest, location],
    );
    return id;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getUserFiltersById(filtersId) {
  try {
    const result = await connection.query(
      "SELECT * FROM user_filters WHERE id = ?",
      [filtersId],
    );
    return result[0];
  } catch (error) {
    throw new Error(error);
  }
}

export async function getUserFiltersByUserId(userId) {
  try {
    const result = await connection.query(
      "SELECT * FROM user_filters WHERE user_id = ?",
      [userId],
    );
    return result[0];
  } catch (error) {
    throw new Error(error);
  }
}

export async function updateUserFiltersById(
  filtersId,
  newUserId,
  newGender,
  newSexuality,
  newAgeStart,
  newAgeLimit,
  newInterest,
  newLocation,
) {
  try {
    await connection.query(
      "UPDATE user_filters SET user_id = ?, gender = ?, sexuality = ?, age_start = ?, age_limit = ?, interest = ?, location = ? WHERE id = ?",
      [
        newUserId,
        newGender,
        newSexuality,
        newAgeStart,
        newAgeLimit,
        newInterest,
        newLocation,
        filtersId,
      ],
    );
  } catch (error) {
    throw new Error(error);
  }
}

export async function deleteUserFiltersById(filtersId) {
  try {
    await connection.query("DELETE FROM user_filters WHERE id = ?", [
      filtersId,
    ]);
  } catch (error) {
    throw new Error(error);
  }
}

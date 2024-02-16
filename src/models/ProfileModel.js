const connection = require('../config/database');

export async function createProfile(
    userId, gender, sexuality, birthday, biography, locationLat, locationLon,
    job, relationshipStatus, lookingFor, religion, avatar, fame, city, countryName, countryCode
) {
    try {
        const result = await connection.query(
            'INSERT INTO profiles (id_user, gender, sexuality, birthday, biography, location_lat, location_lon, job, ' +
            'relationship_status, looking_for, religion, avatar, fame, city, country_name, country_code) ' +
            'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [userId, gender, sexuality, birthday, biography, locationLat, locationLon, job,
             relationshipStatus, lookingFor, religion, avatar, fame, city, countryName, countryCode]
        );
        return result.insertId;
    } catch (error) {
        throw new Error(error);
    }
}

export async function getProfileById(profileId) {
    try {
        const result = await connection.query('SELECT * FROM profiles WHERE id = ?', [profileId]);
        return result[0];
    } catch (error) {
        throw new Error(error);
    }
}

export async function getAllProfilesByUserId(userId) {
    try {
        const result = await connection.query('SELECT * FROM profiles WHERE id_user = ?', [userId]);
        return result;
    } catch (error) {
        throw new Error(error);
    }
}

export async function updateProfileById(
    profileId, newUserId, newGender, newSexuality, newBirthday, newBiography, newLocationLat, newLocationLon,
    newJob, newRelationshipStatus, newLookingFor, newReligion, newAvatar, newFame, newCity, newCountryName, newCountryCode
) {
    try {
        await connection.query(
            'UPDATE profiles SET id_user = ?, gender = ?, sexuality = ?, birthday = ?, biography = ?, ' +
            'location_lat = ?, location_lon = ?, job = ?, relationship_status = ?, looking_for = ?, religion = ?, ' +
            'avatar = ?, fame = ?, city = ?, country_name = ?, country_code = ? ' +
            'WHERE id = ?',
            [newUserId, newGender, newSexuality, newBirthday, newBiography, newReligion, newAvatar, newFame, newCity, newCountryName, newCountryCode, profileId]
            );
        } catch (error) {
            throw new Error(error);
        }
    }


export async function deleteProfileById(profileId) {
       try {
           await connection.query('DELETE FROM profiles WHERE id = ?', [profileId]);
       } catch (error) {
           throw new Error(error);
       }
   }
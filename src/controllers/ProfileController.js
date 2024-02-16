
import * as ProfileModel from '../models/ProfileModel';

export async function createProfile(req, res) {
    const {
        userId, gender, sexuality, birthday, biography, locationLat, locationLon,
        job, relationshipStatus, lookingFor, religion, avatar, fame, city, countryName, countryCode
    } = req.body;

    try {
        const profileId = await ProfileModel.createProfile(
            userId, gender, sexuality, birthday, biography, locationLat, locationLon,
            job, relationshipStatus, lookingFor, religion, avatar, fame, city, countryName, countryCode
        );
        res.status(201).json({ status: 201, message: 'Profile created successfully', data: { id: profileId } });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error creating Profile', error: error.message, data: null });
    }
}

export async function getProfile(req, res) {
    const { profileId } = req.params;

    try {
        const profile = await ProfileModel.getProfileById(profileId);
        res.status(200).json({ status: 200, message: 'Profile retrieved successfully', data: profile });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error retrieving Profile', error: error.message, data: null });
    }
}

export async function getAllProfilesByUser(req, res) {
    const { userId } = req.params;

    try {
        const profiles = await ProfileModel.getAllProfilesByUserId(userId);
        res.status(200).json({ status: 200, message: 'Profiles retrieved successfully', data: profiles });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error retrieving Profiles', error: error.message, data: null });
    }
}

export async function updateProfile(req, res) {
    const { profileId } = req.params;
    const {
        newUserId, newGender, newSexuality, newBirthday, newBiography, newLocationLat, newLocationLon,
        newJob, newRelationshipStatus, newLookingFor, newReligion, newAvatar, newFame, newCity, newCountryName, newCountryCode
    } = req.body;

    try {
        await ProfileModel.updateProfileById(
            profileId, newUserId, newGender, newSexuality, newBirthday, newBiography, newLocationLat, newLocationLon,
            newJob, newRelationshipStatus, newLookingFor, newReligion, newAvatar, newFame, newCity, newCountryName, newCountryCode
        );
        res.status(200).json({ status: 200, message: 'Profile updated successfully', data: null });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error updating Profile', error: error.message, data: null });
    }
}

export async function deleteProfile(req, res) {
    const { profileId } = req.params;

    try {
        await ProfileModel.deleteProfileById(profileId);
        res.status(200).json({ status: 200, message: 'Profile deleted successfully', data: null });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error deleting Profile', error: error.message, data: null });
    }
}

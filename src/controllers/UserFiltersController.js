import * as UserFiltersModel from '../models/UserFiltersModel';

export async function createUserFilters(req, res) {
    const { userId, gender, sexuality, ageStart, ageLimit, interest, location } = req.body;

    try {
        const filtersId = await UserFiltersModel.createUserFilters(userId, gender, sexuality, ageStart, ageLimit, interest, location);
        res.status(201).json({
            status: 201,
            message: 'User Filters created successfully',
            data: { id: filtersId }
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error creating User Filters',
            error: error.message,
            data: null
        });
    }
}

export async function getUserFilters(req, res) {
    const { filtersId } = req.params;

    try {
        const filters = await UserFiltersModel.getUserFiltersById(filtersId);
        res.status(200).json({
            status: 200,
            message: 'User Filters retrieved successfully',
            data: filters
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error retrieving User Filters',
            error: error.message,
            data: null
        });
    }
}

export async function getUserFiltersByUser(req, res) {
    const { userId } = req.params;

    try {
        const filters = await UserFiltersModel.getUserFiltersByUserId(userId);
        res.status(200).json({
            status: 200,
            message: 'User Filters retrieved successfully',
            data: filters
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error retrieving User Filters',
            error: error.message,
            data: null
        });
    }
}

export async function updateUserFilters(req, res) {
    const { filtersId } = req.params;
    const { newUserId, newGender, newSexuality, newAgeStart, newAgeLimit, newInterest, newLocation } = req.body;

    try {
        await UserFiltersModel.updateUserFiltersById(filtersId, newUserId, newGender, newSexuality, newAgeStart, newAgeLimit, newInterest, newLocation);
        res.status(200).json({
            status: 200,
            message: 'User Filters updated successfully',
            data: null
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error updating User Filters',
            error: error.message,
            data: null
        });
    }
}

export async function deleteUserFilters(req, res) {
    const { filtersId } = req.params;

    try {
        await UserFiltersModel.deleteUserFiltersById(filtersId);
        res.status(200).json({
            status: 200,
            message: 'User Filters deleted successfully',
            data: null
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error deleting User Filters',
            error: error.message,
            data: null
        });
    }
}

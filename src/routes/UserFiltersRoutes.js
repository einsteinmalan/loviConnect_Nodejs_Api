import express from 'express';
import * as UserFiltersController from '../controllers/UserFiltersController';

const router = express.Router();

// Create User Filters
router.post('/user-filters', UserFiltersController.createUserFilters);

// Get User Filters by ID
router.get('/user-filters/:filtersId', UserFiltersController.getUserFilters);

// Get User Filters by User
router.get('/user-filters/user/:userId', UserFiltersController.getUserFiltersByUser);

// Update User Filters
router.put('/user-filters/:filtersId', UserFiltersController.updateUserFilters);

// Delete User Filters
router.delete('/user-filters/:filtersId', UserFiltersController.deleteUserFilters);

export default router;

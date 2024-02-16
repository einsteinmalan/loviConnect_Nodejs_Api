import * as GalleryModel from '../models/GalleryModel';

export async function createGallery(req, res) {
    const { userId, type, image } = req.body;

    try {
        const galleryId = await GalleryModel.createGallery(userId, type, image);
        res.status(201).json({ status: 201, message: 'Gallery entry created successfully', data: { id: galleryId } });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error creating Gallery entry', error: error.message, data: null });
    }
}

export async function getGallery(req, res) {
    const { galleryId } = req.params;

    try {
        const gallery = await GalleryModel.getGalleryById(galleryId);
        res.status(200).json({ status: 200, message: 'Gallery entry retrieved successfully', data: gallery });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error retrieving Gallery entry', error: error.message, data: null });
    }
}

export async function getAllGalleriesByUser(req, res) {
    const { userId } = req.params;

    try {
        const galleries = await GalleryModel.getAllGalleriesByUserId(userId);
        res.status(200).json({ status: 200, message: 'Gallery entries retrieved successfully', data: galleries });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error retrieving Gallery entries', error: error.message, data: null });
    }
}

export async function updateGallery(req, res) {
    const { galleryId } = req.params;
    const { newUserId, newType, newImage } = req.body;

    try {
        await GalleryModel.updateGalleryById(galleryId, newUserId, newType, newImage);
        res.status(200).json({ status: 200, message: 'Gallery entry updated successfully', data: null });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error updating Gallery entry', error: error.message, data: null });
    }
}

export async function deleteGallery(req, res) {
    const { galleryId } = req.params;

    try {
        await GalleryModel.deleteGalleryById(galleryId);
        res.status(200).json({ status: 200, message: 'Gallery entry deleted successfully', data: null });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error deleting Gallery entry', error: error.message, data: null });
    }
}

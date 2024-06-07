const connection = require("../config/database");
const uuid = require("uuid");
const id = uuid.v4();

export async function createGallery(userId, type, image) {
  try {
    await connection.query(
      "INSERT INTO galleries (id, id_user, type, image) VALUES (?, ?, ?, ?)",
      [id, userId, type, image],
    );
    return id;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getGalleryById(galleryId) {
  try {
    const result = await connection.query(
      "SELECT * FROM galleries WHERE id = ?",
      [galleryId],
    );
    return result[0];
  } catch (error) {
    throw new Error(error);
  }
}

export async function getAllGalleriesByUserId(userId) {
  try {
    const result = await connection.query(
      "SELECT * FROM galleries WHERE id_user = ?",
      [userId],
    );
    return result;
  } catch (error) {
    throw new Error(error);
  }
}

export async function updateGalleryById(
  galleryId,
  newUserId,
  newType,
  newImage,
) {
  try {
    await connection.query(
      "UPDATE galleries SET id_user = ?, type = ?, image = ? WHERE id = ?",
      [newUserId, newType, newImage, galleryId],
    );
  } catch (error) {
    throw new Error(error);
  }
}

export async function deleteGalleryById(galleryId) {
  try {
    await connection.query("DELETE FROM galleries WHERE id = ?", [galleryId]);
  } catch (error) {
    throw new Error(error);
  }
}

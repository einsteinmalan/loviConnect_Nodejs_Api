const connection = require("../config/database");
const uuid = require("uuid");
const id = uuid.v4();

export async function createGallery(userId, type, image) {
  try {
    await connection.query(
      "INSERT INTO galleries (id, id_user, type, image) VALUES (?, ?, ?, ?)",
      [id, userId, type, image],
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

export async function getGalleryById(galleryId) {
  try {
    const result = await connection.query(
      "SELECT * FROM galleries WHERE id = ?",
      [galleryId],
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

export async function getAllGalleriesByUserId(userId) {
  try {
    const result = await connection.query(
      "SELECT * FROM galleries WHERE id_user = ?",
      [userId],
      (error, result) => {
        if (error) {
          return { error: error };
        } else {
          return result;
        }
      },
    );
    // return result;
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

export async function deleteGalleryById(galleryId) {
  try {
    await connection.query(
      "DELETE FROM galleries WHERE id = ?",
      [galleryId],
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

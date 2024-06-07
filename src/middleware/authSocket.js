const jwt = require("jsonwebtoken");
const jwtSecret = require("../config/jwtSecret");
const dotenv = require("dotenv");
dotenv.config();

export async function authSocket(token) {
  if (!token) {
    return { error: "No token, authorization denied" };
  }
  try {
    const decoded = jwt.verify(token, jwtSecret.jwtSecret);
    //return {userid: decoded.userid};
    return { id: decoded.id };
  } catch (err) {
    return { error: "Token is not valid" };
  }
}

const authSockets = async (token) => {
  try {
    if (!token) {
      return { error: "No token provided" };
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const [rows] = await db
      .promise()
      .query("SELECT * FROM users WHERE id = ?", [userId]);
    if (rows.length === 0) {
      return { error: "User not found" };
    }

    return { id: userId };
  } catch (err) {
    return { error: "Invalid token" };
  }
};

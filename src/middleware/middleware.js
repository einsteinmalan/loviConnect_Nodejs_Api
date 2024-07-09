const jwt = require("jsonwebtoken");
const config = require("../config/config");

const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, config.jwtSecret, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

const checkUserSession = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, config.jwtSecret, (err, user) => {
    if (err) return res.sendStatus(403);

    const now = Date.now().valueOf() / 1000;
    if (user.exp < now) {
      return res.status(401).json({ message: "Token expired" });
    }

    req.user = user;
    next();
  });
};

module.exports = { authenticateToken, checkUserSession };

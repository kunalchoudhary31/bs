

const jwt = require("jsonwebtoken");
const secret = require('./config/config.json').development.jwt_secert;

/**
 * Authorize Middleware
 *
 * Checks a request's authorization header for a valid token,
 * and adds an authorized user's information to the request as
 * req.currentUser before passing the request on to the next middleware.
 *
 * If the request is not authorized, an error response will be
 * returned to the client.
 */

function authorize(req, res, next) {
  const authorizationHeader = req.headers["authorization"];
  let token;

  if (authorizationHeader) {
    token = authorizationHeader.split(" ")[1];
  }

  if (token) {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        res.json({ message: "Not authorized" });
      } else {
            req.token = token;
            next();
          }
      });
  } else {
    res.json({ message: "No jwt token provided" });
  }
}

module.exports = authorize;

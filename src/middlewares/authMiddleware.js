function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    const error = new Error("AuthHeader required");
    error.statusCode = 401;
    throw error;
  }
  const [bearer, token] = authHeader.split(" ");
  if (bearer !== "Bearer" || token !== "test-token") {
    const error = new Error("Invalid token");
    error.statusCode = 401;
    throw error;
  }
  next();
}

module.exports = authMiddleware;

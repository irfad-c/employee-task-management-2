const { validationResult } = require("express-validator");

const handleValidationErrors = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ message: error.array() });
  }
  next();
};

module.exports = handleValidationErrors;

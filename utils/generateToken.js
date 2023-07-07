const jwt = require("jsonwebtoken");

module.exports = ({ _id }) => {
    return jwt.sign({ id: _id }, process.env.JWT_SECRET);
  };

